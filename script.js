<script>
let appData = { wijk1: [], wijk2: [] };

// --- Adres netjes maken ---
function formatAddress(address) {
    if (!address) return "";

    address = address.trim();

    // Split op komma → nieuwe regel
    if (address.includes(",")) {
        return address.split(",").map(a => a.trim()).join("<br>");
    }

    return address;
}

// --- Tabbladen ---
function openTab(tabName) {
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    document.querySelectorAll(".tabs button").forEach(btn => btn.classList.remove("active"));
    document.getElementById(tabName + "-tab").classList.add("active");
    document.getElementById("tab-" + tabName).classList.add("active");
}

// --- Laden (JSON → localStorage) ---
function loadAddresses() {
    const stored = localStorage.getItem("kerbode");

    if (stored) {
        appData = JSON.parse(stored);
        displayAddresses("wijk1");
        displayAddresses("wijk2");
    } else {
        // jouw arrays gebruiken
        appData.wijk1 = wijk1Data.map(a => ({
            ...a,
            address: a.address.trim(),
            delivered: false
        }));

        appData.wijk2 = wijk2Data.map(a => ({
            ...a,
            address: a.address.trim(),
            delivered: false
        }));

        saveData();
        displayAddresses("wijk1");
        displayAddresses("wijk2");
    }
}

// --- Opslaan ---
function saveData() {
    localStorage.setItem("kerbode", JSON.stringify(appData));
}

// --- Tonen ---
function displayAddresses(wijk) {
    const tbody = document.getElementById(`address-list-${wijk}`);
    tbody.innerHTML = "";

    appData[wijk].forEach((item, index) => {
        tbody.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>${formatAddress(item.address)}</td>
            <td>${item.comment || ''}</td>
            <td>
                <input type="checkbox" ${item.delivered ? 'checked' : ''}
                onchange="toggleDelivered('${wijk}', ${index}, this.checked)">
            </td>
            <td>
                <button class="action" onclick="editRow('${wijk}', ${index}, this)">✏️</button>
                <button class="action" onclick="deleteRow('${wijk}', ${index})">❌</button>
            </td>
        </tr>`;
    });
}

// --- Checkbox ---
function toggleDelivered(wijk, index, checked) {
    appData[wijk][index].delivered = checked;
    saveData();
}

// --- Reset ---
function resetBezorgstatus(wijk) {
    appData[wijk].forEach(item => item.delivered = false);
    saveData();
    displayAddresses(wijk);
}

// --- Bewerken ---
function editRow(wijk, index, btn) {
    const row = btn.closest("tr");
    const item = appData[wijk][index];

    row.innerHTML = `
        <td><input type="text" value="${item.name}"></td>
        <td><input type="text" value="${item.address}"></td>
        <td><input type="text" value="${item.comment || ''}"></td>
        <td><input type="checkbox" ${item.delivered ? 'checked' : ''}></td>
        <td>
            <button class="action" onclick="saveRow('${wijk}', ${index}, this)">💾</button>
            <button class="action" onclick="displayAddresses('${wijk}')">✖️</button>
        </td>`;
}

// --- Opslaan na bewerken ---
function saveRow(wijk, index, btn) {
    const row = btn.closest("tr");
    const inputs = row.querySelectorAll("input");

    appData[wijk][index] = {
        name: inputs[0].value.trim(),
        address: inputs[1].value.trim(),
        comment: inputs[2].value.trim(),
        delivered: inputs[3].checked
    };

    saveData();
    displayAddresses(wijk);
}

// --- Verwijderen ---
function deleteRow(wijk, index) {
    if (!confirm("Weet je zeker dat je dit adres wilt verwijderen?")) return;

    appData[wijk].splice(index, 1);
    saveData();
    displayAddresses(wijk);
}

// --- Nieuwe rij ---
function addNewRow(wijk) {
    appData[wijk].push({
        name: "",
        address: "",
        comment: "",
        delivered: false
    });

    const index = appData[wijk].length - 1;
    displayAddresses(wijk);
    editRow(wijk, index);
}

// --- Init ---
document.addEventListener("DOMContentLoaded", loadAddresses);
</script>
