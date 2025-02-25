// Functie om een adres in te voegen vóór een geselecteerde rij
function insertAddress(index) {
    const address = addresses[index];

    // Prompt voor het invoegen van een nieuw adres vóór het geselecteerde adres
    const newName = prompt("Nieuwe naam voor adres:", "");
    const newAddress = prompt("Nieuw adres voor adres:", "");

    if (newName && newAddress) {
        // Voeg het nieuwe adres in vóór de geselecteerde rij
        addresses.splice(index, 0, { name: newName, address: newAddress });
        renderLists();  // Vernieuw de weergave van de lijsten
    }
}

// Tabel renderen met knoppen voor invoegen
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
                    <button onclick="insertAddress(${index})">➕ Invoegen</button> 
                    <button onclick="removeAddress(${index})">❌ Verwijderen</button>
                </td>` 
                : 
                `<td><input type="checkbox" id="checkbox-${index}" onclick="toggleAddress(${index})"></td>`
            }
        `;
        listElement.appendChild(tr);
    });
}

// Adres verwijderen
function removeAddress(index) {
    addresses.splice(index, 1);
    renderLists();  // Vernieuw de weergave van de lijsten
}
