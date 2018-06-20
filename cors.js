const http = require('http');

var server = http.createServer((req, res) => {

	res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080")
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept, Accept-Encoding, Accpet-Language, X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

	console.log('\n\nrequire listener');

	console.log('======headers======');
	console.log(req.headers);

	console.log('======url======');
	console.log(req.url);

	console.log('======post data======');
	req.on('data', (chunk) => {
		console.log(chunk.toString('utf8'));
	})

	res.write('{a:1}');

	res.end();
});

server.listen(80)

// $.ajax({
//     url: 'http://localhost/a',
//     crossDomain: true,
//     xhrFields: {
//         withCredentials: true
//     },
//     type: 'POST',
//     data: {
//         a: 1
//     }
// })