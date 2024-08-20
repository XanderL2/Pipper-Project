mod routes;

use actix_web::{web, App, HttpServer};
use sqlx::mysql::{MySqlPool, MySqlPoolOptions};

#[derive(Clone)]
struct AppState {
    pool: MySqlPool,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    const DB_URL: &str = "mariadb://piperr_admin@127.0.0.1/piperr_db";

    let pool: sqlx::Pool<sqlx::MySql> = MySqlPoolOptions::new()
        .max_connections(5)
        .connect(DB_URL)
        .await
        .expect("-- error connecting to the database! have you ran setup.sh yet? --\n");

    let data = AppState { pool };

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(data.clone()))
            .route(
                "/get_post/{post_id}",
                web::get().to(routes::get_post::get_post),
            )
            .route("/publish_post", web::post().to(routes::publish_post::publish_post))
            .route("/send_reply", web::post().to(routes::send_reply::send_reply))
            .route(
                "/edit_post",
                web::patch().to(routes::edit_post::edit_post),
            )
            .route(
                "/delete_post/{post_id}",
                web::delete().to(routes::delete_post::delete_post),
            )
            .route(
                "/get_recent_posts/{page}",
                web::get().to(routes::get_recent_posts::get_recent_posts),
            )
            .route(
                "/get_user_posts/{user_id}",
                web::get().to(routes::get_user_posts::get_user_posts),
            )
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
