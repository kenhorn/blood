
var http = require('https');

// 
// note the embedded start date in dd-mm-yyyy and venue name/address/ID
// 
var options = {
  host: 'my.blood.co.uk',
  path: '/SessionFinder/GetSessions?venueID=W379D&startDate=06-05-2014&endDate=&startTime=08:00&endTime=20:00&daysOfWeek=M,T,W,H,F,S,U&venueName=Islington%2C%20Islington%20Town%20Hall&venueAddress=Upper%20Street%2C%20London%2C%20N1%202UD&_=1399406077417',
  port: '443',
};

callback = function(response) {
  var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    var cal = handle(str);
    console.log(cal);
    process.exit(0);
  });
}


function handle(ret) {
  var applist = JSON.parse(ret);

  // console.log(JSON.stringify(applist,2,2));

  var cal="";
  cal += "BEGIN:VCALENDAR\n";
  cal += "VERSION:2.0\n";
  cal += "PRODID:-//hacksw/handcal//NONSGML v1.0//EN\n";

  for (var i=0; i< applist.length; i++) {
    var dt=applist[i].SessionDateString.substring(6)+applist[i].SessionDateString.substring(3,5)+applist[i].SessionDateString.substring(0,2);
    var fromtm= applist[i].AvailableSlots[0].AvailableSlots.TimeSlotFrom.replace(/:/,""); // should be UTC
    var untiltm=applist[i].AvailableSlots[0].AvailableSlots.TimeSlotTo.replace(/:/,""); // should be UTC

    var msg="Blood Islington, open:"+applist[i].HasOpenAccess;
    cal += "BEGIN:VEVENT\n";
    cal += "UID:" +dt+"-"+fromtm+ "@nhsbt/islington\n"; // use real data
    cal += "DTSTAMP:" +dt+"T"+fromtm+ "00Z\n";
    cal += "ORGANIZER;CN=info:MAILTO:info@nhsbt.nhs\n"; // use real data
    cal += "DTSTART:" +dt+"T"+fromtm+ "00Z\n";
    cal += "DTEND:" +dt+"T"+untiltm+ "00Z\n";
    cal += "SUMMARY:" +msg +"\n";
    cal += "END:VEVENT\n";
  }
  cal += "END:VCALENDAR";
  return cal;
}


var req = http.request(options, callback);
req.end();

//var s = '[{"AppointmentAvailability":"Y","AppointmentStatus":"M","AvailableSlots":[{"AvailableSlots":{"AvailableAppoinments":"-1","IsAvailable":true,"TimeSlotFrom":"13:00","TimeSlotTo":"15:00"},"SlotsCategory":null},{"AvailableSlots":{"AvailableAppoinments":"-1","IsAvailable":true,"TimeSlotFrom":"16:30","TimeSlotTo":"19:30"},"SlotsCategory":null}],"BookingFlag":"Y","HasOpenAccess":true,"IsAvailable":true,"IsProvisional":false,"Notes":null,"SessionDate":"\/Date(1403568000000+0000)\/","SessionDateString":"24-06-2014","SessionID":"WA01BK","SessionStatus":"F","TotalFreeSlots":-1},{"AppointmentAvailability":"Y","AppointmentStatus":"M","AvailableSlots":[{"AvailableSlots":{"AvailableAppoinments":"-1","IsAvailable":true,"TimeSlotFrom":"13:00","TimeSlotTo":"15:00"},"SlotsCategory":null},{"AvailableSlots":{"AvailableAppoinments":"-1","IsAvailable":true,"TimeSlotFrom":"16:30","TimeSlotTo":"19:30"},"SlotsCategory":null}],"BookingFlag":"W","HasOpenAccess":true,"IsAvailable":true,"IsProvisional":false,"Notes":null,"SessionDate":"\/Date(1405987200000+0000)\/","SessionDateString":"22-07-2014","SessionID":"WA01BH","SessionStatus":"F","TotalFreeSlots":-1},{"AppointmentAvailability":"Y","AppointmentStatus":"M","AvailableSlots":[{"AvailableSlots":{"AvailableAppoinments":"-1","IsAvailable":true,"TimeSlotFrom":"13:00","TimeSlotTo":"15:00"},"SlotsCategory":null},{"AvailableSlots":{"AvailableAppoinments":"-1","IsAvailable":true,"TimeSlotFrom":"16:30","TimeSlotTo":"19:30"},"SlotsCategory":null}],"BookingFlag":"W","HasOpenAccess":true,"IsAvailable":true,"IsProvisional":false,"Notes":null,"SessionDate":"\/Date(1413849600000+0000)\/","SessionDateString":"21-10-2014","SessionID":"WA01BL","SessionStatus":"F","TotalFreeSlots":-1},{"AppointmentAvailability":"Y","AppointmentStatus":"M","AvailableSlots":[{"AvailableSlots":{"AvailableAppoinments":"-1","IsAvailable":true,"TimeSlotFrom":"13:00","TimeSlotTo":"15:00"},"SlotsCategory":null},{"AvailableSlots":{"AvailableAppoinments":"-1","IsAvailable":true,"TimeSlotFrom":"16:30","TimeSlotTo":"19:30"},"SlotsCategory":null}],"BookingFlag":"W","HasOpenAccess":true,"IsAvailable":true,"IsProvisional":false,"Notes":null,"SessionDate":"\/Date(1415577600000+0000)\/","SessionDateString":"10-11-2014","SessionID":"WA01BI","SessionStatus":"F","TotalFreeSlots":-1}]'
//var cal = handle(s);
//console.log(cal);

