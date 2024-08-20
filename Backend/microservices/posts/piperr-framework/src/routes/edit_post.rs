use actix_web::{web, HttpResponse};

use crate::routes::PostInfo;
use crate::AppState;

pub async fn edit_post(data: web::Json<PostInfo>, app: web::Data<AppState>) -> HttpResponse {
    let result = sqlx::query!(
        "
            UPDATE posts SET content = IFNULL(?, content) WHERE id = ?;
        ",
        data.content,
        data.id as u64,
    )
    .execute(&app.pool)
    .await;

    match result {
        Ok(_) => HttpResponse::Ok().body("message successfully edited!"),
        Err(_) => HttpResponse::Conflict().into(),
    }
}

