$(function(){
    $('#searchform').submit(function(){
        //get current value and add to items list
        var searchterms = $("#searchterms").val();
        //call our search youtube function
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
    //create a string to contain our HTML code to inject
    var htmlstring="";
    //iterate over the collection of results
    for (var i=0; i<10; i++){
        var title = jsondata.Search[i].Title;
        var year = jsondata.Search[i].Year;
        var poster = jsondata.Search[i].Poster;
        htmlstring += "<li>" + title + " " + year +"</li>"
        htmlstring += "<img src = '"+poster+"'/>"
        
    }
    //inject the HTML into our empty list
    $("#results").html(htmlstring);
}


