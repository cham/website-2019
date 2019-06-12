const availableVideos = [
  './video/lake.mp4',
  './video/penguin.mp4',
  './video/river.mp4',
  './video/mountain.mp4',
  './video/wheat.mp4',
]
let currentVideo = Math.floor(Math.random() * availableVideos.length)
const nextVideo = () => {
  currentVideo++
  if (currentVideo >= availableVideos.length) {
    currentVideo = 0
  }
  return availableVideos[currentVideo]
}

const videoDims = [1620, 1080]

const video = document.createElement('video')
video.src = nextVideo()
video.muted = true
video.playbackRate = 0.5
video.defaultPlaybackRate = 0.5
video.play()
video.onended = () => {
  video.src = nextVideo()
  video.play()
}

const texture = new THREE.VideoTexture(video)
texture.minFilter = THREE.LinearFilter
texture.magFilter = THREE.LinearFilter
texture.format = THREE.RGBFormat

const aspect = videoDims[0] / videoDims[1]
const size = 10
const mesh = new THREE.Mesh(
  new THREE.BoxBufferGeometry(size, size / aspect, 0.2),
  new THREE.MeshPhongMaterial({ map: texture })
)
mesh.position.set(0, 0, 0)
scene.add(mesh)
