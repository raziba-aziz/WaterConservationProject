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

    document.getElementById("suggestions").scrollIntoView({ behavior: "smooth" });
}