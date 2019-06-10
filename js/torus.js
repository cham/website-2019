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

renderer.setClearColor(0x000000, 0)
renderer.setSize(wSize.width, wSize.height)

camera.position.set(0, 50, 0)
document.body.appendChild(renderer.domElement)

window.onorientationchange = function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize( window.innerWidth, window.innerHeight )
}

window.onresize = function(){
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize( window.innerWidth, window.innerHeight )
}

var cameraRotation = 0
function tick(){
    requestAnimationFrame(tick)

    camera.position.x = Math.sin(cameraRotation) * 100
    camera.position.z = Math.cos(cameraRotation) * 100
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    renderer.render(scene, camera)

    cameraRotation += 0.01
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

const torusknot = () => {
  var geometry = new THREE.TorusKnotGeometry(20, 5, 200, 16, randInt(6), randInt(6))
  var material = new THREE.MeshBasicMaterial({
    color: 0xdddddd
  })
  var wireframeMaterial  = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
  })
  return mmo(geometry, [
    material,
    wireframeMaterial
  ])
}

scene.add(torusknot())

renderer.domElement.className = 'torus-demo'
