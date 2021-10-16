import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(400).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load("spaceDark.jpg");
scene.background = spaceTexture; ////

// Avatar

const portalCubeTexture = new THREE.TextureLoader().load("portalCube.png");

const portalcube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ map: portalCubeTexture })
);

scene.add(portalcube);

// Moon

const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 20, 20),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

portalcube.position.z = -5;
portalcube.position.x = 2;
portalcube.position.y = 3;

moon.position.z = -10;
moon.position.x = 8;
moon.position.y = 6;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  portalcube.rotation.y += 0.01;
  portalcube.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  portalcube.rotation.x += 0.01;
  portalcube.rotation.y += 0.005;
  portalcube.rotation.z += 0.01;

  portalcube.position.x -= 0.004;
  portalcube.position.y -= 0.004;

  moon.rotation.x += 0.001;
  moon.rotation.y += 0.005;
  moon.rotation.z += 0.001;

  moon.position.x -= 0.003;
  moon.position.y -= 0.003;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
