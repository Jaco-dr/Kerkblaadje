// Functie om de JSON van de externe URL (bijvoorbeeld GitHub) te laden
function loadJsonFromGitHub() {
    const url = 'https://raw.githubusercontent.com/Jaco-dr/Kerkblaadje/main/adressen.json';  // URL naar het JSON-bestand

    // Haal het JSON-bestand op via fetch
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Netwerkfout: " + response.statusText);
            }
            return response.json();  // Zet de response om naar JSON
        })
        .then(addresses => {
            console.log(addresses); // Debug: Controleer of de JSON correct wordt opgehaald
            renderAddressList(addresses); // Roep de functie aan om de adressen weer te geven
        })
        .catch(error => {
            console.error("Fout bij het laden van het JSON-bestand:", error);
            alert("Er is een fout opgetreden bij het laden van het JSON-bestand.");
        });
}

// Functie om de lijst van adressen weer te geven
function renderAddressList(addresses) {
    const addressListElement = document.getElementById("address-list");
    addressListElement.innerHTML = ''; // Maak de lijst leeg voordat we deze vullen

    if (addresses.length === 0) {
        console.log("Geen adressen gevonden in de JSON.");  // Debug: Geen adressen in de JSON
    }

    // Loop door de adressen en voeg ze toe aan de tabel
    addresses.forEach((address, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${address.name}</td>
            <td>${address.address}</td>
            <td><input type="checkbox" class="checkbox" id="checkbox-${index}" onclick="toggleAddress(${index})"></td>
        `;
        addressListElement.appendChild(tr);
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

// Zorg ervoor dat de JSON-bestanden geladen worden zodra de pagina klaar is
document.addEventListener("DOMContentLoaded", function() {
    console.log("Pagina geladen, start met het ophalen van de JSON..."); // Debug: Controleer wanneer de pagina geladen is
    loadJsonFromGitHub();
});
