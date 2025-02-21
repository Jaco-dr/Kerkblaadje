document.addEventListener('DOMContentLoaded', () => {
    const addAdresBtn = document.getElementById('addAdresBtn');
    const adresInput = document.getElementById('adresInput');
    const adresList = document.getElementById('adresList');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const timeDisplay = document.getElementById('timeDisplay');

    let timer;
    let seconds = 0;
    let isRunning = false;

    // Laad opgeslagen wijkgegevens uit localStorage
    const loadWijkData = () => {
        const wijkData = JSON.parse(localStorage.getItem('wijkData')) || { adressen: [] };
        wijkData.adressen.forEach(adres => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" ${adres.afgevinkt ? 'checked' : ''}>
                <span>${adres.adres}</span>
            `;
            adresList.appendChild(li);
        });
    };

    // Sla wijkgegevens op in localStorage
    const saveWijkData = () => {
        const adressen = [];
        const items = adresList.querySelectorAll('li');
        items.forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            const span = item.querySelector('span');
            adressen.push({ adres: span.textContent, afgevinkt: checkbox.checked });
        });
        localStorage.setItem('wijkData', JSON.stringify({ adressen }));
    };

    // Voeg een nieuw adres toe
    addAdresBtn.addEventListener('click', () => {
        const adres = adresInput.value.trim();
        if (adres) {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox">
                <span>${adres}</span>
            `;
            adresList.appendChild(li);
            adresInput.value = '';
            saveWijkData();
        }
    });

    // Start de timer
    startBtn.addEventListener('click', () => {
        if (!isRunning) {
            isRunning = true;
            startBtn.disabled = true;
            stopBtn.disabled = false;
            timer = setInterval(() => {
                seconds++;
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = seconds % 60;
                timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
            }, 1000);
        }
    });

    // Stop de timer
    stopBtn.addEventListener('click', () => {
        if (isRunning) {
            isRunning = false;
            startBtn.disabled = false;
            stopBtn.disabled = true;
            clearInterval(timer);
        }
    });

    // Laad de wijkgegevens bij het laden van de pagina
    loadWijkData();

    // Sla de wijkgegevens op bij het verlaten van de pagina
    window.addEventListener('beforeunload', saveWijkData);
});
