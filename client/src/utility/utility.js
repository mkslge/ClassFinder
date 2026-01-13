const AUGUST = 8;
const JANUARY = 1;
const MARCH = 3;
const OCTOBER = 10;
export function getTestudoLink(courseCode) {
    return `https://app.testudo.umd.edu/soc/search?courseId=${courseCode}&sectionId=&termId=${getTermID()}&_openSectionsOnly=on&creditCompare=&credits=&courseLevelFilter=ALL&instructor=&_facetoface=on&_blended=on&_online=on&courseStartCompare=&courseStartHour=&courseStartMin=&courseStartAM=&courseEndHour=&courseEndMin=&courseEndAM=&teachingCenter=ALL&_classDay1=on&_classDay2=on&_classDay3=on&_classDay4=on&_classDay5=on`
}

/* The term ID on Testudo is in the format of YEARMONTH, for example 202601, where year = 2026, and month is 01
*/
function getTermID() {
    
    let monthID = calcMonthID();
    let yearID = calcYearID();
    return `${yearID}${monthID}`
}
/* we want to show fall if between ~march and october
    we want to show fall between november and february
    */
function calcMonthID() {
    const today = new Date();
    let month = today.getMonth() + 1; 
    
    return "0" + (month >= MARCH && month <= OCTOBER ? AUGUST : JANUARY);
}

/* The only time we want the testudo to link to the next year is when it is fall of the previous year, but next springs calendar has been set,
   this only happens ~between October and November, but i put November just to be safe.
*/
function calcYearID() {
    const today = new Date();
    const month = today.getMonth() + 1;
   if(month <= OCTOBER) {
    return today.getFullYear();
   } else {
     return today.getFullYear() + 1;
   }
}