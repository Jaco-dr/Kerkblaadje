document.addEventListener("DOMContentLoaded", () => {
    const wijkNaamInput = document.getElementById("wijkNaam");
    const startTijdInput = document.getElementById("startTijd");
    const stopTijdInput = document.getElementById("stopTijd");
    const maakWijkButton = document.getElementById("maakWijk");
    const voegAdresToeButton = document.getElementById("voegAdresToe");
    const slaWijkOpButton = document.getElementById("slaWijkOp");
    const adressenLijst = document.getElementById("adressenLijst");
    const wijkAanmaakSectie = document.getElementById("wijk-aanmaken");
    const adressenBeheerSectie = document.getElementById("adressen-beheren");
    const selecteerWijkSectie = document.getElementById("selecteer-wijk");
    const wijkSelecteren = document.getElementById("wijkSelecteren");
    const startWijkButton = document.getElementById("startWijk");
    const timerSection = document.getElementById("timerSection");
    const timerDisplay = document.getElementById("timerDisplay");
    const stopWijkButton = document.getElementById("stopWijk");

    let wijken = []; // Lijst van wijken
    let wijkData = null; // Huidige geselecteerde wijk
    let timer;
    let elapsedTime = 0;  // Tijd in seconden

    // Maak de wijk aan
    maakWijkButton.addEventListener("click", () => {
        const wijkNaam = wijkNaamInput.value;
        const startTijd = startTijdInput.value;
        const stopTijd = stopTijdInput.value;

        if (wijkNaam && startTijd && stopTijd) {
            const newWijk = {
                naam: wijkNaam,
                startTijd: startTijd,
                stopTijd: stopTijd,
                adressen: []
            };

            wijken.push(newWijk); // Voeg wijk toe aan de lijst
            wijkData = newWijk; // Zet wijkData naar de laatst aangemaakte wijk

            // Verberg wijk aanmaken sectie en toon wijk selecteer sectie
            wijkAanmaakSectie.style.display = "none";
            selecteerWijkSectie.style.display = "block";
            updateWijkSelecteren(); // Update de dropdown met de wijken

            console.log("Wijk aangemaakt:", newWijk);
        } else {
            alert("Vul alstublieft alle velden in om de wijk aan te maken.");
        }
    });

    // Update de dropdown lijst van wijken
    function updateWijkSelecteren() {
        wijkSelecteren.innerHTML = '';
        wijken.forEach((wijk, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = wijk.naam;
            wijkSelecteren.appendChild(option);
        });
    }

    // Voeg een nieuw adres toe
    voegAdresToeButton.addEventListener("click", () => {
        const adres = prompt("Voer een adres in:");

        if (adres) {
            wijkData.adressen.push({ adres, voltooid: false });
            updateAdressenLijst();
        }
    });

    // Verwijder een adres
    function verwijderAdres(index) {
        wijkData.adressen.splice(index, 1);
        updateAdressenLijst();
    }

    // Update de weergave van de adressenlijst
    function updateAdressenLijst() {
        adressenLijst.innerHTML = '';
        wijkData.adressen.forEach((adres, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<input type="checkbox" class="adresCheckbox" data-index="${index}" ${adres.voltooid ? 'checked' : ''}> ${adres.adres} 
                            <button onclick="verwijderAdres(${index})">Verwijder</button>`;
            adressenLijst.appendChild(li);
        });

        // Voeg event listener toe voor checkboxen
        document.querySelectorAll('.adresCheckbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const index = e.target.getAttribute('data-index');
                wijkData.adressen[index].voltooid = e.target.checked;
            });
        });
    }

    // Sla de wijk op
    slaWijkOpButton.addEventListener("click", () => {
        console.log("Wijk Gegevens:", wijkData);
        alert("Wijk is opgeslagen!");
    });

    // Start de geselecteerde wijk
    startWijkButton.addEventListener("click", () => {
        const selectedWijkIndex = wijkSelecteren.value;

        if (selectedWijkIndex !== '') {
            wijkData = wijken[selectedWijkIndex];  // Zet wijkData naar de geselecteerde wijk
            updateAdressenLijst(); // Update de adressenlijst

            // Start de timer
            startTimer();
        }
    });

    // Start de timer
    function startTimer() {
        timerSection.style.display = "block";
        elapsedTime = 0;
        timer = setInterval(() => {
            elapsedTime++;
            const hours = String(Math.floor(elapsedTime / 3600)).padStart(2, '0');
            const minutes = String(Math.floor((elapsedTime % 3600) / 60)).padStart(2, '0');
            const seconds = String(elapsedTime % 60).padStart(2, '0');
            timerDisplay.textContent = `Tijd: ${hours}:${minutes}:${seconds}`;
        }, 1000);
    }

    // Stop de wijk en timer
    stopWijkButton.addEventListener("click", () => {
        clearInterval(timer);
        alert(`Wijk gestopt! Totale tijd: ${timerDisplay.textContent}`);
        timerSection.style.display = "none";
    });
});
