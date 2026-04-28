let companyNameInput;
let jobTitleInput;
let locationInput;
let startDateInput;
let endDateInput;
let descriptionInput;

document.addEventListener("DOMContentLoaded", () => {

    companyNameInput = document.getElementById("companyname");
    jobTitleInput = document.getElementById("jobtitle");
    locationInput = document.getElementById("location");
    startDateInput = document.getElementById("startdate");
    endDateInput = document.getElementById("enddate");
    descriptionInput = document.getElementById("description");

    fetchWork()

    const form = document.getElementById("add-form");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        addWork();
    })
})


// Lägga till work i API

async function addWork() {

    let work = {
        companyname: companyNameInput.value,
        jobtitle: jobTitleInput.value,
        location: locationInput.value,
        startdate: startDateInput.value,
        enddate: endDateInput.value,
        description: descriptionInput.value
    }

    let response = await fetch('http://localhost:3000/works', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(work)
    });

    let data = await response.json();

}



//Hämta alla work i API

async function fetchWork() {

    const link = "http://localhost:3000/works";

    try {

        const data = await fetch(link);
        const jsonData = await data.json();

        renderWork(jsonData);

    } catch (error) {
        console.log(error);
    }
}




//Skriva ut alla work från API i listor webbplats

function renderWork(jsonData) {

    const listDiv = document.getElementById("list-div");

    if (!listDiv) return;

    listDiv.innerHTML = "";

    jsonData.forEach(element => {

        const id = element._id;
        const companyname = element.companyname;
        const jobtitle = element.jobtitle;
        const location = element.location;
        const startdate = element.startdate;
        const enddate = element.enddate;
        const description = element.description;

        const ulList = document.createElement("ul");
        ulList.id = `ul-${id}`;

        const compLi = document.createElement("li");
        compLi.textContent = companyname;

        const jobtLi = document.createElement("li");
        jobtLi.textContent = jobtitle;

        const locLi = document.createElement("li");
        locLi.textContent = location;

        const startLi = document.createElement("li");
        startLi.textContent = "Startdatum: " + startdate;

        const endLi = document.createElement("li");
        endLi.textContent = "Slutdatum: " + enddate;

        const descLi = document.createElement("li");
        descLi.textContent = description;

        const deleteLi = document.createElement("li");
        const deleteButton = document.createElement("button");
        deleteButton.id = `button-${id}`;
        deleteButton.textContent = "Radera";
        deleteLi.appendChild(deleteButton);

        ulList.append(compLi, jobtLi, locLi, startLi, endLi, descLi, deleteLi);
        listDiv.appendChild(ulList);
    });
}