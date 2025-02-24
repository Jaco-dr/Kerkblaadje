let addresses = []; // Maak een globale variabele aan om adressen op te slaan

// Functie om de lijst van adressen weer te geven
function renderAddressList(data) {
    addresses = data; // Sla de adressen op in de globale variabele
    const addressListElement = document.getElementById("address-list");
    addressListElement.innerHTML = ''; // Maak de lijst leeg voordat we deze vullen

    // Loop door de adressen en voeg ze toe aan de tabel
    addresses.forEach((address, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${address.name}</td>
            <td>${address.address}</td>
            <td><input type="checkbox" class="checkbox" id="checkbox-${index}" onclick="toggleAddress(${index})"></td>
        `;
        addressListElement.appendChild(tr);

        // Controleer de status en pas de checkbox aan
        const checkbox = document.getElementById(`checkbox-${index}`);
        const status = localStorage.getItem(`address-${index}-status`);
        checkbox.checked = (status === "bezorgd");
    });
}

// Functie om de bezorgstatus van een adres te wijzigen
function toggleAddress(index) {
    const checkbox = document.getElementById(`checkbox-${index}`);
    if (checkbox.checked) {
        localStorage.setItem(`address-${index}-status`, "bezorgd");
    } else {
        localStorage.removeItem(`address-${index}-status`);
    }
}

// Functie om alle checkboxen te resetten
function resetCheckboxes() {
    addresses.forEach((_, index) => {
        const checkbox = document.getElementById(`checkbox-${index}`);
        if (checkbox) {
            checkbox.checked = false;  // Zet de checkbox uit
        }
        localStorage.removeItem(`address-${index}-status`);  // Verwijder de status uit localStorage
    });
}

// Functie om het JSON-bestand van GitHub te laden
function loadAddresses() {
    const url = 'https://raw.githubusercontent.com/Jaco-dr/Kerkblaadje/main/adressen.json';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            renderAddressList(data);
        })
        .catch(error => {
            console.error('Er is een fout opgetreden bij het ophalen van de adressen:', error);
        });
}

// Zorg ervoor dat de lijst van adressen geladen wordt zodra de pagina klaar is
document.addEventListener("DOMContentLoaded", function() {
    loadAddresses();  

    // Reset-knop functionaliteit toevoegen
    document.getElementById("reset-button").addEventListener("click", resetCheckboxes);
});
