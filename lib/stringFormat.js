'use strict';

var util = require('util');

var shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function formatNumber(num, format) {
  var hex = format.match(/^([xX])([0-9]*)$/);
  if (hex) {
    var str = num.toString(16);
    if (hex[1] == 'x') {
      str = str.toLowerCase();
    } else {
      str = str.toUpperCase();
    }
    var width = parseInt(hex[2]);
    var neededPadding = width - str.length;
    for (var i = 0; i < neededPadding; i++) {
      str = '0' + str;
    }
    return str;
  }

  var negative = false;
  if (num < 0) {
    num = -num;
    negative = true;
  }

  var addPositiveSign = false;
  if (format.match(/^\+/)) {
    format = format.substr(1);
    addPositiveSign = true;
  }

  var formatParts = format.split('.');
  var formatBeforeDecimal = formatParts[0];
  var wholeNumber = Math.floor(num);
  var decimalVal = num - wholeNumber;
  var result = '';
  var wholeNumberStr = wholeNumber.toString();
  var formatIdx, numberIdx;

  // format whole number part
  for (formatIdx = formatBeforeDecimal.length - 1, numberIdx = wholeNumberStr.length - 1; formatIdx >= 0; formatIdx--) {
    if (formatBeforeDecimal[formatIdx] == '0' || formatBeforeDecimal[formatIdx] == '#') {
      if (numberIdx >= 0) {
        result = wholeNumberStr[numberIdx--] + result;
      } else {
        if (formatBeforeDecimal[formatIdx] == '#') {
          break;
        }
        result = '0' + result;
      }
    } else {
      result = formatBeforeDecimal[formatIdx] + result;
    }
  }
  result = result.replace(/^[^0-9]+/, '');

  // format decimal part
  if (formatParts.length > 1) {
    var formatAfterDecimal = formatParts[1];
    var decimalValStr = decimalVal.toString().substr(2);

    result += '.';
    for (formatIdx = 0, numberIdx = 0; formatIdx < formatAfterDecimal.length; formatIdx++) {
      if (formatAfterDecimal[formatIdx] == '0' || formatAfterDecimal[formatIdx] == '#') {
        if (numberIdx < decimalValStr.length) {
          result += decimalValStr[numberIdx++];
        } else {
          if (formatAfterDecimal[formatIdx] == '#') {
            break;
          }
          result += '0';
        }
      } else {
        result += formatAfterDecimal[formatIdx];
      }
    }
  }

  if (result[result.length - 1] == '.') {
    result = result.substr(0, result.length - 1);
  }

  if (negative) {
    result = '-' + result;
  }
  if (!negative && addPositiveSign) {
    result = '+' + result;
  }

  return result;
}

function formatDate(date, format) {
  switch (format) {
    case 'sd': // Short date - 10/12/2002
      return sf("{0:M}/{0:d}/{0:yyyy}", date);
    case 'D': // Long date - December 10, 2002
      return sf("{0:MMMM} {0:dd}, {0:yyyy}", date);
    case 't': // Short time - 10:11 PM
      return sf("{0:hh}:{0:mm} {0:tt}", date);
    case 'T': // Long time - 10:11:29 PM
      return sf("{0:hh}:{0:mm}:{0:ss} {0:tt}", date);
    case 'fdt': // Full date & time - December 10, 2002 10:11 PM
      return sf("{0:D} {0:t}", date);
    case 'F': // Full date & time (long) - December 10, 2002 10:11:29 PM
      return sf("{0:D} {0:T}", date);
    case 'g': // Default date & time - 10/12/2002 10:11 PM
      return sf("{0:sd} {0:t}", date);
    case 'G': // Default date & time (long) - 10/12/2002 10:11:29 PM
      return sf("{0:sd} {0:T}", date);
    case 'md': // Month day pattern - December 10
      return sf("{0:MMMM} {0:dd}", date);
    case 'r': // RFC1123 date string - Tue, 10 Dec 2002 22:11:29 GMT
      return sf("{0:ddd}, {0:dd} {0:MMM} {0:yyyy} {0:HH}:{0:mm}:{0:ss} {0:+zz}", date);
    case 's': // Sortable date string - 2002-12-10T22:11:29
      return sf("{0:yyyy}-{0:MM}-{0:dd}:{0:HH}:{0:mm}:{0:ss}", date);
    case 'd':
      return sf("{0:#0}", date.getDate());
    case 'dd':
      return sf("{0:00}", date.getDate());
    case 'ddd':
      return shortDays[date.getDay()];
    case 'dddd':
      return days[date.getDay()];
    case 'f':
      return sf("{0:0}", date.getMilliseconds() / 100.0);
    case 'ff':
      return sf("{0:00}", date.getMilliseconds() / 10.0);
    case 'fff':
      return sf("{0:000}", date.getMilliseconds() / 1.0);
    case 'h':
      return sf("{0:#0}", date.getHours() % 12);
    case 'hh':
      return sf("{0:00}", date.getHours() % 12);
    case 'H':
      return sf("{0:#0}", date.getHours());
    case 'HH':
      return sf("{0:00}", date.getHours());
    case 'mm':
      return sf("{0:00}", date.getMinutes());
    case 'M':
      return sf("{0:#0}", date.getMonth() + 1);
    case 'MM':
      return sf("{0:00}", date.getMonth() + 1);
    case 'MMM':
      return shortMonths[date.getMonth()];
    case 'MMMM':
      return months[date.getMonth()];
    case 'ss':
      return sf("{0:00}", date.getSeconds());
    case 'tt':
      return date.getHours() > 12 ? 'PM' : 'AM';
    case 'yy':
      return (date.getYear() + 1900).toString().substr(2);
    case 'yyyy':
      return date.getYear() + 1900;
    case 'zz':
      return sf("{0:00}", Math.floor(date.getTimezoneOffset() / 60));
    case '+zz':
      return sf("{0:+00}", Math.floor(date.getTimezoneOffset() / 60));
    case 'zzz':
      var wholeTimezoneOffset = Math.floor(date.getTimezoneOffset() / 60);
      return sf("{0:00}:{1:00}", wholeTimezoneOffset, date.getTimezoneOffset() - (wholeTimezoneOffset * 60));
    default:
      throw new Error("unhandled date format '" + format + "'");
  }
}

