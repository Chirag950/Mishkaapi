const express = require('express');
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

// Endpoint to check if the board is connected to the internet
app.get('/check-connection', (req, res) => {
  // Replace this with your actual check for board's internet connectivity
  const isBoardConnected = true;

  if (isBoardConnected) {
    res.sendStatus(200);
  } else {
    res.redirect('/no-internet.html');
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

// Serve the 'no-internet.html' file when there is no internet connection
app.get('/no-internet.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'no-internet.html'));
});

// Redirect all other routes to the main page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
