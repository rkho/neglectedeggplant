/*******************************************
 Returns a date X days from now as
 a string in the format YYYY-MM-DD
********************************************

Parameters:
  - Days {Number}: The number of days into the future - E.g. 90

Example usage:
daysFromNow(14);

*******************************************/

var daysFromNow = function(days){

  //Get today's date, divide by 1000 to convert to seconds since epoch.
  //(JS defaults to milliseconds since epoch) 
  var today = Math.floor(Date.now() / 1000);

  //Work out the number of seconds into the future.
  var seconds = 60*60*24*days;
  
  //Convert back to milliseconds & create a date.
  var future = new Date((today+seconds) * 1000);
  
  //Calculate year.
  var year = future.getFullYear();
  
  //JS months are zero-indexed. We need to add 1.
  //Pad MM with a 0 if less than 9. E.g. 9 becomes 09.
  var month = (future.getMonth()+1) > 9 ? future.getMonth()+1 : "0"+(future.getMonth()+1);

  //Calculate day.
  //Pad DD with a 0 if less than 9. E.g. 9 becomes 09.
  var day = (future.getDate() > 9) ? future.getDate() : "0"+ future.getDate();
  
  //Return in the format YYYY-MM-DD
  return year+'-'+month+'-'+day;

}

module.exports = daysFromNow;
