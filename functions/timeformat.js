
export function formatDate(date) {
  let d = new Date(date)
  let dayOfMonth = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  let hour = d.getHours();
  let minutes = d.getMinutes();
  let diffMs = new Date().getTime() - d.getTime();
  let diffSec = Math.round(diffMs / 1000);
  let diffMin = parseInt(diffSec / 60);
  let diffHour = parseInt(diffMin / 60);

  // formatting
  year = year.toString();
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  if (diffMin < 1) {
    return 'Just now';
  }
  else if (diffHour < 1) {
    return `${diffMin} min ago`
  } else {
    return `${dayOfMonth}-${month}-${year}`
  }
}

export function storyDate(timeStamp) {
  var ms_Min = 60 * 1000; // milliseconds in Minute 
  var ms_Hour = ms_Min * 60; // milliseconds in Hour 
  var ms_Day = ms_Hour * 24; // milliseconds in day 
  var ms_Mon = ms_Day * 30; // milliseconds in Month 
  var ms_Yr = ms_Day * 365; // milliseconds in Year 
  var diff = new Date().getTime() - timeStamp; //difference between dates. 
  // If the diff is less then milliseconds in a minute 
  if (diff < ms_Min) {
    return 'Just now';

    // If the diff is less then milliseconds in a Hour 
  } else if (diff < ms_Hour) {
    return Math.round(diff / ms_Min) + 'm';

    // If the diff is less then milliseconds in a day 
  } else if (diff < ms_Day) {
    return Math.round(diff / ms_Hour) + 'h';

    // If the diff is less then milliseconds in a Month 
  } else if (diff < ms_Mon) {
    return Math.round(diff / ms_Day) + 'd';

    // If the diff is less then milliseconds in a year 
  } else if (diff < ms_Yr) {
    return Math.round(diff / ms_Mon) + 'months';
  } else {
    return Math.round(diff / ms_Yr) + 'y';
  }

}

export function DayName(time) {
  var d = new Date(time);
  var weekday = new Array(7);
  weekday[0] = "Su";
  weekday[1] = "Mo";
  weekday[2] = "Tu";
  weekday[3] = "Wed";
  weekday[4] = "Thu";
  weekday[5] = "Fri";
  weekday[6] = "Sat";
  return weekday[d.getDay()];
}

export function monthName(dt) {
  let d = new Date(dt)
  mlist = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  return mlist[d.getMonth()];
};

export function dateMonthYear(dt) {
  let d = new Date(dt)
  let date = d.getDate();
  let month = monthName(dt);
  let year = d.getFullYear();
  return `${date} ${month} ${year}`
}

export function formatDate2(date) {
  let d = new Date(date)
  let dayOfMonth = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();

  // formatting
  year = year.toString();
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;

  return `${year}-${month}-${dayOfMonth}`
}

export function formatTimeAMPM(date) {
  let d = new Date(date)
  var hours = d.getHours();
  var minutes = d.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const monthNames = ["Janauary", "Febrauary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


export function daysname(date) {
  return weekday[date];
}


export function mothsData(date) {
  let m = date.getMonth() + 1
  let y = date.getFullYear()
  console.log("daysInMonth(m, y).length", m, y, daysInMonth(m, y))
  const d = []

  const allDay = new Date(date)
  for (let i = 0; i < daysInMonth(m, y); i++) {
    allDay.setDate(allDay.getDate() + i)
    d.push({
      dayName: daysname(allDay.getDay()),
      date: i + 1,
      isSelected:i+1 == new Date().getDate() ? true : false
    })

  }
  console.log("d", d)
  return d

}
