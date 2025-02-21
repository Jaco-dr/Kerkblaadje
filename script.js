// Functie om de lijst van adressen weer te geven
function renderAddressList() {
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
        if (status === "bezorgd") {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
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
    // Loop door alle adressen en zet de checkboxen terug naar niet bezorgd
    addresses.forEach((address, index) => {
        const checkbox = document.getElementById(`checkbox-${index}`);
        checkbox.checked = false;  // Zet de checkbox uit
        localStorage.removeItem(`address-${index}-status`);  // Verwijder de status uit localStorage
    });
}

// Zorg ervoor dat de lijst van adressen geladen wordt zodra de pagina klaar is
document.addEventListener("DOMContentLoaded", function() {
    renderAddressList();
});
