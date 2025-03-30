// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Interactive button effect
document.querySelectorAll('.event-btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.2)';
    });
    button.addEventListener('mouseleave', () => {
        button.style.boxShadow = 'none';
    });
});

document.addEventListener("DOMContentLoaded", () => {
    displayEvents();

    document.getElementById("hostEventForm").addEventListener("submit", function(event) {
        event.preventDefault();
        hostEvent();
    });
});

// Function to save and display hosted events
function hostEvent() {
    let events = JSON.parse(localStorage.getItem("events")) || [];

    let newEvent = {
        name: document.getElementById("event-name").value,
        description: document.getElementById("event-description").value,
        venue: document.getElementById("event-venue").value,
        start: document.getElementById("event-start").value,
        end: document.getElementById("event-end").value,
        capacity: parseInt(document.getElementById("event-capacity").value),
        registered: 0,
        fee: document.getElementById("event-fee").value
    };

    events.push(newEvent);
    localStorage.setItem("events", JSON.stringify(events));

    alert("Event hosted successfully!");
    document.getElementById("hostEventForm").reset();
    displayEvents();
}

// Function to display all available events
function displayEvents() {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    let eventList = document.getElementById("event-list");

    eventList.innerHTML = "";

    if (events.length === 0) {
        eventList.innerHTML = "<p class='no-events'>No events available.</p>";
    } else {
        events.forEach((event, index) => {
            if (event.registered < event.capacity) {
                let eventCard = document.createElement("div");
                eventCard.classList.add("event-card");

                eventCard.innerHTML = `
                    <div class="event-header">
                        <h3>${event.name}</h3>
                    </div>
                    <div class="event-body">
                        <p><strong>Description:</strong> ${event.description}</p>
                        <p><strong>Venue:</strong> ${event.venue}</p>
                        <p><strong>Start:</strong> ${event.start}</p>
                        <p><strong>End:</strong> ${event.end}</p>
                        <p><strong>Capacity:</strong> ${event.registered}/${event.capacity}</p>
                        <p><strong>Registration Fee:</strong> ${event.fee}</p>
                    </div>
                    <button class="join-btn" onclick="openRegistration(${index})">Join Event</button>
                `;

                eventList.appendChild(eventCard);
            }
        });
    }
}

// Open Registration Form
function openRegistration(index) {
    let modal = document.getElementById("registration-modal");

    if (!modal) return; // Prevent errors if modal isn't found

    // Ensure it's hidden before opening
    modal.style.display = "block";

    // Get stored events
    let events = JSON.parse(localStorage.getItem("events")) || [];
    let event = events[index];

    // Show payment section only if the event has a fee
    if (event && event.fee && event.fee.trim().toLowerCase() !== "free") {
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

    // Get form input values
    let name = document.getElementById("reg-name").value.trim();
    let email = document.getElementById("reg-email").value.trim();
    let contact = document.getElementById("reg-contact").value.trim();

    // Validate inputs
    if (name === "" || email === "" || contact === "") {
        alert("Please fill in all required fields before registering.");
        return;
    }

    // Check if event has space
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

// Ensure modal is hidden when the page loads
document.addEventListener("DOMContentLoaded", function () {
    let modal = document.getElementById("registration-modal");
    if (modal) {
        modal.style.display = "none";
    }
});




