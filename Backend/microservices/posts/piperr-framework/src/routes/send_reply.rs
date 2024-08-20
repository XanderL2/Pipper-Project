use actix_web::{web, HttpResponse};

use crate::routes::SendReply;
use crate::AppState;

pub async fn send_reply(data: web::Json<SendReply>, app: web::Data<AppState>) -> HttpResponse {
    let result = sqlx::query!(
        "
            INSERT INTO replies (content, post_id) VALUES (?, ?);
        ",
        data.content,
        data.post_id
    )
    .execute(&app.pool)
    .await;

    match result {
        Ok(_) => HttpResponse::Ok().body("reply sent!"),
        Err(_) => HttpResponse::Conflict().into(),
    }
}

