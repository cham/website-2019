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
  videoPlaybackRate: 0.5
}
const gui = new dat.gui.GUI()
gui.remember(config)
gui.add(config, 'videoWidth')
gui.add(config, 'videoHeight')
gui.add(config, 'scollCoeff')
gui.add(config, 'size')
gui.add(config, 'cameraX', -100, 100)
gui.add(config, 'cameraY', -100, 100)
gui.add(config, 'cameraZ', -100, 100)
gui.add(config, 'videoPlaybackRate', 0.5, 2)

config.aspect = config.videoWidth / config.videoHeight
config.boxHeight = config.size / config.aspect

let videosLoaded = 0
const makeVideo = (src) => {
  const video = document.createElement('video')
  video.src = src
  video.muted = true
  video.loop = true
  video.playbackRate = config.videoPlaybackRate
  video.defaultPlaybackRate = config.videoPlaybackRate
  video.onloadedmetadata = () => { onVideoLoaded() }
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

const watchCameraPosition = () => {
  const tick = () => {
    requestAnimationFrame(tick)
    camera.position.x = config.cameraX
    camera.position.y = config.cameraY
    camera.position.z = config.cameraZ
    camera.lookAt(new THREE.Vector3(0, 0, 0))
  }
  requestAnimationFrame(tick)
}
watchCameraPosition()

const axesHelper = new THREE.AxesHelper(50)
scene.add(axesHelper)

const runVideoCube = () => {
  const videoCube = makeVideoCube(cubeConfig)
  videoCube.position.z = 0.5 * config.boxHeight
  scene.add(videoCube)

  const rest = (side) => {
    config.cameraX = 0
    config.cameraY = 0
    config.cameraZ = 0
    cubeConfig.forEach(cubeDatum => cubeDatum.video.pause())
    forceRender = true
    switch (side) {
      case 'front':
        config.cameraZ = 20
        cubeConfig[0].video.play()
        setTimeout(() => { forceRender = false }, cubeConfig[0].video.duration * 1000 / config.videoPlaybackRate)
        break
      case 'top':
        config.cameraY = 20
        cubeConfig[1].video.play()
        setTimeout(() => { forceRender = false }, cubeConfig[1].video.duration * 1000 / config.videoPlaybackRate)
        break
      case 'back':
        config.cameraZ = -20
        cubeConfig[2].video.play()
        setTimeout(() => { forceRender = false }, cubeConfig[2].video.duration * 1000 / config.videoPlaybackRate)
        break
      case 'bottom':
        config.cameraY = -20
        cubeConfig[3].video.play()
        setTimeout(() => { forceRender = false }, cubeConfig[3].video.duration * 1000 / config.videoPlaybackRate)
        break
    }
  }
  rest('bottom')
}

const onVideoLoaded = () => {
  videosLoaded++
  if (videosLoaded === cubeConfig.length) {
    runVideoCube()
  }
}
