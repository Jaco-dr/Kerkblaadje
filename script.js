// Adressenlijst als objecten
const addresses = [
    { naam: 'Mw. van de Broek', adres: 'Vermeerlaan 1', opmerkingen: '', bezorgd: false },
    { naam: 'Wilmar Hardeman', adres: 'Glashorst 46', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. Wisse', adres: 'Glashorst 68', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. de Jager', adres: 'Glashorst 70', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. Velthuizen', adres: 'Pluimenweg 17', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. van Ginkel', adres: 'Industrielaan 10', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. van de Kamp', adres: 'Prinsenlaan 42', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. den Hartog', adres: 'Prinsenlaan 35', opmerkingen: '', bezorgd: false },
    { naam: 'Mw. Boer', adres: 'Stationsweg 334', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. Haanschoten', adres: 'Stationsweg 338', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. van Dijkhuizen', adres: 'Industrielaan 4', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. van den Bosch', adres: 'Burg. Röell-laan 9', opmerkingen: '', bezorgd: false },
    { naam: 'Mw. Mulder', adres: 'Holevoetlaan 45', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. Westeneng', adres: 'Het Pella 1', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. Brand', adres: 'Burg. Colijn de Raadsingel 12', opmerkingen: '', bezorgd: false },
    { naam: 'Dhr. Hardeman', adres: 'Vierzinnen 52', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. Heijkamp', adres: 'Vierzinnen 18', opmerkingen: '', bezorgd: false },
    { naam: 'Mw. van Setten', adres: 'Lindenlaan 54', opmerkingen: '', bezorgd: false },
    { naam: 'Mw. Kieft', adres: 'Lindenlaan 32', opmerkingen: '', bezorgd: false },
    { naam: 'Mw. ten Broek', adres: 'Wilgenhof 29', opmerkingen: 'Brievenbus zit in de poort', bezorgd: false },
    { naam: 'Fam. Gardenier', adres: 'Wilgenhof 33', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. Geurtsen', adres: 'Willaerlaan 50', opmerkingen: '', bezorgd: false },
    { naam: 'Dhr. Versteeg', adres: 'Pr Irenelaan 32', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. Meerkerk', adres: 'Pr Marijkelaan 44', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. Uitbeijersen', adres: 'Ruijsdaellaan 12', opmerkingen: '', bezorgd: false },
    { naam: 'Dhr. van de Kamp', adres: 'Ruijsdaellaan 15', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. Florijn', adres: 'Rembrandtlaan 50', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. Berkhof', adres: 'Eikenlaan 77', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. van Rumpt', adres: 'Egelpad 5', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. den Braber', adres: 'Eikenlaan 129', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. Leijen', adres: 'Rembrandtlaan 84', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. Koppe', adres: 'Paulus Potterlaan 19', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. v.d. Brink', adres: 'Paulus Potterlaan 21', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. de Kruijf', adres: 'Burg. H.v. Konijnenburglaan 34', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. Gardenier', adres: 'Burg. H.v. Konijnenburglaan 30', opmerkingen: '', bezorgd: false },
    { naam: 'Dhr. Kampert', adres: 'Burg. H.v. Konijnenburglaan 13', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. v.d. Wetering', adres: 'Frans Halslaan 20', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. Schouten', adres: 'Frans Halslaan 34', opmerkingen: '', bezorgd: false },
    { naam: 'Fam. de Ruiter', adres: 'Burg. H v. konijnenburglaan 14', opmerkingen: '', bezorgd: false },
];

// Functie om de adressen in de tabel te laden
function loadAddresses() {
    const addressList = document.getElementById('address-list');
    addressList.innerHTML = ''; // Leeg de lijst
    addresses.forEach((address, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${address.naam}</td>
            <td>${address.adres}</td>
            <td>${address.opmerkingen}</td>
            <td><input type="checkbox" id="checkbox-${index}" ${address.bezorgd ? 'checked' : ''} onclick="toggleDelivery(${index})"></td>
        `;
        addressList.appendChild(row);
    });
}

// Functie om de bezorgstatus bij te werken
function toggleDelivery(index) {
    addresses[index].bezorgd = !addresses[index].bezorgd;
}

// Laad de adressen zodra de pagina geladen is
window.onload = loadAddresses;
