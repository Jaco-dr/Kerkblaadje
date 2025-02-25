let addresses = [];
let selectedIndex = null;

function loadAddresses() {
    const url = 'https://raw.githubusercontent.com/Jaco-dr/Kerkblaadje/main/adressen.json';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            addresses = data;
            renderAddressLists();
        })
        .catch(error => console.error("Fout bij laden:", error));
}

function renderAddressLists() {
    renderList("address-list", false);
    renderList("beheer-list", true);
}

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
        tr.addEventListener("contextmenu", (event) => showContextMenu(event, index));
        listElement.appendChild(tr);
    });
}

function showContextMenu(event, index) {
    event.preventDefault();
    selectedIndex = index;

    const menu = document.getElementById("context-menu");
    menu.style.top = `${event.clientY}px`;
    menu.style.left = `${event.clientX}px`;
    menu.style.display = 'block';
}

document.addEventListener("click", () => {
    document.getElementById("context-menu").style.display = 'none';
});

function editAddress() {
    const address = addresses[selectedIndex];
    document.getElementById("new-name").value = address.name;
    document.getElementById("new-address").value = address.address;
    removeAddress();
}

function insertAddress() {
    const name = prompt("Naam nieuw adres:");
    const address = prompt("Adres nieuw adres:");
    if (name && address) {
        addresses.splice(selectedIndex, 0, { name, address });
        renderAddressLists();
    }
}

function removeAddress() {
    addresses.splice(selectedIndex, 1);
    renderAddressLists();
}

function addAddress() {
    const name = document.getElementById("new-name").value;
    const address = document.getElementById("new-address").value;
    if (name && address) {
        addresses.push({ name, address });
        renderAddressLists();
    }
}

document.addEventListener("DOMContentLoaded", loadAddresses);
