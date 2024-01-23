$(function(){
    //document ready
    alert("document ready");

    $('#searchform').submit(function(){
        var searchterms = $("#searchterms").val();
        getResultsFromOMDB(searchterms);
        return false;
    });
});

function getResultsFromOMDB(searchterms){
    //call youtube api using ajax
    //build url for the request
    var url = "http://www.omdbapi.com/?apikey=7c54f283&s=" + searchterms;
    //use jquery jason shortcut
    $.getJSON(url, function(jsondata){
        //handle the results
        printJSON(jsondata);
    });
}

function printJSON(jsondata){
    //prints the JSON to the screen
    var normal = JSON.stringify(jsondata);
    $('#resultsbox').append("<p>"+ normal + "<p/>");
}