//boton cerrar sesion de usacodi(administrador)


// variables constantes de la notificacion
const btnNotificaciones = document.getElementById("btnNotificaciones");

const panelNotificaciones = document.getElementById("panelNotificaciones");


btnNotificaciones.addEventListener("click", function() {

    if (panelNotificaciones.style.display === "block") {

        panelNotificaciones.style.display = "none";


    } 
    else if (cantidad>=1){



    }
    
    else {

        panelNotificaciones.style.display = "block";

    }
    

});
function togglePanel(idPanel) {
    // Ocultar todos los formularios flotantes primero para que no se superpongan
    document.querySelectorAll('.formulario-flotante').forEach(p => p.style.display = 'none');
    
    // Mostrar el panel solicitado
    const panelAAbrir = document.getElementById(idPanel);
    if (panelAAbrir) {
        panelAAbrir.style.display = 'block';
    }
}


// codigo para cada boton del menu.
function togglePanel(idDelPanelFormulario) {
    // Esta lista debe tener exactamente los mismos IDs que pusimos en los DIVs del HTML
    const paneles = [
        'miInformacion', 
        'mensaje', 
        'gestionusuario', 
        'gestiontareas', 
        'busqueda', 
        'configuracion'
    ];

    const panelObjetivo = document.getElementById(idDelPanelFormulario);

    // Si el panel que tocamos ya está abierto, lo ocultamos y cerramos la función
    if (panelObjetivo && panelObjetivo.style.display === "block") {
        panelObjetivo.style.display = "none";
        return; 
    }

    // Oculto todos los paneles obligatoriamente para limpiar la pantalla por completo
    paneles.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.style.display = "none";
        }
    });

    // Abro únicamente el panel que corresponde al botón presionado
    if (panelObjetivo) {
        panelObjetivo.style.display = "block";
    }
}
//otro chats
function cambiarChat(idPersonal) {
    // 1. Buscamos el menú desplegable de destinatarios
    const selectDestinatario = document.getElementById('tipo');
    
    // 2. Cambiamos su valor al ID del usuario seleccionado
    selectDestinatario.value = idPersonal;
    
    // 3. Opcional: Podrías limpiar el textarea para escribir un mensaje nuevo
    document.getElementById('descripcion').value = '';
    
    console.log("Cambiado al chat de: " + idPersonal);
}
// Lógica para renderizar los globos de texto
function mostrarHistorial(idPersonal) {
    const contenedorHistorial = document.getElementById('historialChat');
    contenedorHistorial.innerHTML = ''; // Limpiar mensajes anteriores

    // Si el usuario no tiene mensajes o no es válido
    if (!idPersonal || !mensajesBD[idPersonal] || mensajesBD[idPersonal].length === 0) {
        contenedorHistorial.innerHTML = '<p class="chat-vacio">No hay mensajes previos en esta conversación.</p>';
        return;
    }

    // Recorrer los mensajes e insertarlos en el contenedor HTML
    mensajesBD[idPersonal].forEach(msg => {
        const msgDiv = document.createElement('div');
        
        // Asignar clase diferente si el mensaje es tuyo o de la otra persona
        const esMio = msg.remitente === "Tú";
        msgDiv.className = `globo-mensaje ${esMio ? 'mensaje-mio' : 'mensaje-otro'}`;
        
        msgDiv.innerHTML = `
            <span class="autor">${msg.remitente}</span>
            <p class="texto">${msg.texto}</p>
            <span class="hora">${msg.fecha}</span>
        `;
        contenedorHistorial.appendChild(msgDiv);
    });

    // Auto-scroll al final del chat para ver los últimos mensajes
    contenedorHistorial.scrollTop = contenedorHistorial.scrollHeight;
}

// Función por si el usuario cambia el destinatario usando el menú desplegable en vez de los botones inferiores
function cargarHistorialDesdeSelect() {
    const idSeleccionado = document.getElementById('tipo').value;
    mostrarHistorial(idSeleccionado);
    resaltarChatActivo(idSeleccionado);
}

