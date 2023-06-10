const express = require('express');
const jquery = require('jquery');
const path = require('path');

const app = express();

const boards = {
  board1: {
    outputs: [false, false, false, false, false, false, false, false, false, false, false, false]
  },
  board2: {
    outputs: [false, false, false, false, false, false, false, false, false, false, false, false]
  }
};

// Endpoint to check board connectivity
app.get('/check-connectivity', (req, res) => {
  const { id } = req.query;

  if (boards[id]) {
    res.send('connected');
  } else {
    res.status(404).send('Board not found');
  }
});

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

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const { id } = req.query;

  // Check board connectivity before serving the page
  if (!id || !boards[id]) {
    res.send('Board not found');
    return;
  }

  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(process.env.PORT || 4000, () => {
  console.log('Server is running');
});
