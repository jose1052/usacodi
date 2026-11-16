let control= 0;
    let contrasena= "12345";
  
    
  
    function verificar(){
        let clave=document.getElementById("contrasena").value;
        if (clave != contrasena|| clave==""){
            alert('USUARIO O CLAVE INCORRECTA');
         control ++ ;
        if (control >= 3){
            alert  ("numero de intentos agotados, contatcte a soporte.");
        }
    }
        else{
            window.open("https://www.google.com/?hl=es");
        }
           
        };