// Aplica una clase CSS para saber qué chat está seleccionado abajo
function resaltarChatActivo(idPersonal) {
    // Quitar la clase activa de todos los botones primero
    document.querySelectorAll('.chat-item').forEach(btn => btn.classList.remove('activo'));
    
    // Añadirla solo al seleccionado si existe en la lista de abajo
    const botonActivo = document.getElementById(`btn-${idPersonal}`);
    if (botonActivo) {
        botonActivo.classList.add('activo');
    }
}
/* FECHA Y HORA DE LOS MENSAJES*/
document.getElementById('form-mensaje').addEventListener('submit', function(event) {
    // 1. Evitar que la página se recargue (comportamiento por defecto del formulario)
    event.preventDefault();

    const selectDestinatario = document.getElementById('tipo');
    const textareaDescripcion = document.getElementById('descripcion');
    const historialChat = document.getElementById('historialChat');

    // Validar que se haya seleccionado un destinatario y que el mensaje no esté vacío
    if (selectDestinatario.value === "") {
        alert("Por favor, seleccione un destinatario.");
        return;
    }
    if (textareaDescripcion.value.trim() === "") {
        alert("Por favor, escriba un mensaje.");
        return;
    }

    // 2. Obtener y formatear la fecha y hora actual
    const ahora = new Date();
    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    const fechaHoraFormateada = ahora.toLocaleString('es-ES', opciones);

    // Si es el primer mensaje, limpiamos el texto de "Selecciona un chat..."
    const chatVacio = historialChat.querySelector('.chat-vacio');
    if (chatVacio) {
        historialChat.innerHTML = ''; 
    }

    // 3. Crear el nuevo elemento del mensaje
    const nuevoMensajeDiv = document.createElement('div');
    nuevoMensajeDiv.className = 'mensaje-enviado'; 

    // 4. Insertar el contenido (Texto del textarea + Fecha/Hora)
    nuevoMensajeDiv.innerHTML = `
        <div class="contenido-texto">${textareaDescripcion.value}</div>
        <span class="fecha-hora-chat">${fechaHoraFormateada}</span>
    `;

    // 5. Agregar el mensaje al contenedor visual
    historialChat.appendChild(nuevoMensajeDiv);

    // 6. Limpiar el campo de texto para el próximo mensaje
    textareaDescripcion.value = '';

    // Hacer scroll automático hacia abajo para ver el último mensaje
    historialChat.scrollTop = historialChat.scrollHeight;
});
// CUANDO EL BOTON CANCELAR DE MENSAJE ES PRESIONADO.
// 1. Pausa el envío/cierre y despliega la alerta en pantalla
function mostrarAlertaCancelarMensaje() {
    document.getElementById('mensaje').style.display = 'none';
    document.getElementById('panelAlertaCancelarMensaje').style.display = 'block';
}

// 2. Si se arrepiente, vuelve a la ventana del mensaje tal como estaba
function cerrarAlertaCancelarMensaje() {
    document.getElementById('panelAlertaCancelarMensaje').style.display = 'none';
    document.getElementById('mensaje').style.display = 'block';
}

// 3. Si confirma, limpia los campos de escritura y vuelve al menú principal
function confirmarCancelacionMensaje() {
    // Resetea el formulario (Limpia el select, el textarea de descripción y el input file)
    document.getElementById('form-mensaje').reset();
    
    // Opcional: Si quieres restaurar el texto por defecto en el historial del chat
    document.getElementById('historialChat').innerHTML = '<p class="chat-vacio">Selecciona un chat para ver los mensajes anteriores</p>';

    // Oculta la alerta
    document.getElementById('panelAlertaCancelarMensaje').style.display = 'none';
    
    // Ejecuta tu función del sistema para cerrar paneles de forma definitiva
    togglePanel(''); 
    
    console.log("Mensaje cancelado. Formulario limpio y redirigido al menú.");
}

