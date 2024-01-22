// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::fs;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn login(name: &str) -> String {
    format!("Try log, {}!", name)
}

fn check_folder_exists(path: String) -> Result<bool, String> {
    let exists = fs::metadata(&path).is_ok();
    Ok(exists)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet,login])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
