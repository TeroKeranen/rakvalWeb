
// funktio jolla saadaan tapahtumien timestamppi muutettua parempaan muotoon
export const changeEventsTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    const formattedDate = date.toLocaleString('fi-FI', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      return formattedDate;

}