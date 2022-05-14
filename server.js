const { app } = require("./app");

// models
const { initModels } = require("./models/initModels");

const { db } = require("./utils/database");

//database authentication
db.authenticate()
  .then(() => console.log("database was authenticated"))
  .catch((error) => console.log(error));

initModels();

db.sync()
  .then(() => console.log("synced"))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 4001;

//App listen petitions
app.listen(PORT, () => {
  console.log(`Express app running in port: ${PORT}`);
});
