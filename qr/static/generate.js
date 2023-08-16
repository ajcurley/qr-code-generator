const generateQRCode = async () => {
  const headers = { "Content-Type": "application/json" }
  const inputData = getInputData()
  const body = JSON.stringify(inputData)
  const response = await fetch("/api/generate", { method: "POST", headers, body })
  const payload = await response.json()
  renderImage(payload.image)
}

const getInputData = () => {
  const data = document.getElementById("form-data").value
  const fill_color = document.getElementById("form-fill-color").value
  const back_color = document.getElementById("form-back-color").value
  return { data, fill_color, back_color }
}

const renderImage = (image) => {
  let element = document.getElementById("image")
  element.src = `data:image/png;base64,${image}`
  element.hidden = false
}
