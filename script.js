let addresses = []; // Dit wordt gevuld met de gegevens uit je JSON bestand

// Haal de adresgegevens op vanaf GitHub Pages
fetch('https://raw.githubusercontent.com/Jaco1988duivensport/krantenwijk-app/main/adresgegevens.json')
    .then(response => response.json())
    .then(data => {
        addresses = data;  // Vul de addresses array met de data
        renderAddressList();  // Render de adressen op de pagina
    })
    .catch(error => {
        console.error('Error loading addresses:', error);
        alert('Er is een probleem met het laden van de adressen.');
    });

// Functie om de adressen weer te geven in de tabel
function renderAddressList() {
    const addressListElement = document.getElementById('address-list');
    addressListElement.innerHTML = ''; // Maak de lijst leeg

    addresses.forEach((address, index) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = address.name;
        row.appendChild(nameCell);

        const addressCell = document.createElement('td');
        addressCell.textContent = address.address;
        row.appendChild(addressCell);

        const statusCell = document.createElement('td');
        statusCell.textContent = address.delivered ? 'Bezorgd' : 'Niet bezorgd';
        row.appendChild(statusCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = address.deliveryDate ? address.deliveryDate : 'N.v.t.';
        row.appendChild(dateCell);

        // Voeg de rij toe aan de tabel
        addressListElement.appendChild(row);
    });
}

// Functie om alle adressen als bezorgd te markeren
function markAllAsDelivered() {
    addresses.forEach(address => {
        if (!address.delivered) {
            address.delivered = true;
            address.deliveryDate = new Date().toLocaleDateString(); // Huidige datum
        }
    });
    renderAddressList();  // Werk de lijst bij
}
