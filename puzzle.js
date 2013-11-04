var Calendar = Calendar || function () {
    //private 
    /*
     * An inverted index that will 
     * point from the start time to 
     * the unique ID of the event
     */
    var dateStore = {};

    function createDiv(e) {
	console.log(dateStore);
	//iterate and find any overlapping events
	for (var key in dateStore) {
	    if (dateStore.hasOwnProperty(key)) {
		var obj = dateStore[key];
		console.log("start time (key) = " + key + " assoc arr (obj) = " + obj);
		len = obj.length;
		for (var i=0; i< len; i++) {
		    console.log("obj["+i+"] = " + obj[i]);
		    /*
		    innerlen = len[i].length;
		    for (var j=0; j<innerlen; j++) {
			console.log("obj["+i+"]["+j+"] = " + obj[i][j]);
		    }*/
		}
	    }
	}
    }
    
  
    //public
    this.eventCounter = 0;

    //add an event to the calendar
    this.addEvent = function(e) {
	if (!dateStore[e.start]) {
	    dateStore[e.start] = [];
	}
	temp = [this.eventCounter, e.end]
	dateStore[e.start].push(temp);
	
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
