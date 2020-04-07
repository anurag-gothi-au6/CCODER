const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 2222
// Init
const app = require('./app');

app.listen(port, function() {
  console.log("Server started");
});

