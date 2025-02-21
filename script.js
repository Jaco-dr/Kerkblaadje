document.addEventListener('DOMContentLoaded', () => {
    const adresForm = document.getElementById('adresForm');
    const adresInput = document.getElementById('adresInput');
    const adresLijst = document.getElementById('adresLijst');

    // Haal de opgeslagen wijkgegevens op
    let wijkData = JSON.parse(localStorage.getItem('wijkData')) || [];

    // Functie om de lijst met adressen bij te werken
    function updateAdresLijst() {
        adresLijst.innerHTML = '';
        wijkData.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.adres}</span>
                <button data-index="${index}">Verwijder</button>
            `;
            adresLijst.appendChild(li);
        });
    }

    // Voeg een nieuw adres toe
    adresForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nieuwAdres = adresInput.value.trim();
        if (nieuwAdres) {
            wijkData.push({ adres: nieuwAdres });
            localStorage.setItem('wijkData', JSON.stringify(wijkData));
            adresInput.value = '';
            updateAdresLijst();
        }
    });

    // Verwijder een adres
    adresLijst.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const index = e.target.getAttribute('data-index');
            wijkData.splice(index, 1);
            localStorage.setItem('wijkData', JSON.stringify(wijkData));
            updateAdresLijst();
        }
    });

    // Laad de lijst met adressen bij het laden van de pagina
    updateAdresLijst();
});
