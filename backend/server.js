const express = require('express')
const app = express();
//
const http = require("http");
const server = http.createServer(app);
//
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer');
const fileUpload = require('express-fileupload');
const ImageKit = require('imagekit');

const PORT = 4003

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'swayamagrawal1004@gmail.com',
    pass: 'qnolzrpnglfkoimr',
  },
});

const imagekit = new ImageKit({
  publicKey : 'public_mR67DP/gEB/k/W61uH6XHTpzwtg=',
  privateKey : 'private_7AWHXAb7rXb211a4BGBTR3uvE2g=',
  urlEndpoint : 'https://ik.imagekit.io/k5dmkfor6',
});

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload());

const DB =
"mongodb+srv://schlechter:VGAreKlkxyE84hng@cluster0.1rzfsaq.mongodb.net/MERN_Create_1?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log("DB Connection Successful!");
    console.log(con.connection.host);
  });

const connection = mongoose.connection;
connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
})

var UserRouter = require("./routes/users");
app.use("/user", UserRouter);

var UserRouter2 = require("./auth");
app.use("/user", UserRouter2);

app.post('/user/send-email', async (req, res) => {
  console.log("enetered email route!!");
  const { blockedUserEmail, blockingUserEmail } = req.body;

  // Setup email data with unicode symbols
  const mailOptions = {
    from: '"Swayam" <swayamagrawal1004@gmail.com>', // sender address
    to: `${blockedUserEmail},${blockingUserEmail}`, // list of receivers
    subject: 'User Blocked', // Subject line
    text: 'You have been blocked by a user on our platform.', // plain text body
  };

  try {
    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

server.listen(PORT, () => {
    console.log(`Backend app listening at http://localhost:${PORT}`)
})

const { Server } = require("socket.io");
const io = new Server (server, {
  cors: {
    origin: "*",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  console.log("a user connected.");
  io.emit("welcome","hello this is the socket server");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});