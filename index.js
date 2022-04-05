require('dotenv').config();
const path = require('path')
const { env } = require('process');
const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const fFmpeg = require('fluent-ffmpeg');
fFmpeg.setFfmpegPath(ffmpegPath);

const itputLinks = env.INPUT_LINKS.split(',');

(async () => {
  let numbSingle = 1

  for await (let link of itputLinks) {
    const readableVideoStream = ytdl(link)
    const outputPath = path.resolve(env.OUTPUT_FOLDER, numbSingle + '.mp3')

    fFmpeg(readableVideoStream)
    .withNoVideo()
    .toFormat('mp3') 
    .saveToFile(outputPath)

    numbSingle++
  }
})()