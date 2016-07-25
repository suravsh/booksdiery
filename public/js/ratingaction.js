function handleRatingChange(e) {
	console.log(e);
	document.getElementById("rating").value = e.getAttribute("data");	
}
