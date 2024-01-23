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
        prettyPrintJSON(jsondata);
    });
}

function prettyPrintJSON(jsondata){
    //prints the JSON to the screen
    var pretty = JSON.stringify(jsondata, null, 4);
    $('#resultsbox').append("<pre>"+ pretty + "<pre/>");
}