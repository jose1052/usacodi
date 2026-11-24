package controlador;

import dao.UsuarioDAO;
import modelo.Usuario;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/UsuarioServlet")
public class UsuarioServlet extends HttpServlet {

    private final UsuarioDAO usuarioDAO = new UsuarioDAO();

    // MÉTODO GET: Consulta los usuarios y los envía al JSP
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        List<Usuario> listaUsuarios = usuarioDAO.consultarUsuarios();
        request.setAttribute("listaUsuarios", listaUsuarios);
        request.getRequestDispatcher("usuarios.jsp").forward(request, response);
    }

    // MÉTODO POST: Recibe los datos del formulario HTML y guarda en MySQL
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");

        String nombres = request.getParameter("nombres");
        String apellidos = request.getParameter("apellidos");
        int edad = Integer.parseInt(request.getParameter("edad"));
        String direccion = request.getParameter("direccion");
        String correo = request.getParameter("correo");
        String contrasena = request.getParameter("contrasena");
        String telefono = request.getParameter("telefono");
        int id_rol = Integer.parseInt(request.getParameter("id_rol"));

        Usuario nuevoUsuario = new Usuario(nombres, apellidos, edad, direccion, correo, contrasena, telefono, id_rol);
        usuarioDAO.insertarUsuario(nuevoUsuario); 

        // Redirige al doGet para mostrar la lista actualizada
        response.sendRedirect("UsuarioServlet");
    }
}

