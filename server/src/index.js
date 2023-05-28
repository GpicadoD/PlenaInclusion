// Import required packages and modules
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index.js';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
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

// Start the server and listen for incoming requests
app.listen(app.get('port'), () => {
    console.log(`Server listening in port ${app.get('port')}`)
});