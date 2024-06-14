

export function convertDate(dateString) {
    // Muuntaa päivämäärän muodosta "DD.MM.YYYY" muotoon "YYYY-MM-DD"
    if (!dateString || dateString.split("."). length !== 3) {
        return null;
    }
    const parts = dateString.split(".");
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }

export function calculateTotaWorkTime (workDays) {
    let totalSeconds = 0;
    
    workDays.forEach(workDay => {

        if (!workDay.startDate || !workDay.startTime || !workDay.endDate || !workDay.endTime) {
            // console.log("Puuttuvia päivämäärä- tai aikatietoja, ohitetaan tämä workDay");
            return; // Ohita tämä iteraatio, koska tarvittavat tiedot puuttuvat
        }
        
        const startDateString = convertDate(workDay.startDate) + 'T' + workDay.startTime;
        
        const endDateString = convertDate(workDay.endDate) + 'T' + workDay.endTime;

        if (!startDateString || !endDateString) {
            // console.log("Virheelliset päivämäärät, ohitetaan tämä workDay");
            return; // Ohita tämä iteraatio, koska päivämäärämuunnos epäonnistui
        }

        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);

        // Varmista, että päivämääräobjektit ovat kelvollisia
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            // console.log("Virheelliset päivämääräobjektit, ohitetaan tämä workDay");
            return; // Ohita tämä iteraatio, jos päivämääräobjektit eivät ole kelvollisia
        }

        const seconds = (endDate - startDate) / 1000;
        totalSeconds += seconds;
    })

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    return `${hours}h ${minutes}min`;

}
 // Tämä funktio muuntaa laskemasi ajan "0h 34min" minuuteiksi
export function convertToMinutes(timeString) {
    const parts = timeString.split(' ');
    const hours = parseInt(parts[0].replace('h', ''), 10);
    const minutes = parseInt(parts[1].replace('min', ''), 10);
    return hours * 60 + minutes;
}