function align(str, val) {
  str = str || '';
  var pad = '';
  for (var i = 0; i < Math.abs(val) - str.length; i++) {
    pad += ' ';
  }
  if (val < 0) {
    return str + pad;
  } else if (val > 0) {
    return pad + str;
  }
  return str;
}

function sf(formatString) {
  var result = '';
  for (var i = 0; i < formatString.length;) {
    if (formatString[i] == '}') {
      i++;
      if (formatString[i] == '}') {
        result += '}';
        i++;
        continue;
      }
      throw new Error("Unescaped substitution");
    }
    if (formatString[i] == '{') {
      var spec = '';
      i++;
      if (formatString[i] == '{') {
        result += '{';
        i++;
        continue;
      }
      for (; i < formatString.length;) {
        if (formatString[i] == '}') {
          break;
        }
        spec += formatString[i++];
      }
      if (i == formatString.length) {
        throw new Error("Unterminated substitution");
      }
      i++;
      var alignTokenLoc = spec.indexOf(',');
      var specTokenLoc;
      var alignVal = 0;
      if (alignTokenLoc > 0) {
        specTokenLoc = spec.indexOf(':');
        if (specTokenLoc > 0) {
          alignVal = spec.substr(alignTokenLoc + 1, specTokenLoc - alignTokenLoc - 1);
          spec = spec.substr(0, alignTokenLoc) + spec.substr(specTokenLoc);
        } else {
          alignVal = spec.substr(alignTokenLoc + 1);
          spec = spec.substr(0, alignTokenLoc);
        }
      }

      specTokenLoc = spec.indexOf(':');
      var fieldName, formatSpec;
      if (specTokenLoc > 0) {
        fieldName = spec.substr(0, specTokenLoc);
        formatSpec = spec.substr(specTokenLoc + 1);
      } else {
        fieldName = spec;
        formatSpec = null;
      }
      var fieldIndex = parseInt(fieldName);
      var val;
      if (fieldIndex.toString() === fieldName) {
        val = arguments[fieldIndex + 1];
      } else {
        val = arguments[1][fieldName];
      }

      if (formatSpec) {
        if (val instanceof Date) {
          result += align(formatDate(val, formatSpec), alignVal);
        } else if (typeof(val) === 'number') {
          result += align(formatNumber(val, formatSpec), alignVal);
        } else {
          if (formatSpec == 'inspect') {
            result += util.inspect(val);
          } else if (formatSpec == 'json') {
            result += JSON.stringify(val);
          } else {
            throw new Error("unhandled format: " + formatSpec);
          }
        }
      } else {
        result += align(val, alignVal);
      }
    } else {
      result += formatString[i++];
    }
  }
  return result;
}

module.exports = sf;