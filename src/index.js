import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index.js';

const app = express();

//configuraciones
app.set('port', process.env.PORT || 3030);
app.set('json spaces', 2);

//routes
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true //los dos body parser son para que pueda aceptar las peticiones form de un html
}));
app.use(router);

app.listen(app.get('port'), () => {
    console.log(`Server listening in port ${app.get('port')}`)
});