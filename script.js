// Functie om de JSON van de externe URL (bijvoorbeeld GitHub) te laden
function loadJsonFromGitHub() {
    const url = 'https://raw.githubusercontent.com/Jaco-dr/Kerkblaadje/main/adressen.json';  // URL naar het JSON-bestand

    fetch(url)
        .then(response => response.json()) // Zet de response om naar JSON
        .then(addresses => {
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
    addressListElement.innerHTML = ''; // Maak de lijst leeg

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
    loadJsonFromGitHub();
});
