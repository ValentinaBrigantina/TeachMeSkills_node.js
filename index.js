const fs = require('fs')
const http = require('http')

const port = 3000
const host = '127.0.0.1'

const parseQueryParams = (server, request) => {
    const { address, port } = server.address()
    const parseUrl = new URL(request.url, `http://${address}:${port}`)
    const queryParams = {}
    for (const [key, value] of parseUrl.searchParams.entries()) {
        queryParams[key] = value
    }
    return {queryParams, path: parseUrl.pathname}
}

const getId = (server, req) => {
    const { path } = parseQueryParams(server, req)
    const arr = path.split('/')
    const id = Number(arr[arr.length - 1])
    return id
}

const makeid = () => {
    let id = "";
    let possible = "1234567890";
    for(let i = 0; i < 3; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return Number(id)
}

const parseJsonBody = (request) => new Promise((resolve, reject) => {
    let rawJson = ''
    request
        .on('data', (chunk) => {
            rawJson += chunk
        })
        .on('end', () => {
            try {
                if (rawJson) {
                    const requestBody = JSON.parse(rawJson)
                    resolve(requestBody)
                } else {
                    resolve(null)
                }
            } catch (err) {
                reject(err)
            }
        })
        .on('error', reject)
})

const getArrayOfCats = () => new Promise(resolve => {
    let result = ''
    fs.createReadStream('cats.json')
        .on('data', (chunk) => {
            result += chunk
        })
        .on('end', () => {
            resolve(JSON.parse(result))
        })
})

const server = http.createServer(async (req, res) => {
    const { path } = parseQueryParams(server, req)

    if (req.method === 'POST' && path === '/cat') {
        const arrayCats = await getArrayOfCats()
        const newCat = await parseJsonBody(req)
        newCat.id = makeid()
        arrayCats.push(newCat)
        const newJson = JSON.stringify(arrayCats)
        const writeableStream = fs.createWriteStream('cats.json')
        writeableStream.write(newJson)
        writeableStream.end()

        res.end(newJson)
    }

    if (req.method === 'DELETE' && path.startsWith('/cat')) { 
        const arrayCats = await getArrayOfCats()
        const idNumb = getId(server, req)

        const removeByIndex = () => {
            arrayCats.forEach((cat, ind) => {
                if (cat.id === idNumb) {
                    arrayCats.splice(ind, 1)
                }
            });
            return arrayCats
        }
        const newJson = JSON.stringify(removeByIndex())
        const writeableStream = fs.createWriteStream('cats.json')
        writeableStream.write(newJson)
        writeableStream.end()

        res.end(newJson)
    }

    if (req.method === 'PUT' && path.startsWith('/cat')) {
        const arrayCats = await getArrayOfCats()
        const newCat = await parseJsonBody(req)
        const idNumb = getId(server, req)

        const changeData = () => {
            arrayCats.forEach(cat => {
                if (cat.id === idNumb) {
                    cat.name = newCat.name
                    cat.url = newCat.url
                }
            })
            return arrayCats
        }
        const newJson = JSON.stringify(changeData())
        const writeableStream = fs.createWriteStream('cats.json')
        writeableStream.write(newJson)
        writeableStream.end()

        res.end(newJson)

    }

    if (req.method === 'GET' && path === '/cat') {
        fs.createReadStream('cats.json')
            .on('data', (chunk) => res.write(chunk))
            .on('end', () => res.end())
    }
})

server.on('error', (err) => {
    console.error(err)
})

server.listen(port, host, () => {
    console.log('hi')
})