// ==========================================
// MÓDULO DE NOTIFICACIONES PARA 1352WEBKIT
// ==========================================

function inicializarNotificaciones() {
    // Solicitar permiso de forma segura solo si el navegador lo soporta
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
        // Método de respaldo por si el navegador integrado bloquea las ventanas flotantes
        alert("JAILBREAK LOADED");
    }
}

// Asegurar que la petición se ejecute SOLO cuando todo el HTML esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    inicializarNotificaciones();
});
