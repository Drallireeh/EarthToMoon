let distance_earth_moon = 384400;

let slider = document.getElementById("myRange");
let output = document.getElementById("time");
output.innerHTML = calculateTimeToMoon(slider.value);

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
    output.innerHTML = calculateTimeToMoon(this.value);
}

function calculateTimeToMoon(speed) {
    let time = timeConvert(distance_earth_moon / speed)
    return time;
}

function timeConvert(value) {
    let hours = Math.floor(value / 60);
    let minutes = value % 60;
    let secondes = minutes.toFixed(2);
    let secondes_str = secondes.toString();

    secondes_str = secondes_str.slice(secondes_str.length - 2, secondes_str.length);
    secondes = parseInt(secondes_str);
    minutes = Math.trunc(minutes);

    if (secondes >= 60) {
        minutes++;
        secondes -= 60;
    }

    if (minutes >= 60) {
        hours++;
        minutes -= 60;
    }

    return hours + ":" + minutes + ":" + secondes;
}