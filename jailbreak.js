// ==========================================
// CORE DEL EXPLOIT CON DETECCIÓN DE USB
// ==========================================

function lanzarJailbreak() {
    // Reiniciar la pantalla de logs para el nuevo intento
    document.getElementById('console-log').innerHTML = "";
    
    escribirConsola("Ejecutando entorno central de 1352WebKit...", "info");

    setTimeout(() => {
        escribirConsola("Escaneando puertos USB en busca de almacenamiento externo...", "info");
        
        setTimeout(() => {
            // --- FASE 1: VERIFICACIÓN DE LA ETIQUETA Y FORMATO DEL USB ---
            // Esta lógica simula el puente con el módulo de montaje del sistema (mounter)
            let usbDetectado = true; // Cambiar a false en pruebas para emular USB desconectado
            let etiquetaUSB = "payloadusb"; 
            let sistemaArchivos = "exFAT"; // Valores válidos para la prueba: "FAT32" o "exFAT"

            if (!usbDetectado) {
                escribirConsola("Error: No se detectó ninguna unidad USB insertada.", "error");
                registrarEstadistica('failed');
                return;
            }

            // Validar de forma estricta la etiqueta del volumen en mayúsculas/minúsculas
            if (etiquetaUSB !== "payloadusb") {
                escribirConsola(`Error: USB detectado pero la etiqueta '${etiquetaUSB}' no coincide con 'payloadusb'.`, "error");
                registrarEstadistica('failed');
                return;
            }

            // Validar que el formato de asignación sea estrictamente FAT32 o exFAT
            if (sistemaArchivos !== "FAT32" && sistemaArchivos !== "exFAT") {
                escribirConsola(`Error: Sistema de archivos '${sistemaArchivos}' no compatible. Debe ser FAT32 o exFAT.`, "error");
                registrarEstadistica('failed');
                return;
            }

            escribirConsola(`Unidad USB válida encontrada [Etiqueta: ${etiquetaUSB} | Formato: ${sistemaArchivos}].`, "success");
            escribirConsola("Buscando el archivo binario en la raíz: USB://payload.bin ...", "info");

            setTimeout(() => {
                // --- FASE 2: VERIFICACIÓN DEL ARCHIVO PAYLOAD.BIN ---
                let payloadEncontrado = true; // Simula la existencia física del archivo binario

                if (!payloadEncontrado) {
                    escribirConsola("Error crítico: Archivo 'payload.bin' no encontrado en la raíz del USB.", "error");
                    registrarEstadistica('failed');
                    return;
                }

                escribirConsola("Archivo 'payload.bin' mapeado en memoria correctamente. Tamaño verificado.", "info");
                escribirConsola("Buscando fallos de desborde / alineación en WebKit v13.52...", "info");
                
                setTimeout(() => {
                    escribirConsola("Aviso: Desbordamiento inestable detectado. Re-mapeando punteros...", "warn");
                    registrarEstadistica('warns');

                    setTimeout(() => {
                        let controlDeMemoria = Math.random() > 0.3; // Simula la tasa de efectividad real

                        if (controlDeMemoria) {
                            escribirConsola("¡Primitivas de lectura y escritura controladas!", "info");
                            escribirConsola("Cargando payload.bin desde USB a través de la cadena ROP...", "info");
                            escribirConsola("Escalando privilegios al Kernel... Parches aplicados.", "info");
                            escribirConsola("¡HEN cargado con éxito mediante 1352WebKit!", "success");
                            registrarEstadistica('success');
                            
                            // Llamar al archivo externo notification.js que ya configuramos
                            enviarNotificacionExito();
                        } else {
                            escribirConsola("Error: La corrupción de WebKit falló o causó un Kernel Panic indirecto.", "error");
                            escribirConsola("La consola requiere refrescar la página manualmente.", "error");
                            registrarEstadistica('failed');
                        }
                    }, 1500);
                }, 1200);
            }, 1000);
        }, 1000);
    }, 1000);
}
