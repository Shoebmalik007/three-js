
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let camera, scene, renderer;

let lineStrip;

const params = {
    radius: 0.6
};

init();
render();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 1;

    scene = new THREE.Scene();

    const radius = params.radius;
    const vertices = [];

    for ( let i = 0; i <= 360; i ++ ) {

        vertices.push( new THREE.Vector3( Math.sin( i * ( Math.PI / 180 ) ) * radius, Math.cos( i * ( Math.PI / 180 ) ) * radius, 0 ) );

    }

    const geometry = new THREE.BufferGeometry().setFromPoints( vertices );
    const material = new THREE.LineBasicMaterial( { color: 'blue' } );

    lineStrip = new THREE.Line( geometry, material );
    scene.add( lineStrip );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const gui = new GUI( { width: 300 } );

    gui.add( params, 'radius', 0.1, 2 ).onChange( changeRadius );
    gui.open();

}

function render() {

    renderer.render( scene, camera );

}

function changeRadius() {

    const positionAttribute = lineStrip.geometry.getAttribute( 'position' );
    const radius = params.radius;

    for ( let i = 0; i <= 360; i ++ ) {

        const x = Math.sin( i * ( Math.PI / 180 ) ) * radius;
        const y = Math.cos( i * ( Math.PI / 180 ) ) * radius;
        const z = 0;

        positionAttribute.setXYZ( i, x, y, z );

    }

    positionAttribute.needsUpdate = true;

    render();

}