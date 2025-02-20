let currentIndex = 0;
const flags = ["Antikes Persien", "Römisches Reich", "Antikes Griechenland"];
const flagName = document.getElementById("flag-name");




/*function updateFlag() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    flagName.textContent = flags[currentIndex]; // Namen aktualisieren
}*/

function swipe(direction) {
    const carousel = document.querySelector('.carousel');
    const totalFlags = document.querySelectorAll('.flag').length;

    if (direction === 'left') {
        currentIndex = (currentIndex - 1 + totalFlags) % totalFlags;
        flagName.innerHTML = flags[currentIndex];
    } else {
        currentIndex = (currentIndex + 1) % totalFlags;
        flagName.innerHTML = flags[currentIndex];
    }

    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

flagName.innerHTML = flags[currentIndex];


let request = indexedDB.open("gameDB", 1);

request.onupgradeneeded = function (event) {
    let db = event.target.result;

    // Spieler-Store mit automatischer ID-Erhöhung
    let objectStore = db.createObjectStore("players", { keyPath: "id", autoIncrement: true });

    objectStore.createIndex("name", "name", { unique: false });
};

request.onsuccess = function (event) {
    console.log("Datenbank erfolgreich geöffnet!");
};



function savePlayer(player) {
    let request = indexedDB.open("gameDB", 1);

    request.onsuccess = function (event) {
        let db = event.target.result;
        let transaction = db.transaction(["players"], "readwrite");
        let store = transaction.objectStore("players");

        let addRequest = store.put(player);
        addRequest.onsuccess = () => console.log("Spieler gespeichert!");
    };
}

savePlayer({ id: 1, name: document.getElementById("output-name").value, score: 0 });


document.getElementById("land-wählen").addEventListener("click", function() {
    window.location.assign("tutorial.html");
});


