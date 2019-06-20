var stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

function updateStats() {
	stats.begin()
	stats.end()
	requestAnimationFrame(updateStats)
}

requestAnimationFrame(updateStats)
