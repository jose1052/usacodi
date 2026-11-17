package principal;

import dao.UsuarioDAO;
import java.util.List;
import modelo.Usuario;

public class Main {
    public static void main(String[] args) {
        UsuarioDAO usuarioDao = new UsuarioDAO();
        int ultimoId = 0;
//insercion de usuario a la tabala de usuarios
        System.out.println("=== 1. INSERTANDO USUARIO ===");
        Usuario nuevo = new Usuario("jennifer", "pedraza", 38, "Calle 105 # 40-30", "jpedraza45@gmail.com", "154869", "3205986887", 1);
        if (usuarioDao.insertarUsuario(nuevo)) {
            System.out.println("Usuario insertado correctamente.");
        }
// consulta del usuario dentro de la tabla usuarios
        System.out.println("\n=== 2. CONSULTANDO USUARIOS ===");
        List<Usuario> lista = usuarioDao.consultarUsuarios();
        for (Usuario u : lista) {
            System.out.println("ID: " + u.getIdUsuario() + " | Nombre: " + u.getNombres() + " " + u.getApellidos() + " | Correo: " + u.getCorreo());
            ultimoId = u.getIdUsuario();
        }

        //  ACTUALIZACIÓN
        if (ultimoId > 3) {
            System.out.println("\n=== 3. ACTUALIZANDO USUARIO ID " + ultimoId + " ===");
            Usuario editar = new Usuario(ultimoId, "Juan Carlos", "Perez Gomez", 29, "Calle 15 # 40-10", "juanc@correo.com", "nueva456", "3119876543", 1);
            if (usuarioDao.actualizarUsuario(editar)) {
                System.out.println("Usuario actualizado correctamente.");
            }

            //  ELIMINACIÓN DE USUARIO
            System.out.println("\n=== 4. ELIMINANDO USUARIO ID " + ultimoId + " ===");
            if (usuarioDao.eliminarUsuario(ultimoId)) {
                System.out.println("Usuario de prueba eliminado correctamente.");
            }
        }
    }
}
