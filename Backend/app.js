var express = require("express");
var bodyParser = require("body-parser");
require("./connection");
const User = require("./Schema");
const Pass = require("./pass");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const cors = require("cors");

var app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({ name: "debanan" });
});

app.post("/signup", async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let passwordold = req.body.password;
  const password = await bcrypt.hash(passwordold, 10);

  let user = new User({ username, password, email });
  let u = await user.save();
  res.status(200).json({ status: true, data: u });
});

app.post("/verifylogin", (req, res) => {
  let token = req.body.token;
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ status: true, data: decoded });
  } catch (err) {
    res.json({ status: false });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body, email, password);

  if (!email || !password) {
    return res.status(400).send("Email and password must be provided");
  }

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user.length == 0) {
      return res.status(401).res.json({ success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false });
    }
    var token = jwt.sign(
      { email: user.email, name: user.username },
      process.env.JWT_SECRET
    );
    res.json({ success: true, token: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
});

app.post("/savepassword", async (req, res) => {
  let sitename = req.body.sitename;
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  let p = new Pass({ sitename, username, password, email });
  let pn = await p.save();
  res.status(200).json({ success: true, pn });
});

app.post("/getpass", async (req, res) => {
  let email = req.body.email;
  //console.log(email);
  let pass = await Pass.find({ email: email });

  res.status(200).json(pass);
});
app.post("/updatepassword", async (req, res) => {
  let sitename = req.body.sitename;
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let res1 = await Pass.findOneAndUpdate({ email, sitename }, {username, password });
  if (res1) {
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }
});
app.post("/deleteitem", async (req, res) => {
  const { email, site, uname } = req.body;
  //console.log(req.body);

  const result = await Pass.findOneAndDelete({
    email: email,
    sitename: site,
    username: uname,
  });
 
  //console.log(result)
  if (result) {
    res.status(200).json({ status: true });
  } else {
    res.status(200).json({ status: false });
  }
});

app.listen(5000, () => {
  console.log("running on 5000 port");
});
