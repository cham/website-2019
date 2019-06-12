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

const run = () => {
  let cameraRotation = 0
  let lastCameraRotation = cameraRotation
  const tick = () => {
    requestAnimationFrame(tick)

    const camDist = 30
    cameraRotation = window.scrollY / 500
    camera.position.x = (Math.sin(cameraRotation) * camDist)
    camera.position.z = (Math.cos(cameraRotation) * camDist) - (camDist/2) - (camDist/4)
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    renderer.render(scene, camera)
    lastCameraRotation = cameraRotation
  }
  requestAnimationFrame(tick)
}
run()
