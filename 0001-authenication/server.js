import app from "./src/app/app.js";
import { connectDB } from "./src/config/db.js";


await connectDB();

app.listen(4000, () => {
    console.log(`Server is running on port 4000`);
});