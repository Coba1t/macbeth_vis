
backButton = false; //Stateful global variable saying whether the backbutton has been pressed.

function pathExtract(url) {
	var item;
	if (url == '/macbeth_visual/') {
		console.log('URL is intro. Returning intro.')
		return 'intro';
	}
	else {
		for (var i = 0, len = url.length; i < len; i++) {
			if (url[i] == '/') {
				item = '';
			}
			else {
				item = item + url[i];
			}
		}
	}
	if (item == "index.html") { //For local testing.
		return 'intro';
	};
	
	console.log('Item is: ' + item);
	return item;
}

function loadContent(loadItem) {
	console.log(loadItem + ': Attempting Load...');
	
	//Add Overlay:
	var overlayHTML = '<div id="overlay">' + 
		'<img id="loading" src="img/ajax-loader.png">' +
		'</div';
	$(overlayHTML).appendTo('body');
	
	//Execute Load:
	$("#container").load("dynamic/" + loadItem + ".html", function(responseTxt, statusTxt, xhr){
		if(statusTxt == "success") {
			console.log("External content loaded successfully!");
		}
		if(statusTxt == "error") {
			alert("Error: Item (" + loadItem + ") does not exist! Technical Info:\n\n" + xhr.status + ": " + xhr.statusText);
		}
	});
		
	if (backButton == false) {
		if (loadItem == 'intro') {
//			history.pushState(null,null,'/macbeth_visual/');  //Comment for local testing.
		}
		else {
//			history.pushState(null,null,loadItem);  //Comment for local testing.
		}
	}
	backButton = false;
	
	//Remove Overlay:
	$('#overlay').remove();
	
	//ESC Remove Overlay:
	$(document).keyup(function(esc) {
		if (esc.which === 27) {
			$('#overlay').remove();
		};
	});
};

$(document).ready(function() {
	console.log( 'Document Ready...' );
	loadContent(pathExtract(location.pathname));
	
	window.addEventListener("popstate",function() { //Back Button
		backButton = true;
	});
	
	//Nav
	var contentItem = ['intro', 'secondary', 'tertiary', 'quaternary', 'quinary', 'senary', 'septenary', 'octonary', 'nonary', 'denary'];
	counter = 0;
	
	console.log( 'Listening for page changes... Counter = ' + counter );
	
	$(".container").on('mouseup', '#next', function() {
		counter++;
		console.log( 'Loading Next... Counter = ' + counter )
		loadContent(contentItem[counter]);
		$('.' + contentItem[counter - 1]).addClass(contentItem[counter]);
		$('.' + contentItem[counter]).removeClass(contentItem[counter - 1]);
	});
	
	$(".container").on('mouseup', '#previous', function() {
		counter--;
		console.log( 'Loading Previous... Counter = ' + counter )
		loadContent(contentItem[counter]);
		$('.' + contentItem[counter + 1]).addClass(contentItem[counter]);
		$('.' + contentItem[counter]).removeClass(contentItem[counter + 1]);
	});
	
	$(".container").on('mouseup', '#home', function() {
		$('.' + contentItem[counter]).addClass(contentItem[0]);
		$('.' + contentItem[counter]).removeClass(contentItem[counter]);
		counter = 0;
		console.log( 'Loading Home... Counter = ' + counter );
		loadContent(contentItem[counter]);
	});
	
});
