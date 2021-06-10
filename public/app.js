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
        name = paragraph.innerHTML
        paragraph.style.display = "none"
        inputField.style.display = "inline-block"
        inputField.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                let newValue = inputField.value;
                paragraph.innerHTML = newValue + ` <span class="wait"><i class="far fa-clock"></i></span>`;
                paragraph.style.display = "block"
                inputField.style.display = "none"

                fetch('http://localhost:3000/todo', {
                    method: 'PATCH',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({
                        "oldname": name,
                        "newname": newValue
                    })
                }).then(data => {
                    setTimeout(()=>{paragraph.querySelector('span').remove()}, 1000)
                }).catch(err => {
                    paragraph.querySelector('i').classList.remove("far", "fa-clock")
                    paragraph.querySelector('i').classList.add("fas", "fa-exclamation")
                })
            }
        })
    }
})