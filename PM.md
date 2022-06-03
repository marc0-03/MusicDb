# Music database

Marcus Nylund - 2022-06-03

## Inledning

Syftet med arbetet var att skapa en music databas där användare skulle kunna lägga till låtar, söka efter låtar, lyssna på dom och ge dom ratings fast på grund av komplexiteten av att skicka in filer till databasen förlorade jag mycket tid och fick lov att ändra min design.

### arbetssätt
Vi jobbade under ungefär 4~5 veckor och började med att skapa en planering och sedan att jobba utifrån den.

### genomförande
Jag började med att komma på med en ide för vad jag skulle göra, jag gillar musik så jag valde att göra detta projekt.

efter bas iden tänkte jag ut vad för delar sidan behövde. Jag tänkte att sidan behövde en "main" sida där alla låtar visades, en separat sida där man skulle kunna kolla på en låt och ge den en rating, en sida för att skapa en användare och logga in, en sida för att lägga till en artist till databasen, en sida för att lägga till en låt, ett sätt att söka efter låtar.

efter jag visste vilka delar sidan behövdes gjorde jag en figma design på det, projektet blev dock inte exakt som mitt figma dokument eftersom jag spenderade den mesta tiden jag hade på projektet på att fixa databas delen.

Efter designen skapades tänkte jag ut hur jag vilka databaser jag behövde och vilka delar de behövde.

Efter jag gjorde allt det började att jobba på sidan.
Jag började att skapa inloggningen och tog den stora delen av den från arbetet i ALC
efter jag skapade inloggningen skapade jag sidan för att skapa artister, efter jag fixade mitt form och fick det att fungera började på att kunna ladda upp låtar här stötte jag dock på problem.
Jag visste inte hur jag skulle få in filer i min databas, jag hittade ett sätt för användare att välja vilken fil de ville ladda up men inget sätt för sidan att ta emot det.
Jag spenderade ~2 veckor på att försöka få detta att fungera men efter jag pratade med undervisande lärare om problemet ändrade jag min design.

Jag ändrade så att användare skulle skicka in spotify länkar istället för filer.

Efter jag började jobba med spotify länkar gick det mycket bättre.
Jag gjorde klar sidan för att lägga till låtar och visa dom på två lektioner ungefär och sedan började jag på sidan för en enskild låt, här hade jag dock slut med tid och fick lov att slänga ut några funktioner jag ville att sidan skulle ha, jag skapade dock en sökfunktion för låtar men den var inte lika avancerad som min originella ide där jag tänkte att man skulle kunna söka efter artister, genres och låtnamn samtidigt.
Jag hade inte heller tid att fixa pagination på min sida så om databasen blir fylld med låtar kommer det bli svårt för sidan att ladda allt.


## Bakgrund

### Inloggning
Jag skapade ett sätt för användare på sidan att skapa konton och logga in, eftersom jag inte fixade ratings hade det inte en så stor användning i slutet.

Jag skapade två sidor med forms, en för att logga in och en för att skapa ett konto.


### Artister

Jag skapade en databas för artister och en sida för att lägga till dem. För databasen sparade jag ID, Namn och när de började att skapa musik, när användare skulle lägga till en ny artist skriver de in namnet och sedan när de började deras karriär.

### Låtar

Jag hade en databas för låtar och en sida för att användare ska kunna lägga till dem.

Databasen hade ID, SONG_NAME, ALBUM_NAME, GENRES, ARTISTS, SONG_LINK
Id var automatiskt när man la till en ny låt till databasen

Användare skrev in låt namnet, album namnet (om den inte var en singel), tryckte in vilka genres den tillhörde, tryckte in vilken artist som skapade låten och skrev in en spotify länk till låten.

när användare skickar in låten görs spotify länken om till en länk som funkar med embeds och sedan läggs den till i databasen.

sedan har jag en sida som visar alla låtar och en sida för att visa en speciel låt.

## Positiva erfarenheter

Jobbade bra med spotify embeds: Det var roligt och enkelt att lära mig om spotify embeds och jobba med dem, kommer nog vara ännu enklare att använda embeds i framtiden.

Det gick väldigt snabbt att få inloggningen att fungera eftersom jag hade gjort det förut.

det gick enkelt att designa sidan med bootstrap eftersom jag nu jobbat med det i några månader och vet hur det fungerar.

## Negativa erfarenheter

Jag fick inte filuppladdning att fungera och istället för att hitta en annan lösning spenderade jag väldigt mycket tid att få det att fungera. I framtiden borde jag istället för att försöka få en viss sak att fungera söka efter andra lösningar.

tidshantering. Jag spenderade för mycket tid att försöka att få filuppladdning att fungera och på grund av det hade jag inte nog med tid för andra “features” jag ville ha på sidan. i framtiden borde jag försöka tänka på hur mycket tid innan jag spenderar så mycket tid att försöka ett problem som jag egentligen kan gå runt.

## Sammanfattning

Jag tyckte att sidan blev bra även fast att många delar fortfarande fattas.

Planerings delen gick bra.
allt gick bra till filuppladning



Jag är arg på mig själv att jag inte slutade försöka med filuppladning tidigare.
Att använda spotify embeds gick enkelt och gick snabbt att förstå.

Hade inte nog med tid pga filuppladning


Om jag skulle fortsätta jobba på projektet skulla jag först lägga till ratings, sedan skulle jag fixa pagination och efter det skulle jag fixa ett mer advancerat sök system så man kan söka på letar efter flera faktorer som, rating, artist, namn och genre så exempel kan man söks någonting som [artist=MF DOOM, Genre=HIP_HOP, RATING>6] eller någonting sånt


