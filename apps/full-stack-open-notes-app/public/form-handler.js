function getLocalNotes() {
  const stored = localStorage.getItem('userNotes');
  return stored ? JSON.parse(stored) : [];
}

function saveLocalNote(note) {
  const localNotes = getLocalNotes();
  localNotes.push(note);
  localStorage.setItem('userNotes', JSON.stringify(localNotes));
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const input = form.querySelector('input[name="note"]');
      const noteContent = input.value.trim();

      if (noteContent) {
        const newNote = {
          content: noteContent,
          date: new Date().toISOString().split('T')[0],
          important: false
        };

        saveLocalNote(newNote);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/new_note', true);
        xhr.setRequestHeader(
          'Content-Type',
          'application/x-www-form-urlencoded'
        );
        xhr.onload = function () {
          window.location.reload();
        };
        xhr.send('note=' + encodeURIComponent(noteContent));
      }
    });
  }
});
