//debug
(function viewport(){
	var query = (function parseQuery(){
		var query = {};
		var temp = window.location.search.substring(1).split('&');
		temp.forEach(function(el){
			var q = el.split('=');
			query[q[0]] = q[1];
		});
		return query;
	})();
	
	if (query.debug){
		//create element
		var el = document.createElement("div");

		//style as you wish
		el.id = 'screenSize';
		el.style.position = "fixed";
		el.style.width = "100%";
		el.style.left = "0px";
		el.style.bottom = "5px";
		el.style.color = "#35b4e3";
		el.style.textAlign = "center";
		el.style.fontWeight = "bold";
		el.style.fontSize = "100%";

		//gets size
		function getSize(){ return window.innerWidth + ' x ' + window.innerHeight; }

		//displays size
		function displaySize(){ el.innerHTML = getSize(); }

		//insert element
		document.body.appendChild(el);

		//innitial sizing
		displaySize();

		//resize listener
		window.onresize = displaySize;
	}
})();

(function classToggle(){
	function toggleClass(id, c){
		var obj = document.getElementById(id);
		if (obj.classList.contains(c)) obj.classList.remove(c);
		else obj.classList.add(c);
	}

	window.onkeypress = function(ev){
		switch (ev.keyCode) {
			case 113: //q
				toggleClass('tooltip', 'border');
				break;
			case 119: //w
				toggleClass('tooltip', 'margin');
				break;
			case 101: //e
				toggleClass('tooltip', 'round');
				break;
		}
	}
})();
//end debug

//list itterator
function each(list, callback){
	for (var i = 0, length = list.length; i < length; i++){
		callback(list[i], i, list);
	}
}

//scroll to element
function scrollTo(el){
	if(el.offsetParent){
		window.scroll(0, (function(){
			var position = 0;
			do { position += el.offsetTop; }
			while (el = el.offsetParent);
			return position;
		}()));
	}
}

//get all portfolio images
var images = document.getElementById("portfolio").getElementsByTagName("img");

var imageClick = function imageClick(){
	//methods for display classes
	var dimAll = function(){
		each(images, function(el){
			el.classList.remove("active");
			el.classList.add("dim");
		});
	};
	var resetAll = function(){
		each(images, function(el){
			el.classList.remove("active");
			el.classList.remove("dim");
		});
	};

	//get clicked image
	var img = this;

	//get tooltip description
	var description = function(){
		var desc = img.attributes["data-description"].value;
		var link = "<a href='"
			+ img.attributes["data-link"].value
			+ "' target='blank'>Visit the site</a>";
		return "<div class='text'>" + desc + link + "</div>";
	}();

	//tooltip + methods
	var tooltip = document.getElementById("tooltip");
	var getId = function(el){
		return (el.attributes["data-id"]) ? el.attributes["data-id"].value : undefined;
	};
	var setId = function(val){
		tooltip.attributes["data-id"].value = (val) ? val : "";
	};
	var show = function(){
		//set tooltip
		tooltip.innerHTML = description;
		
		//dim inactive
		dimAll();
		//add active class
		img.classList.add("active");

		//set Id
		setId(getId(img));

		scrollTo(tooltip);
	};
	var hide = function(){
		//reset tooltip
		tooltip.innerHTML = "";
		resetAll();

		//reset Id
		setId();
	};

	//perform tooltip actions
	if (getId(tooltip) === getId(img)) hide();
	else show();
}

//set click events for portfolio images
each(images, function(img){
	img.onclick = imageClick;
});