//NUEVA INFORMACION
// FECHA Y HORA CUANDO SE GARGA UNA NUEVA INFORMACION

document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Detiene la recarga automática de la página

    // 1. CAPTURAR LOS ELEMENTOS DEL DOM Y SUS VALORES
    const marca = document.getElementById('marca').value;
    // CORREGIDO: Buscamos el elemento tal como está en el HTML id="Modelo"
    const modelo = document.getElementById('Modelo').value; 
    const anio = document.getElementById('anio').value;
    const tipo = document.getElementById('Tipo').value;
    const placa = document.getElementById('Placa').value;
    
    const inputFoto = document.getElementById('foto');
    const imagenResumen = document.getElementById('resumenFoto');

    // Validación básica para evitar envíos vacíos
    if (!marca || !modelo || !placa) {
        alert("Por favor, complete los campos obligatorios (Marca, Modelo y Placa).");
        return;
    }

    // 2. OBTENER Y FORMATEAR LA FECHA ACTUAL
    const ahora = new Date();
    
    // Formato Humano para el Panel de Resumen (DD/MM/AAAA HH:MM:SS)
    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const fechaHoraHumana = ahora.toLocaleString('es-ES', opciones);

    // Formato Estándar ISO para tu Base de Datos SQL (YYYY-MM-DD HH:MM:SS)
    const timestampSQL = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')} ${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}:${String(ahora.getSeconds()).padStart(2, '0')}`;
    
    // Inyectamos el valor en el input hidden si existe
    const inputFecha = document.getElementById('fecha_registro');
    if (inputFecha) inputFecha.value = timestampSQL;

    // 3. CREAR EL PAQUETE FORMDATA CON LLAVES EN MINÚSCULAS
    const formData = new FormData();
    formData.append('marca', marca);
    formData.append('modelo', modelo); // CORREGIDO: 'modelo' en minúscula para el backend
    formData.append('anio', anio);
    formData.append('tipo', tipo);     // CORREGIDO: 'tipo' en minúscula
    formData.append('placa', placa);   // CORREGIDO: 'placa' en minúscula
    formData.append('fecha_registro', timestampSQL);
    
    // Adjuntar el archivo físico de la foto si existe
    if (inputFoto.files && inputFoto.files[0]) {
        formData.append('foto', inputFoto.files[0]);
    }

    // 4. ENVÍO REAL MEDIANTE FETCH AL SERVIDOR
    fetch('http://localhost:3000/api/vehiculo', {
        method: 'POST',
        body: formData // Enviamos el FormData directamente (sin headers de Content-Type)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("El servidor respondió con un error técnico.");
        }
        return response.json();
    })
    .then(data => {
        console.log("Respuesta del servidor backend:", data);
        
        // 5. ACCIÓN VISUAL: Si el servidor guardó con éxito, pintamos y mostramos el panel único
        if (data.status === "success" || data.status === "success") {
            
            // Inyectar los datos de texto en el Panel de Resumen
            document.getElementById('resumenFecha').innerText = fechaHoraHumana;
            document.getElementById('resumenMarca').innerText = marca;
            document.getElementById('resumenModelo').innerText = modelo;
            document.getElementById('resumenAnio').innerText = anio;
            document.getElementById('resumenTipo').innerText = tipo;
            document.getElementById('resumenPlaca').innerText = placa;

            // Lógica para leer y procesar la foto subida en la vista previa del resumen
            if (inputFoto.files && inputFoto.files[0]) {
                const lector = new FileReader();

                lector.onload = function(e) {
                    imagenResumen.src = e.target.result; // Asigna la imagen leída al atributo src
                    imagenResumen.style.display = 'block'; // Hace visible la imagen
                }

                lector.readAsDataURL(inputFoto.files[0]); // Convierte el archivo a una cadena Base64
            } else {
                imagenResumen.style.display = 'none'; // Si no subió foto, oculta el elemento de imagen
                imagenResumen.src = '';
            }

            // Intercambio de paneles visuales
            document.getElementById('miInformacion').style.display = 'none'; 
            document.getElementById('panelResumen').style.display = 'block'; 
        }
    })
    .catch(error => {
        console.error("Error al conectar con el backend:", error);
        alert("No se pudo conectar con el servidor backend. Revisa que 'node server.js' esté activo.");
    });
});



