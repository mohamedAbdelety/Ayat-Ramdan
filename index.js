const msInSecond = 1000
const secondsInMinute = 60
const IntervalTimeByMs = 15 * secondsInMinute * msInSecond
const fadeIn = 30 * msInSecond

const randomNumber = (min, max) => Math.random() * (max - min) + min;

const request = async(ayaNumber) => {
    const response = await fetch("https://api.alquran.cloud/v1/ayah/" + ayaNumber + "/ar.asad");
    const myJson = await response.json();
    createNotification(myJson)
}

setInterval(() => request(randomNumber(1, 6236)), IntervalTimeByMs);


function createNotification(obj) {
    console.log(obj);
    var elem = document.createElement('div');
    elem.id = "ramdan-notification"
    elem.innerHTML = `
            <div>
                <span id="ramdan-notification-close">❌</span>
            </div>
            <div>
                ${obj.data.text} 💚 ${obj.data.surah.name} (${obj.data.numberInSurah}) 
                ${obj.data.surah.revelationType == "Meccan"? "🕋" : "🕌"}
            </div>
    `;
    document.body.appendChild(elem);
    setTimeout(() => {
        const notificationContainer = document.getElementById('ramdan-notification');
        if (notificationContainer != null)
            notificationContainer.remove();
    }, fadeIn)
}

document.querySelector('body').addEventListener('click', function(event) {
    console.log(event.target.id);
    if (event.target.id == 'ramdan-notification-close') {
        document.getElementById('ramdan-notification').remove();
    }
});