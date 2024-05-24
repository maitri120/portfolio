import * as THREE from 'https://cdn.skypack.dev/three@0.139.0';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.139.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.139.0/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    addLights();
    loadBooks();

    window.addEventListener('resize', onWindowResize, false);

    animate();
}

function addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
}

function loadBooks() {
    const loader = new GLTFLoader();

    const bookData = [
        { url: 'path/to/java_book.glb', position: { x: -5, y: 0, z: 0 } },
        { url: 'path/to/python_book.glb', position: { x: -2.5, y: 0, z: 0 } },
        { url: 'path/to/r_book.glb', position: { x: 0, y: 0, z: 0 } },
        { url: 'path/to/ml_book.glb', position: { x: 2.5, y: 0, z: 0 } },
        { url: 'path/to/ds_book.glb', position: { x: 5, y: 0, z: 0 } },
    ];

    bookData.forEach(book => {
        loader.load(book.url, (gltf) => {
            const model = gltf.scene;
            model.position.set(book.position.x, book.position.y, book.position.z);
            model.scale.set(0.5, 0.5, 0.5);
            model.userData = { clickable: true, type: 'book', projects: generateProjectsForBook(book.url) };
            scene.add(model);
        }, undefined, (error) => {
            console.error(error);
        });
    });
}

function generateProjectsForBook(url) {
    const projectData = {
        'path/to/java_book.glb': [
            { title: 'Java Project 1', description: 'Description for Java Project 1' },
            { title: 'Java Project 2', description: 'Description for Java Project 2' },
        ],
        'path/to/python_book.glb': [
            { title: 'Python Project 1', description: 'Description for Python Project 1' },
            { title: 'Python Project 2', description: 'Description for Python Project 2' },
        ],
        'path/to/r_book.glb': [
            { title: 'R Project 1', description: 'Description for R Project 1' },
            { title: 'R Project 2', description: 'Description for R Project 2' },
        ],
        'path/to/ml_book.glb': [
            { title: 'Machine Learning Project 1', description: 'Description for ML Project 1' },
            { title: 'Machine Learning Project 2', description: 'Description for ML Project 2' },
        ],
        'path/to/ds_book.glb': [
            { title: 'Data Science Project 1', description: 'Description for DS Project 1' },
            { title: 'Data Science Project 2', description: 'Description for DS Project 2' },
        ],
    };

    return projectData[url] || [];
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function onDocumentMouseDown(event) {
    event.preventDefault();

    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const object = intersects[0].object;
        if (object.userData.clickable && object.userData.type === 'book') {
            displayProjects(object.userData.projects);
        }
    }
}

function displayProjects(projects) {
    const projectList = document.createElement('ul');
    projects.forEach(project => {
        const listItem = document.createElement('li');
        listItem.textContent = `${project.title}: ${project.description}`;
        projectList.appendChild(listItem);
    });
    const projectContainer = document.getElementById('project-container');
    projectContainer.innerHTML = '';  // Clear previous content
    projectContainer.appendChild(projectList);
}

document.addEventListener('mousedown', onDocumentMouseDown, false);

init();
