let webGlSupport = false
try {
  const testCanvas = document.createElement('canvas')
  webGlSupport = window.WebGLRenderingContext && (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'))
} catch (e) {
  console.warn('WebGL not supported', e)
}

const bootstrap = () => {
  const threeNode = document.createElement('script')
  threeNode.src = './js/three.min.r105.js'
  threeNode.onload = () => {
    const deps = [
      './js/stats.min.98.js',
      './js/dat.gui.min.0.7.6.js',
      './js/sandbox.js'
    ]
    const visualisations = [
      './js/addstats.js',
      './js/videocube.js'
    ]

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
  document.body.appendChild(threeNode)
}

if (webGlSupport) bootstrap()
