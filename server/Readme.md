## NODEJS SERVER README METHOD-QUERIES

### Business Methods
/registerbusiness?user&name&address&city&email&phone&description&website <br />
/authbusinessname?user <br />
/setcoordinates?user&lat&long<br />
/getbusiness?name<br />
/getbusinesses?name<br />
/getallbusinesses<br />
/hitbusiness?user&hits <br />
/savebusinesspic?user&pic <br />
/savebusinesslogo?user&logo <br />
/setweekday?user&weekday_open&weekday_close <br />
/setweekend?user&weekend_open&weekend_close <br />

### Individual Methods
/registerindividual?user&fname&lname&address&city&email&phone <br />
/authindividualname?user<br />
/seticoordinates?user&lat&long<br />
/getindividual?user<br />
/getindividuals?user<br />
/getallindividual<br />
/getindividualsbyname?name<br />
/hitindividual?user&hits <br />
/saveindividualpic?user&pic <br />


### Site Methods
/registersite?user&name&address&lat&long <br />
/setscoordinates?name&lat&long <br />
/getsite?name <br />
/getsites?name <br />
/getallsites <br />
/getsitesbyuser?user <br />
/hitsite?name&hits <br />
/savesitepic?name&pic <br />

### Mapping Methods
/getdirection?olat&olong&dlat&dlong <br />