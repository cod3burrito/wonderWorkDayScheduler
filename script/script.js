// Current date display
var today = moment();
var presentTime = today.hour();
var rowEl = $(".customRow");
var textAreaEl = $("textarea");
var workDay = JSON.parse(localStorage.getItem(today.format("[Today is ]dddd[, the ] Do[ of ] MMMMM"))) || [];

// Local storage display
if (workDay.length > 0) {
    for (var i = 0; i < workDay.length; i++) {
        $("p:contains('" + workDay[i].eventTime + "')").siblings('textarea').text(workDay[i].eventText);
    }
}

$("#currentDay").text(today.format("[Today is ]dddd[, ] MMMM Do[, ] YYYY. [Let's make it a great day!]"));

// Apply color code to the calendar
textAreaEl.each(function (index) {
    var rowTime = index + 9;
    if(presentTime > rowTime) {
        $(textAreaEl[index]).addClass("past");
    } else if(presentTime === rowTime) {
        $(textAreaEl[index]).addClass("present");
    } else {
        $(textAreaEl[index]).addClass("future");
    }
});

// Save events to the planner
function saveButtonHandler(event) {
    var plan = {};

    if($(event.target).is('i')) {
        plan.eventText = $(event.target).parent('button').siblings('textarea').val()
        plan.eventHour = $(event.target).parent('button').siblings('p').text()
    } else {
        plan.eventText = $(event.target).siblings('textarea').val();
        plan.eventHour = $(event.target).siblings('p').text();
    }

    if (workDay.length === 0) {
        workDay.push(plan);
    } else {
        var doesContain = false;

        for(var i = 0; i < workDay.length; i++) {
            if (workDay[i].eventHour === plan.eventHour) {
                workDay[i].eventText = plan.eventText, doesContain = True;
            }
        }

        if(!doesContain) {
            workDay.push(plan);
        }
    }
    localStorage.setItem(today.format("[Today is ]dddd[, ]Do[ of ] MMMM"), JSON.stringify(workDay));
}

rowEl.on('click', '.saveBtn', saveButtonHandler);