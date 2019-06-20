let webGlSupport = false
try {
  const testCanvas = document.createElement('canvas')
  webGlSupport = window.WebGLRenderingContext && (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'))
} catch (e) {
  console.warn('WebGL not supported', e)
}

const bootstrap = () => {
  const frameworks = [
    './js/three.min.r105.js',
    './js/stats.min.98.js',
    './js/dat.gui.min.0.7.6.js',
  ]
  const deps = [
    './js/sandbox.js',
    './js/demo-config.js'
  ]
  const visualisations = [
    './js/videocube.js'
  ]

  let frameworksLoaded = 0
  frameworks.forEach((path) => {
    const loaderScript = document.createElement('script')
    loaderScript.onload = () => {
      frameworksLoaded++
      checkFrameworksLoaded()
    }
    loaderScript.src = path
    document.body.appendChild(loaderScript)
  })

  const checkFrameworksLoaded = () => {
    if (frameworksLoaded === frameworks.length) {
      let depsLoaded = 0
      deps.forEach((path) => {
        const loaderScript = document.createElement('script')
        loaderScript.onload = () => {
          depsLoaded++
          checkOnLoaded()
        }
        loaderScript.src = path
        document.body.appendChild(loaderScript)
      })

      const addVignette = () => {
        [1].forEach(() => {
          const v = document.createElement('div')
          v.className = 'vignette'
          document.body.appendChild(v)
        })
      }

      const checkOnLoaded = () => {
        if (depsLoaded === deps.length) {
          addVignette()
          visualisations.forEach((path) => {
            const visScript = document.createElement('script')
            visScript.src = path
            document.body.appendChild(visScript)
          })
        }
      }
    }
  }
}

if (webGlSupport) bootstrap()
