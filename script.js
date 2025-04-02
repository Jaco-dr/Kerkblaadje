let addresses = {
    wijk1: [],
    wijk2: []
};

function loadAddresses() {
    const url = 'https://raw.githubusercontent.com/Jaco-dr/Kerkblaadje/main/adressen.json';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            addresses = data;
            saveAddresses(); // Opslaan in localStorage voor caching
            renderAddressList('wijk1'); // Standaard wijk1 weergeven
            renderBeheerList();
        })
        .catch(error => {
            console.error('Fout bij ophalen van adressen:', error);
        });
}

// Haal adressen op uit localStorage, anders laad ze van GitHub
if (!localStorage.getItem("savedAddresses")) {
    loadAddresses(); // Eerste keer ophalen van JSON als er niks in localStorage staat
} else {
    addresses = JSON.parse(localStorage.getItem("savedAddresses"));
}

function renderAddressList(wijk) {
    const addressListElement = document.getElementById("address-list");
    addressListElement.innerHTML = '';

    const wijkAddresses = addresses[wijk];

    wijkAddresses.forEach((address, index) => {
        const tr = document.createElement("tr");
        tr.id = `row-${wijk}-${index}`;
        tr.innerHTML = `
            <td>${address.name}</td>
            <td>${address.address}</td>
            <td><input type="checkbox" id="checkbox-${wijk}-${index}" onclick="toggleAddress('${wijk}', ${index})"></td>
        `;
        addressListElement.appendChild(tr);

        if (localStorage.getItem(`address-${wijk}-${index}-status`) === "bezorgd") {
            document.getElementById(`checkbox-${wijk}-${index}`).checked = true;
            tr.style.display = "none";
        }
    });
}

function renderBeheerList() {
    const beheerListElement = document.getElementById("beheer-list");
    beheerListElement.innerHTML = '';

    Object.keys(addresses).forEach(wijk => {
        addresses[wijk].forEach((address, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${address.name}</td>
                <td>${address.address}</td>
                <td><button onclick="removeAddress('${wijk}', ${index})">❌</button></td>
            `;
            beheerListElement.appendChild(tr);
        });
    });
}

function addAddress(wijk) {
    const nameInput = document.getElementById("new-name").value;
    const addressInput = document.getElementById("new-address").value;
    if (nameInput && addressInput) {
        addresses[wijk].push({ name: nameInput, address: addressInput });
        saveAddresses();
        renderAddressList(wijk);
        renderBeheerList();
        document.getElementById("new-name").value = "";
        document.getElementById("new-address").value = "";
    } else {
        alert("Vul een naam en adres in.");
    }
}

function removeAddress(wijk, index) {
    addresses[wijk].splice(index, 1);
    saveAddresses();
    renderAddressList(wijk);
    renderBeheerList();
}

function toggleAddress(wijk, index) {
    const row = document.getElementById(`row-${wijk}-${index}`);
    if (document.getElementById(`checkbox-${wijk}-${index}`).checked) {
        localStorage.setItem(`address-${wijk}-${index}-status`, "bezorgd");
        row.style.display = "none";
    } else {
        localStorage.removeItem(`address-${wijk}-${index}-status`);
        row.style.display = "";
    }
}

function resetCheckboxes() {
    Object.keys(addresses).forEach(wijk => {
        addresses[wijk].forEach((_, index) => {
            localStorage.removeItem(`address-${wijk}-${index}-status`);
            const row = document.getElementById(`row-${wijk}-${index}`);
            if (row) {
                row.style.display = "";
                document.getElementById(`checkbox-${wijk}-${index}`).checked = false;
            }
        });
    });
}

function saveAddresses() {
    localStorage.setItem("savedAddresses", JSON.stringify(addresses));
}

document.addEventListener("DOMContentLoaded", function() {
    if (!addresses) {
        loadAddresses(); // JSON ophalen als localStorage leeg is
    } else {
        renderAddressList('wijk1'); // Laad wijk1 bij het opstarten
        renderBeheerList();
    }
    document.getElementById("reset-button").addEventListener("click", resetCheckboxes);
    // Event listener voor wijkkeuze, bijvoorbeeld:
    document.getElementById("wijk1-button").addEventListener("click", function() {
        renderAddressList('wijk1');
    });
    document.getElementById("wijk2-button").addEventListener("click", function() {
        renderAddressList('wijk2');
    });
});
