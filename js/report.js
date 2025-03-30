document.addEventListener("DOMContentLoaded", function () {
    const reportForm = document.querySelector(".report-form");
    const reportsList = document.getElementById("reportsList");

    // Function to load reports from localStorage
    function loadReports() {
        reportsList.innerHTML = ""; // Clear existing content
        const reports = JSON.parse(localStorage.getItem("reports")) || [];
        
        if (reports.length === 0) {
            reportsList.innerHTML = "<p>No reports submitted yet.</p>";
            return;
        }

        reports.forEach((report, index) => {
            const reportDiv = document.createElement("div");
            reportDiv.classList.add("report-item");
            reportDiv.innerHTML = `
                <strong>Location:</strong> ${report.location} <br>
                <strong>Description:</strong> ${report.description} <br>
                <small>Submitted at: ${report.time}</small> <br><br>
            `;
            reportsList.appendChild(reportDiv);
        });
    }

    // Function to show popup confirmation
    function showPopup() {
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.innerText = "Report Submitted Successfully!";
        document.body.appendChild(popup);
        
        setTimeout(() => {
            popup.remove(); // Remove popup after 3 seconds
        }, 3000);
    }

    // Function to scroll to reports section
    function scrollToReports() {
        setTimeout(() => {
            reportsList.scrollIntoView({ behavior: "smooth" });
        }, 500); // Delay to ensure content is loaded
    }

    // Event Listener for Form Submission
    reportForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const location = document.getElementById("location").value.trim();
        const description = document.getElementById("description").value.trim();

        if (!location || !description) {
            alert("Please fill in all required fields!");
            return;
        }

        // Get current time
        const currentTime = new Date().toLocaleString();

        // Create report object
        const newReport = { location, description, time: currentTime };

        // Save to localStorage
        const reports = JSON.parse(localStorage.getItem("reports")) || [];
        reports.push(newReport);
        localStorage.setItem("reports", JSON.stringify(reports));

        // Reset form
        reportForm.reset();

        // Show popup
        showPopup();

        // Reload reports
        loadReports();

        // Scroll to reports section
        scrollToReports();
    });

    // Load reports on page load
    loadReports();
});
