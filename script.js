// Function to fetch the ESP32 IP address and then PPM data
async function fetchPPMData() {
    try {
        // Use the correct IP address of the ESP32
        const response = await fetch("http://172.20.10.4/data"); // Use the ESP32 IP here
        const data = await response.json();

        const ppmValue = data.ppm; // PPM value returned by ESP32
        const esp32IP = data.ip;  // ESP32's IP address
        
        console.log("ESP32 IP Address:", esp32IP); // For testing, log the IP address
        updatePPMResult(ppmValue);
    } catch (error) {
        console.error("Failed to fetch data from ESP32", error);
    }
}

// Function to update PPM result and status
function updatePPMResult(ppmValue) {
    const ppmElement = document.querySelector("h1");
    ppmElement.textContent = `PPM Result: ${ppmValue}`;

    const statusText = document.getElementById("status-text");
    const statusDot = document.getElementById("status-dot");

    // Update the status based on PPM value
    if (ppmValue <= 400) {
        statusText.textContent = "Safe";
        statusDot.classList.add("green-dot");
        statusDot.classList.remove("red-dot");
    } else {
        statusText.textContent = "Unsafe";
        statusDot.classList.add("red-dot");
        statusDot.classList.remove("green-dot");
    }
}

// Fetch data every 5 seconds
setInterval(fetchPPMData, 5000);

// Initial fetch when the page loads
window.addEventListener("load", fetchPPMData);
