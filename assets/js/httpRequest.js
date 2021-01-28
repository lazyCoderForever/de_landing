function httpRequest() {
    const request = async function (
        url,
        method = 'GET',
        body = null,
        headers = {}
    ) {
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json; charset=UTF-8'
            }
            const response = await fetch(url, { method, body, headers })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло нет так')
            }
            return data
        } catch (e) {
            throw e
        }
    }
    return { request }
}

export { httpRequest }
