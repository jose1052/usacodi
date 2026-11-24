<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Registro de Usuarios - USACODI</title>
</head>
<body>
    <h2>Registro de Usuario - Proyecto USACODI</h2>
    <form action="UsuarioServlet" method="POST">
        <label>Nombres:</label><br>
        <input type="text" name="nombres" required><br><br>

        <label>Apellidos:</label><br>
        <input type="text" name="apellidos" required><br><br>

        <label>Edad:</label><br>
        <input type="number" name="edad" required><br><br>

        <label>Dirección:</label><br>
        <input type="text" name="direccion" required><br><br>

        <label>Correo:</label><br>
        <input type="email" name="correo" required><br><br>

        <label>Contraseña:</label><br>
        <input type="password" name="contrasena" required><br><br>

        <label>Teléfono:</label><br>
        <input type="text" name="telefono" required><br><br>

        <label>ID Rol (ej. 1):</label><br>
        <input type="number" name="id_rol" value="1" required><br><br>

        <button type="submit">Registrar Usuario</button>
    </form>
    <br>
    <a href="UsuarioServlet">Ver lista de usuarios registrados (GET)</a>
</body>
</html>
