<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="modelo.Usuario" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Usuarios Registrados - USACODI</title>
</head>
<body>
    <h2>Lista de Usuarios - USACODI</h2>
    <a href="index.jsp">Registrar nuevo usuario</a><br><br>

    <table border="1" cellpadding="8">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Edad</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Rol</th>
            </tr>
        </thead>
        <tbody>
            <%
                List<Usuario> lista = (List<Usuario>) request.getAttribute("listaUsuarios");
                if (lista != null && !lista.isEmpty()) {
                    for (Usuario u : lista) {
            %>
            <tr>
                <td><%= u.getId_usuario() %></td>
                <td><%= u.getNombres() %></td>
                <td><%= u.getApellidos() %></td>
                <td><%= u.getEdad() %></td>
                <td><%= u.getCorreo() %></td>
                <td><%= u.getTelefono() %></td>
                <td><%= u.getId_rol() %></td>
            </tr>
            <%
                    }
                } else {
            %>
            <tr>
                <td colspan="7">No hay usuarios registrados en la base de datos.</td>
            </tr>
            <% } %>
        </tbody>
    </table>
</body>
</html>
