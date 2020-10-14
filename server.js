const express = require(`express`);
const path = require(`path`);
const PORT = process.env.PORT || 5000;

express()
// .use(express.static(path.join(__dirname, `public`)))
// .set(`views`, path.join(__dirname, `views`))
// .set(`view engine`, `ejs`)
.get(`/`, (req, res) => {
  res.append(`content-type`, `text/plain`);
  res.append(`Access-Control-Allow-Origin`, [`*`]);
  res.send(`rukivbruki`);
})
.listen(PORT, () => console.log(`Listening on ${PORT}`));
