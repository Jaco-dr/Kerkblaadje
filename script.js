let addresses = []; // Lijst om adressen op te slaan

function renderAddressList(data) {
    const addressListElement = document.getElementById("address-list");
    addressListElement.innerHTML = '';  // Maak de lijst leeg voordat we nieuwe data toevoegen

    if (!data || data.length === 0) {
        addressListElement.innerHTML = "<tr><td colspan='3'>Geen adressen beschikbaar.</td></tr>";
        return;  // Als er geen data is, stop de functie
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
        row.style.display = "none"; // Verberg het adres
    } else {
        localStorage.removeItem(`address-${index}-status`);
        row.style.display = ""; // Laat het adres weer zien
    }
}

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


// Functie om nieuwe adressen toe te voegen
function addAddress() {
    const nameInput = document.getElementById("new-name").value;
    const addressInput = document.getElementById("new-address").value;

    if (nameInput && addressInput) {
        const newAddress = { name: nameInput, address: addressInput };
        addresses.push(newAddress); // Voeg het nieuwe adres toe aan de lijst
        renderAddressList(addresses); // Update de lijst met adressen
        document.getElementById("new-name").value = ""; // Reset het invoerveld
        document.getElementById("new-address").value = "";
    } else {
        alert("Vul een naam en adres in.");
    }
}

// Reset de checkboxen van de bezorglijst
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

// Standaard de bezorglijst tab tonen bij laden van de pagina
document.addEventListener("DOMContentLoaded", function() {
    loadAddresses(); // Laad de adressen van GitHub

    // Reset-knop functionaliteit toevoegen
    document.getElementById("reset-button").addEventListener("click", resetCheckboxes);
});
