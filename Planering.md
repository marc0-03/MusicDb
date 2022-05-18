## Databaser
Borde ha en databas för artister, ratings, användare och låtar.
Artist databasen borde ha   
| (long auto) ID | (string) NAMN | (date) STARTED_AT |

Låt databasen borde ha      
| (long auto) ID | (string) LÅTNAMN | (string) ALBUMNAMN | (array of longs) ARTISTER | (Set multi) GENRE | (Link to spotify or soundcloud) LÅT | (Image fil) ALBUMCOVER |

Ratings databasen borde ha  
| (long auto) ID | (long) LÅT_ID | (long) ANVÄNDARID | (long 1-10) RATING |

Användar databasen borde ha   
| (long auto) ID | (string) NAMN | (string) LÖSENORD |


## Front end
Kommer att använda bootstrap för att styla min sida.
Har gjort en figma skiss för hur det ungefär kommer att se ut.

## Back end
  
kommer först ha en start sida, på startsida kan du kolla på musik databasen och söka och lyssna men du kan inte ge någon rating
Kommer ha routes för en inlogning och för att skapa konton, för att ladda up låtar och artister, för att kolla på en viss låt.
när du är inloggad kan du posta mer låtar till databasen och ge dom en rating men resten kommer vara densamma som om du är utloggad

## Avgränsningar
Jag har bara x många lektioner
Jag vet bara så mycket om databaser samt webb-programering.

## Planering
| Vecka | Måndag    |   | Onsdag              |   | Fredag |   |
|-------|-----------|---|---------------------|---|--------|---|
| 17    | Planering |   | Planering//Figma/Databaser |   | Databser/Börja med routes och fixa|   |
| 18    |           |   |                     |   |        |   |
| 19    |           |   |                     |   |        |   |
| 20    |           |   |                     |   |        |   |
| 21    |           |   |                     |   |        |   |
| 22    |           |   | Inlämning           |   |        |   |


## Väldigt enkel figma skiss
https://www.figma.com/file/bhddVHKsYHuE1flbMpZZ59/Untitled?node-id=2%3A123 
