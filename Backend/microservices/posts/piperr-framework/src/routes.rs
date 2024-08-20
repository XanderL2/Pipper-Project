use serde::{Deserialize, Serialize};

pub mod delete_post;
pub mod edit_post;
pub mod get_post;
pub mod get_recent_posts;
pub mod get_user_posts;
pub mod publish_post;
pub mod send_reply;

pub mod functions;

#[derive(Serialize, Deserialize)]
pub struct PostInfo {
    pub id: i32,
    pub content: Option<String>,
    pub user_id: Option<i32>,

    pub upvotes: Option<i32>,
    pub downvotes: Option<i32>,
    pub replies: Option<i32>,
}

#[derive(Serialize, Deserialize)]
pub struct ShortUserInfo {
    pub id: i32,
    pub username: Option<String>,
    pub profile_picture: Option<String>,
}

impl Default for ShortUserInfo {
    fn default() -> Self {
        ShortUserInfo {
            id: 0,
            username: Some(String::from("invalid user")),
            profile_picture: Some(String::from("invalid_user.jpg")),
        }
    }
}

#[derive(Serialize, Deserialize)]
pub struct PublishPost {
    pub content: String,
}

#[derive(Serialize, Deserialize)]
pub struct SendReply {
    pub content: String,
    pub post_id: Option<i32>,
}

#[derive(Deserialize, Serialize)]
pub struct PostShowcase {
    pub post_id: i32,
    pub content: Option<String>,
    pub upvotes: Option<i32>,
    pub downvotes: Option<i32>,
    pub replies: Option<i32>,
    pub user_id: i32,
    pub username: Option<String>,
    pub profile_picture: Option<String>,
}
