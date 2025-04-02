function loadAddresses() {
    const url = 'https://raw.githubusercontent.com/Jaco-dr/Kerkblaadje/main/adressen.json';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            addresses = data;
            saveAddresses(); // Opslaan in localStorage voor caching
            renderAddressList();
            renderBeheerList();
        })
        .catch(error => {
            console.error('Fout bij ophalen van adressen:', error);
        });
}

// Haal adressen op uit localStorage, anders laad ze van GitHub
let addresses = JSON.parse(localStorage.getItem("savedAddresses"));

if (!addresses) {
    loadAddresses(); // Eerste keer ophalen van JSON als er niks in localStorage staat
} else {
    renderAddressList();
    renderBeheerList();
}

function renderAddressList() {
    const addressListElement = document.getElementById("address-list");
    addressListElement.innerHTML = ''; // Leeg de lijst voordat we nieuwe data toevoegen

    addresses.forEach((address, index) => {
        const tr = document.createElement("tr");
        tr.id = `row-${index}`;
        tr.innerHTML = `
            <td>${address.name}</td>
            <td>${address.address}</td>
            <td><input type="checkbox" id="checkbox-${index}" onclick="toggleAddress(${index})"></td>
        `;
        addressListElement.appendChild(tr);

        // Check of het adres al is gemarkeerd als 'bezorgd'
        if (localStorage.getItem(`address-${index}-status`) === "bezorgd") {
            document.getElementById(`checkbox-${index}`).checked = true;
            tr.style.display = "none"; // Verberg het adres
        }
    });
}

function renderBeheerList() {
    const beheerListElement = document.getElementById("beheer-list");
    beheerListElement.innerHTML = ''; // Leeg de beheer lijst

    addresses.forEach((address, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${address.name}</td>
            <td>${address.address}</td>
            <td><button onclick="removeAddress(${index})">❌</button></td>
        `;
        beheerListElement.appendChild(tr);
    });
}

function addAddress() {
    const nameInput = document.getElementById("new-name").value;
    const addressInput = document.getElementById("new-address").value;
    if (nameInput && addressInput) {
        addresses.push({ name: nameInput, address: addressInput });
        saveAddresses();
        renderAddressList();
        renderBeheerList();
        document.getElementById("new-name").value = "";
        document.getElementById("new-address").value = "";
    } else {
        alert("Vul een naam en adres in.");
    }
}

function removeAddress(index) {
    addresses.splice(index, 1);
    saveAddresses();
    renderAddressList();
    renderBeheerList();
}

function toggleAddress(index) {
    const row = document.getElementById(`row-${index}`);
    if (document.getElementById(`checkbox-${index}`).checked) {
        localStorage.setItem(`address-${index}-status`, "bezorgd");
        row.style.display = "none"; // Verberg het adres na 'bezorgd' markering
    } else {
        localStorage.removeItem(`address-${index}-status`);
        row.style.display = ""; // Maak het adres weer zichtbaar als de checkbox niet is aangevinkt
    }
}

function resetCheckboxes() {
    addresses.forEach((_, index) => {
        // Verwijder de status van alle adressen in localStorage
        localStorage.removeItem(`address-${index}-status`);
        const row = document.getElementById(`row-${index}`);
        const checkbox = document.getElementById(`checkbox-${index}`);
        
        if (row) {
            row.style.display = ""; // Zet de zichtbaarheid van de rij terug naar normaal
            checkbox.checked = false; // Zet de checkbox uit
        }
    });
    saveAddresses(); // Heropslaan van de adressen in localStorage
}

function saveAddresses() {
    localStorage.setItem("savedAddresses", JSON.stringify(addresses));
}

// Event listener voor DOMContentLoaded zorgt ervoor dat het script pas wordt uitgevoerd na volledige DOM-lading
document.addEventListener("DOMContentLoaded", function() {
    // Als er geen adressen zijn, wordt de loadAddresses functie aangeroepen
    if (!addresses) {
        loadAddresses();
    } else {
        renderAddressList();
        renderBeheerList();
    }

    // Reset knop event listener
    document.getElementById("reset-button").addEventListener("click", resetCheckboxes);
});
