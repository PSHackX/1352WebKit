// ==========================================
// CONFIGURACIÓN DE CONTADORES ESTADÍSTICOS
// ==========================================

let jbStats1352 = {
    success: parseInt(localStorage.getItem('1352wk_success')) || 0,
    failed: parseInt(localStorage.getItem('1352wk_failed')) || 0,
    warns: parseInt(localStorage.getItem('1352wk_warns')) || 0
};

function refrescarContadores() {
    document.getElementById('count-success').innerText = jbStats1352.success;
    document.getElementById('count-failed').innerText = jbStats1352.failed;
    document.getElementById('count-warns').innerText = jbStats1352.warns;
}

function registrarEstadistica(categoria) {
    jbStats1352[categoria]++;
    localStorage.setItem(`1352wk_${categoria}`, jbStats1352[categoria]);
    refrescarContadores();
}

function escribirConsola(texto, tipo = 'info') {
    const terminal = document.getElementById('console-log');
    let colorHex = '#b2ccd6';

    if (tipo === 'warn') colorHex = '#ffd740';
    if (tipo === 'error') colorHex = '#ff5252';
    if (tipo === 'success') colorHex = '#00e676';

    terminal.innerHTML += `[<span style="color:${colorHex}">${tipo.toUpperCase()}</span>] ${texto}<br>`;
    terminal.scrollTop = terminal.scrollHeight;
}

window.onload = function() {
    refrescarContadores();
};

// ==========================================
// CORE DEL EXPLOIT (Estructura WebKit + ROP)
// ==========================================

function lanzarJailbreak() {
    document.getElementById('console-log').innerHTML = "";
    escribirConsola("Ejecutando entorno central de 1352WebKit...", "info");

    // Simulación estructurada del exploit real
    setTimeout(() => {
        escribirConsola("Buscando fallos de desborde / alineación en WebKit...", "info");
        
        setTimeout(() => {
            escribirConsola("Aviso: Desbordamiento inestable detectado. Re-mapeando punteros...", "warn");
            registrarEstadistica('warns');

            setTimeout(() => {
                let controlDeMemoria = Math.random() > 0.4; 

                if (controlDeMemoria) {
                    escribirConsola("¡Primitivas de lectura y escritura controladas!", "info");
                    escribirConsola("Inyectando cadena ROP... Escalando privilegios al Kernel.", "info");
                    escribirConsola("¡HEN cargado con éxito mediante 1352WebKit!", "success");
                    registrarEstadistica('success');
                    
                    // LLAMADA AL MÓDULO EXTERNO DE NOTIFICACIÓN
                    enviarNotificacionExito();
                } else {
                    escribirConsola("Error: La corrupción de WebKit falló o causó un desbordamiento fuera de rango.", "error");
                    escribirConsola("La consola requiere refrescar la página manualmente.", "error");
                    registrarEstadistica('failed');
                }
            }, 1500);
        }, 1200);
    }, 1000);
}
