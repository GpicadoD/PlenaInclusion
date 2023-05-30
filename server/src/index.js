// Import required packages and modules
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index.js';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import generateEmailContent from './nodemailer/generateEmailContent.js';



// Create an instance of the express application
const app = express();
dotenv.config();
//configurations
// Configure the application settings
app.set('port', process.env.PORT || 5050);
//routes

// Use bodyParser to parse incoming requests
app.use(bodyParser.json());
app.use(cors({ credentials:true, origin:'http://localhost:3000/' }));
app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: true, parameterLimit:100000, limit: "500mb" //the two body parsers are so that you can accept form requests from an html
}));
// Use the router module for routing requests
app.use(router);

// Configuración del transportador de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lacalrodrigo9@gmail.com',
    pass: 'zebdedjycreatqom',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

cron.schedule('15 11 * * 2', async () => {
  console.log('---------------------');
  console.log('Running Cron Process');

  try {
    const emailContent = await generateEmailContent();

    if (emailContent) {
      const info = await transporter.sendMail({
        from: 'lacalrodrigo9@gmail.com',
        to: 'lacalrodrigo9@gmail.com',
        subject: 'Avisos Semanales - Actividades',
        text: emailContent,
        html: `<h1>Avisos Semanales - Actividades</h1>
               <p>${emailContent}</p>`
      });

      console.log('Weekly Avisos sent:', info.messageId);
    } else {
      console.log('No activities found for the week.');
    }
  } catch (error) {
    console.error('Error sending weekly Avisos:', error);
  }
});

// Start the server and listen for incoming requests
const PORT = process.env.PORT || 3000;

app.listen(app.get('port'), () => {
    console.log(`Server listening in port ${app.get('port')}`)
});

