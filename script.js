document.addEventListener('DOMContentLoaded', () => {
    const wijkForm = document.getElementById('wijkForm');
    const wijkNaam = document.getElementById('wijkNaam');
    const adresInput = document.getElementById('adresInput');
    const voegAdresToe = document.getElementById('voegAdresToe');
    const adresLijst = document.getElementById('adresLijst');
    const verwijderLaatsteAdres = document.getElementById('verwijderLaatsteAdres');
    const slaWijkOp = document.getElementById('slaWijkOp');
    const adresSectie = document.getElementById('adresSectie');

    let wijkData = {
        naam: '',
        adressen: []
    };

    wijkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        wijkData.naam = wijkNaam.value.trim();
        if (wijkData.naam) {
            wijkForm.style.display = 'none';
            adresSectie.style.display = 'block';
        }
    });

    voegAdresToe.addEventListener('click', () => {
        const nieuwAdres = adresInput.value.trim();
        if (nieuwAdres) {
            wijkData.adressen.push(nieuwAdres);
            const li = document.createElement('li');
            li.textContent = nieuwAdres;
            adresLijst.appendChild(li);
            adresInput.value = '';
        }
    });

    verwijderLaatsteAdres.addEventListener('click', () => {
        wijkData.adressen.pop();
        adresLijst.removeChild(adresLijst.lastChild);
    });

    slaWijkOp.addEventListener('click', () => {
        if (wijkData.adressen.length > 0) {
            localStorage.setItem(wijkData.naam, JSON.stringify(wijkData));
            alert('Wijk opgeslagen!');
            // Reset de interface voor een nieuwe wijk
            wijkForm.style.display = 'block';
            adresSectie.style.display = 'none';
            wijkNaam.value = '';
            adresLijst.innerHTML = '';
            wijkData = { naam: '', adressen: [] };
        } else {
            alert('Voeg eerst adressen toe voordat je de wijk opslaat.');
        }
    });
});
