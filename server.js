const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const scraperRouter = require(__dirname + '/routes/scraper_router');
app.use('/scrape', scraperRouter);

app.use('/', express.static(__dirname + '/app'));

module.exports = exports = app.listen(PORT, () => {
  console.log('Server running on port: ' + PORT);
});
