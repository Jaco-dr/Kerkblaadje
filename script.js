let addressList = [];
let timerInterval;
let startTime;
let elapsedTime = 0;

// Laad de opgeslagen wijk uit localStorage (indien aanwezig)
window.onload = function() {
    if(localStorage.getItem('addressList')) {
        addressList = JSON.parse(localStorage.getItem('addressList'));
        renderAddressList();
    }
};

// Voeg een adres toe
function addAddress() {
    const addressInput = document.getElementById("address-input");
    const newAddress = addressInput.value;
    if(newAddress) {
        addressList.push({ address: newAddress, delivered: false });
        addressInput.value = "";
        saveAddressList();
        renderAddressList();
    }
}

// Opslaan van adreslijst naar localStorage
function saveAddressList() {
    localStorage.setItem('addressList', JSON.stringify(addressList));
}

// Render de adressen in de lijst
function renderAddressList() {
    const list = document.getElementById("address-list");
    list.innerHTML = "";
    addressList.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" id="address-${index}" ${item.delivered ? "checked" : ""} onclick="toggleDelivered(${index})">
            ${item.address}
        `;
        list.appendChild(li);
    });
}

// Toggle de afvinkstatus
function toggleDelivered(index) {
    addressList[index].delivered = !addressList[index].delivered;
    saveAddressList();
}

// Start de timer
function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 1000);
    document.querySelector(".start-btn").disabled = true;
    document.querySelector(".stop-btn").disabled = false;
}

// Stop de timer
function stopTimer() {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    document.querySelector(".start-btn").disabled = false;
    document.querySelector(".stop-btn").disabled = true;
}

// Update de timer weergave
function updateTimer() {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    document.getElementById("timer").innerText = `Tijd: ${formatTime(minutes)}:${formatTime(seconds)}`;
}

// Formatteer tijd als 2 cijfers
function formatTime(time) {
    return time < 10 ? '0' + time : time;
}
