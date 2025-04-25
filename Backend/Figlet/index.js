const figlet = require("figlet");

figlet("Mahalakshmi Iyer", (err, data) => {
    if(err){
        console.log("Something went wrong!");
        console.dir(err);
        return;
    }
    console.log(data);
});