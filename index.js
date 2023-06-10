const express = require('express');
const path = require('path');

const app = express();

const boards = {
  board1: {
    outputs: []
  },
  board2: {
    outputs: []
  },
  board3: {
    outputs: []
  }
};

function getNumOutputs(boardId) {
  const board = boards[boardId];
  return board ? board.outputs.length : 0;
}

// Endpoint to get the defined outputs of a board
app.get('/outputs', (req, res) => {
  const { id } = req.query;

  const numOutputs = getNumOutputs(id);
  if (numOutputs > 0) {
    const outputs = [];
    for (let i = 1; i <= numOutputs; i++) {
      outputs.push({
        boardId: id,
        outputIndex: i
      });
    }
    res.json(outputs);
  } else {
    res.status(404).send('Board not found or no outputs defined');
  }
});

// Endpoint to get the status of an output
app.get('/status', (req, res) => {
  const { id, output } = req.query;
  const outputIndex = parseInt(output) - 1;

  const numOutputs = getNumOutputs(id);
  if (numOutputs > 0 && outputIndex >= 0 && outputIndex < numOutputs) {
    const board = boards[id];
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

  const numOutputs = getNumOutputs(id);
  if (numOutputs > 0 && outputIndex >= 0 && outputIndex < numOutputs) {
    const board = boards[id];
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

  const numOutputs = getNumOutputs(id);
  if (numOutputs > 0 && outputIndex >= 0 && outputIndex < numOutputs) {
    const board = boards[id];
    board.outputs[outputIndex] = false;
    res.send('Output turned off');
  } else {
    res.status(404).send('Output not found');
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(process.env.PORT || 4000, () => {
  console.log('Server is running');
});
