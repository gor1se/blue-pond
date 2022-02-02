import express from "express";
import ejs from "ejs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import User from "./public/db/user.js";
import md6 from "md6-hash";
dotenv.config();
// set up Database
mongoose.connect(process.env.MONGODB);

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

const port = process.env.PORT || 3001;

let user = {};
let flashMessage = "";

app.get("/", (req, res) => {
    res.render("pages/home", { user: user, flashMessage: flashMessage });
});

app.get("/login", (req, res) => {
    res.render("pages/login", { user: user, flashMessage: flashMessage });
});

app.post("/login", (req, res) => {
    User.find({ name: req.body.userName }).then(foundName => {
        if (
            foundName.length === 0 ||
            foundName[0].password !== md6(req.body.userPassword)
        ) {
            flashMessage = "Wrong username or password";
            res.render("pages/login", {
                user: user,
                flashMessage: flashMessage,
            });
        } else {
            // TODO: Render the Profile of the User
            user = foundName[0];
            flashMessage = "Successfull login!";
            res.render(`pages/profile/${user.name}`, {
                user: user,
                flashMessage: flashMessage,
            });
        }
    });
});

app.get("/register", (req, res) => {
    res.render("pages/register", { user: user, flashMessage: flashMessage });
});

app.post("/register", (req, res) => {
    if (req.body.userPassword !== req.body.userPasswordConfirm) {
        flashMessage = "The entered passwords are different";
        res.render("pages/register", {
            user: user,
            flashMessage: flashMessage,
        });
    } else {
        const date = new Date();
        const newUserData = {
            name: req.body.userName,
            email: req.body.userEmail,
            password: md6(req.body.userPassword),
            joinDate: date.getTime(),
        };
        User.find({ name: req.body.userName }).then(foundName => {
            if (foundName.length === 0) {
                User.find({ email: req.body.userEmail }).then(foundEmail => {
                    if (foundEmail.length === 0) {
                        const newUser = new User(newUserData);
                        newUser.save().then(() => {
                            res.render("pages/login", {
                                user: user,
                                flashMessage: flashMessage,
                            });
                        });
                    } else {
                        flashMessage = "This Email is already in use";
                        res.render("pages/register", {
                            user: user,
                            flashMessage: flashMessage,
                        });
                    }
                });
            } else {
                flashMessage = "This Username is already taken";
                res.render("pages/register", {
                    user: user,
                    flashMessage: flashMessage,
                });
            }
        });
    }
});

app.get("/about-us", (req, res) => {
    res.render("pages/about-us", { user: user, flashMessage: flashMessage });
});

app.get("/profile/", (req, res) => {
    res.render("pages/profile", {
        user: user,
        flashMessage: flashMessage,
    });
});

//FIXME: Challenge 19 auf Udemy
// app.get("/profile/:id", (req, res) => {
//     res.render("pages/profile", {
//         user: user,
//         flashMessage: flashMessage,
//     });
// });

app.get("/entry-editor", (req, res) => {
    res.render("pages/entry-editor", {
        user: user,
        flashMessage: flashMessage,
    });
});

app.get("/visionboard-editor", (req, res) => {
    res.render("pages/visionboard-editor", {
        user: user,
        flashMessage: flashMessage,
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${port}`);
});
