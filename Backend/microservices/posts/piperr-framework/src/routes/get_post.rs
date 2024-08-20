use actix_web::{web, HttpResponse, Responder};

use crate::routes::{PostInfo, PostShowcase, ShortUserInfo};
use crate::AppState;
use crate::routes::functions::get_user;

pub async fn get_post(path: web::Path<usize>, app: web::Data<AppState>) -> impl Responder {
    let post_id: usize = path.into_inner();

    let post: Option<PostInfo> = sqlx::query_as!(
        PostInfo,
        "
            SELECT id, user_id, content, upvotes, downvotes, replies
            FROM posts
            WHERE id = ?;
        ",
        post_id as u64,
    )
    .fetch_optional(&app.pool)
    .await
    .unwrap();

    match post {
        Some(_) => (),
        None => return HttpResponse::Conflict().into(),
    }

    let post_data = post.unwrap();

    let user_data: ShortUserInfo = get_user(post_data.user_id.unwrap_or(0) as u64, &app.pool).await;

    let response = PostShowcase {
        post_id: post_data.id,
        content: post_data.content,
        upvotes: post_data.upvotes,
        downvotes: post_data.downvotes,
        replies: post_data.replies,
        user_id: user_data.id,
        username: user_data.username,
        profile_picture: user_data.profile_picture,
    };

    return HttpResponse::Ok().json(response);
}
