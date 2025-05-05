// Import necessary modules from Three.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Get the container element for the 3D scene
const container = document.getElementById('three-container');

// Set up the WebGL renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight); // Match container size
renderer.setPixelRatio(window.devicePixelRatio); // Match device pixel ratio
renderer.outputColorSpace = THREE.SRGBColorSpace; // Ensure correct color space
renderer.shadowMap.enabled = true; // Enable shadows
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Use soft shadows
container.appendChild(renderer.domElement); // Add renderer to the DOM

// Create a new Three.js scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(
  45, // Field of view
  container.clientWidth / container.clientHeight, // Aspect ratio
  1, // Near clipping plane
  1000 // Far clipping plane
);
camera.position.set(50, 50, 100); // Set camera position

// Set up orbit controls for interactive camera movement
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable smooth transitions
controls.enablePan = true; // Allow panning
controls.minDistance = 30; // Minimum zoom distance
controls.maxDistance = 80; // Maximum zoom distance
controls.minPolarAngle = 0.5; // Minimum vertical rotation
controls.maxPolarAngle = 1.5; // Maximum vertical rotation
controls.target = new THREE.Vector3(0, 1, 0); // Focus point
controls.update(); // Update controls

// Create a ground plane
const groundGeometry = new THREE.PlaneGeometry(200, 200, 32, 32);
groundGeometry.rotateX(-Math.PI / 2); // Rotate to lie flat
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x111111, // Dark color
  side: THREE.DoubleSide // Render both sides
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add(groundMesh); // Add ground to scene

// Add a spotlight to the scene
const spotlight = new THREE.SpotLight(0xffffff, 3, 300, Math.PI / 3, 0.8, 5);
spotlight.position.set(0, 50, 0); // Position the light above
spotlight.castShadow = true; // Enable shadows
spotlight.shadow.bias = -0.0008; // Reduce shadow artifacts
scene.add(spotlight); // Add light to scene

// Load a GLTF model
const loader = new GLTFLoader().setPath('assets/ship/');
loader.load(
  'scene.gltf',
  (gltf) => {
    console.log('loading model');
    const mesh = gltf.scene;

    // Enable shadow casting and receiving on all mesh children
    mesh.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    mesh.position.set(0, 1.05, -1); // Position the model
    scene.add(mesh); // Add model to scene

    // Hide the loading progress indicator
    document.getElementById('progress-container').style.display = 'none';
  },
  (xhr) => {
    // Progress event
    console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
  },
  (error) => {
    // Error event
    console.error(error);
  }
);

// Animation loop
function animate() {
  requestAnimationFrame(animate); // Repeat the animation
  controls.update(); // Update camera controls
  renderer.render(scene, camera); // Render the scene
}

animate(); // Start animation loop

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight; // Update aspect ratio
  camera.updateProjectionMatrix(); // Apply the change
  renderer.setSize(container.clientWidth, container.clientHeight); // Resize renderer
});
