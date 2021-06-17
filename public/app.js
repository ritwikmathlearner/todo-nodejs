document.getElementById('btn').addEventListener('click', e => {
    let taskName = document.getElementById('name').value

    if (taskName === "") {
        swal({
            title: "Task name cannot be empty",
            icon: "error"
        })
        e.preventDefault();
    }

    return true;
})

document.getElementById('tasks').addEventListener('click', async e => {
    let name = '';
    if (e.target.classList.contains('delete')) {
        name = e.target.getAttribute('value')
        try {
            let response = await fetch('http://localhost:5000/todo', {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    "taskname": name
                })
            })

            if (response.status !== 202)
                throw new Error('Delete unsuccessful')

            e.target.parentElement.remove()
            swal({
                icon: "success",
                timer: 1200,
            });
        } catch (error) {
            swal({
                title: error.message,
                icon: "error",
                timer: 1200,
            })
        }
    }
    if (e.target.classList.contains('restore-todo')) {
        let paragraph = e.target.parentElement.parentElement.querySelector('p')
        let inputField = e.target.parentElement.parentElement.querySelector('input')
        let editContainer = e.target.parentElement.parentElement.querySelector('#edit-container')
        name = inputField.value
        updateParagraph(name, [paragraph, editContainer], true)
    }
    if (e.target.classList.contains('fa-edit')) {
        let paragraph = e.target.parentElement.parentElement.querySelector('p')
        let inputField = e.target.parentElement.parentElement.querySelector('input')
        let editContainer = e.target.parentElement.parentElement.querySelector('#edit-container')
        updateParagraph(name, [paragraph, editContainer])
        name = paragraph.innerHTML.trim()
        inputField.value = name
        inputField.addEventListener('keypress', async e => {
            if (e.key === 'Enter') {
                let newValue = inputField.value;
                if (newValue.toString().trim() === name.toString().trim()) {
                    updateParagraph(name, [paragraph, editContainer], true)
                    return
                }

                let content = newValue + ` <span class="wait"><i class="far fa-clock"></i></span>`
                updateParagraph(content, [paragraph, editContainer], true)

                try {
                    const response = await fetch('http://localhost:5000/todo', {
                        method: 'PATCH',
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify({
                            "oldname": name,
                            "newname": newValue
                        })
                    })

                    if (response.status !== 202)
                        throw new Error('Update not successful')

                    setTimeout(() => {
                        paragraph.querySelector('span').remove()
                    }, 1000)
                } catch (error) {
                    setTimeout(() => {
                        paragraph.querySelector('i').classList.remove("far", "fa-clock")
                        paragraph.querySelector('i').classList.add("fas", "fa-exclamation")
                    }, 750)
                    setTimeout(() => {
                        paragraph.innerHTML = name
                    }, 1000)
                }
            }
        })
    }
})

const updateParagraph = (data, domArray, hideInput = false) => {
    [paragraph, editContainer] = domArray

    if (hideInput) {
        paragraph.style.display = "block"
        editContainer.style.display = "none"
        paragraph.innerHTML = data.toString()
        return
    }

    paragraph.style.display = "none"
    editContainer.style.display = "inline-block"
    return
}