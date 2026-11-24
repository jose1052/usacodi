package modelo;

public class Usuario {
    private int id_usuario;
    private String nombres;
    private String apellidos;
    private int edad;
    private String direccion;
    private String correo;
    private String contrasena;
    private String telefono;
    private int id_rol;
    public Usuario(){}

//insertar usuarios(constructor)
 public Usuario( String nombres, String apellidos, int edad, String direccion, String correo, String contrasena, String telefono, int id_rol){
    
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.edad = edad;
    this.direccion = direccion;
    this.correo = correo;
    this.contrasena = contrasena;
    this.telefono = telefono;
    this.id_rol = id_rol;
 }
 //consultar y actualizar usuarios
public Usuario(int id_usuario, String nombres, String apellidos,int edad, String direccion, String correo, String contrasena, String telefono, int id_rol){
    this.id_usuario=id_usuario;
    this.nombres=nombres;
    this.apellidos=apellidos;
    this.edad=edad;
    this.direccion=direccion;
    this.correo=correo;
    this.contrasena=contrasena;
    this.telefono=telefono;
    this.id_rol=id_rol;
}

public  int getId_usuario(){return id_usuario;}
public int getIdUsuario(){return id_usuario;}
public void setIdusuario(int id_usuario){this.id_usuario=id_usuario;}

public String getNombres(){return nombres;}
public void setNombres(String nombres){this.nombres=nombres;}

public String getApellidos(){return apellidos;}
public void setApellidos(String apellidos){this.apellidos=apellidos;}

public int getEdad(){return edad;}
public void setEdad(int edad){this.edad=edad;}

public String getDireccion(){return direccion;}
public void setDireccion(String direccion){this.direccion=direccion;}

public String getCorreo(){return correo;}
public void setCorreo(String correo){this.correo=correo;}

public String getContrasena(){return contrasena;}
public void setContrasena(String contrasena){this.contrasena=contrasena;}

public String getTelefono(){return telefono;}
public void setTelefono(String telefono){this.telefono=telefono;}

public int getId_rol(){return id_rol;}
public void setId_rol(int id_rol){this.id_rol=id_rol;}




}
