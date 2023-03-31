import express from 'express';
import { AddActivities, GetActivities } from '../controllers/activities.js';
import { GetUsersPassHash,GetUsers, Register } from '../controllers/users.js';
import { AddList, GetList } from '../controllers/userActs.js';

const router = express.Router();

// Define a route for the home page
router.get('/', (req, res) => {
    res.render('pages/index');
});

// Define a route for the "buenastardes" endpoint
router.get('/GoodAfternoon', (req, res) => {
    res.json(
        {
            "Title": "¡Buenas tardes Mundo!"
        }
    );
});


// Define a route for the "Goodbye" endpoint
router.get('/Goobye', (req, res) => {
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

// Define a route for the "mostrarLista" endpoint
router.post('/ShowList', (req, res) => {
    var list = ["Álvaro", "Paula", "Alberto"];
    res.render('pages/list', {
        list: list,
    })
});

// Define routes for user-related actions
router.post('/register', Register);
router.post('/getUsers', GetUsers);

router.post('/getActivities', GetActivities);
router.post('/addActivities', AddActivities);

// Define routes for activity-related actions
router.post('/login', GetUsersPassHash);
// Define routes for user-activity list-related actions
router.post('/addList', AddList);
router.post('/getList', GetList);
// Export the router object
export default router;