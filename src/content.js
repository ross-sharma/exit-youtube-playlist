const buttonId = "exit-playlist-button";


function handleLocationChange() {
	if (location.pathname !== "/watch") return removeButton();
	const params = new URLSearchParams(location.search);
	if (!params.has("list")) return removeButton();
	const existingButton = document.getElementById(buttonId);
	if (existingButton) return;

	addButton();
}


function addButton() {
	const button = document.createElement("button");
	button.appendChild(document.createTextNode("Exit playlist"));
	const classes = "yt-spec-button-shape-next yt-spec-button-shape-next--filled " +
	"yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-xs";
	button.setAttribute("class", classes);
	button.setAttribute("id",  buttonId);

	button.onclick = function() {
		const params = new URLSearchParams(location.search);
		params.delete("list");
		params.delete("index");
		const newQuery = params.toString();
		window.location.search = newQuery;
	}

	document.getElementById("logo").parentElement.appendChild(button);
}


function removeButton() {
	const btn = document.getElementById(buttonId);
	if (btn) btn.remove();
}


let savedHref = "";
function pollLocation() {
	const href = window.location.href;
	if (href === savedHref)  return; 
	savedHref = href;
	handleLocationChange();
}


setInterval(pollLocation, 1000);
