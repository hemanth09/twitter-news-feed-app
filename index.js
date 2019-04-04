const app = require('./server/server');

let PORT = process.env.PORT || 3000;
let HOST = 'localhost'

app.use('*', (req, res) => {
  return res.redirect('/')
})

app.listen(PORT, () => {
  console.log(`Listening at http://${HOST}:${PORT}`);
});
