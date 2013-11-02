var Calendar = Calendar || function () {
    //private 
    /*
     * An inverted index that will 
     * point from the start time to 
     * the unique ID of the event
     */
    var invertedIndex = {};

    var resize(){

    }

    var createDiv(e) {
	
	for (var key in this.eventCounter) {
	    if (this.eventCounter.hasOwnProperty(key)) {
		var obj = this.eventCounter[key];
		for (var prop in obj) {
		    if (obj.hasOwnProperty(prop)) {
			console.log(obj[prop]);
		    }
		}
	    }
	}

    }
    
  
    //public
    this.eventCounter = 0;
   
    //add an event to the calendar
    this.addEvent = function(e) {
	if (!invertedIndex[e.start]) {
	    invertedIndex[e.start] = [];
	}
	invertedIndex[e.start].push(this.eventCounter);
	
	//create div from event
	createDiv(e);
    }

    this.getIndex = function() {
	return invertedIndex;
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

    console.log(cal.getIndex());

}
