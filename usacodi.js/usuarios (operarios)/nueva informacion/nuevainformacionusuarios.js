const btnAtras=document.getElementById("Atras");

btnAtras.addEventListener("click", function() {
    window.location.href="menuprincipalusuario.html";
    
})

//boton cerrar sesion de usacodi(administrador)
const cerrarsesion=document.getElementById("cerrarsesion");
cerrarsesion.addEventListener("click", ()=>{ const usuario=confirm('¿quieres cerrar sesion?');
    if (usuario) {sessionStorage.clear()
        window.location .href="menuprincipalusuario.html";
    }
    else {console.log('');}
    
});

const fecha= new Date  ();
document.getElementById("fecha"). textContent=fecha.toLocaleString();