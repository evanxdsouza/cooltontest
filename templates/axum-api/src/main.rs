use axum::{extract::State, http::StatusCode, routing::get, Json, Router};
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};

#[derive(Clone, Default)]
struct AppState { tasks: Arc<Mutex<Vec<Task>>> }

#[derive(Clone, Serialize)]
struct Task { id: usize, title: String, done: bool }

#[derive(Deserialize)]
struct NewTask { title: String }

async fn health() -> Json<serde_json::Value> {
    Json(serde_json::json!({"status": "ok"}))
}

async fn list_tasks(State(state): State<AppState>) -> Json<Vec<Task>> {
    Json(state.tasks.lock().expect("task store lock").clone())
}

async fn create_task(
    State(state): State<AppState>,
    Json(input): Json<NewTask>,
) -> Result<(StatusCode, Json<Task>), StatusCode> {
    let title = input.title.trim();
    if title.is_empty() || title.len() > 120 { return Err(StatusCode::UNPROCESSABLE_ENTITY); }
    let mut tasks = state.tasks.lock().map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    let task = Task { id: tasks.len() + 1, title: title.to_owned(), done: false };
    tasks.push(task.clone());
    Ok((StatusCode::CREATED, Json(task)))
}

#[tokio::main]
async fn main() {
    let state = AppState::default();
    let app = Router::new()
        .route("/health", get(health))
        .route("/tasks", get(list_tasks).post(create_task))
        .with_state(state);
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000").await.expect("bind port 3000");
    println!("tasks API listening on http://127.0.0.1:3000");
    axum::serve(listener, app).await.expect("serve API");
}
