var express = require("express");
// const useNavigate = require("react-router-dom");
const generateToken = require("./generateToken.js");
var router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const SubReddit = require("../models/subreddit");
const SaveDets = require("../models/saveposts");
const ReportedModel = require("../models/reported")
const JoinedUsers = require("../models/joinuser_stats");
const DailyPosts = require("../models/daily_posts");
const DailyVisitors = require("../models/daily_visitors");
const Repvdel = require("../models/report_vs_del");
const Conversation = require("../models/conversations_model");
const Message = require("../models/message_model");
const fileUpload = require('express-fileupload');
const ImageKit = require('imagekit');

// Adding CHAT BACKEND

router.post("/saveconv", async (req, res) => {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
  
    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
});
  
  //get conv of a user
  
router.get("/conv/:userId", async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
});
  
  // get conv includes two userId
  
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post("/mssgsave", async (req, res) => {
    const newMessage = new Message(req.body);
    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get

router.get("/mssg/:conversationId", async (req, res) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// ENDING CHAT BACKEND

// const router = express();

router.get("/", function (req, res) {
    getRoot(res);
});

router.post("/register", (req, res) => {
    registerUser(req, res);
});

router.post("/login", (req, res) => {
    console.log("here i am");
    loginUser(req, res);
});

router.post("/find", (req, res) => {
    console.log("here i am in find");
    findUser(req, res);
});

router.post("/findbyid", (req, res) => {
    console.log("here i am in find");
    findUserbyID(req, res);
});

router.post("/findallarr", (req, res) => {
    console.log("here i am in find");
    findallArr(req, res);
});

router.post("/findsubg", (req, res) => {
    console.log("here i am in findsubg");
    findSubg(req, res);
});

router.post("/findsubgusers", (req, res) => {
    console.log("here i am in findsubgusers");
    findSubgusers(req, res);
});

router.post("/findallsubg", (req, res) => {
    console.log("here i am in findallsubg");
    findallSubg(req, res);
});

router.post("/deletesubg", (req, res) => {
    console.log("here i am in deletesubg");
    deleteSubg(req, res);
});

router.post("/leavesubg", (req, res) => {
    console.log("here i am in leavesubg");
    leaveSubg(req, res);
});

router.post("/joinsubg", (req, res) => {
    console.log("here i am in leavesubg");
    joinSubg(req, res);
});

router.post("/updsubgrep", (req, res) => {
    console.log("here i am in upsubgrep");
    updSubgRep(req, res);
});

router.post("/jrsubg", (req, res) => {
    console.log("here i am in jrsubg");
    jrSubg(req, res);
});

router.post("/updjrsubg", (req, res) => {
    console.log("here i am in updjrsubg");
    updjrSubg(req, res);
});

router.post("/updjrsubgreject", (req, res) => {
    console.log("here i am in updjrsubg reject");
    updjrsubgreject(req, res);
});

router.post("/update", (req, res) => {
    console.log("here i am in update");
    updateUser(req, res);
});

router.post("/updatefollowers", (req, res) => {
    console.log("here i am in update followers");
    updateUserfollowers(req, res);
});

router.post("/updatefollowing", (req, res) => {
    console.log("here i am in update following");
    updateUserfollowing(req, res);
});

router.post("/savedposts", (req, res) => {
    console.log("here i am in saved posts");
    saveUserpost(req, res);
});

router.post("/extractsavedposts", (req, res) => {
    console.log("here i am in saved posts");
    extractsaveUserpost(req, res);
});

router.post("/subgreddit", (req, res) => {
    console.log("here i am in subgreddit");
    subgUser(req, res);
});

router.post("/postsupd", (req, res) => {
    console.log("here i am in postsupd");
    postsUpd(req, res);
});

router.post("/likesupd", (req, res) => {
    console.log("here i am in likeupd");
    likeUpd(req, res);
});

router.post("/likesupdsavepage", (req, res) => {
    console.log("here i am in likeupdsavepage");
    likeUpdSavePage(req, res);
});

router.post("/dislikesupd", (req, res) => {
    console.log("here i am in dislikeupd");
    dislikeUpd(req, res);
});

router.post("/commentsupd", (req, res) => {
    console.log("here i am in commentsupd");
    commentsUpd(req, res);
});

router.post("/updwritepost", (req, res) => {
    console.log("here i am in upd write post");
    updWritePost(req, res);
});

router.post("/updfollowerpost", (req, res) => {
    console.log("here i am in upd follower post");
    updFollowerPost(req, res);
});

router.post("/updsavedposts", (req, res) => {
    console.log("here i am in upd save posts");
    updSavePost(req, res);
});

router.post("/savesubdel", (req, res) => {
    console.log("here i am in upd save posts");
    saveSubDel(req, res);
});

router.post("/addreport",(req,res)=>{
    console.log("here in add report backend");
    addReport(req,res);
})

router.post("/extractreport",(req,res)=>{
    console.log("here in extract report backend");
    extractReport(req,res);
})

router.post("/delrep", (req, res) => {
    console.log("here i am in delrep");
    delRep(req, res);
});

router.post("/updaction", (req, res) => {
    console.log("here i am in upd action");
    updAction(req, res);
});

router.post("/createjoinstats",(req,res)=>{
    console.log("here I am in save join user stats");
    Create_JoinStats(req,res);
})

router.post("/createdailyposts",(req,res)=>{
    console.log("here I am in create daily posts");
    Create_DailyPosts(req,res);
})

router.post("/createdailyvisitors",(req,res)=>{
    console.log("here I am in create daily visitors");
    Create_DailyVisitors(req,res);
})

router.post("/createrepvdel",(req,res)=>{
    console.log("here I am in create repvdel");
    Create_Repvdel(req,res);
})

router.post("/extid",(req,res)=>{
    console.log("here I am in extid");
    extId(req,res);
})

router.post("/checkjoinuserstats",(req,res)=>{
    console.log("here I am in upd check join user stats");
    CheckJoinUserStats(req,res);
})

router.post("/joinuserstats",(req,res)=>{
    console.log("here I am in upd join user stats");
    JoinUserStats(req,res);
})

router.post("/extractjoinuserstats",(req,res)=>{
    console.log("here I am in upd extract join user stats");
    extractJoinUserStats(req,res);
})

router.post("/checkdailyposts",(req,res)=>{
    console.log("here I am in upd check daily posts");
    CheckDailyPosts(req,res);
})

router.post("/upddailyposts",(req,res)=>{
    console.log("here I am in upd daily posts");
    UpdDailyPosts(req,res);
})

router.post("/extractdailyposts",(req,res)=>{
    console.log("here I am in upd extract daily posts");
    extractDailyPosts(req,res);
})

router.post("/checkdailyvisitors",(req,res)=>{
    console.log("here I am in upd check daily visitors");
    CheckDailyVisitors(req,res);
})

router.post("/upddailyvisitors",(req,res)=>{
    console.log("here I am in upd daily visitors");
    UpdDailyVisitors(req,res);
})

router.post("/extractdailyvisitors",(req,res)=>{
    console.log("here I am in upd extract daily visitors");
    extractDailyVisitors(req,res);
})

router.post("/checkrepvdel",(req,res)=>{
    console.log("here I am in upd check repvdel");
    CheckRepvdel(req,res);
})

router.post("/updrepvdel",(req,res)=>{
    console.log("here I am in upd repvdel");
    UpdRepvdel(req,res);
})

router.post("/extractrepvdel",(req,res)=>{
    console.log("here I am in upd extract repvdel");
    extractRepvdel(req,res);
})

async function loginUser(req, res) {
    console.log("hiiii");
    const body = req.body;
    const email = body.email;
    const password = body.password;
    console.log("email is ");
    console.log(email);
    console.log("password is ");
    console.log(password);
    const user = await User.findOne({ email });
    // console.log(user.first_name);

    if (user && (await user.matchPassword(password))) {
        console.log("yay successful auth\n");
        const payload = {
            _id: user._id,
            FirstName: user.first_name,
            LastName: user.last_name,
            email: user.email,
            Age: user.age,
            UserName: user.user_name,
            Contact: user.contact,
        };
        console.log(process.env.JWT_SECRET);
        console.log(payload);
        token = jwt.sign(payload, process.env.JWT_SECRET);
        res.send(token);
    }
    else {
        console.log("galat hua login");
        res.status(401).send("err");
    }
}

async function registerUser(req, res) {
    const body = req.body;
    const email = body.email;
    console.log(req.body);
    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(404).send("User exists already");
        // throw new Error("User already exists");
    }
    else{
    const newUser = new User({
        first_name: body.first_name,
        last_name: body.last_name,
        user_name: body.user_name,
        email: body.email,
        age: body.age,
        contact: body.contact,
        password: body.password,
        following : body.following,
        followers : body.followers,
    });

    newUser
        .save()
        .then((user) => {
            res.status(200).json({
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                user_name: user.user_name,
                email: user.email,
                age: user.age,
                contact: user.contact,
                password: user.password,
                followers: user.followers,
                following: user.following,
                token: generateToken(user._id),
            });
        })
        .catch((err) => {
            res.status(400).send(err);
        });
    }
}

async function subgUser(req, res) {
    const imagekit = new ImageKit({
        publicKey : 'public_mR67DP/gEB/k/W61uH6XHTpzwtg=',
        privateKey : 'private_7AWHXAb7rXb211a4BGBTR3uvE2g=',
        urlEndpoint : 'https://ik.imagekit.io/k5dmkfor6/greddit/',
      });
    const body = req.body;
    console.log("hellooo");
    console.log(body);
    // console.log(req.files.img);
    const name = body.name;
    const tags = body.tags;
    const description = body.description;
    const banned = body.banned;
    const moderators = body.moderators;
    const joinreqs = body.joinreqs;
    const leftusers = body.leftusers;
    const image = body.img;
    let chkempty = body.posts;

    const subgExists = await SubReddit.findOne({name});
    if (subgExists) {
        res.status(404).send("Subgreddit exists already");
        // throw new Error("User already exists");
    }
    else{
    if(body.posts.length == 0)
    {
        console.log("khaali hai");
        chkempty = [];
    }
    // const email = body.email;

    console.log(req.body);

    console.log("intekaama");

    if(req.files)
    {
            imagekit.upload({
            file: req.files.img.data,
            fileName: req.files.img.name
        }, (err, result) => {
            if (err) {
                console.log("error hai");
            console.log(err);
            return res.status(500).send(err);
            }
            console.log(result.url);
            const newdata = new SubReddit({
                name: body.name,
                description: body.description,
                tags: body.tags,
                banned: body.banned,
                email: body.email,
                people: JSON.parse(body.people),
                posts: JSON.parse(body.posts),
                blocked: JSON.parse(body.blocked),
                moderators: JSON.parse(body.moderators),
                joinreqs: JSON.parse(body.joinreqs),
                leftusers: JSON.parse(body.leftusers),
                image: result.url,
            });
        
            console.log("newdata is : " + newdata);
        
            newdata
                .save()
                .then((user) => {
                    console.log("succes in subred backend");
                    res.status(200).json({
                        name: user.name,
                        tags: user.tags,
                        description: user.description,
                        email: user.email,
                        banned: user.banned,
                        people: user.people,
                        posts: user.posts,
                        blocked: user.blocked,
                        moderators: user.moderators,
                        joinreqs: user.joinreqs,
                        leftusers: user.leftusers,
                    });
                })
                .catch((err) => {
                    console.log("fail in subred backend");
                    console.log(err);
                    res.status(400).send(err);
                });
        });
    }
    else
    {
        const newdata = new SubReddit({
            name: body.name,
            description: body.description,
            tags: body.tags,
            banned: body.banned,
            email: body.email,
            people: JSON.parse(body.people),
            posts: JSON.parse(body.posts),
            blocked: JSON.parse(body.blocked),
            moderators: JSON.parse(body.moderators),
            joinreqs: JSON.parse(body.joinreqs),
            leftusers: JSON.parse(body.leftusers),
        });
    
        console.log("newdata is : " + newdata);
    
        newdata
            .save()
            .then((user) => {
                console.log("succes in subred backend");
                res.status(200).json({
                    name: user.name,
                    tags: user.tags,
                    description: user.description,
                    email: user.email,
                    banned: user.banned,
                    people: user.people,
                    posts: user.posts,
                    blocked: user.blocked,
                    moderators: user.moderators,
                    joinreqs: user.joinreqs,
                    leftusers: user.leftusers,
                });
            })
            .catch((err) => {
                console.log("fail in subred backend");
                console.log(err);
                res.status(400).send(err);
            });
    }
    }

    // const newdata = new SubReddit({
    //     name: body.name,
    //     description: body.description,
    //     tags: body.tags,
    //     banned: body.banned,
    //     email: body.email,
    //     people: JSON.parse(body.people),
    //     posts: JSON.parse(body.posts),
    //     blocked: JSON.parse(body.blocked),
    //     moderators: JSON.parse(body.moderators),
    //     joinreqs: JSON.parse(body.joinreqs),
    //     leftusers: JSON.parse(body.leftusers),
    //     image: body.img,
    // });

    // console.log("newdata is : " + newdata);

    // newdata
    //     .save()
    //     .then((user) => {
    //         console.log("succes in subred backend");
    //         res.status(200).json({
    //             name: user.name,
    //             tags: user.tags,
    //             description: user.description,
    //             email: user.email,
    //             banned: user.banned,
    //             people: user.people,
    //             posts: user.posts,
    //             blocked: user.blocked,
    //             moderators: user.moderators,
    //             joinreqs: user.joinreqs,
    //             leftusers: user.leftusers,
    //         });
    //     })
    //     .catch((err) => {
    //         console.log("fail in subred backend");
    //         console.log(err);
    //         res.status(400).send(err);
    //     });
}

async function updateUser(req, res) {
    const body = req.body;
    const emailupd = body.email;
    const firstupd = body.first_name;
    const lastupd = body.last_name;
    const userupd = body.user_name;
    const ageupd = body.age;
    const contactupd = body.contact;
    const followersupd = body.followers;
    const followingupd = body.following;
    console.log("In update user " + emailupd);
    var myquery = { email: emailupd };
    var newvalues = { $set: { first_name: firstupd , last_name: lastupd , user_name : userupd , age : ageupd , contact : contactupd,followers: followersupd,following: followingupd} };
    User.findOneAndUpdate(myquery, newvalues, {upsert : true} ,(err, doc) => {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Updation");
        return res.send("Success");
    });
}

async function updateUserfollowers(req, res) {
    const body = req.body;
    const emailupd = body.email;
    const followersupd = body.followers;

    console.log("In update followers user " + emailupd);

    var myquery = { email: emailupd };
    var newvalues = { $set: {followers: followersupd} };
    User.findOneAndUpdate(myquery, newvalues, {upsert : true} ,(err, doc) => {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Updation followers");
        return res.send("Success");
    });
}

async function updateUserfollowing(req, res) {
    const body = req.body;
    const emailupd = body.email;
    const followingupd = body.following;
    console.log("In update following user " + emailupd);

    var myquery = { email: emailupd };
    var newvalues = { $set: {following: followingupd} };

    User.findOneAndUpdate(myquery, newvalues, {upsert : true} ,(err, doc) => {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Updation following");
        return res.send("Success");
    });
}

async function updWritePost(req, res) {
    const body = req.body;
    const emailupd = body.email;
    const followingupd = body.writer;
    const hash = str => str.split('').reduce((prev, curr) => Math.imul(31, prev) + curr.charCodeAt(0) | 0, 0);
    const id = hash(followingupd);
    const obj = {name: followingupd,id: id};

    var myquery = { email: emailupd };
    var newvalues = { $push: {following: obj} };

    User.findOneAndUpdate(myquery, newvalues, {upsert : true} ,(err, doc) => {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Updation following of writer post");
        return res.send("Success");
    });
}

async function updFollowerPost(req, res) {
    const body = req.body;
    const writer = body.writer;
    const follower = body.user;
    const hash = str => str.split('').reduce((prev, curr) => Math.imul(31, prev) + curr.charCodeAt(0) | 0, 0);
    const id = hash(follower);
    const obj = {name: follower,id: id};
    // console.log("In update follower user " + emailupd);

    var myquery = { email: writer };
    var newvalues = { $push: {followers: obj} };

    User.findOneAndUpdate(myquery, newvalues, {upsert : true} ,(err, doc) => {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Updation followers of writer post");
        return res.send("Success");
    });
}

async function updSavePost(req, res) {
    const body = req.body;
    const name = body.savedetails;
    console.log("****************", name);
    
    SaveDets.deleteOne({savedetails: name },function(err,doc)
    {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Deleting");
        res.send(doc);
    });
}

async function saveSubDel(req, res) {
    const body = req.body;
    const name = body.subgname;
    console.log("****************", name);
    
    SaveDets.deleteMany({subgname: name },function(err,doc)
    {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Deleting");
        res.send(doc);
    });
}

async function leaveSubg(req, res) {
    const body = req.body;
    const name = body.name;
    const user = body.user;

    var myquery = { name: name };
    // var newvalues = { $set: {following: followingupd} };
    var newvalues = { $pull: {people : user}, $push: {leftusers : user}};

    SubReddit.findOneAndUpdate(myquery, newvalues, {upsert : true} ,(err, doc) => {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Updation leave subg");
        return res.send("Success");
    });
}

async function joinSubg(req, res) {
    const body = req.body;
    const name = body.name;
    const user = body.user;

    var myquery = { name: name };
    var newvalues = { $push: {joinreqs : user}};

    SubReddit.findOneAndUpdate(myquery, newvalues, {upsert : true} ,(err, doc) => {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Updation join subg");
        return res.send("Success");
    });
}

async function jrSubg(req, res) {
    const body = req.body;
    const name = body.name;

    var myquery = { name: name };
    SubReddit.find(myquery,function(err,doc)
    {
        if (err)
        {
            console.log("***:", err);
            res.send(400,{error:err});
        }
        console.log("Success In Finding JR SUBG");
        console.log(doc);
        res.send(doc);
    });
}

async function postsUpd(req, res) {
    const body = req.body;
    const name = body.name;
    const posts = body.posts;

    var myquery = { name: name };
    var newvalues = { $push: {posts : posts}};

    SubReddit.findOneAndUpdate(myquery, newvalues, {upsert : true} ,(err, doc) => {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Updation of posts");
        return res.send("Success");
    });
}

async function likeUpd(req, res) {
    const body = req.body;
    const name = body.name;
    const posts = body.posts;

    var myquery = { name: name };
    var newvalues = { $set: {posts : posts}};

    SubReddit.findOneAndUpdate(myquery, newvalues, {upsert : true} ,(err, doc) => {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Updation of likes in db");
        return res.send("Success");
    });
}

async function likeUpdSavePage(req, res) {
    const body = req.body;
    const name = body.name;
    const posts = body.posts;

    var myquery = { name: name };
    var newvalues = { $set: {posts : posts}};

    SubReddit.findOneAndUpdate(myquery, newvalues, {upsert : true} ,(err, doc) => {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Updation of likes in db");
        return res.send("Success");
    });
}

async function dislikeUpd(req, res) {
    const body = req.body;
    const name = body.name;
    const posts = body.posts;

    var myquery = { name: name };
    var newvalues = { $set: {posts : posts}};

    SubReddit.findOneAndUpdate(myquery, newvalues, {upsert : true} ,(err, doc) => {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Updation of dislikes in db");
        return res.send("Success");
    });
}

async function commentsUpd(req, res) {
    const body = req.body;
    const name = body.name;
    const posts = body.posts;

    var myquery = { name: name };
    var newvalues = { $set: {posts : posts}};

    SubReddit.findOneAndUpdate(myquery, newvalues, {upsert : true} ,(err, doc) => {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Updation of comments in db");
        return res.send("Success");
    });
}

async function saveUserpost(req, res) {
    const post = req.body.post;
    const email = req.body.email;
    console.log("post is:",post);
    const dets = [{post:post,email: email}];
    const obj = {post:post,email: email}
    console.log("dets is :",dets);
    console.log(req.body);

    const postExists = await SaveDets.findOne({
        savedetails: {
          $elemMatch: {
            post: post,
            email: email
          }
        }
    });

    // const postExists = await SaveDets.findOne(obj);
    if (postExists) {
        res.status(404).send("Post Already Saved");
        // throw new Error("User already exists");
    }

    else{

    const newdata = new SaveDets({
        savedetails: dets,
        subgname: dets[0].post.postedin,
    });

    console.log("newdata is : " + newdata);

    newdata
        .save()
        .then((user) => {
            console.log("succes in saved backend");
            res.status(200).json({
                email: user.email,
                post: user.post,
            });
        })
        .catch((err) => {
            console.log("fail in saved backend");
            console.log(err);
            res.status(400).send(err);
        });
    }
}

async function extractsaveUserpost(req, res) {

    const email = req.body.email;
    var myquery = { email: email };

    SaveDets.find(myquery,function(err,doc)
    {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Finding User Saved Posts");
        console.log(doc);
        res.send(doc);
    });
}

async function updjrSubg(req, res) {
    const body = req.body;
    const name = body.name;
    const user = body.user;
    var myquery = { name: name };
    var newvalues = { $push: {people : user},$pull: {joinreqs : user}};

    SubReddit.findOneAndUpdate(myquery, newvalues, {upsert : true} ,(err, doc) => {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Updation updjrsubg");
        return res.send("Success");
    });
}

async function updSubgRep(req, res) {
    const body = req.body;
    const name = body.name;
    const posts = body.posts;
    var myquery = { name: name };
    var newvalues = { $set: {posts : posts}};

    SubReddit.findOneAndUpdate(myquery, newvalues, {upsert : true} ,(err, doc) => {
        if (err)
        {
            console.log("err in block",err);
            res.send(400,{error:err});
        }
        console.log("Success In Updation of report blocked user");
        return res.send("Success");
    });
}

async function updjrsubgreject(req, res) {
    const body = req.body;
    const name = body.name;
    const user = body.user;
    var myquery = { name: name };
    var newvalues = {$pull: {joinreqs : user}};

    SubReddit.findOneAndUpdate(myquery, newvalues, {upsert : true} ,(err, doc) => {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Updation updjrsubg reject");
        return res.send("Success");
    });
}

async function updAction(req, res) {
    const body = req.body;
    const id = body.id;
    const action = body.action;
    var myquery = { _id : id };
    var newvalues = {$set: {action:action}};

    ReportedModel.findOneAndUpdate(myquery, newvalues, {upsert : true} ,(err, doc) => {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Updation updjrsubg reject");
        return res.send("Success");
    });
}

async function findUser(req, res) {
    const body = req.body;
    const email = body.email;
    User.findOne({ email:email },function(err,doc)
    {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Finding");
        res.send(doc);
    });
    // console.log(user.first_name);
}

async function findUserbyID(req, res) {
    const body = req.body;
    const id = body.id;
    User.findOne({ _id: id },function(err,doc)
    {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Finding by id");
        res.send(doc);
    });
    // console.log(user.first_name);
}

async function findallArr(req, res) {
    const body = req.body;
    const array = body.info;
    const users = [];
    console.log(array);
    for(let i=0;i<array.length;i++)
    {
        users.push(array[i].name);
    }
    console.log(users);
    const query = { email: { $in: users } }
    User.find(query,function(err,doc)
    {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Finding ALL");
        console.log(doc);
        res.send(doc);
    });
}

async function findSubg(req, res) {
    const body = req.body;
    const email = body.email;
    const query = { moderators: { $in: [email] } }
    SubReddit.find(query,function(err,doc)
    {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Finding");
        console.log(doc);
        res.send(doc);
    });
}

async function findSubgusers(req, res) {
    const body = req.body;
    const name = body.name;
    SubReddit.find({ name: name },function(err,doc)
    {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Finding");
        res.send(doc);
    });
}

async function addReport(req,res) {

    const reportExists = await ReportedModel.findOne({
        $and: [{
            reported_user: req.body.postedby},
            {concern : req.body.concern},
            {posttext: req.body.posttext},
            {reported_by: req.body.reportedby},
            {postedin: req.body.postedin},
            {action: req.body.action
        }]
    });

    if (reportExists) {
        res.status(404).send("Report exists already");
        // throw new Error("User already exists");
    }

    else{

    const newdata = new ReportedModel({
        reported_user: req.body.postedby,
        concern : req.body.concern,
        posttext: req.body.posttext,
        reported_by: req.body.reportedby,
        postedin: req.body.postedin,
        action: req.body.action,
        dateexp: req.body.dateexp,
    });
    console.log("newdata is : " + newdata);

    newdata
        .save()
        .then((user) => {
            console.log("succes in saving report at backend");
            res.status(200).json({
                concern: user.concern,
                posttext: user.posttext, 
            });
        })
        .catch((err) => {
            console.log("fail in saving report info @ backend");
            console.log(err);
            res.status(400).send(err);
        });
    }

}

async function findallSubg(req, res) {
    const body = req.body;
    SubReddit.find(function(err,doc)
    {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Finding");
        res.send(doc);
    });
}

async function extractReport(req, res) {
    const body = req.body;
    const list = body.list;
    console.log(list);
    console.log(list.length);
    var temparr = [];
    for(let i=0;i<list.length;i++)
    {
        temparr.push(list[i].name);
    }
    console.log("temp:",temparr);
    const query = { postedin: { $in: temparr } }
    ReportedModel.find(query,function(err,doc)
    {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Finding");
        console.log("hello in extract");
        console.log(doc);
        res.send(doc);
    });
}

async function extId(req, res) {
    const body = req.body;
    const name = body.name;
    const query = { name: name }
    SubReddit.find(query,function(err,doc)
    {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Finding id");
        console.log("hello in extract id");
        console.log(doc);
        res.send(doc);
    });
}

async function extractJoinUserStats(req, res) {
    const body = req.body;
    const id = body.id;
    const query = { subgreddit_id: id }
    JoinedUsers.find(query,function(err,doc)
    {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Finding extracting data id");
        console.log(doc);
        res.send(doc);
    });
}

async function extractDailyPosts(req, res) {
    const body = req.body;
    const id = body.id;
    const query = { subgreddit_id: id }
    DailyPosts.find(query,function(err,doc)
    {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Finding extracting data id");
        console.log(doc);
        res.send(doc);
    });
}

async function extractDailyVisitors(req, res) {
    const body = req.body;
    const id = body.id;
    const query = { subgreddit_id: id }
    DailyVisitors.find(query,function(err,doc)
    {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Finding extracting data visitors id");
        console.log(doc);
        res.send(doc);
    });
}

async function extractRepvdel(req, res) {
    const body = req.body;
    const id = body.id;
    const query = { subgreddit_id: id }
    Repvdel.find(query,function(err,doc)
    {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Finding extracting repvdel id");
        console.log(doc);
        res.send(doc);
    });
}

async function deleteSubg(req, res) {
    const body = req.body;
    const name = body.name;
    SubReddit.deleteOne({name: name },function(err,doc)
    {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Deleting");



        res.send(doc);
    });
}

async function delRep(req, res) {
    const body = req.body;
    const id = body.id
    ReportedModel.deleteOne({_id : id },function(err,doc)
    {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Deleting");
        res.send(doc);
    });
}

async function Create_JoinStats(req,res) {
    const date = req.body.date;
    const id = req.body.id;
    const creator = req.body.creator;

    console.log(req.body);

    const newdata = new JoinedUsers({
        date: date,
        subgreddit_id: id,
        joined_users: creator,
    });

    console.log("newdata is : " + newdata);

    newdata
        .save()
        .then((user) => {
            console.log("succes in creating joined user stats at backend");
            res.status(200).json({
                date: user.date,
                subgreddit_id: user.subgreddit_id,
                joined_users: user.joined_users,
            });
        })
        .catch((err) => {
            console.log("failure in saving created dets of join user stats at backend");
            console.log("err at joinuser stats failure: ",err);
            res.status(400).send(err);
        });
}

async function Create_DailyPosts(req,res) {
    const date = req.body.date;
    const id = req.body.id;
    const emptyarr = req.body.curr_posts;

    console.log(req.body);

    const newdata = new DailyPosts({
        date: date,
        subgreddit_id: id,
        daily_posts: emptyarr,
    });

    console.log("newdata is : " + newdata);

    newdata
        .save()
        .then((user) => {
            console.log("succes in creating joined daily posts at backend");
            res.status(200).json({
                date: user.date,
                subgreddit_id: user.subgreddit_id,
            });
        })
        .catch((err) => {
            console.log("failure in saving created dets of dailyposts at backend");
            console.log("err at dailyposts failure: ",err);
            res.status(400).send(err);
        });
}

async function Create_DailyVisitors(req,res) {
    const date = req.body.date;
    const id = req.body.id;
    const emptyarr = req.body.curr_visitors;

    console.log(req.body);

    const newdata = new DailyVisitors({
        date: date,
        subgreddit_id: id,
        visitors: emptyarr,
    });

    console.log("newdata is : " + newdata);

    newdata
        .save()
        .then((user) => {
            console.log("succes in creating joined daily visitors at backend");
            res.status(200).json({
                date: user.date,
                subgreddit_id: user.subgreddit_id,
            });
        })
        .catch((err) => {
            console.log("failure in saving created dets of dailyvisitors at backend");
            console.log("err at dailyvisitors failure: ",err);
            res.status(400).send(err);
        });
}

async function Create_Repvdel(req,res) {
    const date = req.body.date;
    const id = req.body.id;
    const reported = req.body.curr_reported;
    const deleted = req.body.curr_deleted;

    console.log(req.body);

    const newdata = new Repvdel({
        date: date,
        subgreddit_id: id,
        reported: reported,
        deleted: deleted,
    });

    console.log("newdata is : " + newdata);

    newdata
        .save()
        .then((user) => {
            console.log("succes in creating repvdel");
            res.status(200).json({
                date: user.date,
                subgreddit_id: user.subgreddit_id,
            });
        })
        .catch((err) => {
            console.log("failure in saving repvdel");
            console.log("err at repvdel failure: ",err);
            res.status(400).send(err);
        });
}

async function CheckJoinUserStats(req,res) {
    const body = req.body;
    const id = body.id;
    const date = body.date;
    var myquery = { subgreddit_id: id, date: date };
    JoinedUsers.find(myquery,function(err,doc)
    {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log(doc);
        res.send(doc);
    });
}

async function CheckDailyPosts(req,res) {
    const body = req.body;
    const id = body.id;
    const date = body.date;
    var myquery = { subgreddit_id: id, date: date };
    DailyPosts.find(myquery,function(err,doc)
    {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log(doc);
        res.send(doc);
    });
}

async function CheckDailyVisitors(req,res) {
    const body = req.body;
    const id = body.id;
    const date = body.date;
    var myquery = { subgreddit_id: id, date: date };
    DailyVisitors.find(myquery,function(err,doc)
    {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log(doc);
        res.send(doc);
    });
}

async function CheckRepvdel(req,res) {
    const body = req.body;
    const id = body.id;
    const date = body.date;
    var myquery = { subgreddit_id: id, date: date };
    Repvdel.find(myquery,function(err,doc)
    {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log(doc);
        res.send(doc);
    });
}

async function JoinUserStats(req,res) {
    const body = req.body;
    const id = body.id;
    const date = body.date;
    const joined_user = body.joined_user;
    var myquery = { subgreddit_id: id, date: date };
    var newvalues = { $push: {joined_users : joined_user}};

    JoinedUsers.findOneAndUpdate(myquery, newvalues, {upsert : true} ,(err, doc) => {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Updation of Append in JoinUsers in db");
        return res.send("Success");
    });
}

async function UpdDailyPosts(req,res) {
    const body = req.body;
    const id = body.id;
    const date = body.date;
    const post = body.post;
    var myquery = { subgreddit_id: id, date: date };
    var newvalues = { $push: {daily_posts : post}};

    DailyPosts.findOneAndUpdate(myquery, newvalues, {upsert : true} ,(err, doc) => {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Updation of Append in DailyPosts in db");
        return res.send("Success");
    });
}

async function UpdDailyVisitors(req,res) {
    const body = req.body;
    const id = body.id;
    const date = body.date;
    const visitor = body.visitor;
    var myquery = { subgreddit_id: id, date: date };
    var newvalues = { $push: {visitors : visitor}};

    DailyVisitors.findOneAndUpdate(myquery, newvalues, {upsert : true} ,(err, doc) => {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Updation of Append in DailyVisitors in db");
        return res.send("Success");
    });
}

async function UpdRepvdel(req,res) {
    const body = req.body;
    const id = body.id;
    const date = body.date;
    const reported = body.reported;
    const deleted = body.deleted;
    var myquery = { subgreddit_id: id, date: date };
    var newvalues = { $push: {reported : reported},$push: {deleted: deleted}};
    Repvdel.findOneAndUpdate(myquery, newvalues, {upsert : true} ,(err, doc) => {
        if (err)
        {
            res.send(400,{error:err});
        }
        console.log("Success In Updation of repvdel in db");
        return res.send("Success");
    });
}

function getRoot(res) {
    const body = req.body;
    User.find(function (err, users) {
        if (err) {
        } else {
            res.json(users);
        }
    });
}
module.exports = router;

// const authUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
  
//     const user = await User.findOne({ email });
  
//     if (user && (await user.matchPassword(password))) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//         pic: user.pic,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(401);
//       throw new Error("Invalid Email or Password");
//     }
//   });