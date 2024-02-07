// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
const port = process.env.PORT || 8080; // Change the port to 8080

// Set up middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Add this line

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Define routes

// Home route
app.get('/', (req, res) => {
    res.render('index');
});

// About route
app.get('/about', (req, res) => {
    res.render('about');
});

// Cocktail of the Day (cotd) route
app.get('/cotd', (req, res) => {
    res.render('cotd');
});

// Contact route
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Handle search form submission
app.post('/searchCocktail', (req, res) => {
    const searchTerm = req.body.searchTerm;
    // Call your searchCocktail function here

    // Placeholder: Add logic to handle the search term
    res.send('Search term received: ' + searchTerm);
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).render('404');
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