//GESTION DE USUARIOS
// ==========================================

document.getElementById('form-usuario').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nombres', document.getElementById('nombres').value);
    formData.append('apellidos', document.getElementById('apellidos').value);
    formData.append('Correo', document.getElementById('Correo').value);
    formData.append('cargo', document.getElementById('cargo').value);
    formData.append('rol', document.getElementById('rol').value);

    const inputFotoPerfil = document.getElementById('foto-perfil');
    if (inputFotoPerfil.files[0]) {
        formData.append('foto-perfil', inputFotoPerfil.files[0]);
    }

    fetch('http://localhost:3000/api/usuario', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Usuario registrado:", data);
        if (data.status === "success") {
            // Llama aquí a tu panel de notificación verde/azul/rojo que creamos
        }
    })
    .catch(error => console.error("Error:", error));
});


function mostrarAlertaCancelarUsuario(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation(); // Congela cualquier comportamiento de la plantilla
    }
    document.getElementById('wrapperFormUsuario').style.display = 'none';
    document.getElementById('panelAlertaCancelarUsuario').style.display = 'block';
}

function cerrarAlertaCancelarUsuario() {
    document.getElementById('panelAlertaCancelarUsuario').style.display = 'none';
    document.getElementById('wrapperFormUsuario').style.display = 'block';
}

function confirmarCancelacionUsuario() {
    document.getElementById('form-usuario').reset();
    document.getElementById('cedula-buscar').value = "";
    document.getElementById('cedula-eliminar').value = "";
    
    document.getElementById('panelAlertaCancelarUsuario').style.display = 'none';
    document.getElementById('wrapperFormUsuario').style.display = 'block';
    
    togglePanel(''); // Recién aquí cerramos de forma global
}

// ==========================================
// ACCIONES DE CREAR, EDITAR Y ELIMINAR
// ==========================================

// Al presionar Guardar (Crear o Actualizar)
document.getElementById('form-usuario').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const cargo = document.getElementById('cargo').value;
    const rol = document.getElementById('rol').value;
    const inputFoto = document.getElementById('foto-perfil');

    if (!nombres || !apellidos) {
        alert("Por favor, complete los datos básicos del usuario.");
        return;
    }

    const esEdicion = document.getElementById('cedula-buscar').value !== "";
    const tipoAccion = esEdicion ? 'editar' : 'crear';
    const mensaje = esEdicion 
        ? `El usuario con cédula ${document.getElementById('cedula-buscar').value} ha sido actualizado correctamente.`
        : `El usuario ha sido registrado en el sistema con éxito.`;

    mostrarPanelNotificacion(tipoAccion, mensaje, `${nombres} ${apellidos}`, `${cargo} / ${rol}`, inputFoto);
});

// Al presionar Eliminar
function eliminarUsuarioPorCedula() {
    const cedula = document.getElementById('cedula-eliminar').value;
    if (!cedula) {
        alert("Ingrese una cédula para eliminar.");
        return;
    }

    const mensaje = `El usuario con cédula número ${cedula} fue removido del sistema de forma permanente.`;
    mostrarPanelNotificacion('eliminar', mensaje);
}

