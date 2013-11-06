var Calendar = Calendar || function () {
    //private 
    var self = this; 
    //
    /*
     * An inverted index that will 
     * point from the start time to 
	 * the unique ID of the event
	 */
    var dateStore = {};

    /*
     * takes in an object containing an event
     * returns 1 if invalid input
     * returns 0 otherwise
     */

    var maxOverlapCount = function(a) {
	var max = 0;
	for (var i=0; i<a.length; i++) {
	    if (a[i][2] > max) {
		max = a[i][2];
	    }
	}
	return max;
    }

    function validate(e) {
	if (e.start >= e.end) {
	    console.log("\nInvalid input entered: "+JSON.stringify(e)+"\nStart time cannot be less than or equal to end time.\n");
	    return 1;
	}

	if (e.start < 0 || e.start===720 || e.end > 720) {
	    console.log("\nInvalid input entered: "+JSON.stringify(e)+"\nEnd time cannot be before 9am or past 9pm.\n");
	    return 1;
	}
	return 0;
    }

    function findOverLappingElements(e) {
	var results = [];
	var overlapCount=0;
	var overlappingElements = [];
	console.log(dateStore);
	for (var key in dateStore) {
	    if (dateStore.hasOwnProperty(key)) {
		var obj = dateStore[key];
		//console.log("start time (key) = " + key + " assoc arr (obj) = " + obj);
		len = obj.length;
		for (var i=0; i< len; i++) {
		    var id = obj[i][0];
		    var end = obj[i][1];

		    if ((e.start < key && e.end > end) || ((e.start >= key) && (e.start < end)) || ((e.end >key) && (e.end <= end))) {
			console.log("overlap!\n"+JSON.stringify(obj)+"\n"+JSON.stringify(e)+"\n");
			//we'll draw the events based on the toal width / this value
			overlapCount++; 
			//currOverlapCount++;
			overlappingElements.push(obj[i]);
		    }
		}
	    }
	}

	results.push(overlapCount);
	results.push(overlappingElements);
	return results;
    }

    function calendarEvent(e) {
	this.e = e;
    }

    function getEventsToRight(e, overlappingElements, overlapCount) {
	//console.log("get events right of " + e);
	for (var x=0; x<overlappingElements.length; x++) {
	    //console.log("["+overlappingElements[x]+"]");
	}
    }

    function createDiv(e) {
	//console.log(dateStore);
	//iterate and find any overlapping events
	//var newEvent = new calendarEvent(e);
	//console.log("new event obj = " + JSON.stringify(newEvent));
	var overlap = findOverLappingElements(e);
	var overlappingElements = overlap[1];
	var overlapCount = overlap[0];
	var eventsToRight = getEventsToRight(e, overlappingElements, overlapCount);
	

	//console.log("overlap elements = " + overlappingElements);
	//console.log("overlap count = " + overlapCount);
	//console.log("# events = " + self.eventCounter);
	var temp = [self.eventCounter, e.end, overlapCount, eventsToRight]
	/*
	if (overlapCount > 0) {
	    console.log("pushing"+temp);
	    overlappingElements.push(temp);
	}
	*/
	console.log("this finna be pushed = " + temp);
	dateStore[e.start].push(temp);
    
	resizeDivs(overlapCount, overlappingElements);
	drawDiv(e,overlapCount, overlappingElements);
    }

    function resizeDivs(overlapCount, overlappingElements) {
	if (overlappingElements.length <= 0) return;
	console.log(overlappingElements);
	console.log("overlapping elements:\n")
	for (var x=0; x<overlappingElements.length; x++) {
	    console.log("["+overlappingElements[x]+"]");
	    //get each one
	    if (overlapCount > overlappingElements[x][2]) {
		console.log("what the fuck is overlap count of new = " + overlapCount);
		console.log("what the fuck is overlap count of old = " + overlappingElements[x][2]);
		var newWidth = (self.maxWidth/(overlapCount+1))-1;
		console.log("newWidth= " + newWidth);
		$('#'+overlappingElements[x][0]).css("width",newWidth);
		if (overlappingElements[x][2]> 0) {
		    var newLeft = ((1+newWidth)*(overlappingElements[x][2]+1)+10);
		    console.log("newleft = " + newLeft);
		    $('#'+overlappingElements[x][0]).css("left",newLeft);
		}
	    }
	    //var currElement = $('#'+overlappingElements[x][0]);
	    //console.log(currElement);
	    //alter its size
	}
	console.log("\n");
    }

    function drawDiv(e, overlapCount, overlappingElements) {
	var maxOverlap = maxOverlapCount(overlappingElements);
	console.log("max overlap count = " + maxOverlap);
	console.log("overlap count = " + overlapCount);
	var newEventDiv = document.createElement('div');
	newEventDiv.className = 'event';
	newEventDiv.id= self.eventCounter;
	var styleString = "";
	if (overlapCount > maxOverlap) {
	    styleString += "top:"+e.start+"px;";
	    styleString += "width:"+(self.maxWidth/(overlapCount+1)-1)+"px;";
	    styleString += "height:"+((e.end-e.start)-2)+"px;";
	    if (overlapCount > 0) {
		styleString += "left:"+((self.maxWidth/(overlapCount+1))+10)+"px;";
	    }
	}
	else {
	    styleString += "top:"+e.start+"px;";
	    styleString += "width:"+(self.maxWidth/(maxOverlap+1)-1)+"px;";
	    styleString += "height:"+((e.end-e.start)-2)+"px;";
	}
	newEventDiv.style.cssText = styleString;
	console.log("new event div");
	console.log(newEventDiv);
	$('.calendar').append(newEventDiv);
    }

    
  
    //public
    this.maxWidth = 600;
    this.eventCounter = 0;
    this.calendarDiv = document.getElementsByClassName('calendar')[0];
    
    this.addEvent = function(e) {
	//validate input
	if (validate(e) === 1) {
	    return;	
	}
	if (!dateStore[e.start]) {
	    dateStore[e.start] = [];
	}
	
	//create div from event
	createDiv(e);
    }

    this.getIndex = function() {
	return dateStore;
    }


    this.print = function(e) {
    }

    var deleteEventFromStore = function(id) {
	var start = $('#'+id).css('top');
	start = start.substring(0,start.length-2);
	console.log("pre");
	console.log(dateStore[start]);
	var deleteIndex;
	for (var i=0; i<dateStore[start].length; i++) {
	    if (dateStore[i][0] == id) {
		deleteIndex = i;	
		break;
	    }
	}
	delete dateStore[deleteIndex];
	console.log("post");
	console.log(dateStore);
	$('#'+id).remove();
    }

    this.deleteEvent = function(id) {
	deleteEventFromStore(id);
	
    }

    
}

var cal = new Calendar();


function layOutDay(events) {
    
    //iterate over every event
    events.forEach(function(e){
	//validate input
	
	// find overlap
	
	// 
	cal.addEvent(e);	
	cal.eventCounter++;
    });

    //console.log(cal.getIndex());

}
