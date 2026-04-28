document.addEventListener("DOMContentLoaded", () => {

    const addButton = document.getElementById("addButton");

    addButton.addEventListener("click", () => {
        addWork();
    })
})

const companyName = document.getElementById("companyname");
const jobTitle = document.getElementById("jobtitle");
const location = document.getElementById("location");
const startDate = document.getElementById("startdate");
const endDate = document.getElementById("enddate");
const description = document.getElementById("description");


// Lägga till work i API

async function addWork() {

    let work = {
        companyname: companyName.value,
        jobtitle: jobTitle.value,
        location: location.value,
        startdate: startDate.value,
        enddate: endDate.value,
        description: description.value
    }

    let response = await fetch('http://localhost:3000/works', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(work)
    });

    let data = await response.json();
    console.log(data);

}