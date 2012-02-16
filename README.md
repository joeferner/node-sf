# sf

String formatting library for node.js.

## Installation

```bash
$ npm install sf
```

## Quick Examples

```javascript
var sf = require("sf");

sf("{who} has a {what}", { who: 'dog', what: 'tail' });
// outputs: dog has a tail

sf("{0} has a {1}", 'dog', 'tail');
// outputs: dog has a tail

sf("{0:#,##0.00}", 2123.1);
// outputs: 2,123.10

sf("{0,15:#,##0.00}", 2123.1);
// outputs:        2,123.10
```

## Format Specifiers

The format is similar to C#'s string.format. The text inside the curly braces is {indexOrName[,alignment][:formatString]}.
If alignment is positive the text is right aligned. If alignment is negative it will be left aligned.

### Dates

| Specifier | Name                       | Example                        |
|-----------|----------------------------|--------------------------------|
| sd        | Short date                 | 10/12/2002                     |
| D         | Long date                  | December 10, 2002              |
| t         | Short time                 | 10:11 PM                       |
| T         | Long time                  | 10:11:29 PM                    |
| fdt       | Full date & time           | December 10, 2002 10:11 PM     |
| F         | Full date & time (long)    | December 10, 2002 10:11:29 PM  |
| g         | Default date & time        | 10/12/2002 10:11 PM            |
| G         | Default date & time (long) | 10/12/2002 10:11:29 PM         |
| md        | Month day pattern          | December 10                    |
| r         | RFC1123 date string        | Tue, 10 Dec 2002 22:11:29 GMT  |
| s         | Sortable date string       | 2002-12-10T22:11:29            |
| d         |
| dd        |
| ddd       |
| dddd      |
| f         |
| ff        |
| fff       |
| h         |
| hh        |
| H         |
| HH        |
| mm        |
| M         |
| MM        |
| MMM       |
| MMMM      |
| ss        |
| tt        |
| yy        |
| yyyy      |
| zz        |
| +zz       |
| zzz       |
