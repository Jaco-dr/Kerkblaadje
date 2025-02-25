let addresses = []; // Globale variabele om adressen op te slaan
let selectedAddressIndex = null; // Houdt het geselecteerde adres bij voor bewerken of verwijderen

// Functie om de lijst van adressen weer te geven
function renderAddressList(data) {
    addresses = data;
    const addressListElement = document.getElementById("address-list");
    addressListElement.innerHTML = ''; // Maak de lijst leeg voordat we deze vullen

    addresses.forEach((address, index) => {
        const tr = document.createElement("tr");
        tr.id = `row-${index}`;
        tr.innerHTML = `
            <td>${address.name}</td>
            <td>${address.address}</td>
            <td><input type="checkbox" id="checkbox-${index}" onclick="toggleAddress(${index})"></td>
        `;
        tr.addEventListener("contextmenu", (event) => showContextMenu(event, index)); // Rechtsklikken
        addressListElement.appendChild(tr);
    });
}

// Functie voor het weergeven van het contextmenu
function showContextMenu(event, index) {
    event.preventDefault();
    selectedAddressIndex = index;

    const menu = document.getElementById("context-menu");
    menu.style.top = `${event.clientY}px`;
    menu.style.left = `${event.clientX}px`;
    menu.style.display = 'block';
}

// Functie om het contextmenu te verbergen
document.addEventListener("click", () => {
    document.getElementById("context-menu").style.display = 'none';
});

// Functie om een adres te bewerken
function editAddress() {
    const address = addresses[selectedAddressIndex];
    document.getElementById("new-name").value = address.name;
    document.getElementById("new-address").value = address.address;
    removeAddress(selectedAddressIndex); // Verwijder het oude adres
}

// Functie om een adres te verwijderen
function removeAddress(index) {
    addresses.splice(index, 1);
    saveAddresses();
    renderAddressList(addresses);
}

// Functie om een adres toe te voegen
function addAddress() {
    const nameInput = document.getElementById("new-name").value;
    const addressInput = document.getElementById("new-address").value;
    if (nameInput && addressInput) {
        addresses.push({ name: nameInput, address: addressInput });
        saveAddresses();
        renderAddressList(addresses);
        document.getElementById("new-name").value = "";
        document.getElementById("new-address").value = "";
    } else {
        alert("Vul een naam en adres in.");
    }
}

// Functie om adressen op te slaan in localStorage
function saveAddresses() {
    localStorage.setItem("savedAddresses", JSON.stringify(addresses));
}

// Functie om de tabbladen te tonen
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });
    document.getElementById(tabName).style.display = 'block';

    const tabHeaders = document.querySelectorAll('.tab');
    tabHeaders.forEach(header => {
        header.classList.remove('active');
    });
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

// Bij laden van de pagina, adreslijst ophalen en weergeven
document.addEventListener("DOMContentLoaded", function() {
    const savedAddresses = JSON.parse(localStorage.getItem("savedAddresses"));
    if (savedAddresses) {
        addresses = savedAddresses;
        renderAddressList(addresses);
    }

    showTab('bezorglijst'); // Start op het bezorglijst-tabblad
});
