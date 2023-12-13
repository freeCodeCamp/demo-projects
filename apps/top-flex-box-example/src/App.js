import { Sandpack } from "@codesandbox/sandpack-react"

function App() {
  return (
    <div id="editor">
      <Sandpack
        files={{
          "/index.html": {
            code: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <div class="flex-container">
        <div class="one"></div>
        <div class="two"></div>
        <div class="three"></div>
    </div>
</body>
</html>`
          },
          "styles.css": {
            active: true,
            code: `
.flex-container {
  /* display: flex; */
}

/* this selector selects all divs inside of .flex-container */
.flex-container div {
  background: peachpuff;
  border: 4px solid brown;
  height: 100px;
  /* flex: 1; */
}
          `
          },
          "index.js": {
            hidden: true,
          }
        }}
        options={{
          editorHeight: "100vh",
        }}
        theme={'dark'}
      />
    </div>
  );
}

export default App;
