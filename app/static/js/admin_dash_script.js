function user_submissions_func(email) {
    const formContainer = document.getElementById('user_history');
    formContainer.style.display = 'block';
    formContainer.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('uh-divider').style.display = 'block';

    fetch(`/usub_admin/${email}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            const user_submissions = data.user_submissions;
            const tableBody = document.querySelector('#user_history table tbody');
            if (!tableBody) {
                console.error('Table body not found!');
                return;
            }
            tableBody.innerHTML = '';

            const title = document.getElementById('usub_table');
            title.innerHTML = `Submission History for ${email}`;

            user_submissions.forEach(user_submissions => {
                const row = document.createElement('tr');
                row.innerHTML = `
            <td>${user_submissions.user_history_description}</td>
            <td>${user_submissions.user_history_branch}</td>
            <td>${user_submissions.user_history_date}</td>
            <td><a href="#editSubmissionModal" onclick="openModal(${user_submissions.user_history_id})"><u><i>edit</i></u></a></td>`
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

function company_submissions_func(email) {
    const formContainer = document.getElementById('company_history');
    formContainer.style.display = 'block';
    formContainer.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('ch-divider').style.display = 'block';


    fetch(`/csub_admin/${email}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            const company_submissions = data.company_submissions;
            const tableBody = document.querySelector('#company_history table tbody');
            if (!tableBody) {
                console.error('Table body not found!');
                return;
            }
            tableBody.innerHTML = '';

            const title = document.getElementById('csub_table');
            title.innerHTML = `Submission History for ${email}`;

            company_submissions.forEach(company_submissions => {
                const row = document.createElement('tr');
                row.innerHTML = `
            <td>${company_submissions.company_history_description}</td>
            <td>${company_submissions.company_history_date}</td>
            <td><a href="/admin_post/${company_submissions.company_history_id}"><u><i>edit</i></u></a></td>
        `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

function openModal(sub_id) {
    document.getElementById('editSubmissionModal').style.display = 'block';
    fetch(`/fetch_usub_d/${sub_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('modal-title').innerHTML = `Edit Submission #${sub_id}`;
            document.getElementById('plastic').value = data.plastic;
            document.getElementById('cardboard').value = data.cardboard;
            document.getElementById('glass').value = data.glass;
            document.getElementById('delete').setAttribute("onclick", `deleteSub(${sub_id})`);
            document.getElementById('edit').setAttribute("onclick", `editSub(${sub_id})`);
        })
}

function editSub(sub_id) {
    const plastic = document.getElementById('plastic').value;
    const cardboard = document.getElementById('cardboard').value;
    const glass = document.getElementById('glass').value;

    fetch(`/usub_edit/${sub_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `plastic=${plastic}&cardboard=${cardboard}&glass=${glass}`
    })
        .then(response => response.json())
        .then(data => {
            closeModal();
        })
        .catch(error => console.error('Error:', error));
}

function deleteSub(sub_id) {
    fetch(`/usub_delete/${sub_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            closeModal();
        })
        .catch(error => console.error('Error:', error));
}

function closeModal() {
    document.getElementById('editSubmissionModal').style.display = 'none';
}

window.onclick = function (event) {
    const modal = document.getElementById('editSubmissionModal');
    if (event.target === modal) {
        closeModal();
    }
};