import config from "./config/config.js";
import app from "./app/app.js";
import connecttoDB from "./config/db.js";


await connecttoDB();

console.log(config);


app.listen(4000, () =>{
    console.log(`server is running on port ${config.PORT}`);
    
})