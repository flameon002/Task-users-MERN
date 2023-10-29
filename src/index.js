import app from "./app.js";
import { conectDB } from "./db.js";

conectDB();






const port = 3018;
app.listen(port, () => {
  console.log(`Server is now runing in port ${port}`);
  console.log(`http://localhost:${port}`);
});
