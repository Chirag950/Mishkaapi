const express = require('express');
const jquery = require('jquery');
const path = require('path');

const app = express();

const boards = {
  board1: {
    outputs: [false, false, false, false, false, false, false, false, false, false, false, false],
    connected: true // Assuming board1 is initially connected
  },
  board2: {
    outputs: [false, false, false, false, false, false, false, false, false, false, false, false],
    connected: false // Assuming board2 is initially not connected
  }
};

// Endpoint to get the status of an output
app.get('/status', (req, res) => {
  const { id, output } = req.query;
  const outputIndex = parseInt(output) - 1;

  const board = boards[id];
  if (board && outputIndex >= 0 && outputIndex < board.outputs.length) {
    const status = board.outputs[outputIndex] ? 'ON' : 'OFF';
    res.send(status);
  } else {
    res.status(404).send('Output not found');
  }
});

// Endpoint to turn on an output
app.get('/on', (req, res) => {
  const { id, output } = req.query;
  const outputIndex = parseInt(output) - 1;

  const board = boards[id];
  if (board && outputIndex >= 0 && outputIndex < board.outputs.length) {
    board.outputs[outputIndex] = true;
    res.send('Output turned on');
  } else {
    res.status(404).send('Output not found');
  }
});

// Endpoint to turn off an output
app.get('/off', (req, res) => {
  const { id, output } = req.query;
  const outputIndex = parseInt(output) - 1;

  const board = boards[id];
  if (board && outputIndex >= 0 && outputIndex < board.outputs.length) {
    board.outputs[outputIndex] = false;
    res.send('Output turned off');
  } else {
    res.status(404).send('Output not found');
  }
});

// Endpoint to check the board connection status
app.get('/connection', (req, res) => {
  const { id } = req.query;

  const board = boards[id];
  if (board) {
    const status = board.connected ? 'Connected' : 'Not connected';
    res.send(status);
  } else {
    res.status(404).send('Board not found');
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT || 4000, () => {
  console.log('Server is running');
});
