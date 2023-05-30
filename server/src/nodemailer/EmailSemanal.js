import cron from 'node-cron';
import nodemailer from 'nodemailer';
import { generateEmailContent } from './nodemailer/generateEmailContent'; // Importa la función para generar el contenido del correo electrónico
import User from './models/User'; // Importa el modelo de usuario

cron.schedule('0 9 * * 1', async () => {
    try {
      const users = await User.find({ sendWeeklyAvisos: true });
  
      for (const user of users) {
        const emailContent = await generateEmailContent(user);
  
        // Verificar si se generó contenido para el correo electrónico
        if (emailContent) {
          const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'lacalrodrigo9@gmail.com',
              pass: 'zebdedjycreatqom'
            },
            tls: {
              rejectUnauthorized: false
            }
          });
  
          const info = await transporter.sendMail({
            from: 'lacalrodrigo9@gmail.com',
            to: user.email,
            subject: 'Avisos Semanales - Actividades',
            text: emailContent,
            html: `<h1>Avisos Semanales - Actividades</h1>
                   <p>${emailContent}</p>`
          });
  
          console.log('Weekly Avisos sent to:', user.email, info.messageId);
        } else {
          console.log('No activities found for user:', user.email);
        }
      }
    } catch (error) {
      console.error('Error sending weekly Avisos:', error);
    }
  });