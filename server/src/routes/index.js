import express from 'express';
import { AddnewList, DeleteCompAct, GetComAct } from '../controllers/comAct.js';
import { AddnewActivities, DeleteNewActivity, GetnewActivities, UpdateActivities} from '../controllers/newActivity.js';
import { DeleteNewUser, GetNewUser, AddNewUser, UpdateUser, ResetPassword, Login, UpdatePassword, RegisterNewUser, Logout} from '../controllers/newUser.js';
import { DeleteCompetitor, UpdateCompetitor, AddCompetitor, GetCompetitor } from '../controllers/competitor.js';
import { DeleteOrganizer, GetOrganizer, UpdateOrganizer, Addneworganizer } from '../controllers/organizer.js';
import { DeleteTheme, GetTheme, UpdateTheme, Addnewtheme } from '../controllers/theme.js';
import { DeleteOrganizerType, GetorgType, UpdateOrgType, AddorgType } from '../controllers/orgType.js';
import { DeletePeriodAct, GetperiodicActs, Addnewperiodact, GetperiodicActsByUserDate} from '../controllers/periodicActivity.js';
import { DeleteImgOrg } from '../controllers/imgOrg.js';
import { DeletePublic, UpdatePublic, Addnewpublic } from '../controllers/public.js';
import { DeletePeriod, UpdatePeriod, addNewPeriod } from '../controllers/period.js';
import { DeleteImgAct } from '../controllers/imgAct.js';
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

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

router.get('/token', refreshToken);

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
router.post('/getnewAct',verifyToken, GetnewActivities);
router.post('/AddnewActivities',verifyToken, AddnewActivities);

router.post('/AddorgType',verifyToken, AddorgType);

router.post('/AddnewPeriod',verifyToken, addNewPeriod);

router.post('/AddnewPeriodActivity',verifyToken, Addnewperiodact);

router.post('/AddnewPublic',verifyToken, Addnewpublic);
router.post('/Addnewtheme',verifyToken, Addnewtheme);

// Define routes for user list-related actions and for adding new ones
router.post('/newUser', verifyToken, GetNewUser);
router.post('/newActivities',verifyToken, AddnewActivities);

//all get//
// Define routes for get the competitor and their activity which is related
router.post('/AddnewUser',verifyToken, AddNewUser);
router.post('/getcompact',verifyToken, GetComAct);
// Define routes for get the competitor by list-related actions
router.post('/getcompetitor',verifyToken, GetCompetitor);

// Define routes for get the Organizer by list-related actions
router.post('/getOrganizer',verifyToken, GetOrganizer);
// Define routes for add new list-related ations
router.post('/Addcompetitor',verifyToken, AddCompetitor);

router.post('/Addorganizer',verifyToken, Addneworganizer);
router.post('/insertCompact',verifyToken, AddnewList);

router.post('/getTheme',verifyToken,GetTheme);

router.post('/getOrgType',verifyToken, GetorgType);

router.post('/getPerAct',verifyToken, GetperiodicActs);


//all deletes//
router.post('/deletecomact',verifyToken,DeleteCompAct);
router.post('/deleteCompetitor',verifyToken, DeleteCompetitor);
router.post('/deleteimgact',verifyToken,DeleteImgAct);
router.post('/deleteImgOrg',verifyToken, DeleteImgOrg);
router.post('/deletenewactivity',verifyToken,DeleteNewActivity);
router.post('/deletenewuser',verifyToken, DeleteNewUser);
router.post('/deleteOrganizer',verifyToken, DeleteOrganizer);
router.post('/deleteorgtype',verifyToken,DeleteOrganizerType);
router.post('/deletePeriod',verifyToken,DeletePeriod);
router.post('/deleteperiodact',verifyToken,DeletePeriodAct);
router.post('/deletePublic',verifyToken,DeletePublic);
router.post('/deleteTheme',verifyToken,DeleteTheme);



router.post('/updateActivities',verifyToken, UpdateActivities);

router.post('/updateUser',verifyToken, UpdateUser);

router.post('/updateOrganizer',verifyToken, UpdateOrganizer);

router.post('/updateCompetitor',verifyToken, UpdateCompetitor);

router.post('/updateOrgType',verifyToken, UpdateOrgType);

router.post('/updatePublic',verifyToken, UpdatePublic);

router.post('/updatePeriod',verifyToken, UpdatePeriod);

router.post('/updateTheme',verifyToken, UpdateTheme);

router.post('/resetPassword',verifyToken, ResetPassword);

router.post('/loginNewUser', Login);

router.post('/updatePassword',verifyToken, UpdatePassword);

router.post('/logout',Logout);

router.post('/registernewuser', RegisterNewUser);

router.post('/getperiodicActsByUserDate',GetperiodicActsByUserDate);
router.get('/verifyToken', verifyToken);


// Export the router object
export default router;