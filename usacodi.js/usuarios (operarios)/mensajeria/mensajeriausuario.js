document.addEventListener("DOMContentLoaded", () => {
  const mensajes = document.querySelectorAll(".mensaje");
  const contador = document.getElementById("contadormensajes");
  const btnAtras = document.getElementById("btn-Atras");

  // ---- Contar mensajes automáticamente ----
  contador.textContent = mensajes.length;

  // ---- Asignar fecha a cada mensaje (ejemplo: fecha actual) ----
  mensajes.forEach((mensaje) => {
    const fechaSpan = mensaje.querySelector(".fecha");
    const hoy = new Date().toLocaleDateString("es-ES");
    fechaSpan.textContent = hoy;
  });

  // ---- Botón Atrás ----
  btnAtras.addEventListener("click", () => {
    window.history.back();
  });
});

  // ---- Contar mensajes automáticamente ----
  contador.textContent = mensajes.length;

  // ---- Asignar fecha a cada mensaje (ejemplo: fecha actual) ----
  mensajes.forEach((mensaje) => {
    const fechaSpan = mensaje.querySelector(".fecha");
    const hoy = new Date().toLocaleDateString("es-ES");
    fechaSpan.textContent = hoy;
  });

  // ---- Botón Atrás ----
  const cerrarsesion=document.getElementById("cerrarsesion")
cerrarsesion.addEventListener("click", ()=>{ const usuario=confirm('¿quieres cerrar sesion?');
    if (usuario) {sessionStorage.clear()
        window.location .href="inicio_sesion.html";
    }
    else {console.log('');}
    
});