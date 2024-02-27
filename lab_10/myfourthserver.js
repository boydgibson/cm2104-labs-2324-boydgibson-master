const http = require('http');
const fs = require('fs');
const knockknock = require('knock-knock-jokes');

const createServer = () => {
    return http.createServer((req, res) => {
        if (req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html' });

            // Read the HTML file
            fs.readFile('index.html', 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading HTML file:', err);
                    res.end('Error reading HTML file');
                    return;
                }

                res.end(data);
            });
        } else if (req.url === '/getJoke') {
            // Endpoint to get a new joke
            res.writeHead(200, { 'Content-Type': 'application/json' });
            const randomJoke = knockknock();
            res.end(JSON.stringify({ joke: randomJoke }));
        } else {
            // Handle other routes
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
    });
};

const server = createServer();
server.listen(8080, () => {
    console.log('Server listening on port 8080');
});