// ==========================================
// PROCESAMIENTO DINÁMICO DEL PANEL ÚNICO
// ==========================================
function mostrarPanelNotificacion(accion, mensaje, usuario = "", cargoRol = "", inputFoto = null) {
    const ahora = new Date();
    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const fechaHora = ahora.toLocaleString('es-ES', opciones);
    
    const panel = document.getElementById('panelNotificacion');
    const icono = document.getElementById('notificacionIcono');
    const titulo = document.getElementById('notificacionTitulo');
    const txtMensaje = document.getElementById('notificacionMensaje');
    const detalles = document.getElementById('notificacionDetalles');
    const contenedorFoto = document.getElementById('contenedorFotoPerfil');
    const imgPerfil = document.getElementById('notifFotoPerfil');

    panel.className = "panel-notificacion";
    
    if (accion === 'crear') {
        panel.classList.add('notif-verde');
        icono.innerHTML = "👤✅";
        titulo.innerText = "Usuario Creado";
        detalles.style.display = "block";
        document.getElementById('notifNombreCompleto').innerText = usuario;
        document.getElementById('notifCargoRol').innerText = cargoRol;
    } 
    else if (accion === 'editar') {
        panel.classList.add('notif-azul');
        icono.innerHTML = "🔄";
        titulo.innerText = "Usuario Actualizado";
        detalles.style.display = "block";
        document.getElementById('notifNombreCompleto').innerText = usuario;
        document.getElementById('notifCargoRol').innerText = cargoRol;
    } 
    else if (accion === 'eliminar') {
        panel.classList.add('notif-rojo');
        icono.innerHTML = "🗑️❌";
        titulo.innerText = "Usuario Eliminado";
        detalles.style.display = "none";
        contenedorFoto.style.display = "none";
    }

    // Procesar Foto de Perfil si aplica (Crear / Editar)
    if ((accion === 'crear' || accion === 'editar') && inputFoto && inputFoto.files && inputFoto.files[0]) {
        const lector = new FileReader();
        lector.onload = function(e) {
            imgPerfil.src = e.target.result;
            contenedorFoto.style.display = "block";
        }
        lector.readAsDataURL(inputFoto.files[0]);
    } else {
        contenedorFoto.style.display = "none";
        imgPerfil.src = "";
    }

    document.getElementById('notificacionFecha').innerText = fechaHora;
    txtMensaje.innerText = mensaje;

    document.getElementById('gestionusuario').style.display = 'none';
    panel.style.display = 'block';
}

function cerrarNotificacion() {
    document.getElementById('panelNotificacion').style.display = 'none';
    document.getElementById('form-usuario').reset();
    document.getElementById('cedula-buscar').value = "";
    document.getElementById('cedula-eliminar').value = "";
    document.getElementById('notifFotoPerfil').src = "";
    document.getElementById('contenedorFotoPerfil').style.display = "none";
    
    document.getElementById('gestionusuario').style.display = 'block';
}

/*GESTION DE TAREAS */
// ==========================================

document.getElementById('formulariotareas').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('tipo', document.getElementById('destinatario-tarea').value);
    formData.append('prioridad', document.getElementById('prioridad').value);
    formData.append('titulo', document.getElementById('titulo').value);
    formData.append('descripcion', document.getElementById('descripcion-tarea').value);

    const inputFotoTarea = document.getElementById('foto-tarea');
    if (inputFotoTarea.files[0]) {
        formData.append('foto-tarea', inputFotoTarea.files[0]);
    }

    fetch('http://localhost:3000/api/tarea', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Tarea enviada al backend:", data);
        if (data.status === "success") {
            // Llama aquí a tu panel único de notificación de tareas
        }
    })
    .catch(error => console.error("Error:", error));
});



function mostrarAlertaCancelarTarea(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation(); // Congela eventos automáticos del framework o plantilla
    }
    document.getElementById('wrapperFormTareas').style.display = 'none';
    document.getElementById('panelAlertaCancelarTarea').style.display = 'block';
}

function cerrarAlertaCancelarTarea() {
    document.getElementById('panelAlertaCancelarTarea').style.display = 'none';
    document.getElementById('wrapperFormTareas').style.display = 'block';
}

