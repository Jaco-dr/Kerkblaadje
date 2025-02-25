// Array om de adressen op te slaan
let addresses = [
    { name: 'Jan Jansen', address: 'Straatweg 12', delivered: false },
    { name: 'Piet de Vries', address: 'Laan 34', delivered: true }
];

// Functie om adressen in de Bezorglijst weer te geven
function displayAddresses() {
    const addressList = document.getElementById('address-list');
    addressList.innerHTML = ''; // Maak de lijst leeg voordat je nieuwe items toevoegt

    addresses.forEach((address, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${address.name}</td>
            <td>${address.address}</td>
            <td>${address.delivered ? 'Ja' : 'Nee'}</td>
        `;
        addressList.appendChild(row);
    });
}

// Functie om adressen in het Beheer-gedeelte weer te geven
function displayBeheer() {
    const beheerList = document.getElementById('beheer-list');
    beheerList.innerHTML = '';

    addresses.forEach((address, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${address.name}</td>
            <td>${address.address}</td>
            <td><button onclick="removeAddress(${index})">Verwijderen</button></td>
        `;
        beheerList.appendChild(row);
    });
}

// Functie om een nieuw adres toe te voegen
function addAddress() {
    const nameInput = document.getElementById('new-name');
    const addressInput = document.getElementById('new-address');
    
    // Maak het nieuwe adres object
    const newAddress = {
        name: nameInput.value,
        address: addressInput.value,
        delivered: false
    };

    // Voeg het nieuwe adres toe aan de adressenlijst
    addresses.push(newAddress);

    // Leeg de invoervelden
    nameInput.value = '';
    addressInput.value = '';

    // Werk de tabbladen bij
    displayAddresses();
    displayBeheer();
}

// Functie om een adres te verwijderen
function removeAddress(index) {
    addresses.splice(index, 1); // Verwijder het adres uit de array

    // Werk de tabbladen bij
    displayAddresses();
    displayBeheer();
}

// Functie om de bezorgstatus te resetten
document.getElementById('reset-button').addEventListener('click', () => {
    addresses.forEach(address => {
        address.delivered = false; // Zet alle bezorgstatussen op 'false'
    });

    // Werk de Bezorglijst bij
    displayAddresses();
});

// Event listeners voor tabbladen
document.getElementById('tab-addresses').addEventListener('click', () => {
    document.getElementById('addresses-tab').classList.add('active');
    document.getElementById('beheer-tab').classList.remove('active');
    document.getElementById('tab-addresses').classList.add('active');
    document.getElementById('tab-beheer').classList.remove('active');
});

document.getElementById('tab-beheer').addEventListener('click', () => {
    document.getElementById('beheer-tab').classList.add('active');
    document.getElementById('addresses-tab').classList.remove('active');
    document.getElementById('tab-beheer').classList.add('active');
    document.getElementById('tab-addresses').classList.remove('active');
});

// Initieel de adressen weergeven
displayAddresses();
displayBeheer();
