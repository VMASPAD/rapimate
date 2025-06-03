// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use libsql::Builder;
use serde::Serialize;
use std::env;

#[derive(Debug, Serialize)]
struct CommandError {
    message: String,
}

impl From<libsql::Error> for CommandError {
    fn from(error: libsql::Error) -> Self {
        CommandError {
            message: error.to_string(),
        }
    }
}

#[tauri::command]
async fn connect_db() -> Result<(), CommandError> {
    let url = "libsql://rapimate-vmaspad.aws-us-west-2.turso.io";
    let token = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJnaWQiOiI5YjgxNTg4OC1jYWE1LTQyNTktOTNjYi0zNTM4MWEwYjNhYWIiLCJpYXQiOjE3NDg5MDQ2NjUsInJpZCI6IjgwYzJkMzgzLTE3NTktNGM0My05ZDZkLWY0MzIzNjZjZTJjMCJ9.SHOHFKuk7eZMeKMaWUHLFFwayJpZCq5KS_npYvLfohwSpZYPXh3JVx0gb27sOc06T4Oeb96EoQ7HSPUT0xXJDw";

    let db = Builder::new_remote(url.to_string(), token.to_string())
        .build()
        .await?;
    let _conn = db.connect()?;
    _conn
        .execute(
            "CREATE TABLE test (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );",
            (),
        )
        .await?;
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![connect_db])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
