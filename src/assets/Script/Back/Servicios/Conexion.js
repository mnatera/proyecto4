const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:root@127.0.0.1:3306/DWH");

const mysql = require("mysql2");

module.exports = {

  sequelize:sequelize,

  Conexion: () => {
    sequelize
      .authenticate()
      .then(() => {
        console.log("Conectado");
        // sequelize.close();
      })
      .catch((err) => {
        const { original } = err;

        if (original.sqlMessage === "Unknown database 'dwh'") {
          const connection = mysql.createConnection({
            user: "root",
            password: "root",
            host: "Localhost",
            port: "3306",
          });

          const initialMySQL = [
            {
              query: "create database DWH;",
            },
            {
              query: "use DWH;",
            },
            {
              query:
                " create table USUARIO(ID int primary key auto_increment not null,Usuario varchar(100) not null, Nombre varchar(100) not null, Apellido varchar(150) not null, Email varchar(100) not null, Perfil enum('1','2') not null DEFAULT '1', Pass varchar(100) not null);",
            },

            {
              query:
                "create table REGION(ID int primary key auto_increment not null, NombreRegion varchar(100) not null);",
            },

            {
              query:
                "create table PAIS(ID int primary key auto_increment not null, NombrePais varchar(100) not null, ID_Region integer not null);",
            },

            {
              query:
                "create table CIUDAD(ID int primary key auto_increment not null, NombreCiudad varchar(100) not null, ID_Pais integer not null)",
            },

            {
              query:
                "create table EMPRESA( ID int primary key auto_increment not null, NombreEmpresa varchar(100) not null, Direccion varchar(100) not null, Email varchar(100) not null, Telefono varchar(15) not null, ID_Region integer not null, ID_Pais integer not null, ID_Ciudad integer not null);",
            },

            {
              query:
                "create table CONTACTO( ID int primary key auto_increment not null,  NombreContacto varchar(100) not null, ApellidoContacto varchar(100) not null, Cargo varchar(100) not null, Email varchar(100) not null, ID_Empresa integer not null, ID_Region integer not null, ID_Pais integer not null, ID_Ciudad integer not null, Direccion varchar(100) not null, Interes integer not null,  Foto varchar(100) null );",
            },

            {
              query:
                "create table CANAL( ID int primary key auto_increment not null, Canal integer not null, Cuenta varchar(50) not null, Preferencia integer not null, ID_Contacto integer not null );",
            },

            {
              query:"insert into USUARIO (Usuario,Nombre,Apellido,Email,Perfil,Pass) VALUES ('Admin','Juan Esteban','Osorio','juanosorio@outlook.com','1','123');",
            },

            {
              query:"insert into REGION (NombreRegion) VALUES ('Sudamerica'),('Norteamerica');",
            },

            {
              query:"insert into PAIS (NombrePais, ID_Region) VALUES ('Argentina','1'),('Colombia','1'),('Chile','1'),('Uruguay','1'),('Canelones','1'),('Maldonado','1'),('Montevideo','1'),('Mexico','2'),('Estados Unidos','2'),('Florida','2'),('Texas','2');",
            }, 
            {
              query:"insert into CIUDAD (NombreCiudad,ID_Pais) VALUES ('Buenos Aires','1'),('Cordoba','1'),('Bogota','2'),('Cucuta','2'),('Medellin','2'),('Atacama','3'),('Santiago','3'),('Valparaiso','3'),('Ciudad De Mexico','8'),('Tijuana','8');",
            }, 
            {
              query:"insert into EMPRESA (NombreEmpresa,Direccion,Email,Telefono,ID_Region,ID_Pais,ID_Ciudad) VALUES ('Consultel','Calle 54 # 44','Consultel@gmail.com','1234567890','1','2','2');",
            }, 

          ];
          initialMySQL.forEach((queryString) => {
            connection.query(queryString.query);
          });
          //  connection.end();
        } else {
          console.error("No Funciona por: ", err);
        }
      });
  },
};










/* const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:root@127.0.0.1:3306/DWH");

const mysql = require('mysql2');

module.exports = {

    Conexion: () => {
        sequelize.authenticate()
            .then(() => {
                console.log('Conectado');
               // sequelize.close();
            })
        }
    } */