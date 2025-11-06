async function update() {
  const res = await fetch('/health')
  const data = await res.json()
  document.getElementById('status').innerText = JSON.stringify(data, null, 2)
}
setInterval(update, 5000)
update()
