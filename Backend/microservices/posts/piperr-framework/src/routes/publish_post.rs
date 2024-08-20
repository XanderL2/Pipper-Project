use actix_web::{web, HttpResponse};

use crate::routes::PublishPost;
use crate::AppState;

pub async fn publish_post(data: web::Json<PublishPost>, app: web::Data<AppState>) -> HttpResponse {
    let result = sqlx::query!(
        "
            INSERT INTO posts (content) VALUES (?);
        ",
        data.content,
    )
    .execute(&app.pool)
    .await;

    match result {
        Ok(_) => HttpResponse::Ok().body("message posted!"),
        Err(_) => HttpResponse::Conflict().into(),
    }
}
