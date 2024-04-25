//Formulär för att hämta data från servern
async function fetchCvs() {
    const respone = await fetch("/cv");
    const data = await respone.json();
    const cvListElement = document.getElementById("cv-list");
    cvListElement.innerHTML = "";
    data.forEach((cv)=>{
        const cvElement = document.createElement("div");
        cvElement.innerHTML = "<p><strong>F\xf6retagsnamn:</strong>${cv.companyname}</p>, <p><strong>Jobttitel:</strong>${cv.jobtitle}</p>, <p><strong>Arbetsplats:</strong>${cv.location}</p>";
        cvListElement.appendChild(cvElement);
    });
}
// Ladda in CV:er när sidan laddas
fetchCVs();

//# sourceMappingURL=index.de158e3a.js.map
