const DISTANCE_EARTH_MOON = 384400;
const MS_TO_HOURS = 3600000;

const objects = [
    { speed: 10, name: "un humain à pied" },
    { speed: 65, name: "un cheval pur-sang" },
    { speed: 325, name: "une ferrari" },
    { speed: 740, name: "un avion jet" },
    { speed: 1185, name: "un A380" },
    { speed: 5500, name: "une fusée Apollo 11" }
];

// Get elements by id
let slider = document.getElementById("myRange");
let speed = document.getElementById("speed");
let time = document.getElementById("time");
let object_name = document.getElementById("object-name");
let object_speed = document.getElementById("object-speed");

// Base display
speed.innerHTML = slider.value;
time.innerHTML = calculateTimeToMoon(slider.value);
object_name.innerHTML = getObjectBySpeed(slider.value).name;
object_speed.innerHTML = getObjectBySpeed(slider.value).speed;

// Called while user interract with slider
slider.oninput = function () {
    let object = getObjectBySpeed(this.value);
    speed.innerHTML = this.value;
    time.innerHTML = calculateTimeToMoon(this.value);
    object_name.innerHTML = object.name;
    object_speed.innerHTML = object.speed;
}

/**
 * Calculate the time you'll need to go to the moon at this speed.
 * @param {number} speed Speed in km/h
 */
function calculateTimeToMoon(speed) {
    let time = msToHoursMinsSeconds((DISTANCE_EARTH_MOON / speed) * MS_TO_HOURS);
    return time;
}

/**
 * Transform a duration in ms in format hh:mm:ss
 * @param {number} ms milliseconds (ms)
 */
function msToHoursMinsSeconds(ms) {
    let hours = ms / (MS_TO_HOURS);
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

/**
 * Return the object which match the best with your actual speed
 * @param {number} speed speed in km/h
 */
function getObjectBySpeed(speed) {
    for (let i = 0; i < objects.length; i++) {
        if (i !== objects.length - 1) {
            let speed_delta = (objects[i + 1].speed - objects[i].speed) / 2;
            if (speed < objects[i].speed + speed_delta) {
                return objects[i];
            }
            else {
                continue;
            }
        }
        else {
            return objects[objects.length - 1];
        }
    }
}