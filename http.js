const http = require('http')
const cheerio = require('cheerio')

const httpServer = http.createServer((req,res) => {

	console.log(req.headers)

	const proxyUrl = 'web.chacuo.net'

	var _headers = Object.assign({}, req.headers)
	// delete _headers.Host
	// delete _headers.referer
	_headers.Host = proxyUrl
	// _headers.referer = 'http://' + proxyUrl
	// console.log(req.rawHeaders)
	// res.write('<html><head><title>test</title><link rel="icon" href="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png" type="image/x-icon" /></head><body>hellow world</body></html>')
	console.log('http server start');
	// console.log(req.headers)

	var options = {
		hostname: proxyUrl,
		port: 80,
		path: '/',
		// headers: _headers
		// {
		// 	'Content-Type': 'text/html',
		// 	// 'Content-Length': Buffer.byteLength(postData)
		// }
	};
	var content = '';
	const clietRequest = http.request(options, (sres) => {
		
		// sres.pipe(res)

		sres.on('data', (chunk) => {
			// console.log(chunk)
			// content += chunk
			res.write(chunk, 'utf8')
		})
		sres.on('end', () => {
			// content = content.toString('utf8')
			// var $ = cheerio.load(content)
			// $('head').append('<base href' + (options.hostname + options.port) + ' />')
			// console.log($.html())
			res.end();
		})
	});

	clietRequest.on('error', (e) => {
		console.log(e)
	})

	clietRequest.end()

	// res.end();
})

httpServer.listen('80', () => {
	console.log('httpServer listening')
})

httpServer.on('error', () => {
	console.log('httpServer error')
	httpServer.close()
})