interface ResponseBody {
    message: string,
    timestamp: number,
    result: any,
    code: number
}

export const builder = (data: any, message?: string, code?: number): ResponseBody => {
    if (code == undefined) {
       code=0
    }
    if (message == undefined) {
        message ='success'
    }
    return {
        code,
        result: data,
        message,
        timestamp: new Date().getTime(),
    }
}

// export const builder = (responseBody: ResponseBody) :any => {
//     const {data, message, code, headers} = responseBody
//     let g = {}
//     g.result = data
//     if (message !== undefined && message !== null) {
//         g.message = message
//     }
//     if (code !== undefined && code !== 0) {
//         g.code = code
//         g._status = code
//     }
//     if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
//         g._headers = headers
//     }
//     g.timestamp = new Date().getTime()
//     return g
// }

export const getQueryParameters = (options) => {
    const url = options.url
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') + '"}')
}

export const getBody = (options) => {
    return options.body && JSON.parse(options.body)
}
