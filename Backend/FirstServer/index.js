const express = require("express");

const app = express();
let port = 8080;

// app.get("/", (req, res) => {
//     res.send("You accessed the root path");
// });
// app.get("/about", (req, res) => {
//     res.send("You accessed the about path");
// });
// app.get("/contact", (req, res) => {
//     res.send("You accessed the contact path");
// });
// app.get('*', (req, res) => {
//     res.send("Path doesn't exist");
// });


// app.get("/:username/:id", (req, res) => {
//     let {username, id} = req.params;
//     res.send(`hello @${username} ${id}`);
// });

app.get('/search', (req, res) => {
    let {q} = req.query;
    if(!q){
        res.send("nothing searched");
    }
    res.send(`search results for query : ${q}`);
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
    app.use((req, res) => {
        console.log("request received");

        // res.send("This is a basic response");
        // res.send({name:"Mahalakshmi Iyer", age:20});
        // res.send("<h1>Hello World! from Mahalakshmi Iyer</h1>");
    });
});