function confirmarCancelacionTarea() {
    // Resetea todos los campos del formulario
    document.getElementById('formulariotareas').reset();
    
    // Cierra la alerta y reestablece los wrappers internos
    document.getElementById('panelAlertaCancelarTarea').style.display = 'none';
    document.getElementById('wrapperFormTareas').style.display = 'block';
    
    // Cerramos el contenedor global mediante tu función base
    togglePanel('');
}

// ==========================================
// CONTROL DE ENVÍO Y GENERACIÓN DE RESUMEN
// ==========================================
document.getElementById('formulariotareas').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita recarga de página

    const selectDestinatario = document.getElementById('destinatario-tarea');
    const destinatarioTexto = selectDestinatario.options[selectDestinatario.selectedIndex].text;
    const prioridad = document.getElementById('prioridad').value;
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion-tarea').value;
    const inputFoto = document.getElementById('foto-tarea');

    // Validación de campos obligatorios
    if (selectDestinatario.value === "" || !titulo.trim() || !descripcion.trim()) {
        alert("Por favor, complete los campos obligatorios (Destinatario, Título y Descripción).");
        return;
    }

    // Calcular estampa de tiempo actual
    const ahora = new Date();
    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const fechaHora = ahora.toLocaleString('es-ES', opciones);

    // Inyectar datos planos en el panel único de éxito
    document.getElementById('notifTareaFecha').innerText = fechaHora;
    document.getElementById('notifTareaTitulo').innerText = titulo;
    document.getElementById('notifTareaDestinatario').innerText = destinatarioTexto;
    document.getElementById('notifTareaPrioridad').innerText = prioridad.toUpperCase();
    document.getElementById('notifTareaDesc').innerText = descripcion;

    // Procesamiento y previsualización de la foto cargada
    const contenedorFoto = document.getElementById('contenedorFotoTarea');
    const imgElemento = document.getElementById('notifFotoTarea');

    if (inputFoto.files && inputFoto.files[0]) {
        const lector = new FileReader();
        lector.onload = function(e) {
            imgElemento.src = e.target.result;
            contenedorFoto.style.display = "block";
        }
        lector.readAsDataURL(inputFoto.files[0]);
    } else {
        contenedorFoto.style.display = "none";
        imgElemento.src = "";
    }

    // Intercambio dinámico de pantallas
    document.getElementById('gestiontareas').style.display = 'none';
    document.getElementById('panelNotifTarea').style.display = 'block';
});

// Cierre del resumen de éxito
function cerrarNotificacionTarea() {
    document.getElementById('panelNotifTarea').style.display = 'none';
    document.getElementById('formulariotareas').reset();
    
    // Limpieza física del elemento img
    document.getElementById('notifFotoTarea').src = "";
    document.getElementById('contenedorFotoTarea').style.display = "none";
    
    // Deja el formulario de tareas activo e inicializado para el próximo uso
    document.getElementById('gestiontareas').style.display = 'block';
}

/* CONFIGURACION*/
// ==========================================

function mostrarAlertaCancelarConfig(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation(); // Evita que la plantilla cierre el panel de manera automática
    }
    document.getElementById('wrapperFormConfig').style.display = 'none';
    document.getElementById('panelAlertaCancelarConfig').style.display = 'block';
}

function cerrarAlertaCancelarConfig() {
    document.getElementById('panelAlertaCancelarConfig').style.display = 'none';
    document.getElementById('wrapperFormConfig').style.display = 'block';
}

function confirmarCancelacionConfig() {
    // Reestablece los elementos internos al estado original
    document.getElementById('panelAlertaCancelarConfig').style.display = 'none';
    document.getElementById('wrapperFormConfig').style.display = 'block';
    
    // Ejecuta tu función base del sistema para apagar el contenedor de forma limpia
    togglePanel('');
}

