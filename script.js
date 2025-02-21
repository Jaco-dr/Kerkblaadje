// Functie om de lijst van adressen weer te geven
async function renderAddressList() {
    const addressListElement = document.getElementById("address-list");
    addressListElement.innerHTML = ''; // Maak de lijst leeg voordat we deze vullen

    try {
        // Laad de JSON met adressen via fetch
        const response = await fetch('https://raw.githubusercontent.com/Jaco-dr/Kerkblaadje/main/adressen.json');
        const addresses = await response.json();

        console.log("Adressen geladen:", addresses); // Debugging om te controleren of de adressen goed geladen zijn

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
            console.log(`Adres ${index} status: ${status}`); // Debugging om de status van elke checkbox te controleren
            if (status === "bezorgd") {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
        });
    } catch (error) {
        console.error("Fout bij het laden van de JSON:", error);
    }
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
    const addressListElement = document.getElementById("address-list");
    const checkboxes = addressListElement.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;  // Zet de checkbox uit
    });

    // Verwijder de status van alle adressen uit localStorage
    localStorage.clear();
}

// Zorg ervoor dat de lijst van adressen geladen wordt zodra de pagina klaar is
document.addEventListener("DOMContentLoaded", function() {
    renderAddressList();
});
