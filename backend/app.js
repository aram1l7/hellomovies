const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const movieRoutes = require("./routes/movies");
const app = express();

app.use(cors());

app.use("/api/movies", movieRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
