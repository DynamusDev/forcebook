const express = require('express');
const bodyParser =  require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(routes);

const server = require("http").createServer(app);
const port=3333;

server.listen(port, () => console.log("server running on port: " + port)); //Porta que a API fica escutando
