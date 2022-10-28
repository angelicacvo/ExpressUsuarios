const { Router, request, response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser"); //liberia 

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.raw());

mongoose.connect("mongodb+srv://administrador:hola@clusterg41.dn5kwgd.mongodb.net/BD_G43"); //conexión de la bd desde atlas

const userSchema = new mongoose.Schema({ //formato json
    documento: String,
    nombre: String,
    edad: Number
});


const usuarioModel = mongoose.model('usuarios', userSchema);

app.get('/', (request, response) => {  //ruta inicio
    response.send('hiciste una petición');
});

//Consultar
app.get('/UsuarioPorId', (request, response) => {  //ruta inicio
    usuarioModel.find(
        {documento: request.body.documento | request.param("documento")}, 
        function (error, documentos) {
            response.send(documentos);
    });
});

app.get('/Usuarios', (request, response) => {  //ruta inicio
    usuarioModel.find(function (error, documentos) {
        response.send(documentos);
    });
});

//Agregar
app.post("/AgregarUsuario", function (request, response) {
    console.log(request.body);
  
    let usuarioNuevo = new usuarioModel({
      documento: request.body.documento,
      nombre: request.body.nombre,
      edad: request.body.edad,
    });
  
    usuarioNuevo.save(function (error, documento) {
      if (error) {
        response.send("Error al agregar usuario");
      } else {
        response.send("El usuario ha sido agregado");
      }
    });
  });

//Borrar
app.delete("/EliminarUsuario", function (request, response) {
    usuarioModel.deleteOne(
        {documento: request.body.documento | request.param("documento")},
        function(error, documento){
            if (error) {
                response.send("Error en eliminar usuario");
            } else {
                response.send("Usuario eliminado correctamente");
            }
        }
    );    
});

//Editar
app.put("/EditarUsuario", function (request, response) {
    const filter = {documento: request.body.documento};
    const update = {edad: request.body.edad};


    usuarioModel.findOneAndUpdate(filter, update, function(error, documento){
            if (error) {
                response.send("Error en editar usuario");
            } else {
                response.send("Usuario editado correctamente");
            }
        });    
});


app.listen(3000, () => { //Esablece un canal de comunicación, una canal de entrada, 3000 es el puerto (localhost)
    console.log('Escuchando');
    //se inicia con npm start
});