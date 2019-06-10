'use strict'

function windowSize(){
    return {
        width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    }
}

var wSize = windowSize()

var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(40, wSize.width / wSize.height)
var renderer = new THREE.WebGLRenderer({ alpha: true })

const spotlight = new THREE.SpotLight(0xEECCAA, 1)
spotlight.position.set(0, 3000, 2000)

scene.add(spotlight)

renderer.setClearColor(0x000000, 0)
renderer.setSize(wSize.width - 20, wSize.height)

camera.position.set(0, 20, 0)
document.body.appendChild(renderer.domElement)

window.onorientationchange = function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize( window.innerWidth - 20, window.innerHeight )
}

window.onresize = function(){
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize( window.innerWidth - 20, window.innerHeight )
}

let cameraRotation = 0
let lastRotation = cameraRotation
function tick(){
    requestAnimationFrame(tick)

    if (lastRotation === cameraRotation) {
      return
    }
    camera.position.x = Math.sin(cameraRotation) * 100
    camera.position.z = Math.cos(cameraRotation) * 100
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    renderer.render(scene, camera)
    lastRotation = cameraRotation
    console.log('rendered')
}
tick()

const randInt = n => Math.floor(Math.random() * n)

const mmo = (g, m) => {
  const group = new THREE.Group()
  for (let i = 0, l = m.length; i < l; i ++) {
    group.add(new THREE.Mesh(g, m[i]))
  }
  return group
}

var material = new THREE.MeshPhongMaterial({
  color: 0x112233
})
var wireframeMaterial  = new THREE.MeshBasicMaterial({
  color: 0x666699,
  wireframe: true
})

const loader = new THREE.OBJLoader()
const addObj = (path, scale, position, materials) => {
  loader.load(
    path,
    (obj) => {
      const g = new THREE.Group()
      obj.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          g.add(mmo(child.geometry, materials))
        }
      })
      g.scale.set(scale, scale, scale)
      g.position.copy(position)
      scene.add(g)
      lastRotation = Infinity
    }
  )
}

addObj('../models/tree.obj', 2.3, new THREE.Vector3(0, -30, 0), [material])

renderer.domElement.className = 'torus-demo'

const setCameraRotation = () => {
  requestAnimationFrame(setCameraRotation)
  cameraRotation = -window.scrollY / 300
}
requestAnimationFrame(setCameraRotation)
