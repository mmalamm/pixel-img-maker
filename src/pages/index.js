import React, { useState } from "react"

import Layout from "../components/layout"

import tokyo from "../images/tokyo.jpg"
// import japan from "../images/japan.jpeg"

import cutImageUp from "../utils/cutImageUp"
import rgbToHex from "../utils/rgbToHex"
import nearestColor from "../utils/nearestColor"

import ansi from "../utils/ansi.json"

const palette = ansi.reduce((a, c) => {
  a[c.name] = c.hexString
  return a
}, {})

const getNearestColor = nearestColor.from(palette)

const emptyMatrixCreator = v =>
  Array.from({ length: v.rows }).map(_ => {
    return new Array(v.cols)
  })

const IndexPage = () => {
  const [imgs, setImgs] = useState([])
  const [imgs2, setImgs2] = useState([])
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
      v.imagePieces.forEach(p => {
        const avgClr = rgbToHex(p.color)
        const clr = getNearestColor(avgClr).value
        matrix[p.y][p.x] = avgClr
        matrix2[p.y][p.x] = clr
      })
      setImgs(matrix)
      setImgs2(matrix2)
    })
  }
  return (
    <Layout>
      <div style={{ display: "flex" }}>
        <div>
          {imgs.map((row, i) => {
            return (
              <div key={i} style={{ display: "flex" }}>
                {row.map((cellColor, j) => {
                  return (
                    <div
                      key={j}
                      style={{
                        width: "1px",
                        height: "1px",
                        backgroundColor: cellColor,
                      }}
                    ></div>
                  )
                })}
              </div>
            )
          })}
        </div>
        <div>
          {imgs2.map((row, i) => {
            return (
              <div key={i} style={{ display: "flex" }}>
                {row.map((cellColor, j) => {
                  return (
                    <div
                      key={j}
                      style={{
                        width: "1px",
                        height: "1px",
                        backgroundColor: cellColor,
                      }}
                    ></div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
      <button onClick={handleClick} disabled={!rdy}>
        pixelate
      </button>
    </Layout>
  )
}

export default IndexPage
