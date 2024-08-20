use actix_web::{web, HttpResponse, Responder};

use crate::routes::{PostInfo, PostShowcase, ShortUserInfo};
use crate::routes::functions::get_user;
use crate::AppState;

pub async fn get_user_posts(path: web::Path<usize>, app: web::Data<AppState>) -> impl Responder {
    let user_id: usize = path.into_inner();

    let posts: Vec<PostInfo> = sqlx::query_as!(
        PostInfo,
        "
            SELECT id, user_id, content, upvotes, downvotes, replies
            FROM posts
            WHERE user_id = ?
            ORDER BY publish_date
            ;
        ",
        user_id as u64
    )
    .fetch_all(&app.pool)
    .await
    .unwrap();

    let mut result: Vec<PostShowcase> = Vec::new();
    let user_data: ShortUserInfo = get_user(user_id as u64, &app.pool).await;

    for post_data in posts {
        result.push(PostShowcase {
            post_id: post_data.id,
            content: post_data.content,
            upvotes: post_data.upvotes,
            downvotes: post_data.downvotes,
            replies: post_data.replies,
            user_id: user_data.id,
            username: user_data.username.clone(),
            profile_picture: user_data.profile_picture.clone(),
        });
    }

    return HttpResponse::Ok().json(result);
}
