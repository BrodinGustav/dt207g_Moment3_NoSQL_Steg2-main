
// Funktionen för att visa felmeddelanden
function displayErrors(errors) {
    const errorList = document.getElementById('error-list');
    errorList.innerHTML = "";                       // Rensa befintlig lista
  
    errors.forEach(error => {
        const li = document.createElement('li');
        li.textContent = error;
        errorList.appendChild(li);                 // Lägg till felmeddelande i listan
    });
  }

  //
  document.addEventListener("DOMContentLoaded", function() {
    const url = "mongodb://localhost:27017/mom3_noSQL";     //Url till MongoDB-databasen 
  
    // Kör koden endast om den aktuella sidan är index.html
    if (window.location.pathname === "/index.html") {
        getData(url);                           // Hämta och visa CV-data
    }
  
    // Kör koden endast om den aktuella sidan är add.html
    else if (window.location.pathname === "/add.html") {
        
        //Hämta in ID för cvForm och lägg till lyssnare
        document.getElementById('cvForm').addEventListener('submit', async function(event) {
            event.preventDefault();             // Förhindra standardbeteende för formuläret
            let companyname = document.getElementById('companyname').value;
            let jobtitle = document.getElementById('jobtitle').value;
            let location = document.getElementById('location').value;
       
        // Skapa en array för att lagra felmeddelanden
        let errors = [];
  
          // Kontrollera om något av fälten är tomt och lägg till lämpligt felmeddelande i arrayen
          if (!companyname) {
            errors.push("Company name is required");
        }
        if (!jobtitle) {
            errors.push("Job title is required");
        }
        if (!location) {
            errors.push("Location is required");
        }
  
    // Om det finns fel, visa dem och avbryt formulärinsändningen
    if (errors.length > 0) {
      displayErrors(errors);
      return;
  }
  
  // Om inga fel finns, skicka data till servern och återställ formuläret
  await createWork(url, companyname, jobtitle, location); // Skicka data till servern
  await getData(url); // Uppdatera CV-listan efter att data har lagts till
  resetForm();
  
          });
    }
  });
  
// Funktion för att hämta data och uppdatera listan med arbetslivserfarenheter
async function getData(url) {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Data is not an array');
  }

    const ul = document.getElementById('cv-list');
    if (!ul) {
      console.error("UL element not found");
      return;
    }
   
    ul.innerHTML = "";                          //Rensar listan
    data.forEach(work => {
      const li = document.createElement('li');  //Skapar <li>-element
  
      const companySpan = createSpanWithText(`Company: ${work.companyname}`);
      const jobTitleSpan = createSpanWithText(`Job Title: ${work.jobtitle}`);
      const locationSpan = createSpanWithText(`Location: ${work.location}`);
  
      // Skapa delete-knapp
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', async () => {
        await deleteWork(url, work.id);          // Anropa deleteWork med URL och ID för arbetslivserfarenhet
        await getData(url);                      // Uppdatera listan efter borttagning av data
      });
  
      // Lägg till spans och delete-knapp i <li>-elementet
      li.appendChild(companySpan);
      li.appendChild(jobTitleSpan);
      li.appendChild(locationSpan);
      li.appendChild(deleteBtn);
  
      ul.appendChild(li);                       //Lägger till <li>-element till <ul>
    });
  }  

  // Skapar <span> med angiven text och fetstil
function createSpanWithText(text) {
    const span = document.createElement('span');
    span.textContent = text;
    span.style.fontWeight = 'bold';
    return span;
  }
  
// Funktion för ta bort en arbetslivserfarenhet
async function deleteWork(url, id) {                    //URL och id som argument      
    try {
      const response = await fetch(`${url}/${id}`, {  //Skickar förfrågan till databasens url och id för radering
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete work experience');
      }
      console.log('Work experience deleted successfully');
    } catch (error) {
      console.error(error.message);
    }
  }

  // Funktion för att lägga till ny arbetslivserfarenhet till servern
async function createWork(url, companyname, jobtitle, location) {
    let work = {                                        //Skapar nytt objekt som skickar till databasen
        companyname: companyname,
        jobtitle: jobtitle,
        location: location
    };
    const response = await fetch(url, {                 //Databasens URL som argument   
        method: "POST",                                 //POST för att skicka data till databasen
        headers: {
            "content-type": "Application/json"          //Anger att det är JSON-data som skickas till databasen
        },
        body: JSON.stringify(work)                      //Omvandlar objektet till JSON-sträng till databasen
    });
    const data = await response.json();
    console.log(data);
  }
  
  // Funktionen för att rensa formuläret vid skicka av datan
function resetForm() {
    document.getElementById('cvForm').reset();
  }
  
