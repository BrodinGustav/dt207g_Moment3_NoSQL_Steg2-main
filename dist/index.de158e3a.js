//Formulär för att hämta data från servern
async function fetchCvs() {
    try {
        const respone = await fetch("http://localhost:3000/cv");
        const data = await respone.json();
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
            // Lägg till spans i <li>-elementet
            li.appendChild(companySpan);
            li.appendChild(jobTitleSpan);
            li.appendChild(locationSpan);
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
// Ladda in CV:er när sidan laddas
fetchCvs();

//# sourceMappingURL=index.de158e3a.js.map
