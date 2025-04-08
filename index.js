const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
//  ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const methodOverride = require("method-override");

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username : "Ravi",
        content : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut iure molestiae quibusdam! Explicabo reiciendis tenetur fuga, maxime excepturi ipsa praesentium incidunt unde debitis!"
    },
    {
        id: uuidv4(),
        username : "Tom",
        content: "Consistency is key to success",
    },
    {
        id: uuidv4(),
        username:"Rahul",
        content: "I got selected for my 1st internship!",
    },
    {
        id: uuidv4(),
        username:"Sahil",
        content: "Man is mortal"
    }
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({ id, username, content})
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find(p => id === p.id);
    res.render("show.ejs", {post});
});

// app.delete("/posts/:id", (req, res) => {
//     let { id } = req.params;
//     let post = posts.filter(p => id !== p.id);
//     res.redirect("/posts");
// });

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter(p => p.id !== id); // Update the posts array
    res.redirect("/posts");
});

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find(p => id === p.id);
    post.content = newContent;
    console.log(newContent);
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);
    res.render("edit.ejs", {post});
})

app.listen(port, () => {
    console.log("listening to port : 8080");
});