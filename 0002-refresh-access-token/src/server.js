import app from "./app/app.js";
import { connecttoDB } from "./config/db.js";

await connecttoDB()

app.listen(4000, () =>{
    console.log("port is on on 4000")
})
