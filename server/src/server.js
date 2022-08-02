const connect = require('./config/database');
require('dotenv').config();
const app = require('./index');

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    try {
        await connect();
        console.log(`listening on PORT: ${PORT}`);
    } catch (error) {
        console.log(error.message);
    }
});