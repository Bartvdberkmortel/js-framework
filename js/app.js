var eventHandler = {
  events: [], // Lijst van events die zijn toegevoegd aan het element

  bindEvent: function(event, callback, targetElement) {
    // Verwijder een dubbel event
    this.unbindEvent(event, targetElement);

    //Event koppelen aan het element
    targetElement.addEventListener(event, callback, false);

    this.events.push({
      type: event,
      event: callback,
      target: targetElement
    }); // Stop het event in de lijst
  },

  findEvent: function(event) {
    return this.events.filter(function(evt) {
      return (evt.type === event); //if event type is a match return
    }, event)[0];
  },
  unbindEvent: function(event, targetElement) {
    // Zoek events
    var foundEvent = this.findEvent(event);

    // Verwijder event listener wannneer deze gevonden is
    if (foundEvent !== undefined) {
      targetElement.removeEventListener(event, foundEvent.event, false);
    }

    // Werk de events bij
    this.events = this.events.filter(function(evt) {
      return (evt.type !== event);
    }, event);
  }
};

var knop = document.getElementById('knop');
var log = document.getElementById('eventActiesLijst');

function logMsg(e) {
  if (e.type !== undefined) {
    log.innerHTML = log.innerHTML + '<li>Event opgemerkt: ' + e.type + ' </li>';
  }
}

function addEvent() {
  var list = document.getElementById("eventLijst");
  var selected = list.options[list.selectedIndex].value;
  eventHandler.bindEvent(selected, logMsg, document.getElementById('knop'));
  activeList();
}

function activeList() {
  var list = document.getElementById('actieveEventLijst');
  list.innerHTML = '';
  eventHandler.events.forEach(function(e) {
    var opt = document.createElement('option');
    opt.setAttribute('value', e.type);
    opt.innerHTML = e.type;
    list.appendChild(opt);
  });
}

function removeEvent() {
  var list = document.getElementById("actieveEventLijst");
  var selected = list.options[list.selectedIndex].value;
  eventHandler.unbindEvent(selected, document.getElementById('knop'));
  activeList();
}
