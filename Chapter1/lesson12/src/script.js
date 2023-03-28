import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {Pane} from 'tweakpane'

/**
 * Textures
 */
const manager = new THREE.LoadingManager()
const loader = new THREE.TextureLoader(manager)
const cubeLoader = new THREE.CubeTextureLoader(manager)

const colorTexture = loader.load('/textures/door/color.jpg')
const alphaTexture = loader.load('/textures/door/alpha.jpg')
const heightTexture = loader.load('/textures/door/height.jpg')
const normalTexture = loader.load('/textures/door/normal.jpg')
const metalnessTexture = loader.load('/textures/door/metalness.jpg')
const roughnessTexture = loader.load('/textures/door/roughness.jpg')
const ambientOcclusionTexture = loader.load('/textures/door/ambientOcclusion.jpg')
const matCapTexture = loader.load('/textures/matcaps/1.png')
const gradientTexture = loader.load('/textures/gradients/3.jpg')
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter

const environmentMapTexture = cubeLoader.load([
    '/textures/environmentMaps/1/py.jpg',
    '/textures/environmentMaps/1/ny.jpg',
    '/textures/environmentMaps/1/pz.jpg',
    '/textures/environmentMaps/1/nz.jpg',
    '/textures/environmentMaps/1/px.jpg',
    '/textures/environmentMaps/1/nx.jpg',
])

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// const material = new THREE.MeshBasicMaterial()
// material.map = colorTexture
// material.color.set('red')
// material.wireframe = true
// material.opacity = 0.5
// material.transparent = true
// material.alphaMap = alphaTexture
// material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial({ matcap: matCapTexture })

// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color('red')

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.envMap = environmentMapTexture
// material.map = colorTexture
// material.aoMap = ambientOcclusionTexture
// material.displacementMap = heightTexture
// material.displacementScale = 0.05
// material.metalnessMap = metalnessTexture
// material.roughnessMap = roughnessTexture
// material.normalMap = normalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = alphaTexture

/**
 * Tweakpane
 */
const pane = new Pane({ title: 'Parameters' })
pane.addInput(material, 'metalness', {
    min: 0,
    max: 1,
    step: 0.0001,
})

pane.addInput(material, 'roughness', {
    min: 0,
    max: 1,
    step: 0.0001,
})

pane.addInput(material, 'aoMapIntensity',{
    min: 0,
    max: 10,
    step: 0.0001
})

pane.addInput(material, 'displacementScale',{
    min: 0,
    max: .25,
    step: 0.0001
})

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material,
)

sphere.geometry.setAttribute(
    'uv2', 
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
)

sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

console.log(plane.geometry.attributes.uv)
plane.geometry.setAttribute(
    'uv2', 
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)

torus.geometry.setAttribute(
    'uv2', 
    new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
)

torus.position.x = 1.5

scene.add(sphere, plane, torus)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
const pointedLight =  new THREE.PointLight(0xffffff, 0.5)
pointedLight.position.x = 2
pointedLight.position.y = 3
pointedLight.position.z = 4

scene.add(ambientLight, pointedLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = elapsedTime * 0.1
    // plane.rotation.y = elapsedTime * 0.1
    // torus.rotation.y = elapsedTime * 0.1

    // sphere.rotation.x = elapsedTime * 0.15
    // plane.rotation.x = elapsedTime * 0.15
    // torus.rotation.x = elapsedTime * 0.15

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()