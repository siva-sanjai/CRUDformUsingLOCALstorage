document.getElementById('Submit').addEventListener('click', function() {
    
    const name = document.getElementById('name').value;
    const phno = document.getElementById('phno').value;
    const email = document.getElementById('email').value;
    const location = document.getElementById('location').value;

   
    if (!name || !phno || !email || !location) {
        alert('Please fill all the fields');
        return;
    }

    
    const formData = {
        name: name,
        phone: phno,
        email: email,
        location: location
    };


//getting from local storage
    
    let data = JSON.parse(localStorage.getItem('formDataList')) || [];

    data.push(formData);//add a new data

    localStorage.setItem('formDataList', JSON.stringify(data));//storing data

    displayData();
    

    document.getElementById('form').reset();
   
});


function displayData() {
   
    const data = JSON.parse(localStorage.getItem('formDataList')) || [];

   
    const tableBody = document.getElementById('table-body');

   
    tableBody.innerHTML = '';

    
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.phone}</td>
            <td>${item.email}</td>
            <td>${item.location}</td>
            <td>
                <img src="edit-icon.png" alt="Edit" class="edit-icon" onclick="editData(${index})">
                <img src="delete-icon.png" alt="Delete" class="delete-icon" onclick="deleteData(${index})">
            </td>
           
        `;
        tableBody.appendChild(row);
    });
    
}
function deleteData(index) {
    let data = JSON.parse(localStorage.getItem('formDataList')) || [];
    // data.splice(index, 1);
    data = data.filter((item, i) => i !== index); 
    localStorage.setItem('formDataList', JSON.stringify(data));
    displayData();
}

function editData(index){
    let data = JSON.parse(localStorage.getItem('formDataList')) || [];
    const item = data[index];
    document.getElementById('name').value = item.name;
    document.getElementById('phno').value = item.phone;
    document.getElementById('email').value = item.email;
    document.getElementById('location').value = item.location;
    deleteData(index);
}

window.onload = displayData;
