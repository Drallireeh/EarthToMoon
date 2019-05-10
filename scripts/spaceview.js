const loader = new THREE.TextureLoader();
let something_already_loaded = false;

function isEverythingLoaded() {
    if (something_already_loaded) {
        scene.add(earth_mesh, moon_mesh);
        earth_mesh.add(pivotPoint);
        pivotPoint.add(moon_mesh);
    }
    else something_already_loaded = true;
}

let earth_mesh;
let moon_mesh;

// Create pivot point
let pivotPoint = new THREE.Object3D();

// Load ressources
loader.load("../assets/images/texture_earth-5400x2700.jpg", function(texture) {
    let earth_material = new THREE.MeshBasicMaterial( {map: texture} );
    earth_mesh = new THREE.Mesh(new THREE.SphereGeometry(25, 32, 32), earth_material);
    isEverythingLoaded();
}, undefined, function(err) { console.log(err)});

loader.load("../assets/images/texture_moon-2048x1024.jpg", function(texture) {
    let moon_material = new THREE.MeshBasicMaterial( {map: texture} );
    moon_mesh = new THREE.Mesh(new THREE.SphereGeometry(10, 32, 32), moon_material);
    moon_mesh.position.set(-60, 0, 0);
    isEverythingLoaded();
}, undefined, function(err) { console.log(err)});

const stars = loader.load("../assets/images/stars-1920x1080.jpg");

const scene = new THREE.Scene();
scene.background = stars; // Add bg

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
camera.position.set(0, 25, 150);
scene.add(camera);

// Render
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// control
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// light
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);


window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

(function animloop() {
    requestAnimFrame(animloop);

    renderer.render(scene, camera);
    render();
})();

function render() {
    // Rotation sur eux-mêmes
    if (earth_mesh && moon_mesh) {
        earth_mesh.rotation.y -= 0.01;
        moon_mesh.rotation.y -= 0.01;
    
        // Rotation autour d'un point à l'aide d'un pivot
        pivotPoint.rotation.y -= 0.002;
    }
}