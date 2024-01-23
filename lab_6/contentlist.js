
function addContent () {
	// add a list of items to the content div
    let items = ["hewey", "dewey", "louie"];
	
	// build the html string for a <ul> list
    let items_html = "<ul>";
    for (let i=0; i < items.length; i++) {
		item = items[i];
		items_html += "<li>" + item + "</li>";
	};
	items_html += "</ul>";
	
	// Create a new paragraph element
    var newParagraph = document.createElement('p');

    // Set the text content of the paragraph
    newParagraph.textContent = 'Disney Ducks';

    // Get the element with the id 'content-container'
    var contentContainer = document.getElementById('content-container');

    // Append the new paragraph to the content container
    contentContainer.appendChild(newParagraph);
}

// Call the addContent function when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    addContent();
});

	// using javascript
	// 1. find the content div
	// 2. modify its html attribute by adding items_html



function button(){

}