// ==========================================
// GUARDAR Y APLICAR CAMBIOS VISUALES
// ==========================================
function guardarConfiguracion() {
    const colorSeleccionado = document.getElementById('colortema').value;
    const fuenteSeleccionada = document.getElementById('fuente').value;

    // --- ACCIÓN EN TIEMPO REAL ---
    // Aplica la fuente elegida a todo el cuerpo de la página
    document.body.style.fontFamily = fuenteSeleccionada;
    
    // (Opcional) Cambia una variable CSS o el color de fondo de los botones principales como muestra:
    console.log(`Aplicando tema visual: Color ${colorSeleccionado} y Fuente ${fuenteSeleccionada}`);

    // Calcular estampa de tiempo actual
    const ahora = new Date();
    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const fechaHora = ahora.toLocaleString('es-ES', opciones);

    // Inyectar marca de tiempo en la notificación
    document.getElementById('notifConfigFecha').innerText = fechaHora;

    // Intercambio dinámico de pantallas
    document.getElementById('configuracion').style.display = 'none';
    document.getElementById('panelNotifConfig').style.display = 'block';
}

// Cierre del resumen de éxito
function cerrarNotificacionConfig() {
    document.getElementById('panelNotifConfig').style.display = 'none';
    
    // Deja el panel de configuración activo en su estado normal para futuras modificaciones
    document.getElementById('configuracion').style.display = 'block';
}


// ==========================================
// CONTROL DE CIERRE DE SESIÓN
// ==========================================
function mostrarAlertaCerrarSesion() {
    var overlay = document.getElementById("panelAlertaCerrarSesion");
    overlay.classList.add("activo");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-abierto");
}

function cerrarAlertaCerrarSesion() {
    var overlay = document.getElementById("panelAlertaCerrarSesion");
    overlay.classList.remove("activo");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-abierto");
}

function confirmarCierreSesion() {
    window.location.href = "inicio_sesion.html";
}

document.getElementById("panelAlertaCerrarSesion").addEventListener("click", function (evento) {
    if (evento.target === this) {
        cerrarAlertaCerrarSesion();
    }
});

document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
        var overlay = document.getElementById("panelAlertaCerrarSesion");
        if (overlay.classList.contains("activo")) {
            cerrarAlertaCerrarSesion();
        }
    }
});






















/* Simulación de base de datos de usuarios*/    
let usuariosBD = {
    "123456": { nombres: "Carlos", apellidos: "Mendoza", correo: "carlos@correo.com", cargo: "Desarrollador", rol: "Admin" },
    "789012": { nombres: "Diana", apellidos: "Gómez", correo: "diana@correo.com", cargo: "Diseñadora", rol: "Editor" }
};  

// --- FUNCIÓN 1: BUSCAR Y RELLENAR PARA EDITAR ---
function buscarYEditarUsuario() {
    const cedula = document.getElementById('cedula-buscar').value.trim();
    
    if (cedula === "") {
        alert("Por favor, digite un número de cédula.");
        return;
    }

    const usuario = usuariosBD[cedula];

    if (usuario) {
        // Rellenar automáticamente los inputs principales del formulario superior
        document.getElementById('nombres').value = usuario.nombres;
        document.getElementById('apellidos').value = usuario.apellidos;
        document.getElementById('Correo').value = usuario.correo;
        document.getElementById('cargo').value = usuario.cargo;
        document.getElementById('rol').value = usuario.rol;
        
        alert(`Usuario ${usuario.nombres} encontrado. Ahora puede editar sus datos arriba.`);
    } else {
        alert("No se encontró ningún usuario con esa cédula.");
        limpiarFormularioUsuario();
    }
}

// --- FUNCIÓN 2: ELIMINAR CON CONFIRMACIÓN ---
function eliminarUsuarioPorCedula() {
    const cedula = document.getElementById('cedula-eliminar').value.trim();

    if (cedula === "") {
        alert("Por favor, digite la cédula del usuario que desea eliminar.");
        return;
    }

    const usuario = usuariosBD[cedula];

    if (usuario) {
        // Ventana de confirmación del navegador para evitar accidentes
        const confirmar = confirm(`¿Está completamente seguro de eliminar al usuario ${usuario.nombres} ${usuario.apellidos}? Esta acción no se puede deshacer.`);
        
        if (confirmar) {
            delete usuariosBD[cedula]; // Elimina el registro del objeto
            alert("Usuario eliminado correctamente.");
            
            // Si los datos del usuario eliminado estaban cargados arriba, limpiamos el formulario
            limpiarFormularioUsuario();
            document.getElementById('cedula-eliminar').value = "";
        }
    } else {
        alert("No existe ningún usuario registrado con ese número de cédula.");
    }
}

