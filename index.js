const express = require('express')
var exphbs  = require('express-handlebars');

const app = express()
const request = require("request");

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public/"));

/* Main Page */
app.get("/", function(req, res){
    res.render("home");
});

app.get('/:username', function (req, res) {

    if (req.params.username == null) {
        console.log("It is null");
        res.redirect("error");
    }
    var url = "https://www.instagram.com/" + req.params.username + "/?__a=1";

    var findUser = {
        userName: "",
        userBiography: "",
        userFollowers: "",
        userFollow: "",
        userIsPrivate: "",
        userIsVerified: "",
        userProfileImage: ""
    }

    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            html = JSON.parse(html);
            
            findUser.userName = html["graphql"]["user"]["full_name"];
            findUser.userBiography = html["graphql"]["user"]["biography"];
            findUser.userFollowers = html["graphql"]["user"]["edge_followed_by"]["count"];
            findUser.userFollow = html["graphql"]["user"]["edge_follow"]["count"];
            findUser.userIsPrivate = html["graphql"]["user"]["is_private"];
            findUser.userIsVerified = html["graphql"]["user"]["is_verified"];
            findUser.userProfileImage = html["graphql"]["user"]["profile_pic_url_hd"];

            res.render("photo", {findUser: findUser});
        }else{
            res.render("error");
        }
    });
})


/* Api istegi atilir */
app.get('/api/:username', function (req, res) {

    if (req.params.username == null) {
        console.log("It is null");
        res.redirect("error");
    }
    var url = "https://www.instagram.com/" + req.params.username + "/?__a=1";

    var findUser = {
        userName: "",
        userBiography: "",
        userFollowers: "",
        userFollow: "",
        userIsPrivate: "",
        userIsVerified: "",
        userProfileImage: ""
    }

    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            html = JSON.parse(html);
            
            findUser.userName = html["graphql"]["user"]["full_name"];
            findUser.userBiography = html["graphql"]["user"]["biography"];
            findUser.userFollowers = html["graphql"]["user"]["edge_followed_by"]["count"];
            findUser.userFollow = html["graphql"]["user"]["edge_follow"]["count"];
            findUser.userIsPrivate = html["graphql"]["user"]["is_private"];
            findUser.userIsVerified = html["graphql"]["user"]["is_verified"];
            findUser.userProfileImage = html["graphql"]["user"]["profile_pic_url_hd"];

            res.json(findUser);
        }else{
            res.json("We didn't find this user.");
        }
    });
})

app.listen(3000)