const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight)
camera.position.set(0, 0, 100)

const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setClearColor(0x000000, 0)
renderer.setSize(window.innerWidth - 20, window.innerHeight)
renderer.domElement.className = 'webgl-demo'
document.body.appendChild(renderer.domElement)

const spotlight = new THREE.SpotLight(0xEECCAA, 1)
spotlight.position.set(0, 300, 2000)
scene.add(spotlight)

scene.add(new THREE.AmbientLight(0xaaaaaa))

window.onorientationchange = function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

window.onresize = function(){
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}


const renderLoop = () => {
  requestAnimationFrame(renderLoop)
  renderer.render(scene, camera)
}
requestAnimationFrame(renderLoop)
