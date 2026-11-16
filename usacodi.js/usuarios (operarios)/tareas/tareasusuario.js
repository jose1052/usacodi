const cerrarsesion=document.getElementById("cerrarsesion");
 cerrarsesion.addEventListener("click", function(){
    const usuario=confirm('¿quiere cerrar sesion?');
    if (usuario) {sessionStorage.clear()
        window.location.href="menuprincipalusuario.html";
        }
    else {
        console.log('');
    }
 });

const listaInformaciones = document.getElementById("listainformaciones");

function agregarVehiculo({ marca, modelo, placa, anio, tipo, fecha }) {
  const nuevaSeccion = document.createElement("div");

  nuevaSeccion.innerHTML = `
    <p>
      marca: ${marca} <br>
      modelo: ${modelo} <br>
      Placa: ${placa} <br>
      Año: ${anio} <br>
      Tipo: ${tipo} <br>
      Fecha de registro: ${fecha} <br>
    </p>
  `;

  listaInformaciones.appendChild(nuevaSeccion);

  // Desplaza automáticamente hacia el nuevo elemento agregado
  nuevaSeccion.scrollIntoView({ behavior: "smooth", block: "end" });
}

// Ejemplo de uso:
agregarVehiculo({
  marca: "Toyota",
  modelo: "Corolla",
  placa: "XYZ123",
  anio: "2023",
  tipo: "Automóvil",
  fecha: "22/09/2024"
});
