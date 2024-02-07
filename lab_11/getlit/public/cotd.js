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

    // Document ready block was removed from here

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
});

// Rest of the functions remain unchanged
