$(function () {
    $('#searchform').submit(function (event) {
        event.preventDefault();

        var searchTerm = $("#searchterms").val().trim();

        if (searchTerm !== "") {
            searchCocktail(searchTerm);
        }
    });
});

function searchCocktail(searchTerm) {
    const url = 'https://cocktail-by-api-ninjas.p.rapidapi.com/v1/cocktail?name=' + encodeURIComponent(searchTerm);

    const settings = {
        async: true,
        crossDomain: true,
        url: url,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1e172b8f13msha7b25075b2fdae5p10d643jsn1e003f53eb44',
            'X-RapidAPI-Host': 'cocktail-by-api-ninjas.p.rapidapi.com'
        }
    };

    $.ajax(settings)
        .done(function (response) {
            console.log("Response:", response);
            if (response) {
                // Store the results in localStorage
                localStorage.setItem('cocktailResults', JSON.stringify(response));
                // Redirect to the home page after fetching data
                window.location.href = 'JqueryAjax.html';
            } else {
                $("#results").html("<p>No results found for '" + searchTerm + "'</p>");
            }
        })
        .fail(function (xhr, status, error) {
            console.error("Request failed:", status, error);
            if (xhr.status === 401) {
                $("#results").html("<p>Unauthorized: Check API key</p>");
            } else {
                $("#results").html("<p>Error: " + status + " - " + error + "</p>");
            }
        });
}


$(document).ready(function() {
    const cocktailUrl = 'https://cocktail-by-api-ninjas.p.rapidapi.com/v1/cocktail?name=sex on the beach'; // Replace with your actual API endpoint

    $.ajax({
        url: cocktailUrl,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1e172b8f13msha7b25075b2fdae5p10d643jsn1e003f53eb44',
            'X-RapidAPI-Host': 'cocktail-by-api-ninjas.p.rapidapi.com'
        },
        success: function(response) {
            if (response && response.length > 0) {
                displayCocktailDetails(response);
            } else {
                $('#results').html(`<p>No results found for 'Sex on the Beach'</p>`);
            }
        },
        error: function(xhr, status, error) {
            console.error("Request failed:", status, error);
            $('#results').html(`<p>Error: ${status} - ${error}</p>`);
        }
    });
});

function displayCocktailDetails(cocktailData) {
    var htmlString = "";

    for (var i = 0; i < cocktailData.length; i++) {
        var cocktail = cocktailData[i];
        var title = cocktail.name;
        var ingredients = cocktail.ingredients.join(', '); // Assuming ingredients is an array
        var instructions = cocktail.instructions;

        htmlString += "<li>" + "<br>" + "<u>" + title + "</u>" + "<br>" + "Ingredients: " + ingredients + "</li>" + "<br>";
        htmlString += "<p>" + "Instructions: " + instructions + "<br>" + "<br>" + "</p>";

        // Add space between each result
        htmlString += "<hr>"; // You can use any HTML element for spacing (e.g., <br>, <hr>, etc.)
    }

    $("#results").html(htmlString);
}



