// Event handler for form submission
$(function () {
    $('#searchform').submit(function (event) {
        event.preventDefault();

        // Get and trim the search term
        var searchTerm = $("#searchterms").val().trim();

        // Check if the search term is not empty
        if (searchTerm !== "") {
            // Call the searchCocktail function with the search term
            searchCocktail(searchTerm);
        }
    });
});

// Function to perform cocktail search using AJAX
function searchCocktail(searchTerm) {
    // Define the server endpoint for cocktail search
    const url = '/searchCocktail';

    // AJAX settings for making a POST request to the server
    const settings = {
        async: true,
        crossDomain: true,
        url: url,
        method: 'POST',
        data: { searchTerm: searchTerm },  // Send data as an object
        headers: {
            'Content-Type': 'application/json', // Set the content type for JSON data
        },
    };

    // Perform the AJAX request
    $.ajax(settings)
        .done(function (response) {
            console.log("Response:", response);
            // Check if there is a response from the server
            if (response) {
                // Display the results on the page
                displayCocktailDetails(response);
            } else {
                // Display a message if no results are found
                $("#results").html("<p>No results found for '" + searchTerm + "'</p>");
            }
        })
        .fail(function (xhr, status, error) {
            console.error("Request failed:", status, error);
            // Handle different error scenarios
            if (xhr.status === 401) {
                $("#results").html("<p>Unauthorized: Check API key</p>");
            } else {
                $("#results").html("<p>Error: " + status + " - " + error + "</p>");
            }
        });
}

// Document ready function for initial page load
$(document).ready(function () {
    // Generate a random cocktail name or use a default one
    const randomCocktailName = generateRandomCocktail();

    // Define the server endpoint for fetching a random cocktail
    const cocktailUrl = '/randomCocktail';

    // AJAX request for fetching a random cocktail
    $.ajax({
        url: cocktailUrl,
        method: 'GET',
        success: function (response) {
            if (response && response.length > 0) {
                // Display the results on the page
                displayCocktailDetails(response);
            } else {
                // Display a message if no results are found for the random cocktail
                $('#results').html(`<p>No results found for '${randomCocktailName}'</p>`);
            }
        },
        error: function (xhr, status, error) {
            console.error("Request failed:", status, error);
            // Display an error message if the request fails
            $('#results').html(`<p>Error: ${status} - ${error}</p>`);
        }
    });
});

// Function to display cocktail details on the page
function displayCocktailDetails(jsondata) {
    var htmlstring = "";

    // Add welcome statement
    htmlstring += "<p> <br> </p>";

    // Loop through each cocktail in the response
    for (var i = 0; i < jsondata.length; i++) {
        var cocktail = jsondata[i];
        var title = cocktail.name;
        var ingredients = cocktail.ingredients.join(', '); // Assuming ingredients is an array
        var instructions = cocktail.instructions;

        // Construct HTML for each cocktail result
        htmlstring += "<li>" + "<br>" + "<u>" + title + "</u>" + "<br>" + "Ingredients: " + ingredients + "</li>" + "<br>";
        htmlstring += "<p>" + "Instructions: " + instructions + "<br>" + "<br>" + "</p>";

        // Add space between each result
        htmlstring += "<hr>"; // You can use any HTML element for spacing (e.g., <br>, <hr>, etc.)
    }

    // Set the HTML string to the results element
    $("#results").html(htmlstring);
}

// Rest of the functions remain unchanged
