import 'dotenv/config'
import sharp from 'sharp'
import process from 'process'
import fs from 'fs'
import path from 'path'

const input = process.env.INPUT
const output = process.env.OUTPUT

fs.readdir(output, (err, files) => {
  if (err) throw err

  for(let file of files) {
    fs.unlink(path.join(output, file), err => {
      if (err) throw err
    })
  }
})

const numb = process.env.SIZE.split('x')
const width = +numb[0]
const height = +numb[1]

const filterrrayImages = () => {
  const array = fs.readdirSync(input)
  return array.filter(file => {
    return (path.extname(file).toLowerCase() === '.jpg' ||
    path.extname(file).toLowerCase() === '.png')
  })
}

filterrrayImages().map(imageName => {
  const image = fs.readFileSync(path.resolve(input, imageName))
  
  sharp(image)
  .resize(width, height)
  .toFile(path.resolve(output, imageName), (err) => {
    return (err)
  });
})
