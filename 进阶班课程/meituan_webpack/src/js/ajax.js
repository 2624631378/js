let url = {
    index: '/api/list.json',
    info:'/api/list.json',
}

let host = 'http://localhost:8989'
for (var key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = host + url[key];
    }

}

module.exports = url

// export default url