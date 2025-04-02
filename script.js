function loadAddresses() {
    const url = 'https://raw.githubusercontent.com/Jaco-dr/Kerkblaadje/main/adressen.json';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            addresses = data;
            saveAddresses(); // Opslaan in localStorage voor caching
            renderAddressLists();
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

// ✅ Functie om beide wijken te renderen
function renderAddressLists() {
    const addressListWijk2 = document.getElementById("address-list-wijk2");
    const addressListWijk3 = document.getElementById("address-list-wijk3");

    addressListWijk2.innerHTML = '';
    addressListWijk3.innerHTML = '';

    addresses.forEach((address, index) => {
        const tr = document.createElement("tr");
        tr.id = `row-${index}`;
        tr.innerHTML = `
            <td>${address.name}</td>
            <td>${address.address}</td>
            <td><input type="checkbox" id="checkbox-${index}" onclick="toggleAddress(${index})"></td>
        `;

        if (address.wijk === "wijk2") {
            addressListWijk2.appendChild(tr);
        } else if (address.wijk === "wijk3") {
            addressListWijk3.appendChild(tr);
        }

        if (localStorage.getItem(`address-${index}-status`) === "bezorgd") {
            document.getElementById(`checkbox-${index}`).checked = true;
            tr.style.display = "none";
        }
    });
}

// ✅ Beheerlijst aanpassen voor meerdere wijken
function renderBeheerList() {
    const beheerListElement = document.getElementById("beheer-list");
    beheerListElement.innerHTML = '';

    addresses.forEach((address, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${address.name}</td>
            <td>${address.address}</td>
            <td>${address.wijk}</td>
            <td><button onclick="removeAddress(${index})">❌</button></td>
        `;
        beheerListElement.appendChild(tr);
    });
}

// ✅ Adres toevoegen per wijk
function addAddress() {
    const nameInput = document.getElementById("new-name").value;
    const addressInput = document.getElementById("new-address").value;
    const wijkInput = document.getElementById("new-wijk").value;

    if (nameInput && addressInput) {
        addresses.push({ name: nameInput, address: addressInput, wijk: wijkInput });
        saveAddresses();
        renderAddressLists();
        renderBeheerList();
        document.getElementById("new-name").value = "";
        document.getElementById("new-address").value = "";
    } else {
        alert("Vul een naam en adres in.");
    }
}

// ✅ Reset checkboxen per wijk
function resetCheckboxes(wijk) {
    addresses.forEach((_, index) => {
        if (addresses[index].wijk === wijk) {
            localStorage.removeItem(`address-${index}-status`);
            const row = document.getElementById(`row-${index}`);
            if (row) {
                row.style.display = "";
                document.getElementById(`checkbox-${index}`).checked = false;
            }
        }
    });
}

// ✅ Opslaan in localStorage
function saveAddresses() {
    localStorage.setItem("savedAddresses", JSON.stringify(addresses));
}

// ✅ Event Listeners
document.addEventListener("DOMContentLoaded", function() {
    if (!addresses) {
        loadAddresses();
    } else {
        renderAddressLists();
        renderBeheerList();
    }

    document.getElementById("reset-button-wijk2").addEventListener("click", function () {
        resetCheckboxes("wijk2");
    });

    document.getElementById("reset-button-wijk3").addEventListener("click", function () {
        resetCheckboxes("wijk3");
    });
});
