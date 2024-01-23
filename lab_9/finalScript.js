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
    var storedResults = localStorage.getItem('cocktailResults');
    if (storedResults) {
        var results = JSON.parse(storedResults);
        prettyPrintJSON(results);
        localStorage.removeItem('cocktailResults'); // Remove stored results after displaying
    }
});

function prettyPrintJSON(jsondata) {
    var htmlstring = "";

    // Add welcome statement
    htmlstring += "<p> <br> </p>";

    for (var i = 0; i < jsondata.length; i++) {
        var cocktail = jsondata[i];
        var title = cocktail.name;
        var ingredients = cocktail.ingredients.join(', '); // Assuming ingredients is an array
        var instructions = cocktail.instructions;

        htmlstring += "<li>"+"<br>"+ "<u>" + title+"</u>"+"<br>" + "Ingredients: " + ingredients + "</li>"+"<br>";
        htmlstring += "<p>"+ "Instructions: " + instructions+"<br>" +"<br>"+ "</p>";

        // Add space between each result
        htmlstring += "<hr>"; // You can use any HTML element for spacing (e.g., <br>, <hr>, etc.)
    }

    $("#results").html(htmlstring);
}



