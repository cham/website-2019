const config = {
  videoWidth: 1620,
  videoHeight: 1080,
  scollCoeff: 150,
  camY: 0,
  size: 20,
  aspect: 0,
  boxHeight: 0,
  cameraDistance: 30
}
const gui = new dat.gui.GUI()
gui.remember(config)
gui.add(config, 'videoWidth')
gui.add(config, 'videoHeight')
gui.add(config, 'scollCoeff')
gui.add(config, 'camY', -50, 50)
gui.add(config, 'size')
gui.add(config, 'cameraDistance', 0, 100)

config.aspect = config.videoWidth / config.videoHeight
config.boxHeight = config.size / config.aspect

const makeVideo = (src) => {
  const video = document.createElement('video')
  video.src = src
  video.muted = true
  video.loop = true
  video.playbackRate = 0.5
  video.defaultPlaybackRate = 0.5
  return video
}

const getVideoTexture = (video) => {
  const texture = new THREE.VideoTexture(video)
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.format = THREE.RGBFormat

  return texture
}

const makeVideoPlane = (datum) => {
  return new THREE.Mesh(
    datum.isSide ?
     new THREE.PlaneBufferGeometry(config.boxHeight, config.boxHeight)
     :
     new THREE.PlaneBufferGeometry(config.size, config.boxHeight),
    new THREE.MeshPhongMaterial({ map: getVideoTexture(datum.video) })
  )
}

const makeVideoCube = (sides) => {
  const g = new THREE.Group()
  sides.forEach((sideData) => {
    const p = makeVideoPlane(sideData)
    p.rotation.setFromVector3(sideData.rotation)
    p.position.add(sideData.position)
    g.add(p)
  })
  return g
}

const cubeConfig = [
  { //front
    video: makeVideo('./video/wheat.mp4'),
    rotation: new THREE.Vector3(0, 0, 0),
    position: new THREE.Vector3(0, 0, 0)
  },
  { //top
    video: makeVideo('./video/penguin.mp4'),
    rotation: new THREE.Vector3(-Math.PI/2, 0, 0),
    position: new THREE.Vector3(0, 0.5 * config.boxHeight, -0.5 * config.boxHeight)
  },
  { //back
    video: makeVideo('./video/lake.mp4'),
    rotation: new THREE.Vector3(0, -Math.PI, 0),
    position: new THREE.Vector3(0, 0, -config.boxHeight)
  },
  { //bottom
    video: makeVideo('./video/river.mp4'),
    rotation: new THREE.Vector3(Math.PI/2, 0, 0),
    position: new THREE.Vector3(0, -0.5 * config.boxHeight, -0.5 * config.boxHeight)
  },
  { //right
    video: makeVideo('./video/mountain.mp4'),
    rotation: new THREE.Vector3(0, Math.PI/2, 0),
    position: new THREE.Vector3(0.5 * config.size, 0, -0.5 * config.boxHeight),
    isSide: true
  },
  { //left
    video: makeVideo('./video/river.mp4'),
    rotation: new THREE.Vector3(0, -Math.PI/2, 0),
    position: new THREE.Vector3(-0.5 * config.size, 0, -0.5 * config.boxHeight),
    isSide: true
  }
]

scene.add(makeVideoCube(cubeConfig))

cubeConfig[0].video.play()

const watchScroll = () => {
  let cameraRotation = 0
  let lastCameraRotation = cameraRotation
  const tick = () => {
    requestAnimationFrame(tick)

    cameraRotation = window.scrollY / config.scollCoeff
    camera.position.x = (Math.sin(cameraRotation) * config.cameraDistance)
    camera.position.y = config.camY
    camera.position.z = (Math.cos(cameraRotation) * config.cameraDistance)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    lastCameraRotation = cameraRotation
  }
  requestAnimationFrame(tick)
}
watchScroll()
