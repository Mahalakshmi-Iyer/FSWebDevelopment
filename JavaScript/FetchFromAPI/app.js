let cat_url = "https://catfact.ninja/fact";
let dog_url = "https://dog.ceo/api/breeds/image/random";
let joke_url = "https://icanhazdadjoke.com/";

// fetch(url)
// .then((res) => {
//     return res.json()
// })
// .then((data) => {
//     console.log(data);
// })
// .catch((err) => {
//     console.log(err);
// });


// async function getFacts(){
//     try{
//         let res = await fetch(url);
//         let data = await res.json();
//         console.log(data.fact);
//     }
//     catch(err){
//         console.log(err);
//     }
//     console.log("finished");
// }


let p = document.querySelector("#fact");
let btn1 = document.querySelector("#cat_fact");

async function getFacts(){
    try{
        let res = await axios.get(cat_url);
        let fact = res.data.fact;
        return fact;
    }
    catch(err){
        console.log(err);
        return "No Fact Found!"
    }
}

btn1.addEventListener("click", async () => {
    let fact = await getFacts();
    p.innerText = fact;
});

let btn2 = document.querySelector("#dog_pic");
let dog_pic = document.querySelector("#image");

async function getImage(){
    try{
        let res = await axios.get(dog_url);
        let img = res.data.message;
        return img;
    }
    catch(err){
        console.log(err);
        return "No Image Found!";
    }
}

btn2.addEventListener("click", async () => {
    let image = await getImage();
    dog_pic.setAttribute("src", image);
});


let btn3 = document.querySelector("#dad_joke");
let joke = document.querySelector("#joke");

async function getJokes(){
    try{
        const config = {headers : {Accept: "application/json"}};
        let res = await axios.get(joke_url, config);
        let joke = res.data.joke;
        return joke;
    }
    catch(err){
        console.log(err);
        return "No Joke Found!";
    }
}

btn3.addEventListener("click", async () => {
    let dad_joke = await getJokes();
    joke.innerText = dad_joke;
});