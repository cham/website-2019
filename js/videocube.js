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
    datum.isCap ?
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

const videoDurationMs = cubeDatum => cubeDatum.video.duration * 1000 / config.videoPlaybackRate

cubeConfig.forEach(cubeDatum => cubeDatum.video = makeVideo(cubeDatum.videoSrc))

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
