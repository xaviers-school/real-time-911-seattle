# real-time-911-seattle
Visualization of real time 911 data from Seattle Fire Department

## API Reference
#### GET `/entries/today`
This will return the 911 call data for that day (starting at midnight) in the following format:
```javascript
[
  {
    incidentNumber: 'F160059699',
    displayDatetime: '5/25/2016 1:48:49 PM',
    datetime: '2016-05-25T20:48:49.000Z',
    level: 1,
    address: '2233 Nw 58th St',
    type: 'Aid Response',
    status: 'active',
    lat: '47.6705116',
    lng: '-122.3890578',
    units: [ 'E18' ]
  },
  ...
]
```

#### GET `/entries`
Without a query string, this will retrieve every entry from the database (in the format shown above). This endpoint can be used with a query string with the following keys:

|   Key    | Description   | Example value(s)                      |   Notes   |
| -------- | ------------- | ------------------------------------- | ----------|
| `type`   | Response type | "Aid Response", "Medic Response", etc | |
| `status` | Status of incident | "active" or "closed" | |
| `start`  | Beginning datetime bound | Any ISO Date | If `end` is not specified, the query returns all incidents from the start time to current |
| `end`    | Ending datetime bound | Any ISO Date | If `start` is not specified, the query returns all incidents available in the database up to the end time
| `near`   | Center of a radius search | -122.38,47.67 | The query defaults to a 5-mile radius if the `radius` is not specified. The value should be a pair of `longitude` and `latitude` (in that order) separated by a comma. |
| `radius` | Radius of search circle | 1046 | This number will be evaluated in meters. |

Example:
```
GET /api/entries?type=Aid+Response&near=-122.4267,47.7233&radius=5000
```

## Admin Actions
#### GET `/scrape`
Performs a scrape for that day, saving entries to the database or updating them if they already exists.

#### GET `/scrape/multiple`
_For database reset only. Not recommended to use frequently due to the Google Maps geocode service rate limit._

The endpoint takes a query string with 2 parameters: `period` (an integer) and `endDate` (a date formatted `M-D-YYYY`). `period` is the number of days to backtrack from the `endDate`.

Example:
```
GET /scrape/multiple?period=3&endDate=5-24-2016
```
will perform the scraping for `5-22-2016`, `5-23-2016`, `5-24-2016` and save the results to the database.
