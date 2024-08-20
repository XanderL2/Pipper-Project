use crate::routes::ShortUserInfo;

pub async fn get_user(user_id: u64, pool: &sqlx::mysql::MySqlPool) -> ShortUserInfo {
    sqlx::query_as!(
        ShortUserInfo,
        "
            SELECT id, username, profile_picture
            FROM users
            WHERE id = ?;
        ",
        user_id,
    )
    .fetch_optional(pool)
    .await
    .unwrap()
    .unwrap_or(ShortUserInfo::default())
}
