#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn mobile() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