// Función auxiliar para vaciar los campos del formulario
function limpiarFormularioUsuario() {
    document.getElementById('nombres').value = "";
    document.getElementById('apellidos').value = "";
    document.getElementById('Correo').value = "";
    document.getElementById('cargo').value = "";
    document.getElementById('rol').value = "";
}




// 1. Base de datos simulada global
// Base de datos simulada - No interfiere con el menú
const baseDatosVehiculos = [
    { 
        placa: "ABC123", 
        marca: "Toyota", 
        modelo: "Corolla", 
        anio: 2022, 
        color: "Gris Platino",
        propietario: "Juan Pérez Gómez",
        seguro: "Seguros Alfa - Activo",
        historial: "Mantenimiento al día. Sin multas pendientes."
    },
    { 
        placa: "XYZ789", 
        marca: "Chevrolet", 
        modelo: "Onix", 
        anio: 2020, 
        color: "Blanco",
        propietario: "María Rodríguez",
        seguro: "SURA - Vencido",
        historial: "Pendiente revisión técnico-mecánica."
    }
];

// Función de búsqueda aislada - Ejecuta el scroll de forma segura
function simularBusquedaPlaca() {
    const inputBuscar = document.getElementById('buscar');
    const contenedorResultado = document.getElementById('resultado');

    if (!inputBuscar || !contenedorResultado) return;

    const placaBuscada = inputBuscar.value.trim().toUpperCase();

    if (placaBuscada.length !== 6) {
        alert("⚠️ La placa debe tener exactamente 6 caracteres.");
        contenedorResultado.innerHTML = ""; 
        return;
    }

    const vehiculoEncontrado = baseDatosVehiculos.find(v => v.placa === placaBuscada);

    if (vehiculoEncontrado) {
        // Forzar contenedor con dimensiones de scroll sin tocar otras vistas
        contenedorResultado.style.display = "block";
        contenedorResultado.style.maxHeight = "110px";
        contenedorResultado.style.overflowY = "auto";
        contenedorResultado.style.marginBottom = "15px";
        contenedorResultado.style.borderRadius = "5px";

        contenedorResultado.innerHTML = `
            <div style="background: #e2f0d9; padding: 10px; border: 1px solid #385723; color: #2e4d1e; text-align: left; font-size: 13px; line-height: 1.4;">
                <p style="margin: 2px 0;"><strong>Placa:</strong> ${vehiculoEncontrado.placa}</p>
                <p style="margin: 2px 0;"><strong>Marca:</strong> ${vehiculoEncontrado.marca}</p>
                <p style="margin: 2px 0;"><strong>Modelo:</strong> ${vehiculoEncontrado.modelo}</p>
                <p style="margin: 2px 0;"><strong>Año:</strong> ${vehiculoEncontrado.anio}</p>
                <p style="margin: 2px 0;"><strong>Color:</strong> ${vehiculoEncontrado.color}</p>
                <p style="margin: 2px 0;"><strong>Propietario:</strong> ${vehiculoEncontrado.propietario}</p>
                <p style="margin: 2px 0;"><strong>Seguro:</strong> ${vehiculoEncontrado.seguro}</p>
                <p style="margin: 2px 0;"><strong>Historial:</strong> ${vehiculoEncontrado.historial}</p>
            </div>
        `;
    } else {
        contenedorResultado.innerHTML = ""; 
        alert(`❌ Error: La placa "${placaBuscada}" no se encuentra registrada en el sistema.`);
    }
}
