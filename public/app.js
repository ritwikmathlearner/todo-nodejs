document.getElementById('btn').addEventListener('click', e => {
    let taskName = document.getElementById('name').value

    if (taskName === "") {
        alert("Task name cannot be empty")
        e.preventDefault();
    }

    return true;
})

document.getElementById('tasks').addEventListener('click', e => {
    let name = '';
    if (e.target.classList.contains('delete')) {
        name = e.target.getAttribute('value')
        fetch('http://localhost:3000/todo', {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                "taskname": name
            })
        }).then(data => {
            e.target.parentElement.remove()
        }).catch(err => console.log(1))
    }
    if (e.target.classList.contains('fas')) {
        let paragraph = e.target.parentElement.parentElement.querySelector('p')
        let inputField = e.target.parentElement.parentElement.querySelector('input')
        updateParagraph(name, [paragraph, inputField])
        name = paragraph.innerHTML.trim()
        inputField.value = name
        inputField.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                let newValue = inputField.value;
                if (newValue.toString().trim() === name.toString().trim()) {
                    updateParagraph(name, [paragraph, inputField], true)
                    return
                }

                let content = newValue + ` <span class="wait"><i class="far fa-clock"></i></span>`
                updateParagraph(content, [paragraph, inputField], true)

                fetch('http://localhost:3000/todo', {
                    method: 'PATCH',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({
                        "oldname": name,
                        "newname": newValue
                    })
                }).then(response => {
                    if (response.status !== 202)
                        throw new Error('Update not successful')
                    setTimeout(() => {
                        paragraph.querySelector('span').remove()
                    }, 1000)
                }).catch(err => {
                    setTimeout(() => {
                        paragraph.querySelector('i').classList.remove("far", "fa-clock")
                        paragraph.querySelector('i').classList.add("fas", "fa-exclamation")
                    }, 750)
                    setTimeout(() => {
                        paragraph.innerHTML = name
                    }, 1000)
                })
            }
        })
    }
})

const updateParagraph = (data, domArray, hideInput = false) => {
    [paragraph, inputField] = domArray

    if (hideInput) {
        paragraph.style.display = "block"
        inputField.style.display = "none"
        paragraph.innerHTML = data.toString()
        return
    }

    paragraph.style.display = "none"
    inputField.style.display = "inline-block"
    return
}