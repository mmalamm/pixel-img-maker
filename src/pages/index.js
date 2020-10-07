import React, { useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import taj from "../images/taj_mahal.jpg"
import moon from "../images/moon.jpeg"
import japan from "../images/japan.jpeg"
import tokyo from "../images/tokyo.jpg"
import cutImageUp from "../utils/cutImageUp"
import rgbToHex from "../utils/rgbToHex"

const IndexPage = () => {
  // first i want to have an image
  // split the image up into squares ("pixels")
  // fill each pixel with the dominant color in the square
  // https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript
  //
  const [imgs, setImgs] = useState([])
  const [rdy, setReady] = useState(false)
  const img = new Image()
  img.onload = () => {
    // const s = cutImageUp(img)
    // console.log(s)
    // setImgs(s)
    setReady(true)
  }
  img.src = tokyo

  const handleClick = e => {
    e.preventDefault()
    const s = cutImageUp(img)
    s.then(v => {
      const matrix = Array.from({ length: v.rows }).map(_ => {
        return new Array(v.cols)
      })
      v.imagePieces.forEach(p => {
        matrix[p.y][p.x] = rgbToHex(p.color)
      })
      setImgs(matrix)
    })
  }
  return (
    <Layout>
      <SEO title="Home" />
      {imgs.map((row, i) => {
        return (
          <div key={i} style={{ display: "flex" }}>
            {row.map((cellColor, j) => {
              return (
                <div
                  key={j}
                  style={{
                    width: "4px",
                    height: "4px",
                    backgroundColor: cellColor,
                  }}
                ></div>
              )
            })}
          </div>
        )
      })}
      <button onClick={handleClick} disabled={!rdy}>
        pixelate
      </button>
    </Layout>
  )
}

export default IndexPage
