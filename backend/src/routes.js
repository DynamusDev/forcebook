const express = require('express');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

routes.post('/sessions', SessionController.create); //Criar Sessão(LOGIN)
routes.put('/sessions', SessionController.forgotPassword) // Esqueci minha Senha

routes.post('/reset_password', SessionController.resetPassword)


routes.post('/users', UserController.create); // Criar usuário
routes.put('/users/:id', UserController.edit) // editar
routes.get('/users', UserController.index);  // Listar Usuários
routes.get('/users/:id', UserController.especific);

module.exports = routes;