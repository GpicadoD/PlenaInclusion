
import Activities from "../models/activityModel.js";
import Users from "../models/userModel.js";
import { GetperiodicActsByUserDate } from '../controllers/periodicActivity.js';

async function generateEmailContent(user) {
    try {
        const today = new Date();
        const startDate = new Date(today.setDate(today.getDate() - today.getDay())); 
        const endDate = new Date(today.setDate(today.getDate() + 6)); 
        const NifCom = user.NifCom;

        const activities = await GetperiodicActsByUserDate(startDate, endDate, NifCom);


        if (!activities || activities.length === 0) {
            return 'No se encontraron actividades asignadas para esta semana.';
        }


        let emailContent = `<h1>Actividades para la semana:</h1>`;


        activities.forEach((activity, index) => {
            emailContent += `<h2>Actividad ${index + 1}</h2>`;
            emailContent += `<p>Título: ${activity.nameAct}</p>`;
            emailContent += `<p>Descripción: ${activity.Description}</p>`;
            emailContent += `<br>`;
        });

        return emailContent;
    } catch (error) {
        console.log(error);
        return '';
    }
}

export default generateEmailContent;