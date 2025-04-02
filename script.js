function loadAddresses() {
    const url = 'https://raw.githubusercontent.com/Jaco-dr/Kerkblaadje/main/adressen.json';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            addresses = data;
            saveAddresses(); // Opslaan in localStorage voor caching
            renderAddressList();
            renderBeheerList();
        })
        .catch(error => {
            console.error('Fout bij ophalen van adressen:', error);
        });
}

// Haal adressen op uit localStorage, anders laad ze van GitHub
let addresses = JSON.parse(localStorage.getItem("savedAddresses"));

if (!addresses) {
    loadAddresses(); // Eerste keer ophalen van JSON als er niks in localStorage staat
}

function renderAddressList() {
    const addressListElement = document.getElementById("address-list");
    addressListElement.innerHTML = '';

    addresses.forEach((address, index) => {
        const tr = document.createElement("tr");
        tr.id = `row-${index}`;
        tr.innerHTML = `
            <td>${address.name}</td>
            <td>${address.address}</td>
            <td><input type="checkbox" id="checkbox-${index}" onclick="toggleAddress(${index})"></td>
        `;
        addressListElement.appendChild(tr);

        if (localStorage.getItem(`address-${index}-status`) === "bezorgd") {
            document.getElementById(`checkbox-${index}`).checked = true;
            tr.style.display = "none";
        }
    });
}

function renderBeheerList() {
    const beheerListElement = document.getElementById("beheer-list");
    beheerListElement.innerHTML = '';

    addresses.forEach((address, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${address.name}</td>
            <td>${address.address}</td>
            <td><button onclick="removeAddress(${index})">❌</button></td>
        `;
        beheerListElement.appendChild(tr);
    });
}

function addAddress() {
    const nameInput = document.getElementById("new-name").value;
    const addressInput = document.getElementById("new-address").value;
    if (nameInput && addressInput) {
        addresses.push({ name: nameInput, address: addressInput });
        saveAddresses();
        renderAddressList();
        renderBeheerList();
        document.getElementById("new-name").value = "";
        document.getElementById("new-address").value = "";
    } else {
        alert("Vul een naam en adres in.");
    }
}

function removeAddress(index) {
    addresses.splice(index, 1);
    saveAddresses();
    renderAddressList();
    renderBeheerList();
}

function toggleAddress(index) {
    const row = document.getElementById(`row-${index}`);
    if (document.getElementById(`checkbox-${index}`).checked) {
        localStorage.setItem(`address-${index}-status`, "bezorgd");
        row.style.display = "none";
    } else {
        localStorage.removeItem(`address-${index}-status`);
        row.style.display = "";
    }
}

function resetCheckboxes() {
    addresses.forEach((_, index) => {
        localStorage.removeItem(`address-${index}-status`);
        const row = document.getElementById(`row-${index}`);
        if (row) {
            row.style.display = "";
            document.getElementById(`checkbox-${index}`).checked = false;
        }
    });
}

function saveAddresses() {
    localStorage.setItem("savedAddresses", JSON.stringify(addresses));
}

document.addEventListener("DOMContentLoaded", function() {
    if (!addresses) {
        loadAddresses(); // JSON ophalen als localStorage leeg is
    } else {
        renderAddressList();
        renderBeheerList();
    }
    document.getElementById("reset-button").addEventListener("click", resetCheckboxes);
});
