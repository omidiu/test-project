



exports.convertDateStringToDateObj = (dateString) => {

  // dateString format like this: 2019-01-23 00:00:00

  // 2019-01-23
  const year = dateString.split(" ")[0].split("-")[0];
  const month = dateString.split(" ")[0].split("-")[1];
  const day = dateString.split(" ")[0].split("-")[2];

  // 00:00:00
  const hour = dateString.split(" ")[1].split(":")[0];
  const minute = dateString.split(" ")[1].split(":")[1];
  const second = dateString.split(" ")[1].split(":")[2];

  // new Date(year, month, day, hours, minutes
  return new Date(year, month, day, hour, minute, second);


}