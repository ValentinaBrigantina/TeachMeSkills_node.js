const fs = require('fs')
const os = require('os')
const readline = require('readline')
const { translate } = require('free-translate')

const rl = readline.createInterface({
    input: fs.createReadStream('text.txt'),
    crlfDelay: Infinity
});

async function translater (line, writeableStream, lang) {
    if (line) {
        const translatedText = await translate(line, { to: lang });
        writeableStream.write(translatedText)
    }
    writeableStream.write(os.EOL)
}

(async () => {
    const writeableStreamEN = fs.createWriteStream('./en.text.txt')
    const writeableStreamCN = fs.createWriteStream('./zh-CN.text.txt')
    const writeableStreamPL = fs.createWriteStream('./pl.text.txt')
    
    for await (const line of rl) {
        await Promise.all([
            translater(line, writeableStreamEN, 'en'),
            translater(line, writeableStreamCN, 'zh-CN'),
            translater(line, writeableStreamPL, 'pl'),
        ])
    }
})()
