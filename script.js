let addresses = []; // Globale variabele om adressen op te slaan

// Functie om de lijst van adressen weer te geven
function renderAddressList(data) {
    addresses = data; // Sla adressen op in de globale variabele
    const addressListElement = document.getElementById("address-list");
    addressListElement.innerHTML = ''; // Maak de lijst leeg voordat we deze vullen

    addresses.forEach((address, index) => {
        const tr = document.createElement("tr");
        tr.id = `row-${index}`; // Geef de rij een uniek ID
        tr.innerHTML = `
            <td>${address.name}</td>
            <td>${address.address}</td>
            <td><input type="checkbox" class="checkbox" id="checkbox-${index}" onclick="toggleAddress(${index})"></td>
        `;
        addressListElement.appendChild(tr);

        // Controleer de status en pas de checkbox aan
        const status = localStorage.getItem(`address-${index}-status`);
        if (status === "bezorgd") {
            document.getElementById(`checkbox-${index}`).checked = true;
            tr.style.display = "none"; // Verberg de rij als deze al bezorgd was
        }
    });
}

// Functie om de bezorgstatus van een adres te wijzigen
function toggleAddress(index) {
    const checkbox = document.getElementById(`checkbox-${index}`);
    const row = document.getElementById(`row-${index}`);

    if (checkbox.checked) {
        localStorage.setItem(`address-${index}-status`, "bezorgd");
        row.style.display = "none"; // Verberg het adres
    } else {
        localStorage.removeItem(`address-${index}-status`);
        row.style.display = ""; // Laat het adres weer zien
    }
}

// Functie om alle adressen terug te zetten en weer te tonen
function resetCheckboxes() {
    console.log("Resetknop is geklikt!");

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

    console.log("Alle adressen zijn weer zichtbaar.");
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
    
    // Tabbladen logica toevoegen
    const tabAddresses = document.getElementById("tab-addresses");
    const tabBeheer = document.getElementById("tab-beheer");
    const addressesTab = document.getElementById("addresses-tab");
    const beheerTab = document.getElementById("beheer-tab");

    // Functie om tabbladen weer te geven
    function showTab(tab) {
        const tabs = document.querySelectorAll('.tab-content');
        tabs.forEach(t => t.classList.remove('active')); // Verberg alle tabbladen
        tab.classList.add('active'); // Toon het geselecteerde tabblad
    }

    // Initieer de weergave van het eerste tabblad (Bezorglijst)
    showTab(addressesTab);

    // Voeg klik-event listeners toe om tussen tabbladen te schakelen
    tabAddresses.addEventListener("click", function() {
        showTab(addressesTab);
    });

    tabBeheer.addEventListener("click", function() {
        showTab(beheerTab);
    });
});
