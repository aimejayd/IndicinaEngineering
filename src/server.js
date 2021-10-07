const app = require('./index');
const config = require("../src/config/config");

// Start server
const port = config.port || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));