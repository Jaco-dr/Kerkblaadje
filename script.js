// De lijst met adressen
const addresses = [
    { name: 'Mw. van de Broek', address: 'Vermeerlaan 1' },
    { name: 'Wilmar Hardeman', address: 'Glashorst 46' },
    { name: 'Fam. Wisse', address: 'Glashorst 68' },
    { name: 'Fam. de Jager', address: 'Glashorst 70' },
    { name: 'Fam. Velthuizen', address: 'Pluimenweg 17' },
    { name: 'Fam. van Ginkel', address: 'Industrielaan 10' },
    { name: 'Fam. van de Kamp', address: 'Prinsenlaan 42' },
    { name: 'Fam. den Hartog', address: 'Prinsenlaan 35' },
    { name: 'Mw. Boer', address: 'Stationsweg 334' },
    { name: 'Fam. Haanschoten', address: 'Stationsweg 338' },
    { name: 'Fam. van Dijkhuizen', address: 'Industrielaan 4' },
    { name: 'Fam. van den Bosch', address: 'Burg. Röell-laan 9' },
    { name: 'Mw. Mulder', address: 'Holevoetlaan 45' },
    { name: 'Fam. Westeneng', address: 'Het Pella 1' },
    { name: 'Fam. Brand', address: 'Burg. Colijn de Raadsingel 12' },
    { name: 'Dhr. Hardeman', address: 'Vierzinnen 52' },
    { name: 'Fam. Heijkamp', address: 'Vierzinnen 18' },
    { name: 'Mw. van Setten', address: 'Lindenlaan 54' },
    { name: 'Mw. Kieft', address: 'Lindenlaan 32' },
    { name: 'Mw. ten Broek', address: 'Wilgenhof 29' },
    { name: 'Fam. Gardenier', address: 'Wilgenhof 33' },
    { name: 'Fam. Geurtsen', address: 'Willaerlaan 50' },
    { name: 'Dhr. Versteeg', address: 'Pr Irenelaan 32' },
    { name: 'Fam. Meerkerk', address: 'Pr Marijkelaan 44' },
    { name: 'Fam. Uitbeijersen', address: 'Ruijsdaellaan 12' },
    { name: 'Dhr. van de Kamp', address: 'Ruijsdaellaan 15' },
    { name: 'Fam. Florijn', address: 'Rembrandtlaan 50' },
    { name: 'Fam. Berkhof', address: 'Eikenlaan 77' },
    { name: 'Fam. van Rumpt', address: 'Egelpad 5' },
    { name: 'Fam. den Braber', address: 'Eikenlaan 129' },
    { name: 'Fam. Leijen', address: 'Rembrandtlaan 84' },
    { name: 'Fam. Koppe', address: 'Paulus Potterlaan 19' },
    { name: 'Fam. v.d. Brink', address: 'Paulus Potterlaan 21' },
    { name: 'Fam. de Kruijf', address: 'Burg. H.v. Konijnenburglaan 34' },
    { name: 'Fam. Gardenier', address: 'Burg. H.v. Konijnenburglaan 30' },
    { name: 'Dhr. Kampert', address: 'Burg. H.v. Konijnenburglaan 13' },
    { name: 'Fam. v.d. Wetering', address: 'Frans Halslaan 20' },
    { name: 'Fam. Schouten', address: 'Frans Halslaan 34' },
    { name: 'Fam. de Ruiter', address: 'Burg. H v. Konijnenburglaan 14' }
];

// Functie om de lijst met adressen weer te geven
function renderAddressList() {
    const addressListElement = document.getElementById("address-list");
    addressListElement.innerHTML = ''; // Maak de lijst leeg voordat we deze vullen

    addresses.forEach((address, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${address.name} - ${address.address}</span>
            <input type="checkbox" class="checkbox" id="checkbox-${index}" onclick="toggleAddress(${index})">
        `;
        addressListElement.appendChild(li);
    });
}

// Functie om een adres af te vinken
function toggleAddress(index) {
    const checkbox = document.getElementById(`checkbox-${index}`);
    if (checkbox.checked) {
        localStorage.setItem(`address-${index}`, "bezorgd");
    } else {
        localStorage.removeItem(`address-${index}`);
    }
}

// Functie om alles af te vinken
function completeAll() {
    addresses.forEach((address, index) => {
        const checkbox = document.getElementById(`checkbox-${index}`);
        checkbox.checked = true;
        localStorage.setItem(`address-${index}`, "bezorgd");
    });
}

// Laad de lijst bij het openen van de pagina
document.addEventListener("DOMContentLoaded", function() {
    renderAddressList();

    // Vink de adressen af die al als bezorgd zijn gemarkeerd
    addresses.forEach((address, index) => {
        if (localStorage.getItem(`address-${index}`) === "bezorgd") {
            document.getElementById(`checkbox-${index}`).checked = true;
        }
    });
});
