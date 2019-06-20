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

const rotationAsVector = () => {
  return new THREE.Vector3(
    camera.rotation.x,
    camera.rotation.y,
    camera.rotation.z
  )
}

const prevCamera = {
  position: new THREE.Vector3(),
  rotation: new THREE.Vector3()
}
let forceRender = false
const renderLoop = () => {
  requestAnimationFrame(renderLoop)
  if (
    forceRender ||
    camera.position.clone().sub(prevCamera.position).length() ||
    rotationAsVector().sub(prevCamera.rotation).length()
  ) {
    renderer.render(scene, camera)
  }
  prevCamera.position = camera.position.clone()
  prevCamera.rotation = rotationAsVector()
}
requestAnimationFrame(renderLoop)
