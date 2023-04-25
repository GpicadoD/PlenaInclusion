import express from 'express';
import { AddnewList, DeleteCompAct, GetComAct } from '../controllers/comAct.js';
import { AddnewActivities, DeleteNewActivity, GetnewActivities, UpdateActivities} from '../controllers/newActivity.js';
import { DeleteNewUser, GetNewUser, AddNewUser, UpdateUser, ResetPassword, Login, UpdatePassword} from '../controllers/newUser.js';
import { DeleteCompetitor, UpdateCompetitor, AddCompetitor, GetCompetitor } from '../controllers/competitor.js';
import { DeleteOrganizer, GetOrganizer, UpdateOrganizer, Addneworganizer } from '../controllers/organizer.js';
import { DeleteTheme, GetTheme, UpdateTheme, Addnewtheme } from '../controllers/theme.js';
import { DeleteOrganizerType, GetorgType, UpdateOrgType, AddorgType } from '../controllers/orgType.js';
import { DeletePeriodAct, GetperiodicActs, Addnewperiodact} from '../controllers/periodicActivity.js';
import { DeleteImgOrg } from '../controllers/imgOrg.js';
import { DeletePublic, UpdatePublic, Addnewpublic } from '../controllers/public.js';
import { DeletePeriod, UpdatePeriod, addNewPeriod } from '../controllers/period.js';
import { DeleteImgAct } from '../controllers/imgAct.js';

const router = express.Router();

// Define a route for the home page
router.get('/', (req, res) => {
    res.render('pages/index');
});
// Define an insert elements for the home page
router.get('/toInsert', (req, res) => {
    res.render('pages/insertElements');
});
// Define a edit elements for the home page
router.get('/toEdit', (req, res) => {
    res.render('pages/editElements');
});
// Define a rdelete elements for the home page
router.get('/toDelete', (req, res) => {
    res.render('pages/deleteElements');
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

// Define routes for activity-related actions
// Define routes for user-activity list-related actions

// Define routes for get the activity by searching from its date

// Define routes for get the user-activity list-related actions

// Define routes for get activity list-related actions and for adding new ones
router.post('/getnewAct', GetnewActivities);
router.post('/AddnewActivities', AddnewActivities);

router.post('/AddorgType', AddorgType);

router.post('/AddnewPeriod', addNewPeriod);

router.post('/AddnewPeriodActivity', Addnewperiodact);

router.post('/AddnewPublic', Addnewpublic);
router.post('/Addnewtheme', Addnewtheme);

// Define routes for user list-related actions and for adding new ones
router.post('/newUser', GetNewUser);
router.post('/newActivities', AddnewActivities);

//all get//
// Define routes for get the competitor and their activity which is related
router.post('/AddnewUser', AddNewUser);
router.post('/getcompact', GetComAct);
// Define routes for get the competitor by list-related actions
router.post('/getcompetitor', GetCompetitor);

// Define routes for get the Organizer by list-related actions
router.post('/getOrganizer', GetOrganizer);
// Define routes for add new list-related ations
router.post('/Addcompetitor', AddCompetitor);

router.post('/Addorganizer', Addneworganizer);
router.post('/insertCompact', AddnewList);

router.post('/getTheme',GetTheme);

router.post('/getOrgType', GetorgType);

router.post('/getPerAct', GetperiodicActs);


//all deletes//
router.post('/deletecomact',DeleteCompAct);
router.post('/deleteCompetitor', DeleteCompetitor);
router.post('/deleteimgact',DeleteImgAct);
router.post('/deleteImgOrg', DeleteImgOrg);
router.post('/deletenewactivity',DeleteNewActivity);
router.post('/deletenewuser', DeleteNewUser);
router.post('/deleteOrganizer', DeleteOrganizer);
router.post('/deleteorgtype',DeleteOrganizerType);
router.post('/deletePeriod',DeletePeriod);
router.post('/deleteperiodact',DeletePeriodAct);
router.post('/deletePublic',DeletePublic);
router.post('/deleteTheme',DeleteTheme);



router.post('/updateActivities', UpdateActivities);

router.post('/updateUser', UpdateUser);

router.post('/updateOrganizer', UpdateOrganizer);

router.post('/updateCompetitor', UpdateCompetitor);

router.post('/updateOrgType', UpdateOrgType);

router.post('/updatePublic', UpdatePublic);

router.post('/updatePeriod', UpdatePeriod);

router.post('/updateTheme', UpdateTheme);

router.post('/resetPassword', ResetPassword);

router.post('/loginNewUser', Login);

router.post('/updatePassword', UpdatePassword);



// Export the router object
export default router;