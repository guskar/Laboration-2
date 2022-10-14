# Reflektioner


### Meaningful names


### Functions 


### Comments 


### Formatting 


### Objects and Datastructures 
**The Law of Demeter** är en regel som säger att ett objekt inte ska veta om ett annat objekts innehåll fullt ut. I min klass chordPicker som jag bröt ut i refaktureringen av min modul så finns ett fryst objekt med giltiga ackord som inte någon annan klass behöver veta om eller ska kunna manipulera. Därför väljer jag att anropa klassens publika metoder och låta klassen själv jobba med objektet internt i form att välja ut och returnera värden från objektet.

 <img src="images/chordpicker.png" width="700" >



### Error handling 


### Boundaries 


### Unit tests 


### Classes 
I refaktureringen av min modul så blev det tydligt, att de metoder som exporterades i helperFunctions.js, egentligen borde tillhöra olika koncept och brytas ut i olika klasser. Exempelvis fanns där några metoder som använde sig av ett fryst enum-object med alla tillgängliga ackord och sedan fanns några som ansvarade använde sig av ett enum för strängformatering. Därför bröt jag ut dessa i en chordPicker klass och en formatter klass för att uppnå högre sammanhållning(Cohesion) mellan dessa. På detta sätt känns min kod också mer objektorienterad och jag kan mer och mer börja sträva mot att klasser blir minde och i slutändan kanske jag även uppnår att de bara har ett ansvarsområde och en anledning att ändras.


### Systems 
