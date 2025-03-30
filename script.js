// Function to connect to Bluetooth device
async function connectToBluetoothDevice() {
    try {
        // Request Bluetooth device
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ services: ['battery_service'] }] // Modify with TDS sensor's service UUID
        });

        const server = await device.gatt.connect();
        const service = await server.getPrimaryService('battery_service'); // Use the correct service UUID
        const characteristic = await service.getCharacteristic('battery_level'); // Modify with your TDS characteristic UUID

        // Read value (e.g., PPM)
        const value = await characteristic.readValue();
        const ppmValue = value.getUint8(0); // Modify to suit your sensor data format

        // Update the PPM and status
        updatePPMResult(ppmValue);

    } catch (error) {
        console.error('Bluetooth connection failed', error);
    }
}

// Function to update PPM result and status
function updatePPMResult(ppmValue) {
    const ppmElement = document.getElementById('ppm-result');
    ppmElement.textContent = ppmValue;

    const statusText = document.getElementById('status-text');
    const statusDot = document.getElementById('status-dot');

    // Update the status based on PPM value
    if (ppmValue <= 250) { // Safe water condition
        statusText.textContent = 'Safe';
        statusDot.classList.add('green-dot');
        statusDot.classList.remove('red-dot');
    } else { // Unsafe water condition
        statusText.textContent = 'Unsafe';
        statusDot.classList.add('red-dot');
        statusDot.classList.remove('green-dot');
    }
}

// Trigger Bluetooth connection when the page loads
window.addEventListener('load', () => {
    connectToBluetoothDevice();
});
