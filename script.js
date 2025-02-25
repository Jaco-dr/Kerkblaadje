document.addEventListener("DOMContentLoaded", function() {
    loadAddresses();

    // Reset-knop functionaliteit toevoegen
    document.getElementById("reset-button").addEventListener("click", resetCheckboxes);
});

// Tabblad wisselen
function showTab(tabName) {
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    document.querySelectorAll(".tab-button").forEach(button => button.classList.remove("active"));

    document.getElementById(tabName).classList.add("active");
    document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add("active");
}

// Laden van JSON
function loadAddresses() {
    fetch('https://raw.githubusercontent.com/Jaco-dr/Kerkblaadje/main/adressen.json')
        .then(response => response.json())
        .then(data => {
            addresses = data;
            renderLists();
        })
        .catch(error => console.error("Fout bij laden:", error));
}

// Beide tabellen renderen
function renderLists() {
    renderList("address-list", false);
    renderList("beheer-list", true);
}

// Functie om lijst te vullen
function renderList(listId, isEditable) {
    const listElement = document.getElementById(listId);
    listElement.innerHTML = "";

    addresses.forEach((address, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${address.name}</td>
            <td>${address.address}</td>
            ${isEditable ? '<td><button onclick="editAddress(' + index + ')">✏️</button></td>' : '<td><input type="checkbox" id="checkbox-' + index + '" onclick="toggleAddress(' + index + ')"></td>'}
        `;
        listElement.appendChild(tr);
    });
}

// Adres bewerken
function editAddress(index) {
    const address = addresses[index];
    const newName = prompt("Nieuwe naam:", address.name);
    const newAddress = prompt("Nieuw adres:", address.address);

    if (newName && newAddress) {
        addresses[index] = { name: newName, address: newAddress };
        renderLists();
    }
}

// Adres verwijderen
function removeAddress(index) {
    addresses.splice(index, 1);
    renderLists();
}
