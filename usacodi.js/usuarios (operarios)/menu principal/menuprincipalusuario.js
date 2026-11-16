const nuevainformacion= document.getElementById("nuevainformacion");
const Mensajeria=document.getElementById("Mensajeria");
const tareas= document.getElementById("Tareas");
const Busqueda=document.getElementById("Busqueda");
const cerrarsesion=document.getElementById("cerrarsesion");


nuevainformacion.addEventListener("click", function(){window.location.href="nueva_informacion.html"});
Mensajeria.addEventListener("clikc", function(){window.location.href="nueva_informacion.html"})

tareas.addEventListener("click",function(){window.location.href="gestion_tareas.html"})
Busqueda.addEventListener("click",function(){window.location.href="busqueda.html"})


//boton cerrar sesion de usacodi(administrador)
cerrarsesion.addEventListener("click", ()=>{ const usuario=confirm('¿quieres cerrar sesion?');
    if (usuario) {sessionStorage.clear()
        window.location .href="inicio_sesion.html";
    }
    else {console.log('');}
    
});


const btnNotificaciones = document.getElementById("btnNotificaciones");

const panelNotificaciones = document.getElementById("panelNotificaciones");


btnNotificaciones.addEventListener("click", function() {

    if (panelNotificaciones.style.display === "block") {

        panelNotificaciones.style.display = "none";

    } else {

        panelNotificaciones.style.display = "block";

    }

});