// Funktionen för att visa felmeddelanden
function displayErrors(errors) {
    const errorList = document.getElementById("error-list");
    errorList.innerHTML = ""; // Rensa befintlig lista
    errors.forEach((error)=>{
        const li = document.createElement("li");
        li.textContent = error;
        errorList.appendChild(li); // Lägg till felmeddelande i listan
    });
}
document.addEventListener("DOMContentLoaded", function() {
    const url = "http://localhost:3000/cv";
    // Kör koden endast om den aktuella sidan är index.html
    if (window.location.pathname === "/index.html") fetchCvs(url); // Hämta och visa CV-data
    else if (window.location.pathname === "/add.html") //Hämta in ID för cvForm och lägg till lyssnare
    document.getElementById("cvForm").addEventListener("submit", async function(event) {
        event.preventDefault(); // Förhindra standardbeteende för formuläret
        let companyname = document.getElementById("companyname").value;
        let jobtitle = document.getElementById("jobtitle").value;
        let location = document.getElementById("location").value;
        // Skapa en array för att lagra felmeddelanden
        let errors = [];
        // Kontrollera om något av fälten är tomt och lägg till lämpligt felmeddelande i arrayen
        if (!companyname) errors.push("Company name is required");
        if (!jobtitle) errors.push("Job title is required");
        if (!location) errors.push("Location is required");
        // Om det finns fel, visa dem och avbryt formulärinsändningen
        if (errors.length > 0) {
            displayErrors(errors);
            return;
        }
        // Om inga fel finns, skicka data till servern och återställ formuläret
        await createWork(url, companyname, jobtitle, location); // Skicka data till servern
        await fetchCvs(url); // Uppdatera CV-listan efter att data har lagts till
        resetForm();
    });
    //Formulär för att hämta data från servern
    async function fetchCvs() {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const ul = document.getElementById("cv-list");
            if (!ul) {
                console.error("UL element not found");
                return;
            }
            ul.innerHTML = ""; //Rensar listan
            data.forEach((cv)=>{
                const li = document.createElement("li"); //Skapar <li>-element
                const companySpan = createSpanWithText(`Company: ${cv.companyname}`);
                const jobTitleSpan = createSpanWithText(`Job Title: ${cv.jobtitle}`);
                const locationSpan = createSpanWithText(`Location: ${cv.location}`);
                //Skapa delete-knapp
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Radera";
                deleteBtn.addEventListener("click", async ()=>{
                    await deleteCv(url, cv.id);
                    await fetchCvs(url);
                });
                // Lägg till spans i <li>-elementet
                li.appendChild(companySpan);
                li.appendChild(jobTitleSpan);
                li.appendChild(locationSpan);
                li.appendChild(deleteBtn);
                ul.appendChild(li); //Lägger till <li>-element till <ul>
            });
        } catch (error) {
            console.error("Fel uppstod vid h\xe4mtning av CV-data:", error);
        }
    }
    function createSpanWithText(text) {
        const span = document.createElement("span");
        span.textContent = text;
        return span;
    }
    //Metod för radera post
    async function deleteCv(_id) {
        try {
            console.log("ID att radera:", _id); //Kontroll för att se om ID är korrekt
            const response = await fetch(`/cv/${_id}`, {
                method: "DELETE"
            });
            console.log(_id);
            console.log(url);
            if (response.ok) // CV-posten raderades framgångsrikt
            console.log("CV post deleted successfully");
            else // CV-posten raderades inte
            console.error("Failed to delete CV");
            // Uppdatera listan efter borttagning av CV-posten
            await fetchCvs();
        } catch (error) {
            console.error("Error deleting CV:", error);
        }
    }
    //Skapa post
    async function createWork(url, companyname, jobtitle, location) {
        let work = {
            companyname: companyname,
            jobtitle: jobtitle,
            location: location
        };
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "Application/json" //Anger att det är JSON-data som skickas till databasen
            },
            body: JSON.stringify(work) //Omvandlar objektet till JSON-sträng till databasen
        });
        const data = await response.json();
        console.log(data);
    }
    // Funktionen för att rensa formuläret vid skicka av datan
    function resetForm() {
        document.getElementById("cvForm").reset();
    }
    // Ladda in CV:er när sidan laddas
    fetchCvs();
});

//# sourceMappingURL=index.de158e3a.js.map
