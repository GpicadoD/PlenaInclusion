// Import required packages and modules
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index.js';

// Create an instance of the express application
const app = express();

//configurations
// Configure the application settings
app.set('port', process.env.PORT || 5050);
app.set('json spaces', 2);

//routes
// Set the view engine to ejs
app.set('view engine', 'ejs');
// Use bodyParser to parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true //the two body parsers are so that you can accept form requests from an html
}));
// Use the router module for routing requests
app.use(router);

// Start the server and listen for incoming requests
app.listen(app.get('port'), () => {
    console.log(`Server listening in port ${app.get('port')}`)
});