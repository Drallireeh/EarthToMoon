let distance_earth_moon = 384400;
let objects = [{ speed: 10, name: "un humain à pied" }, { speed: 65, name: "un cheval pur-sang" }, { speed: 325, name: "une ferrari" }, { speed: 740, name: "un avion jet" }, { speed: 1185, name: "un A380" }, { speed: 5500, name: "une fusée Apollo 11" }];
let ms_to_hours = 3600000;

let slider = document.getElementById("myRange");
let time = document.getElementById("time");
let object_name = document.getElementById("object-name");
let object_speed = document.getElementById("object-speed");

time.innerHTML = calculateTimeToMoon(slider.value);
object_name.innerHTML = getObjectBySpeed(slider.value).name;
object_speed.innerHTML = getObjectBySpeed(slider.value).speed;

slider.oninput = function () {
    let object = getObjectBySpeed(this.value);
    time.innerHTML = calculateTimeToMoon(this.value);
    object_name.innerHTML = object.name;
    object_speed.innerHTML = object.speed;
}

function calculateTimeToMoon(speed) {
    let time = msToHoursMinsSeconds((distance_earth_moon / speed) * ms_to_hours);
    return time;
}

function msToHoursMinsSeconds(ms) {
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

function getObjectBySpeed(speed) {
    for (let i = 0; i < objects.length; i++) {
        if (i !== objects.length - 1) {
            let speed_delta = (objects[i+1].speed - objects[i].speed) / 2;
            if (speed < objects[i].speed + speed_delta) {
                return objects[i];
            }
            else {
                continue;
            }
        }
        else {
            return objects[objects.length-1];
        }
    }
}