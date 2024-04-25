//Formulär för att hämta data från servern
async function fetchCvs(){
  try{
  const respone = await fetch("/cv");
  const data = await respone.json();
  
  const ul = document.getElementById("cv-list");
  if (!ul) {
    console.error("UL element not found");
    return;
  }


  ul.innerHTML = "";                          //Rensar listan

  data.forEach(cv => {
    const li = document.createElement('li');  //Skapar <li>-element

    const companySpan = createSpanWithText(`Company: ${cv.companyname}`);
    const jobTitleSpan = createSpanWithText(`Job Title: ${cv.jobtitle}`);
    const locationSpan = createSpanWithText(`Location: ${cv.location}`);

     // Lägg till spans i <li>-elementet
     li.appendChild(companySpan);
     li.appendChild(jobTitleSpan);
     li.appendChild(locationSpan);
     li.appendChild(deleteBtn);
 
     ul.appendChild(li);                       //Lägger till <li>-element till <ul>
   });
 

} catch (error){
  console.error("Fel uppstod vid hämtning av CV-data:", error);
}
}
  // Ladda in CV:er när sidan laddas
  fetchCvs();