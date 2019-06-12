const particles = () => {
  const clock = new THREE.Clock()
  const options = {
    position: new THREE.Vector3(),
    positionRandomness: .2,
    velocity: new THREE.Vector3(),
    velocityRandomness: .4,
    color: 0xffffff,
    colorRandomness: 0.5,
    turbulence: 0,
    lifetime: 15,
    size: 20,
    sizeRandomness: 10
  }
  const spawnerOptions = {
    spawnRate: 500,
    horizontalSpeed: 1.5,
    verticalSpeed: 1.33,
    timeScale: 0.4
  }
  const system = new THREE.GPUParticleSystem({
    maxParticles: 250000
  })
  scene.add(system)

  let numTicks = 0
  const tick = () => {
    requestAnimationFrame(tick)
    const delta = clock.getDelta() * spawnerOptions.timeScale
    numTicks += delta
    if (numTicks < 0) {
      numTicks = 0
    }
    if (delta > 0) {
      options.position.x = Math.sin(numTicks * spawnerOptions.horizontalSpeed) * 20
      options.position.y = Math.sin(numTicks * spawnerOptions.verticalSpeed) * 10
      options.position.z = Math.sin(numTicks * spawnerOptions.horizontalSpeed + spawnerOptions.verticalSpeed) * 5

      for ( var x = 0; x < spawnerOptions.spawnRate * delta; x ++ ) {
        system.spawnParticle(options)
      }
    }
    system.update(numTicks)
  }
  requestAnimationFrame(tick)
}
particles()
