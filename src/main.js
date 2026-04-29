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

        if (!createErrorMessage())  //Om det finns fel körs inte addWork
            return;

        addWork();
    })
})


//Frontend input-validering

function createErrorMessage() {
    const errors = [];
    const errorList = document.getElementById("frontend-error");

    errorList.innerHTML = "";

    if (companyNameInput.value.trim() === "") errors.push("Ange företagsnamn");
    if (jobTitleInput.value.trim() === "") errors.push("Ange arbetstitel");
    if (locationInput.value.trim() === "") errors.push("Ange arbetets plats");
    if (startDateInput.value.trim() === "") errors.push("Ange startdatum");
    if (endDateInput.value.trim() === "") errors.push("Ange slutdatum");
    if (descriptionInput.value.trim() === "") errors.push("Ange beskrivning");

    errors.forEach(error => {
        const li = document.createElement("li"); //li för varje error
        li.textContent = `${error}`;
        errorList.appendChild(li);
    })

    return errors.length === 0;
}



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

    let response = await fetch('https://lab3-dt207g-webbtj.onrender.com/works', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(work)
    });

    let data = await response.json();


    //Om data.message finns, finns det valideringsError

    const errorlist = document.getElementById("backend-error");

    if (data.message) {
        errorlist.innerHTML = "";
        const Message = data.message;

        Message.forEach(message => {
            const li = document.createElement("li");
            li.textContent = message;
            errorlist.appendChild(li);
        })

    } else {
        errorlist.innerHTML = "";

        companyNameInput.value = "";
        jobTitleInput.value = "";
        locationInput.value = "";
        startDateInput.value = "";
        endDateInput.value = "";
        descriptionInput.value = "";
    }

}



//Hämta alla work i API

async function fetchWork() {

    const link = "https://lab3-dt207g-webbtj.onrender.com/works";

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
        const description = element.description;

        //Justera format på start- och slutdatum (utan tid)

        const startdate = element.startdate;
        const newStartDate = new Date(startdate).toLocaleDateString('sv-SE');

        const enddate = element.enddate;
        const newEndDate = new Date(enddate).toLocaleDateString('sv-SE');

        // Skapa arbets-listor

        const ulList = document.createElement("ul");
        ulList.id = `ul-${id}`;

        const compLi = document.createElement("li");
        compLi.textContent = companyname;

        const jobtLi = document.createElement("li");
        jobtLi.textContent = jobtitle;

        const locLi = document.createElement("li");
        locLi.textContent = location;

        const startLi = document.createElement("li");
        startLi.textContent = "Startdatum: " + newStartDate;

        const endLi = document.createElement("li");
        endLi.textContent = "Slutdatum: " + newEndDate;

        const descLi = document.createElement("li");
        descLi.textContent = description;

        const deleteLi = document.createElement("li");
        const deleteButton = document.createElement("button");
        deleteButton.id = `button-${id}`;
        deleteButton.textContent = "Radera";
        deleteLi.appendChild(deleteButton);

        ulList.append(compLi, jobtLi, locLi, startLi, endLi, descLi, deleteLi);
        listDiv.appendChild(ulList);

        deleteList(id);
    });
}




//Ta bort lista på webbsida

function deleteList(id) {

    const list = document.getElementById(`ul-${id}`);
    const deleteButton = document.getElementById(`button-${id}`);

    deleteButton.addEventListener("click", () => {

        list.remove();
        deleteWork(id);
    })
}




//Ta bort work från API, med id

async function deleteWork(id) {

    let response = await fetch(`https://lab3-dt207g-webbtj.onrender.com/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let data = await response.json();
    console.log(data);
}