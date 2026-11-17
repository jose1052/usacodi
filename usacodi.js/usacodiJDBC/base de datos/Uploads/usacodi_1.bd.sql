USE usacodi_1;

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    edad INT NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    cargo VARCHAR(50)

);
create table roll
(id_rol int auto_increment primary key,
nombre_rol varchar(20)
);
 create table mensaje
 ( id_mensaje INT AUTO_INCREMENT PRIMARY KEY,
 titulo varchar(20),
 descripcion varchar(200),
 fecha datetime,
 id_usuario int,
 id_destinatario int
 );
show tables;
