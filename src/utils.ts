export const calculatePace = (distance: number, time: string) => {
  const [secsStr, minsStr, hoursStr] = time.split(':').reverse();
  const timeInSecs =
    (parseInt(secsStr, 10) || 0) +
    60 * (parseInt(minsStr, 10) || 0) +
    3600 * (parseInt(hoursStr, 10) || 0);

  const pacePerKm = timeInSecs / 60 / distance;

  let minsPerKm = Math.floor(pacePerKm);
  let secsPerKm = Math.round((pacePerKm - minsPerKm) * 60);
  if (secsPerKm === 60) {
    secsPerKm = 0;
    minsPerKm += 1;
  }
  return [minsPerKm, secsPerKm];
};

export const shiftTimeColons = (time: string) =>
  time
    .replace(/:/g, '')
    .replace(/(\d)(\d\d)$/, '$1:$2')
    .replace(/(\d)(\d\d):/, '$1:$2:');
