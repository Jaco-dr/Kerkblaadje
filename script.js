let addresses = []; // Globale variabele om adressen op te slaan

// Functie om de lijst van adressen weer te geven op het bezorglijst-tabblad
function renderAddressList(data) {
    addresses = data; // Sla de adressen op
    const addressListElement = document.getElementById("address-list");
    addressListElement.innerHTML = ''; // Maak de lijst leeg voordat we deze vullen

    addresses.forEach((address, index) => {
        const tr = document.createElement("tr");
        tr.id = `row-${index}`;
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
            tr.style.display = "none"; // Verberg de rij als het al bezorgd is
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

// Functie om de adressen te tonen in het beheer tabblad
function renderBeheerList() {
    const beheerListElement = document.getElementById("beheer-list");
    beheerListElement.innerHTML = '';

    addresses.forEach((address, index) => {
        const tr = document.createElement("tr");
        tr.id = `row-beheer-${index}`;
        tr.innerHTML = `
            <td>${address.name}</td>
            <td>${address.address}</td>
            <td><button onclick="removeAddress(${index})">❌</button></td>
        `;
        beheerListElement.appendChild(tr);
    });
}

// Functie om een nieuw adres toe te voegen
function addAddress() {
    const nameInput = document.getElementById("new-name").value;
    const addressInput = document.getElementById("new-address").value;
    if (nameInput && addressInput) {
        addresses.push({ name: nameInput, address: addressInput });
        saveAddresses();
        renderAddressList(addresses);
        renderBeheerList();
        document.getElementById("new-name").value = "";
        document.getElementById("new-address").value = "";
    } else {
        alert("Vul een naam en adres in.");
    }
}

// Functie om een adres te verwijderen uit de lijst
function removeAddress(index) {
    addresses.splice(index, 1);
    saveAddresses();
    renderBeheerList();
    renderAddressList(addresses);
}

// Functie om de adressen in localStorage op te slaan
function saveAddresses() {
    localStorage.setItem("savedAddresses", JSON.stringify(addresses));
}

// Functie om de adressen uit localStorage te laden
function loadAddresses() {
    const savedAddresses = JSON.parse(localStorage.getItem("savedAddresses"));
    if (savedAddresses) {
        renderAddressList(savedAddresses);
        renderBeheerList();
    } else {
        const url = 'https://raw.githubusercontent.com/Jaco-dr/Kerkblaadje/main/adressen.json';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                renderAddressList(data);
                renderBeheerList();
            })
            .catch(error => {
                console.error('Er is een fout opgetreden bij het ophalen van de adressen:', error);
            });
    }
}

// Functie om tabbladen te wisselen
function openTab(evt, tabName) {
    const tabContents = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }
    const tabLinks = document.getElementsByClassName("tablink");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

// Zorg ervoor dat de lijst van adressen geladen wordt zodra de pagina klaar is
document.addEventListener("DOMContentLoaded", function() {
    loadAddresses();
    document.getElementById("reset-button").addEventListener("click", resetCheckboxes);
    openTab(event, 'bezorglijst'); // Zet de default tab op bezorglijst
});
