import { useState } from 'react';
import './App.css';
import Circle from './circle';
import ColorThief from "colorthief";


function App() {

  let [dominantColor, setDominantColor] = useState('');
  // let [bodyState, setBodyState] = useState(false);
  let paletteColors = [];
  let [paletteColours, setPaletteColors] = useState([]);

  const loadFile = function (event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
  };

  const handleColor = () => {
    const colorThief = new ColorThief();
    const prodimg = document.getElementById('output');
    if (prodimg.src !== 0) {

      const result = colorThief.getColor(prodimg, 25);
      const hexValue = rgbToHex(result[0], result[1], result[2]);
      setDominantColor(dominantColor = hexValue);
      handlePalette(prodimg)
    } else return

  }

  const handlePalette = (img) => {
    const colorThief = new ColorThief();
    const result = colorThief.getPalette(img, 12);
    result.forEach(element => {
      const hex = rgbToHex(element[0], element[1], element[2]);
      paletteColors.push(hex);
    });
    setPaletteColors(paletteColours = paletteColors);
  }

  const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('');


  const click = (e) => {
    const id = e.target;
    const doc = id.innerText;
    console.log(doc, "id");
    const el = document.createElement('textarea');
    el.value = doc;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px'
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert(`Copied to Clipboard`);
  };

  // const handleDayAndNight = () => {
  //   setBodyState(bodyState = !bodyState);
  //   console.log(bodyState, "body state")
  // }

  return (
    <div className="blackApp" id="body">
      <div className="container">
        <div className="row pt-5">
          <div className="col-lg-5">
            <div className="inputImage position-relative">
              <input
                type="file"
                id="img"
                name="img"
                className="form-control"
                onChange={loadFile} />
              <img alt="" id="output" className="position-absolute p-2" src="" />
            </div>
            <button
              type="button"
              style={{
                background: "green",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "600"
              }}
              className="form-control mt-3"
              onClick={handleColor}
            >Generate</button>
          </div>
          <div className="col-lg-7">
            <div className="colorGenerated">
              <div className="dominantColor text-center card p-1">
                <h5>Dominant Color</h5>
                <div className="my-3">
                  {dominantColor ? (
                    <Circle
                      id={dominantColor}
                      onClick={click}
                      bg={dominantColor}
                    />
                  ) : ""}
                </div>
              </div>
              <div className="card mt-5 p-1">
                <h5 className="text-center">Palette</h5>
                <div className="palette row mb-3 mt-4">
                  {paletteColours ? paletteColours.map(palcolor => (
                    <div className="col-lg-2 my-3">
                      <Circle
                        id={palcolor}
                        onClick={click}
                        key={palcolor}
                        bg={palcolor}
                      />
                    </div>
                  )) : ""}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
