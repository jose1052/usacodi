import config.Conexion;
import java.sql.Connection;

public class App {
    public static void main(String[] args) 
    {
        Connection conexion = Conexion.conectar();
        if (conexion != null) {
            System.out.println("Conexión exitosa");
        } else {
            System.out.println("Error al conectar a la base de datos");
        }
        
    }
}
