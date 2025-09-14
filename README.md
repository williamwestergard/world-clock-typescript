# Loggbok

Den huvudsakliga idéen för projektet var att framhäva hemsidans viktigaste funktioner.
Jag ville att hemsidans syfte skulle bli uppenbart så fort användaren såg sidan.

Därför tänkte jag att populära staders tider skulle vara framhävt på förstasidan, tillsammans med
en sök funktion och favoritlista. (Se bild 1)

![Skiss](./src/assets/skiss.jpg)

Jag delade upp komponenterna i funktioner. Exempelvis navbar, footer, Cities och sökfunktion.
Tanken var sedan att inte låta en komponent bli för komplex med funktioner som kunde brytas ner till mindre komponenter.

Listan på städer blev sin egen fil som jag sedan återanvände i flera komponenter.
Listan på populära städer blev en komponent, medan individuella städer blev en annan.

På så sätt bröt jag ner koden till flera filer, som jag kunde välja att implementera vart jag ville på hemsidan.

Jag hittade en open-source kod på en analog klocka som jag stylade om och implementerade i projektet.
Efter att jag listat ut hur man byter tidszon direkt i koden, kunde jag skapa en knapp som växlade mellan en digital och analog klocka.

Det största problemet var att skapa en "favorit" funktion med localstorage.
Jag kunde inte få localstorage att fungera på alla komponenter, utan den fungerade för den individuella sidan men inte för de populära städerna.
Det var något jag kämpade med länge. Det visade sig att jag endast behövde lägga till funktionen i "parent" filen, istället för i varje fil som behövde funktionen.
