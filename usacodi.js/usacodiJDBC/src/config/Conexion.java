package config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexion {
    
    private static final String URL = "jdbc:mysql://localhost:3306/usacodi";
    private static final String USUARIO = "root";
    private static final String CONTRASENA = "Pandita1052.";

    


    public static Connection conectar() {
        Connection conexion = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conexion = DriverManager.getConnection(URL, USUARIO, CONTRASENA);
            System.out.println("¡CONEXIÓN EXITOSA a la base de datos usacodi!");
        } catch (ClassNotFoundException | SQLException e) {
            System.out.println("ERROR de conexión: " + e.getMessage());
        }
        return conexion;


    }
}


