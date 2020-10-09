import getAverageRGB from "./getAvgColor"

const d = 3;

async function cutImageUp(image, widthOfOnePiece = d, heightOfOnePiece = d) {
  const numColsToCut = (image.width / widthOfOnePiece) | 0
  const numRowsToCut = (image.height / heightOfOnePiece) | 0
  var imagePieces = []
  for (var x = 0; x < numColsToCut; ++x) {
    for (var y = 0; y < numRowsToCut; ++y) {
      var canvas = document.createElement("canvas")
      canvas.width = widthOfOnePiece
      canvas.height = heightOfOnePiece
      var context = canvas.getContext("2d")
      context.drawImage(
        image,
        x * widthOfOnePiece,
        y * heightOfOnePiece,
        widthOfOnePiece,
        heightOfOnePiece,
        0,
        0,
        canvas.width,
        canvas.height
      )
      const src = canvas.toDataURL()
      const img = new Image()
      img.src = src
      await loadImg(img)
      const color = getAverageRGB(img)
      const obj = {
        x,
        y,
        src,
        color,
      }
      imagePieces.push(obj)
    }
  }

  // imagePieces now contains data urls of all the pieces of the image
  return { imagePieces, rows: numRowsToCut, cols: numColsToCut }
}

function loadImg(img) {
  return new Promise((resolve, reject) => {
    img.onload = resolve
  })
}

export default cutImageUp
