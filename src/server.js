import app from "./app.js";
import { initModel } from "./config/database/association.js";
import { authenticate, syncUp } from "./config/database/database.js";
import { envs } from "./config/enviroments/enviroments.js";

async function main() {
    try {
        await authenticate();
        initModel();
        await syncUp();
    } catch (error) {
        console.error(error);
    }
}

main();

app.listen(envs.PORT, () => {
    console.log(`Server is running on PORT: ${envs.PORT}`);
});
