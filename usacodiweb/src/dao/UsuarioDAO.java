package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import modelo.Usuario;
import config.Conexion;

public class UsuarioDAO {

    public boolean insertarUsuario(Usuario usuario) {
        String sql = "INSERT INTO usuario (nombres, apellidos, edad, direccion, correo, contraseña, telefono, id_rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection con = Conexion.conectar();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, usuario.getNombres());
            ps.setString(2, usuario.getApellidos());
            ps.setInt(3, usuario.getEdad());
            ps.setString(4, usuario.getDireccion());
            ps.setString(5, usuario.getCorreo());
            ps.setString(6, usuario.getContrasena());
            ps.setString(7, usuario.getTelefono());
            ps.setInt(8, usuario.getId_rol());
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.out.println("error al insertar usuario: " + e.getMessage());
            return false;
        }
    }

    public List<Usuario> consultarUsuarios() {
        List<Usuario> listaUsuarios = new ArrayList<>();
        String sql = "SELECT * FROM usuario";

        try (Connection con = Conexion.conectar();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                Usuario u = new Usuario(
                    rs.getInt("id_usuario"),
                    rs.getString("nombres"),
                    rs.getString("apellidos"),
                    rs.getInt("edad"),
                    rs.getString("direccion"),
                    rs.getString("correo"),
                    rs.getString("contraseña"),
                    rs.getString("telefono"),
                    rs.getInt("id_rol")
                );
                listaUsuarios.add(u);
            }
        } catch (SQLException e) {
            System.out.println("error al consultar usuarios: " + e.getMessage());
        }
        return listaUsuarios;
    }

    public boolean actualizarUsuario(Usuario usuario) {
        String sql = "UPDATE usuario SET nombres=?, apellidos=?, edad=?, direccion=?, correo=?, contraseña=?, telefono=?, id_rol=? WHERE id_usuario=?";
        try (Connection con = Conexion.conectar();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, usuario.getNombres());
            ps.setString(2, usuario.getApellidos());
            ps.setInt(3, usuario.getEdad());
            ps.setString(4, usuario.getDireccion());
            ps.setString(5, usuario.getCorreo());
            ps.setString(6, usuario.getContrasena());
            ps.setString(7, usuario.getTelefono());
            ps.setInt(8, usuario.getId_rol());
            ps.setInt(9, usuario.getId_usuario());
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.out.println("error al actualizar usuario: " + e.getMessage());
            return false;
        }
    }

    public boolean eliminarUsuario(int idUsuario) {
        String sql = "DELETE FROM usuario WHERE id_usuario=?";
        try (Connection con = Conexion.conectar();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, idUsuario);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.out.println("error al eliminar usuario: " + e.getMessage());
            return false;
        }
    }
}
