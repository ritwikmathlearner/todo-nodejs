document.getElementById('btn').addEventListener('click', e => {
    let taskName = document.getElementById('name').value

    if (taskName === "") {
        alert("Task name cannot be empty")
        e.preventDefault();
    }

    return true;
})

document.getElementById('tasks').addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        let name = e.target.getAttribute('value')
        fetch('http://localhost:3000/delete-todo', {
            method: 'POST',
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
})