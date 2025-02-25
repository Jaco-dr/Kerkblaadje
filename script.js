const defaultAddresses = [
    { "name": "Mw. van de Broek", "address": "Vermeerlaan 1" },
    { "name": "Wilmar Hardeman", "address": "Glashorst 46" },
    { "name": "Fam. Wisse", "address": "Glashorst 68" },
    { "name": "Fam. de Jager", "address": "Glashorst 70" },
    { "name": "Fam. Velthuizen", "address": "Pluimenweg 17" },
    { "name": "Fam. van Ginkel", "address": "Industrielaan 10" },
    { "name": "Fam. van de Kamp", "address": "Prinsenlaan 42" },
    { "name": "Fam. den Hartog", "address": "Prinsenlaan 35" },
    { "name": "Mw. Boer", "address": "Stationsweg 334" },
    { "name": "Fam. Haanschoten", "address": "Stationsweg 338" }
];

let addresses = JSON.parse(localStorage.getItem("savedAddresses")) || defaultAddresses;

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
        document.getElementById(`row-${index}`).style.display = "";
        document.getElementById(`checkbox-${index}`).checked = false;
    });
}

function saveAddresses() {
    localStorage.setItem("savedAddresses", JSON.stringify(addresses));
}

document.addEventListener("DOMContentLoaded", function() {
    renderAddressList();
    renderBeheerList();
    document.getElementById("reset-button").addEventListener("click", resetCheckboxes);
});
