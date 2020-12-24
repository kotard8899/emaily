const express = require('express'); // node 不支援 import from (至少這堂課的時候)
const app = express();

app.get('/', (req,res) => {
    res.send({ hi: 'there' });
});
const port = process.env.PORT || 5000
app.listen(port);