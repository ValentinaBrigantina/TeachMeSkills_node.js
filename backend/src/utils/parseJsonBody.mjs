const parseJsonBody = request => new Promise((resolve, reject) => {
    let rawJson = ''
    request
        .on('data', (cunck) => {
            rawJson += cunck
        })
        .on('end', () => {
            try {
                if(rawJson) {
                    console.log(rawJson)
                    const requestBody =JSON.parse(rawJson)
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

export default parseJsonBody