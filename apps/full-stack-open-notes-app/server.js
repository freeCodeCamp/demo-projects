const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/status/ping', (req, res) => {
  res.status(200).send({ msg: 'pong' });
});

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2023-1-1',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2023-1-2',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2023-1-3',
    important: true
  }
];

const getFrontPageHtml = noteCount => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>FSO Example App</title>
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <div class='container'>
          <h1>Full Stack Example App</h1>
          <p>This application demonstrates traditional web development concepts:</p>
          <ul class="concept-list">
            <li>HTTP GET requests</li>
            <li>Dynamically generated HTML pages</li>
            <li>Client-side JavaScript execution</li>
            <li>Event handlers and callback functions</li>
            <li>Asynchronous data fetching</li>
          </ul>
          <div class="stats">
            <strong>Number of notes created: ${noteCount}</strong>
          </div>
          <a href='/notes' class="btn">View Notes</a>
          <img src='cats.jpg' width='300' alt='Developer laptop' />
        </div>
      </body>
    </html>
  `;
};

const getNotesPageHtml = () => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Notes - FSO Example App</title>
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <div class='container'>
          <h1>Notes</h1>
          <p><a href='/'>← Back to home</a></p>
          
          <div class="info-box">
            <h3>What's happening here?</h3>
            <p>When this page loads:</p>
            <ol>
              <li>Browser fetches the HTML document</li>
              <li>Browser finds a &lt;script&gt; tag and fetches main.js</li>
              <li>JavaScript code executes and makes an HTTP GET request to /data.json</li>
              <li>When data arrives, a callback function processes it</li>
              <li>The notes are dynamically rendered to the page</li>
            </ol>
            <p><strong>Open your browser's Developer Console (F12) and check the Network tab!</strong></p>
          </div>

          <div id='notes'>
            <p class="loading">Loading notes...</p>
          </div>

          <div class="form-section">
            <h2>Create a New Note</h2>
            <form action="/new_note" method="POST">
              <input type="text" name="note" placeholder="Enter your note here..." required />
              <button type="submit">Save Note</button>
            </form>
          </div>
        </div>
        <script src="main.js"></script>
        <script src="form-handler.js"></script>
      </body>
    </html>
  `;
};

app.get('/', (req, res) => {
  const page = getFrontPageHtml(notes.length);
  res.send(page);
});

app.get('/notes', (req, res) => {
  const page = getNotesPageHtml();
  res.send(page);
});

app.get('/data.json', (req, res) => {
  res.json(notes);
});

app.post('/get_notes', (req, res) => {
  const localNotes = req.body.localNotes || [];
  const allNotes = notes.concat(localNotes);
  res.json(allNotes);
});

app.post('/new_note', (req, res) => {
  const note = req.body.note;

  if (note) {
    console.log('Note received (not saved to server):', note);
  }

  res.redirect('/notes');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
