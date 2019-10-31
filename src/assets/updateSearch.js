function updateSearch() {
	var searchSelectors = document.getElementByClassName("search-selector__option");
	for (var i = searchSelectors.length - 1; i >= 0; i--) {
		if(searchSelectors[i].innerHTML == "keywords") {
			searchSelectors[i].classList.add("search-selector__selected");
		}
		else {
			searchSelectors[i].classList.remove("search-selector__selected");
		}
	}
}