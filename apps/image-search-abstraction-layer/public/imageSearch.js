var urlDiv = document.getElementById('url');
var selection = document.getElementById('selection');
var query = document.getElementById('query');
var page = document.getElementById('page');
var size = document.getElementById('size');

//reset input fields to blank/default on load
selection.getElementsByTagName('option')[0].selected = 'selected';
query.value = "";
page.value = 1;
size.getElementsByTagName('option')[0].selected = 'selected';

//enables fields based on what is selected
function enableInputs() {
  var selected = selection.options[selection.selectedIndex].value;

  if(selected == "query") {
    query.removeAttribute('disabled');
    page.removeAttribute('disabled');
    size.removeAttribute('disabled');
    updateURL();
  } else if(selected = "recent") {
    query.setAttribute('disabled', "true");
    page.setAttribute('disabled', "true");
    size.setAttribute('disabled', "true");
    updateURL();
  }
}

//changes the url displayed
function updateURL() {
  var url = "https://image-search-abstraction-layer.freecodecamp.rocks/";
  var selected = selection.options[selection.selectedIndex].value;
  var queryValue = query.value;
  var pageValue = page.value;
  var sizeValue = size.value;
  var queryTest = /\S/;
  
  if (selected == "query" && queryTest.test(queryValue)) {
    url += 'query/' + queryValue + '?page=' +pageValue;
    if(sizeValue != 'All') {
      url += '&size=' + sizeValue;
    }
  }
  if (selected == "recent") { url += 'recent/'; }
  
  
  urlDiv.innerHTML = url;
  urlDiv.setAttribute('href', url);
}

enableInputs();
//updateURL();

selection.addEventListener('change', enableInputs);
query.addEventListener('change', updateURL);
page.addEventListener('change', updateURL);
size.addEventListener('change', updateURL);
