// Initialize Three.js
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Create a geometry and material for drawing
const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
const drawPoints = [];

// Handle mouse events
const canvas = renderer.domElement;

canvas.addEventListener('click', (event) => {
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  const point = new THREE.Vector3(mouseX, mouseY, 0);
  console.log("12345678",point)
  drawPoints.push(point);

  if (drawPoints.length >= 2) {
    const geometry = new THREE.BufferGeometry().setFromPoints(drawPoints);
    const line = new THREE.Line(geometry, material);
    scene.add(line);
  }
});

// Set camera position and orientation
camera.position.z = 1;

// Create a render loop
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
