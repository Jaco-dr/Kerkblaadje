let addresses = []; // Globale variabele voor adressen

// Functie om de lijst van adressen weer te geven
function renderAddressList(data) {
    addresses = data;
    const addressListElement = document.getElementById("address-list");
    addressListElement.innerHTML = ''; // Maak de lijst leeg voordat we deze vullen

    addresses.forEach((address, index) => {
        const tr = document.createElement("tr");
        tr.id = `row-${index}`;
        tr.innerHTML = `
            <td>${address.name}</td>
            <td>${address.address}</td>
            <td><button onclick="openContextMenu(event, ${index})">Acties</button></td>
        `;
        addressListElement.appendChild(tr);
    });
}

// Functie om het contextmenu te openen
function openContextMenu(event, index) {
    event.preventDefault(); // Voorkom standaard contextmenu

    const menu = document.createElement('div');
    menu.id = 'context-menu';
    menu.style.position = 'absolute';
    menu.style.top = `${event.pageY}px`;
    menu.style.left = `${event.pageX}px`;
    menu.style.background = '#fff';
    menu.style.border = '1px solid #ccc';
    menu.style.padding = '10px';
    menu.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    menu.style.borderRadius = '8px';

    // Voeg bewerken en verwijderen opties toe
    const editOption = document.createElement('div');
    editOption.textContent = 'Bewerk Adres';
    editOption.style.cursor = 'pointer';
    editOption.addEventListener('click', () => editAddress(index));

    const deleteOption = document.createElement('div');
    deleteOption.textContent = 'Verwijder Adres';
    deleteOption.style.cursor = 'pointer';
    deleteOption.addEventListener('click', () => removeAddress(index));

    menu.appendChild(editOption);
    menu.appendChild(deleteOption);

    document.body.appendChild(menu);

    // Verwijder het menu wanneer ergens anders op het scherm geklikt wordt
    window.addEventListener('click', () => menu.remove(), { once: true });
}

// Functie om een adres te bewerken
function editAddress(index) {
    const address = addresses[index];
    document.getElementById('edit-name').value = address.name;
    document.getElementById('edit-address').value = address.address;

    // Toon het formulier
    document.getElementById('edit-form-container').style.display = 'block';

    // Sla het indexnummer op in het formulier voor later gebruik
    document.getElementById('save-button').onclick = () => saveAddress(index);
}

// Functie om een adres op te slaan na bewerking
function saveAddress(index) {
    const name = document.getElementById('edit-name').value;
    const address = document.getElementById('edit-address').value;

    // Update het adres in de lijst
    addresses[index] = { name, address };
    renderAddressList(addresses);

    // Verberg het formulier
    document.getElementById('edit-form-container').style.display = 'none';
}

// Functie om een adres te verwijderen
function removeAddress(index) {
    addresses.splice(index, 1);
    renderAddressList(addresses);
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
});
