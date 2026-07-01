#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            #[cfg(target_os = "linux")]
            install_desktop_entry(app);
            let _ = app;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[cfg(target_os = "linux")]
fn install_desktop_entry(app: &tauri::App) {
    use std::fs;
    use std::path::PathBuf;

    let app_id = app.config().identifier.clone();
    let name = app
        .config()
        .product_name
        .clone()
        .unwrap_or_else(|| app_id.clone());

    let Ok(exe) = std::env::current_exe() else {
        return;
    };

    let system_dirs = std::env::var_os("XDG_DATA_DIRS")
        .filter(|v| !v.is_empty())
        .unwrap_or_else(|| "/usr/local/share:/usr/share".into());
    let installed_system_wide = std::env::split_paths(&system_dirs).any(|dir| {
        dir.join("applications")
            .join(format!("{app_id}.desktop"))
            .exists()
    });
    if installed_system_wide {
        return;
    }

    let data_home = std::env::var_os("XDG_DATA_HOME")
        .filter(|v| !v.is_empty())
        .map(PathBuf::from)
        .or_else(|| std::env::var_os("HOME").map(|h| PathBuf::from(h).join(".local/share")));
    let Some(data_home) = data_home else {
        return;
    };

    const ICON: &[u8] = include_bytes!("../icons/128x128.png");
    let icon_dir = data_home.join("icons/hicolor/128x128/apps");
    let icon_path = icon_dir.join(format!("{app_id}.png"));
    if !icon_path.exists() {
        let _ = fs::create_dir_all(&icon_dir);
        let _ = fs::write(&icon_path, ICON);
    }

    let exe = exe
        .display()
        .to_string()
        .replace('\\', "\\\\")
        .replace('"', "\\\"")
        .replace('`', "\\`")
        .replace('$', "\\$");

    let desktop = format!(
        "[Desktop Entry]\n\
         Type=Application\n\
         Name={name}\n\
         Exec=\"{exe}\"\n\
         Icon={app_id}\n\
         StartupWMClass={app_id}\n\
         Terminal=false\n\
         Categories=Utility;\n",
    );
    let apps_dir = data_home.join("applications");
    let desktop_path = apps_dir.join(format!("{app_id}.desktop"));

    if fs::read_to_string(&desktop_path).ok().as_deref() != Some(desktop.as_str()) {
        let _ = fs::create_dir_all(&apps_dir);
        let _ = fs::write(&desktop_path, desktop);
    }
}
