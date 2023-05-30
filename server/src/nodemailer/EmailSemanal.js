import cron from 'node-cron';
import nodemailer from 'nodemailer';
import { generateEmailContent } from './nodemailer/generateEmailContent'; // Importa la función para generar el contenido del correo electrónico
import User from './models/newUserModel';

cron.schedule('0 11 * * 2', async () => {
    try {
      const users = await User.find({ sendWeeklyAvisos: true });
  
      for (const user of users) {
        const emailContent = await generateEmailContent(user);
  
        if (emailContent) {
          const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'lacalrodrigo9@gmail.com',
              pass: 'zebdedjycreatqom'
            }
          });
  
          const info = await transporter.sendMail({
            from: 'lacalrodrigo9@gmail.com',
            to: 'lacalrodrigo9@gmail.com',
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

