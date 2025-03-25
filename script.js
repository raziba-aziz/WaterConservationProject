function calculateUsage() {
    let kitchen = parseInt(document.getElementById("kitchen").value) || 0;
    let bathroom = parseInt(document.getElementById("bathroom").value) || 0;
    let laundry = parseInt(document.getElementById("laundry").value) || 0;
    let outdoor = parseInt(document.getElementById("outdoor").value) || 0;

    let totalUsage = kitchen + bathroom + laundry + outdoor;
    let suggestionText = "Your total daily water usage is " + totalUsage + " liters.<br>";

    if (kitchen > 30) {
        suggestionText += "⚠️ Consider using a dishwasher efficiently or washing dishes in a filled basin instead of running water.<br>";
    }
    if (bathroom > 50) {
        suggestionText += "🚿 Reduce shower time or install a low-flow showerhead. Avoid unnecessary toilet flushes.<br>";
    }
    if (laundry > 40) {
        suggestionText += "👕 Wash full loads of laundry instead of partial loads to save water.<br>";
    }
    if (outdoor > 20) {
        suggestionText += "🌿 Use a watering can instead of a hose and water plants in the early morning or late evening to reduce evaporation.<br>";
    }

    if (totalUsage <= 100) {
        suggestionText += "✅ Great job! Your water consumption is within an efficient range.";
    } else {
        suggestionText += "🔄 Try following these tips to reduce your consumption.";
    }

    document.getElementById("suggestions").innerHTML = suggestionText;
}

// Save Event to Local Storage
function saveEvent() {
    let eventName = document.getElementById("event-name").value;
    let venue = document.getElementById("venue").value;
    let capacity = document.getElementById("capacity").value;
    let eventDescription = document.getElementById("event-description").value;
    let startDate = document.getElementById("start-date").value;
    let endDate = document.getElementById("end-date").value;
    let registrationFee = document.getElementById("registration-fee").value || "Free";

    if (eventName && venue && capacity && eventDescription && startDate && endDate) {
        let event = {
            name: eventName,
            venue: venue,
            capacity: parseInt(capacity),
            registered: 0, // Track registrations
            description: eventDescription,
            start: startDate,
            end: endDate,
            fee: registrationFee
        };

        let events = JSON.parse(localStorage.getItem("events")) || [];
        events.push(event);
        localStorage.setItem("events", JSON.stringify(events));

        alert("Event hosted successfully!");
        window.location.href = "join-event.html";
    } else {
        alert("Please fill out all required fields.");
    }
}

function displayEvents() {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    let eventList = document.getElementById("event-list");

    if (events.length === 0) {
        eventList.innerHTML = "<p>No events available.</p>";
    } else {
        eventList.innerHTML = "";
        events.forEach((event, index) => {
            if (event.registered < event.capacity) {
                let eventItem = document.createElement("div");
                eventItem.classList.add("event-item");
                eventItem.innerHTML = `
                    <h3>${event.name}</h3>
                    <p><strong>Description:</strong> ${event.description}</p>
                    <p><strong>Venue:</strong> ${event.venue}</p>
                    <p><strong>Start:</strong> ${event.start}</p>
                    <p><strong>End:</strong> ${event.end}</p>
                    <p><strong>Capacity:</strong> ${event.registered}/${event.capacity}</p>
                    <p><strong>Registration Fee:</strong> ${event.fee}</p>
                    <button onclick="openRegistration(${index})">Join Event</button>
                `;
                eventList.appendChild(eventItem);
            }
        });
    }
}

// Open Registration Form
function openRegistration(index) {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    let selectedEvent = events[index];

    document.getElementById("registration-modal").style.display = "block";
    document.getElementById("registrationForm").setAttribute("data-index", index);

    // Show payment section only if there's a fee
    if (selectedEvent.fee !== "Free") {
        document.getElementById("payment-section").style.display = "block";
    } else {
        document.getElementById("payment-section").style.display = "none";
    }
}

// Close Registration Form
function closeForm() {
    document.getElementById("registration-modal").style.display = "none";
}

// Submit Registration
function submitRegistration() {
    let index = document.getElementById("registrationForm").getAttribute("data-index");
    let events = JSON.parse(localStorage.getItem("events")) || [];

    if (events[index].registered < events[index].capacity) {
        events[index].registered += 1;
        localStorage.setItem("events", JSON.stringify(events));

        alert("Registration successful!");
        closeForm();
        displayEvents();
    } else {
        alert("Sorry, this event is full.");
    }
}

// Load events on join page
if (document.getElementById("event-list")) {
    displayEvents();
}


function submitReport() {
    let reportText = document.getElementById("report-input").value;
    let status = document.getElementById("report-status");

    if (reportText.trim() !== "") {
        status.innerHTML = "Report submitted successfully! Thank you for your concern.";
        document.getElementById("report-input").value = "";
    } else {
        status.innerHTML = "Please enter a valid report before submitting.";
    }
}
