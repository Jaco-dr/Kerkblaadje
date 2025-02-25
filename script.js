let addresses = []; // Globale variabele

document.addEventListener("DOMContentLoaded", function() {
    loadAddresses();

    // Reset-knop functionaliteit
    document.getElementById("reset-button").addEventListener("click", resetCheckboxes);
});

// Wisselen tussen tabbladen
function showTab(tabName) {
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    document.querySelectorAll(".tab-button").forEach(button => button.classList.remove("active"));

    document.getElementById(tabName).classList.add("active");
    document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add("active");
}

// Adressen laden uit JSON
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
            ${isEditable ? 
                `<td>
                    <button onclick="editAddress(${index})">✏️</button>
                    <button onclick="removeAddress(${index})">❌</button>
                </td>` 
                : 
                `<td><input type="checkbox" id="checkbox-${index}" onclick="toggleAddress(${index})"></td>`
            }
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

// Adres toevoegen
function addAddress() {
    const name = document.getElementById("new-name").value;
    const address = document.getElementById("new-address").value;

    if (name && address) {
        addresses.push({ name, address });
        renderLists();
        document.getElementById("new-name").value = "";
        document.getElementById("new-address").value = "";
    } else {
        alert("Vul zowel een naam als een adres in.");
    }
}

// Checkbox status opslaan
function toggleAddress(index) {
    const checkbox = document.getElementById(`checkbox-${index}`);
    if (checkbox.checked) {
        localStorage.setItem(`address-${index}-status`, "bezorgd");
    } else {
        localStorage.removeItem(`address-${index}-status`);
    }
}

// Checkbox resetten
function resetCheckboxes() {
    addresses.forEach((_, index) => {
        localStorage.removeItem(`address-${index}-status`);
        document.getElementById(`checkbox-${index}`).checked = false;
    });
}
