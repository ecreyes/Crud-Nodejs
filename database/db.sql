-- Crear BD
CREATE DATABASE crudnodejs;

-- Usar BD
use crudnodejs;

-- Crear tabla

CREATE TABLE customer (
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	direccion VARCHAR(100) NOT NULL,
	telefono VARCHAR(15) NOT NULL
);

-- Mostrar tablas
show tables;
