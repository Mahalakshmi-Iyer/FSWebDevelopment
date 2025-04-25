let url = "http://universities.hipolabs.com/search?name=";
let country = document.querySelector("#country");
let state = document.querySelector("#state");
let btn = document.querySelector("button");
let ul = document.querySelector("ul");

async function getClg() {
    try{
        let c = country.value;
        let searchURL = url+c;
        let res = await axios.get(searchURL);
        console.log(res);
        // return res;
    }
    catch(err){
        console.log(err);
        return [];
    }
}

btn.addEventListener("click", async () => {
    getClg();
    // let clgArr = getClg();
    // console.log(clgArr);
    // ul.innerText = "";
    // for(clg of clgArr){
    //     let li = document.createElement("li");
    //     li.innerText = clg.name;
    // }
    // console.log(clgArr);
});