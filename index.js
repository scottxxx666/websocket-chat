const app = require('express')();
const SocketServer = require('ws').Server;

const server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

const wss = new SocketServer({server});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

wss.on('connection', ws => {
  console.log('Client connected');

  ws.on('message', data => {
    wss.clients.forEach(client => {
      client.send(data);
    })
  });

  ws.on('close', () => {
    console.log('Close connected')
  });
});
