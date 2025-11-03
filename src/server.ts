import app from "./app.js";
import { connectDB } from "./Database/database.js";

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running at port ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log(`Error connection in database ${error}`);
        process.exit(1)
    })



