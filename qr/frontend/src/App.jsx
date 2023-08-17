import axios from "axios"
import { useState } from "react"

import Button from "./components/Button"


const App = () => {
  const [image, setImage] = useState(null)
  const [data, setData] = useState("")
  const [fillColor, setFillColor] = useState("")
  const [backColor, setBackColor] = useState("")

  const onClick = () => {
    const payload = {
      data: data.trim(),
      fill_color: fillColor.trim() !== "" ? fillColor.trim() : "black",
      back_color: backColor.trim() !== "" ? backColor.trim() : "white",
    }
    
    axios.post("/api/generate", payload)
      .then(resp => resp.data)
      .then(respData => setImage(respData.image))
  }

  const onReset = () => {
    setImage(null)
    setData("")
    setFillColor("")
    setBackColor("")
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex">
        <div className="h-64 w-64">
          { image 
            ? <img className="h-full w-full border" src={ `data:image/png;base64, ${image}` } />
            : <div className="h-full w-full border" />
          }
        </div>

        <div className="ml-8">
          <div className="h-64 flex-col">
            <div className="flex items-center mb-3">
              <label className="w-32 font-bold">
                Data
              </label>
              <input 
                className="border rounded px-2 py-1 w-64 focus:outline-0 text-sm h-9"
                placeholder="Text data to encode"
                value={ data } 
                onChange={ (e) => setData(e.target.value) }
              />
            </div>

            <div className="flex items-center mb-3">
              <label className="w-32 font-bold">
                Fill Color
              </label>
              <input 
                className="border rounded px-2 py-1 w-64 focus:outline-0 text-sm h-9"
                placeholder="Fill color hex code or common name"
                value={ fillColor } 
                onChange={ (e) => setFillColor(e.target.value) }
              />
            </div>

            <div className="flex items-center mb-3">
              <label className="w-32 font-bold">
                Back Color
              </label>
              <input 
                className="border rounded px-2 py-1 w-64 focus:outline-0 text-sm h-9"
                placeholder="Background color hex code or common name"
                value={ backColor } 
                onChange={ (e) => setBackColor(e.target.value) } 
              />
            </div>

            <div className="grid grid-cols-2 gap-3 flex-1 items-end">
              <Button onClick={ onClick }>Generate</Button>
              <Button onClick={ onReset }>Reset</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
