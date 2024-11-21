var express = require('express');
var app = express();

var sp = require('serialport');
var serialPort;

const port = 3000;

var cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/open', (req, res) => {
  serialPort = new sp.SerialPort({
    path: "COM3",
    baudRate: 9600
    });
  console.log('Serial Port opened!')
  res.json({ message: 'Node.js API opened serial port!' });
});

app.post('/write', (req, res) => {
  serialPort.write("\x0C") // clear screen before writing.
  serialPort.write(req.body.text)
  console.log(req.body)
  res.json(
    { status: 'sucess' }
  )
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
