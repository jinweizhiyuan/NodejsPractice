const http = require('http');
const {
    URL
} = require('url')

const httpServer = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept, Accept-Encoding, Accpet-Language, X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    if (req.method == "OPTIONS") {
        // res.statusCode = 200;
        res.end();
    } else {
        if (req.headers["content-type"]) {
            res.setHeader("Content-Type", "application/json");
        }
        let requestUrl = req.url;

        let requestData = '',
            options = {
                hostname: 'ai.isscloud.com',
                port: 8080,
                // localAddress: requestUrl.hostname,
                method: req.method,
                path: requestUrl
            };

        if (req.method == "POST") {
            req.on('data', (chunk) => {
                requestData += chunk;
            });

            req.on('end', () => {
                myQuest(requestData);
            });
        } else {
            myQuest();
        }

        function myQuest(d) {
            const clientRequest = http.request(options, (sres) => {
                // if (options.method == "POST") {
                // sres.setEncoding('utf8');
                sres.pipe(res);
                // sres.on('data', (chunk) => {
                //     ret += chunk;
                //     sres.pipe(res);
                // })
                // sres.on('end', () => {
                //   res.end();
                //     })
                // } else {
                //   sres.pipe(res);
                // res.end();
                // }
            });

            clientRequest.on('error', (e) => {
                console.log(e)
            });

            d && clientRequest.write(d);

            clientRequest.end()
        }
    }
});

httpServer.listen(80, 'localhost');
// httpServer.listen(80, '10.16.105.108');