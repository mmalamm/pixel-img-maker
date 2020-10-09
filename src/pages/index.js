import React, { useState } from "react"

import Layout from "../components/layout"

import tokyo from "../images/tokyo.jpg"
// import japan from "../images/japan.jpeg"

import cutImageUp from "../utils/cutImageUp"
import rgbToHex from "../utils/rgbToHex"
import nearestColor from "../utils/nearestColor"

import ansi from "../utils/ansi.json"
import analyze from "rgbaster"

analyze(tokyo).then(result => {
  window.tokyo = result
})

const palette = ansi.reduce((a, c) => {
  a[c.name] = c.hexString
  return a
}, {})

const getNearestColor = nearestColor.from(palette)
const getNClr = nearestColor.from({
  white: "#fff",
  green: "#1fb714",
  yellow: "#fbf305",
  darkGreen: "#006412",
  orange: "#ff6403",
  brown: "#562c05",
  red: "#dd0907",
  tan: "#90713a",
  magenta: "#f20884",
  lightGray: "#C0C0C0",
  purple: "#4700a5",
  mediumGray: "#808080",
  blue: "#0000d3",
  darkGray: "#404040",
  cyan: "#02abea",
  black: "#000000",
})

const emptyMatrixCreator = v =>
  Array.from({ length: v.rows }).map(_ => {
    return new Array(v.cols)
  })

const IndexPage = () => {
  const [imgs, setImgs] = useState([])
  const [imgs2, setImgs2] = useState([])
  const [imgs3, setImgs3] = useState([])
  const [rdy, setReady] = useState(false)
  const img = new Image()
  img.onload = () => setReady(true)
  img.src = tokyo
  // img.src = japan

  const handleClick = e => {
    e.preventDefault()
    const s = cutImageUp(img)
    s.then(v => {
      const matrix = emptyMatrixCreator(v)
      const matrix2 = emptyMatrixCreator(v)
      const matrix3 = emptyMatrixCreator(v)
      v.imagePieces.forEach(p => {
        const avgClr = rgbToHex(p.color)
        const clr = getNearestColor(avgClr).value
        const nClr = getNClr(avgClr).value
        matrix[p.y][p.x] = avgClr
        matrix2[p.y][p.x] = clr
        matrix3[p.y][p.x] = nClr
      })
      setImgs(matrix)
      setImgs2(matrix2)
      setImgs3(matrix3)
    })
  }
  return (
    <Layout>
      <img src={tokyo} alt="pixelate_this" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>{imgs.map(drawGridCallback)}</div>
        <div>{createSVG(imgs)}</div>
        <div>{imgs2.map(drawGridCallback)}</div>
        <div>{imgs3.map(drawGridCallback)}</div>
      </div>
      <button onClick={handleClick} disabled={!rdy}>
        pixelate
      </button>
    </Layout>
  )
}

function drawGridCallback(row, i) {
  return (
    <div key={i} style={{ display: "flex" }}>
      {row.map((cellColor, j) => {
        return (
          <div
            key={j}
            style={{
              width: "3px",
              height: "3px",
              backgroundColor: cellColor,
            }}
          ></div>
        )
      })}
    </div>
  )
}

function createSVG(arr) {
  console.log(arr);
  return <svg></svg>
}

export default IndexPage
