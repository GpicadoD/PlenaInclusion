import express from 'express';
import { AddActivities, GetActivities } from '../controllers/activities.js';
import { GetUsersPassHash,GetUsers, Register } from '../controllers/users.js';
import { AddList, GetList } from '../controllers/userActs.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/index');
});

router.get('/buenastardes', (req, res) => {
    res.json(
        {
            "Title": "¡Buenas tardes Mundo!"
        }
    );
});


router.get('/despedida', (req, res) => {
    res.json(
        {
            "Title": "Adios Mundo"
        }
    );
});

//router.post('/login', (req, res) => {
    //console.log(req.body);
    //req es request y se puede poner después del body un .username o .password ya que lee las clases
    //del ejs y luego las muestra en la terminal cuando se hace una nueva carga de datos en el login
    /*res.json(
        {
            "Title": "¡Funciona!"
        }
    );*/
    //res.render('pages/show_info', {
        //username: req.body.username,
       // password: req.body.password
    //})
    //Son variables que están conectadas con el html
//});

router.post('/mostrarLista', (req, res) => {
    var lista = ["Álvaro", "Paula", "Alberto"];
    res.render('pages/lista', {
        lista: lista,
    })
});

router.post('/register', Register);
router.post('/getUsers', GetUsers);

router.post('/getActivities', GetActivities);
router.post('/addActivities', AddActivities);

router.post('/login', GetUsersPassHash);

router.post('/addList', AddList);
router.post('/getList', GetList);
export default router;