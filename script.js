let addresses = []; // Globale variabele om adressen op te slaan

// Functie om tabbladen te tonen
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');
    
    const activeTab = document.getElementById(tabName);
    activeTab.style.display = 'block';
    
    const activeTabHeader = document.querySelectorAll('.tab');
    activeTabHeader.forEach(tab => tab.style.backgroundColor = '#f0f0f0');
    
    document.getElementById('tab-' + tabName).style.backgroundColor = '#ddd';
}

// Functie om de lijst van adressen weer te geven
function renderAddressList(data) {
    const addressListElement = document.getElementById("address-list");
    addressListElement.innerHTML = '';  // Maak de lijst leeg voordat we nieuwe data toevoegen

    if (!data || data.length === 0) {
        addressListElement.innerHTML = "<tr><td colspan='3'>Geen adressen beschikbaar.</td></tr>";
        return;
    }

    // Loop door de adressen en voeg ze toe aan de tabel
    data.forEach((address, index) => {
        const tr = document.createElement("tr");
        tr.id = `row-${index}`;
        tr.innerHTML = `
            <td>${address.name}</td>
            <td>${address.address}</td>
            <td><input type="checkbox" class="checkbox" id="checkbox-${index}" onclick="toggleAddress(${index})"></td>
        `;
        addressListElement.appendChild(tr);

        // Controleer de bezorgstatus in localStorage
        const status = localStorage.getItem(`address-${index}-status`);
        if (status === "bezorgd") {
            document.getElementById(`checkbox-${index}`).checked = true;
            tr.style.display = "none";  // Verberg het adres als het al bezorgd is
        }
    });
}

// Functie om de bezorgstatus van een adres te wijzigen
function toggleAddress(index) {
    const checkbox = document.getElementById(`checkbox-${index}`);
    const row = document.getElementById(`row-${index}`);

    if (checkbox.checked) {
        localStorage.setItem(`address-${index}-status`, "bezorgd");
        row.style.display = "none";  // Verberg het adres
    } else {
        localStorage.removeItem(`address-${index}-status`);
        row.style.display = "";  // Laat het adres weer zien
    }
}

// Functie om alle adressen terug te zetten en weer te tonen
function resetCheckboxes() {
    addresses.forEach((_, index) => {
        const checkbox = document.getElementById(`checkbox-${index}`);
        const row = document.getElementById(`row-${index}`);

        if (checkbox) {
            checkbox.checked = false; // Zet de checkbox uit
        }
        if (row) {
            row.style.display = ""; // Laat de rij weer zien
        }
        localStorage.removeItem(`address-${index}-status`); // Verwijder de status uit localStorage
    });
}

// Functie om het JSON-bestand van GitHub te laden
function loadAddresses() {
    const url = 'https://raw.githubusercontent.com/Jaco-dr/Kerkblaadje/main/adressen.json';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Data geladen:", data);  // Log de geladen data
            renderAddressList(data);  // Render de adressen in de bezorglijst
        })
        .catch(error => {
            console.error('Er is een fout opgetreden bij het ophalen van de adressen:', error);
        });
}

// Functie om een nieuw adres toe te voegen
function addAddress() {
    const nameInput = document.getElementById("new-name").value;
    const addressInput = document.getElementById("new-address").value;
    if (nameInput && addressInput) {
        addresses.push({ name: nameInput, address: addressInput });
        renderAddressList(addresses);  // Werk de lijst bij
        document.getElementById("new-name").value = "";
        document.getElementById("new-address").value = "";
    } else {
        alert("Vul een naam en adres in.");
    }
}

// Zorg ervoor dat de lijst van adressen geladen wordt zodra de pagina klaar is
document.addEventListener("DOMContentLoaded", function() {
    loadAddresses();

    // Reset-knop functionaliteit toevoegen
    document.getElementById("reset-button").addEventListener("click", resetCheckboxes);
});
