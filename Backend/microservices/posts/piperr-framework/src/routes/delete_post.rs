use actix_web::{web, HttpResponse};

use crate::AppState;

pub async fn delete_post(path: web::Path<usize>, app: web::Data<AppState>) -> HttpResponse {
    let id: usize = path.into_inner();

    let result = sqlx::query!(
        "
            DELETE FROM posts WHERE id = ?;
        ",
        id as u64,
    )
    .execute(&app.pool)
    .await;

    match result {
        Ok(_) => HttpResponse::Ok().body("message deleted!"),
        Err(_) => HttpResponse::BadRequest().into(),
    }
}
