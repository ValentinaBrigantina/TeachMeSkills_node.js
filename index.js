const { createGzip } = require('zlib');
const { createReadStream, createWriteStream } = require('fs')
const path = require('path')

const inputPath = process.env.INPUT_PATH
const nameFile = path.parse(inputPath).base
const outputPath = path.resolve(process.env.OUTPUT_PATH, nameFile + '.zip')

const gzip = createGzip();

const readableStream = createReadStream(inputPath);
const writeableStream = createWriteStream(outputPath);

readableStream.pipe(gzip).pipe(writeableStream)
