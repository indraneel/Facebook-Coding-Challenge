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
    function validate(e) {
	if (e.start >= e.end) {
	    console.log("\nInvalid input entered: "+JSON.stringify(e)+"\nStart time cannot be less than or equal to end time.\n");
	    return 1;
	}

	if (e.start < 0 || e.start=720 || e.end > 720) {
	    console.log("\nInvalid input entered: "+JSON.stringify(e)+"\nEnd time cannot be before 9am or past 9pm.\n");
	    return 1;
	}
	return 0;
    }

    function createDiv(e) {
	//console.log(dateStore);
	//iterate and find any overlapping events
	var overlappingElements = [];
	var overlapCount = 0;
	for (var key in dateStore) {
	    if (dateStore.hasOwnProperty(key)) {
		var obj = dateStore[key];
		//console.log("start time (key) = " + key + " assoc arr (obj) = " + obj);
		len = obj.length;
		for (var i=0; i< len; i++) {
		    var id = obj[i][0];
		    var end = obj[i][1];
		    //var currOverlapCount = obj[i][2];
		    
		    if ((e.start < key && e.end > end) || ((e.start >= key) && (e.start <= end)) || ((e.end >=key) && (e.end <= end))) {
			console.log("overlap!\n"+JSON.stringify(obj)+"\n"+JSON.stringify(e)+"\n");
			//we'll draw the events based on the toal width / this value
			overlapCount++; 
			//currOverlapCount++;
			overlappingElements.push(id);

		    }

		    //[unique iD, end time, split count]
		}
	    }
	}

	if (overlapCount > 0) {
	    overlappingElements.push(self.eventCounter);
	}
	console.log("# events = " + self.eventCounter);
	temp = [self.eventCounter, e.end]
	
	console.log("this finna be pushed = " + temp);
	dateStore[e.start].push(temp);
    
	console.log("overlapping elements:\n" + overlappingElements);
	console.log("overlap count = " + overlapCount);
	drawDiv(e,overlapCount, overlappingElements);
    }

    function resizeDivs() {

    }

    function drawDiv(e, overlapCount, overlappingElements) {
	self.calendarDiv;
	var newEventDiv = document.createElement('div');
	newEventDiv.className = 'event';
	newEventDiv.id= self.eventCounter;
    }

    
  
    //public
    this.eventCounter = 0;
    this.calendarDiv = document.getElementsByClassName('calendar')[0];
    
    this.addEvent = function(e) {
	//validate input
	if (validate(e) == 1) {
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

    
}

var cal = new Calendar();

function layOutDay(events) {
    
    //iterate over every event
    events.forEach(function(e){
	//validate input
	
	// 
	cal.addEvent(e);	
	cal.eventCounter++;
    });

    //console.log(cal.getIndex());

}
