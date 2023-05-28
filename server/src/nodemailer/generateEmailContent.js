import Activities from "../models/activityModel.js";
import Users from "../models/userModel.js";

async function generateEmailContent(user) {
    // Obtener las actividades del usuario
    const userActivities = await Users.findOne({
        where: { userNIF: user.userNIF },
        include: [Activities]
    });

    // Verificar si el usuario tiene actividades asignadas
    if (!userActivities || !userActivities.activities) {
        return 'No se encontraron actividades asignadas para esta semana.';
    }

    // Construir el contenido del correo electrónico
    let emailContent = `<h1>Actividades para la semana:</h1>`;

    // Iterar sobre las actividades y agregar la información al correo electrónico
    userActivities.activities.forEach((activity, index) => {
        emailContent += `<h2>Actividad ${index + 1}</h2>`;
        emailContent += `<p>Título: ${activity.nameAct}</p>`;
        emailContent += `<p>Descripción: ${activity.Description}</p>`;
        emailContent += `<br>`;
    });

    return emailContent;
}

export default generateEmailContent;