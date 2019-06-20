const config = {
  videoWidth: 1620,
  videoHeight: 1080,
  scollCoeff: 150,
  size: 20,
  aspect: 0,
  boxHeight: 0,
  cameraX: 0,
  cameraY: 0,
  cameraZ: 0,
  cameraRotationX: 0.01,
  cameraRotationY: 0.01,
  cameraRotationZ: 0.01,
  videoPlaybackRate: 0.5,
  restStates: {
    front: {
      cameraX: 0,
      cameraY: 0,
      cameraZ: 20,
      cameraRotationX: 0,
      cameraRotationY: 0,
      cameraRotationZ: 0
    },
    top: {
      cameraX: -20,
      cameraY: 44,
      cameraZ: 0,
      cameraRotationX: -Math.PI / 2,
      cameraRotationY: -Math.PI / 4,
      cameraRotationZ: 0
    },
    back: {
      cameraX: -3,
      cameraY: -5,
      cameraZ: -45,
      cameraRotationX: Math.PI,
      cameraRotationY: -Math.PI / 8,
      cameraRotationZ: Math.PI
    },
    bottom: {
      cameraX: -6,
      cameraY: -31,
      cameraZ: -19,
      cameraRotationX: 2.282,
      cameraRotationY: -0.521,
      cameraRotationZ: 0
    }
  }
}
config.aspect = config.videoWidth / config.videoHeight
config.boxHeight = config.size / config.aspect

const cubeConfig = [
  { //front
    videoSrc: './video/wheat.mp4',
    rotation: new THREE.Vector3(0, 0, 0),
    position: new THREE.Vector3(0, 0, 0)
  },
  { //top
    videoSrc: './video/penguin.mp4',
    rotation: new THREE.Vector3(-Math.PI/2, 0, 0),
    position: new THREE.Vector3(0, 0.5 * config.boxHeight, -0.5 * config.boxHeight)
  },
  { //back
    videoSrc: './video/lake.mp4',
    rotation: new THREE.Vector3(0, -Math.PI, 0),
    position: new THREE.Vector3(0, 0, -config.boxHeight)
  },
  { //bottom
    videoSrc: './video/river.mp4',
    rotation: new THREE.Vector3(Math.PI/2, 0, 0),
    position: new THREE.Vector3(0, -0.5 * config.boxHeight, -0.5 * config.boxHeight)
  },
  { //right
    videoSrc: './video/mountain.mp4',
    rotation: new THREE.Vector3(0, Math.PI/2, 0),
    position: new THREE.Vector3(0.5 * config.size, 0, -0.5 * config.boxHeight),
    isCap: true
  },
  { //left
    videoSrc: './video/river.mp4',
    rotation: new THREE.Vector3(0, -Math.PI/2, 0),
    position: new THREE.Vector3(-0.5 * config.size, 0, -0.5 * config.boxHeight),
    isCap: true
  }
]

const watchCameraPosition = () => {
  const tick = () => {
    requestAnimationFrame(tick)
    camera.position.x = config.cameraX
    camera.position.y = config.cameraY
    camera.position.z = config.cameraZ
    camera.rotation.x = config.cameraRotationX
    camera.rotation.y = config.cameraRotationY
    camera.rotation.z = config.cameraRotationZ
  }
  requestAnimationFrame(tick)
}
watchCameraPosition()

const gui = new dat.gui.GUI()
gui.remember(config)
gui.add(config, 'videoWidth')
gui.add(config, 'videoHeight')
gui.add(config, 'scollCoeff')
gui.add(config, 'size')
gui.add(config, 'cameraX', -100, 100)
gui.add(config, 'cameraY', -100, 100)
gui.add(config, 'cameraZ', -100, 100)
gui.add(config, 'cameraRotationX', -Math.PI, Math.PI)
gui.add(config, 'cameraRotationY', -Math.PI, Math.PI)
gui.add(config, 'cameraRotationZ', -Math.PI, Math.PI)
gui.add(config, 'videoPlaybackRate', 0.5, 2)

const axesHelper = new THREE.AxesHelper(50)
scene.add(axesHelper)
