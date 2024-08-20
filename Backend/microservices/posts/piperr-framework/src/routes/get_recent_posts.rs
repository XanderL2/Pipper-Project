use actix_web::{web, HttpResponse, Responder};

use crate::routes::{PostInfo, PostShowcase, ShortUserInfo};
use crate::AppState;
use crate::routes::functions::get_user;

pub async fn get_recent_posts(path: web::Path<usize>, app: web::Data<AppState>) -> impl Responder {
    let page: usize = path.into_inner();

    let posts: Vec<PostInfo> = sqlx::query_as!(
        PostInfo,
        "
            SELECT id, user_id, content, upvotes, downvotes, replies
            FROM posts
            ORDER BY publish_date
            OFFSET ? ROWS
            FETCH NEXT 10 ROWS ONLY
            ;
        ",
        (page * 10) as u64
    )
    .fetch_all(&app.pool)
    .await
    .unwrap();

    let mut result: Vec<PostShowcase> = Vec::new();

    for post_data in posts {
        let user_data: ShortUserInfo =
            get_user(post_data.user_id.unwrap_or(0) as u64, &app.pool).await;

        result.push(PostShowcase {
            post_id: post_data.id,
            content: post_data.content,
            upvotes: post_data.upvotes,
            downvotes: post_data.downvotes,
            replies: post_data.replies,
            user_id: user_data.id,
            username: user_data.username,
            profile_picture: user_data.profile_picture,
        });
    }

    return HttpResponse::Ok().json(result);
}
