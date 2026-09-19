// ==========================================
// MÓDULO DE NOTIFICACIONES PARA 1352WEBKIT
// ==========================================

// Solicitar los permisos necesarios al sistema operativo/navegador de forma automática
function inicializarNotificaciones() {
    if (window.Notification && Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
    }
}

// Función global para disparar la notificación exacta del jailbreak exitoso
function enviarNotificacionExito() {
    if (window.Notification && Notification.permission === "granted") {
        new Notification("1352WebKit", {
            body: "JAILBREAK LOADED",
            icon: "favicon.ico"
        });
    } else {
        // Método de respaldo por si el navegador integrado bloquea ventanas flotantes externas
        alert("JAILBREAK LOADED");
    }
}

// Ejecutar la petición de permisos en cuanto el navegador cargue este script
inicializarNotificaciones();
