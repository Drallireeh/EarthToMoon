let distance_earth_moon = 384400;
let objects = [{ speed: 10, name: "humain à pied" }, { speed: 65, name: "cheval pur-sang" }, { speed: 325, name: "ferrari" }, { speed: 740, name: "avion jet" }, { speed: 1185, name: "A380" }, { speed: 5500, name: "fusée Apollo 11" }];
let ms_to_hours = 3600000;

let slider = document.getElementById("myRange");
let output = document.getElementById("time");
output.innerHTML = calculateTimeToMoon(slider.value);

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
    output.innerHTML = calculateTimeToMoon(this.value);
}

function calculateTimeToMoon(speed) {
    let time = timeConvert((distance_earth_moon / speed) * ms_to_hours);
    return time;
}

function timeConvert(ms) {
    let hours = ms / (ms_to_hours);
    let absoluteHours = Math.floor(hours);
    let h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

    let minutes = (hours - absoluteHours) * 60;
    let absoluteMinutes = Math.floor(minutes);
    let m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

    let seconds = (minutes - absoluteMinutes) * 60;
    let absoluteSeconds = Math.floor(seconds);
    let s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

    return h + 'h ' + m + 'min ' + s + 'sec';
}