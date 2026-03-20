let appData = { wijk1: [], wijk2: [] };
let editingIndex = null;
let editingWijk = null;

// --- Tabbladen ---
function openTab(tabName) {
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    document.querySelectorAll(".tabs button").forEach(btn => btn.classList.remove("active"));
    document.getElementById(tabName + "-tab").classList.add("active");
    document.getElementById("tab-" + tabName).classList.add("active");
}

// --- Laad adressen ---
function loadAddresses() {
    const storedData = JSON.parse(localStorage.getItem("kerbode"));
    if (storedData) {
        appData = storedData;
        displayAddresses('wijk1');
        displayAddresses('wijk2');
    } else {
        fetch('adressen.json')
            .then(response => response.json())
            .then(data => {
                appData.wijk1 = data.wijk1.map(a => ({ ...a, delivered: false }));
                appData.wijk2 = data.wijk2.map(a => ({ ...a, delivered: false }));
                localStorage.setItem("kerbode", JSON.stringify(appData));
                displayAddresses('wijk1');
                displayAddresses('wijk2');
            })
            .catch(error => console.error('Error loading JSON:', error));
    }
}

// --- Adressen tonen ---
function displayAddresses(wijk) {
    const listEl = document.getElementById(`address-list-${wijk}`);
    listEl.innerHTML = "";
    appData[wijk].forEach((item, index) => {
        listEl.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.address}</td>
                <td>${item.comment || ''}</td>
                <td><input type="checkbox" onchange="handleCheckboxChange('${wijk}', ${index}, this.checked)" ${item.delivered ? 'checked' : ''}></td>
                <td>
                    <button class="action" onclick="editAddress('${wijk}', ${index})">✏️</button>
                    <button class="action" onclick="deleteAddress('${wijk}', ${index})">❌</button>
                </td>
            </tr>
        `;
    });
}

// --- Checkbox verandering ---
function handleCheckboxChange(wijk, index, checked) {
    appData[wijk][index].delivered = checked;
    localStorage.setItem("kerbode", JSON.stringify(appData));
}

// --- Reset bezorgstatus ---
function resetBezorgstatus(wijk) {
    appData[wijk].forEach(item => item.delivered = false);
    localStorage.setItem("kerbode", JSON.stringify(appData));
    displayAddresses(wijk);
}

// --- Adres toevoegen/bewerken ---
function saveAddress() {
    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const comment = document.getElementById("comment").value.trim();
    const wijk = document.getElementById("wijk").value;

    if (!name || !address) {
        alert("Naam en adres zijn verplicht.");
        return;
    }

    const newItem = { name, address, comment, delivered: false };

    if (editingIndex !== null && editingWijk === wijk) {
        appData[wijk][editingIndex] = newItem;
        editingIndex = null;
        editingWijk = null;
    } else {
        appData[wijk].push(newItem);
    }

    clearForm();
    localStorage.setItem("kerbode", JSON.stringify(appData));
    displayAddresses(wijk);
}

// --- Bewerken ---
function editAddress(wijk, index) {
    const item = appData[wijk][index];
    document.getElementById("name").value = item.name;
    document.getElementById("address").value = item.address;
    document.getElementById("comment").value = item.comment;
    document.getElementById("wijk").value = wijk;
    editingIndex = index;
    editingWijk = wijk;
}

// --- Verwijderen ---
function deleteAddress(wijk, index) {
    if (!confirm("Weet je het zeker dat je dit adres wilt verwijderen?")) return;
    appData[wijk].splice(index, 1);
    localStorage.setItem("kerbode", JSON.stringify(appData));
    displayAddresses(wijk);
}

// --- Formulier resetten ---
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("address").value = "";
    document.getElementById("comment").value = "";
    editingIndex = null;
    editingWijk = null;
}

// --- Event listeners resetknoppen ---
document.getElementById("reset-button-wijk1").addEventListener("click", () => resetBezorgstatus("wijk1"));
document.getElementById("reset-button-wijk2").addEventListener("click", () => resetBezorgstatus("wijk2"));

// --- Initialisatie bij laden pagina ---
document.addEventListener("DOMContentLoaded", loadAddresses);
