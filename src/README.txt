***Beskrivning av Webbapplikationen:***
Denna webbapplikation är utformad för att hantera arbetslivserfarenheter genom att tillåta användare att lägga till, visa och ta bort data från en databas. 
Användare kan interagera med applikationen genom att lägga till nya arbetslivserfarenheter genom ett formulär och visa befintliga erfarenheter på en särskild sida. 
Dessutom kan användare ta bort enskilda arbetslivserfarenheter från databasen direkt från gränssnittet.

***Funktioner i Webbapplikationen:***

***Visa Felmeddelanden:

Funktionen displayErrors används för att visa felmeddelanden relaterade till validering av formulärdata. 
Om ett eller flera fält i formuläret lämnas tomma visas lämpliga felmeddelanden.

**Hämta och Visa CV-data:

När webbsidan laddas hämtas och visas befintliga arbetslivserfarenheter från databasen. 
Detta görs genom att använda funktionen fetchCvs, som hämtar data från en angiven URL och renderar den på sidan.

**Lägg till Ny Arbetslivserfarenhet:

Användare kan fylla i ett formulär med information om en ny arbetslivserfarenhet och skicka den till databasen genom att trycka på en "Lägg till i CV" -knapp. 
Innan data skickas valideras formulärfälten för att säkerställa att viktig information som företagsnamn, arbetsroll, plats och ansvarsområden anges. 
Om något fält är tomt visas felmeddelanden och användaren hindras från att skicka formuläret.

**Ta Bort Arbetslivserfarenhet:

För varje befintlig arbetslivserfarenhet som visas på sidan läggs en "Radera" -knapp till. 
Genom att klicka på denna knapp kan användare ta bort den specifika erfarenheten från databasen. 
Detta görs genom att anropa funktionen deleteCv, som skickar en DELETE-förfrågan till databasen med det unika ID:et för erfarenheten som ska tas bort.

Denna webbapplikation använder sig av Fetch API för att kommunicera med en RESTful webbtjänst, som i sin tur hanterar CRUD-operationer för arbetslivserfarenheter. 
Den använder även JSON-format för att överföra data mellan klienten och servern, vilket möjliggör enkel hantering av data i JavaScript.