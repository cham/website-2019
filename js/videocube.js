let videosLoaded = 0
const makeVideo = (src) => {
  const video = document.createElement('video')
  video.src = src
  video.muted = true
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
    camera.rotation.x = config.cameraRotationX
    camera.rotation.y = config.cameraRotationY
    camera.rotation.z = config.cameraRotationZ
  }
  requestAnimationFrame(tick)
}
watchCameraPosition()

const axesHelper = new THREE.AxesHelper(50)
scene.add(axesHelper)

const videoDurationMs = cubeDatum => cubeDatum.video.duration * 1000 / config.videoPlaybackRate

const runVideoCube = () => {
  const videoCube = makeVideoCube(cubeConfig)
  videoCube.position.z = 0.5 * config.boxHeight
  scene.add(videoCube)

  const rest = (side) => {
    cubeConfig.forEach(cubeDatum => cubeDatum.video.pause())
    forceRender = true
    switch (side) {
      case 'front':
        Object.assign(config, config.restStates.front)
        cubeConfig[0].video.play()
        setTimeout(() => { forceRender = false }, videoDurationMs(cubeConfig[0]))
        break
      case 'top':
        Object.assign(config, config.restStates.top)
        cubeConfig[1].video.play()
        setTimeout(() => { forceRender = false }, videoDurationMs(cubeConfig[1]))
        break
      case 'back':
        Object.assign(config, config.restStates.back)
        cubeConfig[2].video.play()
        setTimeout(() => { forceRender = false }, videoDurationMs(cubeConfig[3]))
        break
      case 'bottom':
        Object.assign(config, config.restStates.bottom)
        cubeConfig[3].video.play()
        setTimeout(() => { forceRender = false }, videoDurationMs(cubeConfig[3]))
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
