let wijken = [];
let huidigeWijk = null;

// Functie voor wijk aanmaken
document.getElementById('createWijkBtn').addEventListener('click', function() {
    const wijkNaam = document.getElementById('wijkNaam').value;
    if (wijkNaam && !wijken.includes(wijkNaam)) {
        wijken.push(wijkNaam);
        updateWijkSelect();
        document.getElementById('wijkNaam').value = '';
        alert('Wijk "' + wijkNaam + '" is aangemaakt!');
    } else {
        alert('Voer een geldige naam in voor de wijk!');
    }
});

// Update de wijk select dropdown
function updateWijkSelect() {
    const wijkSelect = document.getElementById('wijkSelect');
    wijkSelect.innerHTML = '<option value="">Selecteer een wijk</option>';
    wijken.forEach(wijk => {
        const option = document.createElement('option');
        option.value = wijk;
        option.textContent = wijk;
        wijkSelect.appendChild(option);
    });
}

// Start de wijk
document.getElementById('startBtn').addEventListener('click', function() {
    const wijkSelect = document.getElementById('wijkSelect');
    huidigeWijk = wijkSelect.value;
    if (huidigeWijk) {
        document.getElementById('adresInput').disabled = false;
        document.getElementById('addAdresBtn').disabled = false;
        alert('Je hebt de wijk "' + huidigeWijk + '" geselecteerd!');
    } else {
        alert('Selecteer een wijk om te starten!');
    }
});

// Adressen toevoegen
document.getElementById('addAdresBtn').addEventListener('click', function() {
    const adres = document.getElementById('adresInput').value;
    if (adres && huidigeWijk) {
        const adresList = document.getElementById('adresList');
        const li = document.createElement('li');
        li.textContent = adres;
        li.setAttribute('data-adres', adres);
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Verwijder';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', function() {
            li.remove();
        });
        li.appendChild(removeBtn);
        adresList.appendChild(li);
        document.getElementById('adresInput').value = '';
    } else {
        alert('Voer een adres in en zorg ervoor dat je een wijk hebt geselecteerd!');
    }
});

// Adressen afvinken tijdens bezorgen
document.getElementById('adresList').addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed');
        const bezorgList = document.getElementById('bezorgList');
        const li = document.createElement('li');
        li.textContent = e.target.textContent;
        bezorgList.appendChild(li);
    }
});
