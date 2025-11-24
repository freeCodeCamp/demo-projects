var xhttp = new XMLHttpRequest()

xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(this.responseText)
        console.log(data)

        const stored = localStorage.getItem('userNotes')
        const localNotes = stored ? JSON.parse(stored) : []

        const allNotes = data.concat(localNotes)

        var ul = document.createElement('ul')
        ul.setAttribute('class', 'notes')

        allNotes.forEach(function (note) {
            var li = document.createElement('li')

            ul.appendChild(li)
            li.appendChild(document.createTextNode(note.content))
        })

        document.getElementById('notes').appendChild(ul)
    }
}

xhttp.open('GET', '/data.json', true)
xhttp.send()
