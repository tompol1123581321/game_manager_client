// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#[cfg(any(target_os = "windows", target_os = "macos", target_os = "linux"))]
use std::fs;
use std::{io::Read, iter::zip, path::{Path, PathBuf}, process::Command};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn login(name: &str) -> String {
    format!("Try log, {}!", name)
}

#[tauri::command]
fn check_folder_exists(path: &str) -> Result<bool, String> {
    let exists = fs::metadata(&path).is_ok();
    Ok(exists)
}

#[tauri::command]
fn save_blob(data: Vec<u8>, file_path: &str) -> Result<(), String> {


    let path = Path::new(&file_path);

    // Ensure the directory exists
    if let Some(parent) = path.parent() {
        if !parent.exists() {
            if let Err(err) = fs::create_dir_all(parent) {
                return Err(format!("Failed to create directory: {}", err));
            }
        }
    }

    // Write the file
    if let Err(err) = fs::write(&path, &data) {
        return Err(format!("Failed to write file: {}", err));
    }

    println!("File saved successfully: {:?}", path);

    Ok(())
}
// Helper function to unzip the file
fn unzip_file(zip_path: &str, target_dir: &str) -> Result<(), String> {


    let zip_file = std::fs::File::open(zip_path).map_err(|e| e.to_string())?;
    let mut archive = zip::ZipArchive::new(zip_file).map_err(|e| e.to_string())?;

    for i in 0..archive.len() {
        let mut file = archive.by_index(i).map_err(|e| e.to_string())?;
        let target_path = Path::new(target_dir).join(file.sanitized_name());

        if file.is_dir() {
            fs::create_dir_all(&target_path).map_err(|e| e.to_string())?;
        } else {
            if let Some(parent) = target_path.parent() {
                if !parent.exists() {
                    fs::create_dir_all(&parent).map_err(|e| e.to_string())?;
                }
            }

            let mut buffer = Vec::new();
            file.read_to_end(&mut buffer).map_err(|e| e.to_string())?;
            fs::write(&target_path, &buffer).map_err(|e| e.to_string())?;
        }
    }

    Ok(())
}

#[tauri::command]
fn run_script(zip_path: String, target_dir: String, args: Vec<String>) -> Result<(), String> {
    // Step 1: Unzip the file to the target directory
    if let Err(err) = unzip_file(&zip_path, &target_dir) {
        return Err(format!("Failed to unzip file: {}", err));
    }

    // Step 2: Build the path to the main.py file in the unzipped folder
    let script_path = PathBuf::from(&target_dir).join("python_raven_game/main.py");

    // Check if the file exists
    if !script_path.exists() {
        return Err(format!("main.py not found in the unzipped folder: {:?}", script_path));
    }

    // Step 3: Run the script with the specified arguments
    let output = Command::new("python3")
        .arg(script_path)
        .args(args)
        .output();

    match output {
        Ok(result) => {
            println!("Script execution result: {:?}", result);
            Ok(())
        }
        Err(err) => Err(format!("Failed to execute script: {}", err)),
    }
}



fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet,login,check_folder_exists,save_blob,run_script])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
