//jshint esversion:6
// load environment variables from .env file
require('dotenv').config();
// express helps in managing servers and routes
const express = require("express");
//
const path = require('path');
//  MongoDB object modeling tool designed to work in an asynchronous environment
const mongoose = require('mongoose');
// providing a Connect/Express middleware that can be used to enable CORS with various options
const cors = require('cors');
// an HTTP server-side framework used to create and manage a session middleware
const session = require('express-session');
// authenticate requests, which it does through an extensible set of plugins known as strategies
const passport = require('passport');
//  simplifies building username and password login with Passport
const passportLocalMongoose = require("passport-local-mongoose");
// Passport strategy for authenticating with Google using the OAuth 2.0 API
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// adds a findOrCreate method to models, useful for libraries like Passport which require it
const findOrCreate = require("mongoose-findorcreate");
//  module for Node.js applications to allow email sending
const nodemailer = require('nodemailer');
// compiles templates into JavaScript functions
const handlebars = require('handlebars');
// creates http server
const http = require('http');
// secure Express apps by setting various HTTP headers
const helmet = require('helmet');
// HTTP request logger middleware for node.js
const morgan = require('morgan');
// robust base64 encoder/decoder 
const base64 = require('base-64');
// UTF-8 encoder/decoder written in JavaScript
const utf8 = require('utf8');

// creates transport object wwhivh uses SMTP, its a protocol used between doffernt email hosts
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com ',
  port: 465,
  name: 'https://anupreet9.github.io/Blog/client/build/index.html#/',
  pool: true,
  type: 'OAuth2',
  service: 'Gmail',
  requireTLS: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
  }
});

// creteas a new express application
const app = express();
// allows us to relax the security applied to an API
app.use(cors({ credentials: true, origin: 'https://anupreet9.github.io/' }));
// store user data between HTTP requests
app.use(session({
  secret: process.env.CLIENT_SECRET,
  resave: false,
  saveUninitialized: false
}));
// middle-ware that initializes passport
app.use(passport.initialize());
// // store user data between HTTP requests
app.use(passport.session());
// Standard Apache combined log output.
app.use(morgan('combined'));
//  helps you secure Express apps by setting various HTTP headers 
app.use(helmet());

//connect with mongoose database
mongoose.connect(process.env.MONGODB_URL,
  {
    useNewUrlParser: true, useUnifiedTopology: true
  })
  .then(() => console.log('Database connected.')).catch(err => console.log(err));
//mongoose.connect('mongodb://localhost:27017/websiteDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Each schema maps to a MongoDB collection and 
// defines the shape of the documents within that collection.
const commentSchema = new mongoose.Schema({
  email: String,
  name: String,
  comment: String,
  replies: [{
    email: String,
    name: String,
    comment: String,
    d: String,
    m: String,
    y: String,
    like: Number,
    profilePic: String,
    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Spam",
        "Trash"
      ],
      default: 'Pending'
    }
  }],
  d: String,
  m: String,
  y: String,
  like: Number,
  postId: String,
  profilePic: String,
  status: {
    type: String,
    enum: [
      "Pending",
      "Approved",
      "Spam",
      "Trash"
    ],
    default: 'Pending'
  }
})
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  d: String,
  m: String,
  y: String,
  displayImage: String,
  like: Number,
  edit: Boolean,
  description: String
});
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String
});

const emailSchema = new mongoose.Schema({
  email: String,
  confirm: Boolean,
  randomString: String
});

const templateSchema = new mongoose.Schema({
  name: String,
  subject: String,
  html: String
})

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// Models are responsible for creating and 
// reading documents from the underlying MongoDB database
const Post = new mongoose.model("Post", postSchema);
const User = new mongoose.model("User", userSchema);
const Comment = new mongoose.model("Comment", commentSchema);
const Email = new mongoose.model("Email", emailSchema);
const Template = new mongoose.model("Template", templateSchema);


// passport uses serializeUser function to persist user data (after successful authentication) into session
passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
// function deserializeUser is used to retrieve user data from session
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(null, user);
  });
});
// 
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "https://anupreet9.github.io/Blog/client/build/index.html#/auth/google/admin/dashboard",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
  function (accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    })
  }
));

// routes the HTTP GET Requests to the path which is being specified with the specified callback functions
app.get("/", function (req, res) {
  res.send("root redirect")
})

app.get("/api", function (req, res) {
  res.send("Hello from api")
})

app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get("/auth/google/admin/dashboard",
  passport.authenticate("google", { failureRedirect: "https://anupreet9.github.io/Blog/client/build/index.html#/admin/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("https://anupreet9.github.io/Blog/client/build/index.html#/admin/dashboard");
  });

function authentication(req, res, next) {
  var authheader = req.headers.authorization;
  var a1 = req.headers['x-forwarded-host'];
  var a2 = req.headers['x-forwarded-for'];
  console.log(req.headers);

  if (!authheader) {
    var err = new Error('You are not authenticated!');
    err.status = 401;
    return next(err)
  }
  var auth = base64.decode(utf8.decode(base64.decode(authheader)));
  a2 = a2.split(',')[1];

  if (auth == process.env.API_KEY && a1 == process.env.DOMAIN && a2 == process.env.IP_ADDRESS) {
    // If Authorized user
    next();
  } else {
    var err = new Error('You are not authenticated!');
    err.status = 401;
    return next(err);
  }

}

//app.use(authentication);

(function () {
  let authenticated = false;
  app.get("/api/logout", function (req, res) {
    req.logOut()
    authenticated = false;
    res.json({ success: true })
  });

  app.post("/api/register", function (req, res) {
    User.register({ username: req.body.username }, req.body.password, function (err, user) {
      if (err) {
        console.log(err);
        res.json({ success: false })
      }
      else {
        passport.authenticate("local")(req, res, function () {
          res.json({ success: true });
        })
      }[]
    })
  })

  app.get("/api/authenticate", function (req, res) {
    if (authenticated) {
      res.json({ success: true });
    }
    else {
      res.json({ success: false });
    }
  })

  app.post("/api/login", function (req, res) {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });

    req.login(user, function (err) {
      if (err) {
        res.json({ success: false });
      }

      else {
        passport.authenticate("local")(req, res, function () {
          authenticated = true;
          res.json({ success: true });
        })
      }
    })
  });
})();

app.route("/api/posts")
  .get(function (req, res) {
    Post.find(function (err, foundPosts) {
      if (!err) {
        res.send(foundPosts);
      }
      else {
        res.send(err);
      }
    })
  })

  .post(function (req, res) {
    var dateObj = new Date();
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      author: "A Curly Haired",
      m: dateObj.toLocaleString('default', { month: 'long' }),
      d: dateObj.getDate() + (dateObj.getDate() > 0 ? ['th', 'st', 'nd', 'rd'][(dateObj.getDate() > 3 && dateObj.getDate() < 21) || dateObj.getDate() % 10 > 3 ? 0 : dateObj.getDate() % 10] : ''),
      y: dateObj.getFullYear(),
      displayImage: req.body.displayImage,
      like: 0,
      edit: req.body.edit,
      description: req.body.description
    })
    newPost.save(function (err) {
      if (!err) {
        res.json({ success: true });
      }
      else {
        res.send(err)
      }
    });
  })

  .delete(function (req, res) {
    Post.deleteMany(function (err) {
      if (!err) {
        res.json({ success: true });
      }
      else {
        res.send(err)
      }
    })
  })

app.route("/api/posts/:postId")
  .get(function (req, res) {
    Post.findOne({ _id: req.params.postId }, function (err, foundPost) {
      if (foundPost) {
        res.send(foundPost)
      } else {
        res.send("No post found");
      }
    })
  })
  .put(function (req, res) {
    var dateObj = new Date();
    Post.updateOne(
      { _id: req.params.postId },
      {
        title: req.body.title,
        content: req.body.content,
        author: "A Curly Haired",
        m: dateObj.toLocaleString('default', { month: 'long' }),
        d: dateObj.getDate() + (dateObj.getDate() > 0 ? ['th', 'st', 'nd', 'rd'][(dateObj.getDate() > 3 && dateObj.getDate() < 21) || dateObj.getDate() % 10 > 3 ? 0 : dateObj.getDate() % 10] : ''),
        y: dateObj.getFullYear(),
        displayImage: req.body.displayImage,
        edit:req.body.edit,
        description: req.body.description
      },
      { overwrite: true },
      function (err) {
        if (!err) {
          res.send("Successfully updated post");
        }
      }
    )
  })
  .patch(function (req, res) {
    if (!req.body.editLike) {
      var dateObj = new Date()
      Post.updateOne(
        { _id: req.params.postId },
        {
          $set: req.body,
          m: dateObj.toLocaleString('default', { month: 'long' }),
          d: dateObj.getDate() + (dateObj.getDate() > 0 ? ['th', 'st', 'nd', 'rd'][(dateObj.getDate() > 3 && dateObj.getDate() < 21) || dateObj.getDate() % 10 > 3 ? 0 : dateObj.getDate() % 10] : ''),
          y: dateObj.getFullYear()
        },
        function (err) {
          if (!err) {
            res.send("Successfully updated post");
          }
          else {
            res.send(err);
          }
        }
      )
    }
    else {
      if (req.body.like < 0) {

      }
      else {
        Post.updateOne(
          { _id: req.params.postId },
          {
            $set: req.body
          },
          function (err) {
            if (!err) {
              res.send("Successfully updated post");
            }
            else {
              res.send(err);
            }
          }
        )
      }
    }
  })

  .delete(function (req, res) {
    Post.deleteOne({ _id: req.params.postId }, function (err) {
      if (!err) {
        res.send("Successfully deleted post");
      }
      else {
        res.send(err);
      }
    })
  });

app.route("/api/comments")
  .get(function (req, res) {
    Comment.find(function (err, foundComments) {
      if (!err) {
        res.send(foundComments);
      }
      else {
        res.send(err);
      }
    })
  })

  .post(function (req, res) {
    var dateObj = new Date();
    const newComment = new Comment({
      email: req.body.email,
      name: req.body.name,
      comment: req.body.comment,
      m: dateObj.toLocaleString('default', { month: 'long' }),
      d: dateObj.getDate() + (dateObj.getDate() > 0 ? ['th', 'st', 'nd', 'rd'][(dateObj.getDate() > 3 && dateObj.getDate() < 21) || dateObj.getDate() % 10 > 3 ? 0 : dateObj.getDate() % 10] : ''),
      y: dateObj.getFullYear(),
      postId: req.body.postId,
      profilePic: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mtsacfoundation.org%2Fnew-blog%2F2018%2F7%2F13%2Felana-gofran&psig=AOvVaw3R52BXWeTTy3sNfvEBNDiP&ust=1613588508590000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOjL7OKL7-4CFQAAAAAdAAAAABAJ"
    });

    newComment.save(function (err) {
      if (!err) {
        res.send("Successfully added the comment")
      }
      else {
        res.send(err)
      }
    })
  })

  .delete(function (req, res) {
    Comment.deleteMany(function (err) {
      if (!err) {
        res.send("Successfully deleted all")
      }
      else {
        res.send(err);
      }
    })
  });

app.route("/api/comment/:commentId")
  .get(function (req, res) {
    Comment.findOne({ _id: req.params.commentId }, function (err, foundComment) {
      if (foundComment) {
        res.send(foundComment)
      } else {
        res.send("No comment found");
      }
    })
  })
  .put(function (req, res) {
    var dateObj = new Date()
    Comment.updateOne(
      { _id: req.params.commentId },
      {
        email: req.body.email,
        name: req.body.name,
        comment: req.body.comment,
        m: dateObj.toLocaleString('default', { month: 'long' }),
        d: dateObj.getDate() + (dateObj.getDate() > 0 ? ['th', 'st', 'nd', 'rd'][(dateObj.getDate() > 3 && dateObj.getDate() < 21) || dateObj.getDate() % 10 > 3 ? 0 : dateObj.getDate() % 10] : ''),
        y: dateObj.getFullYear(),
        postId: req.body.postId,
        profilePic: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mtsacfoundation.org%2Fnew-blog%2F2018%2F7%2F13%2Felana-gofran&psig=AOvVaw3R52BXWeTTy3sNfvEBNDiP&ust=1613588508590000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOjL7OKL7-4CFQAAAAAdAAAAABAJ"
      },
      { overwrite: true },
      function (err) {
        if (!err) {
          res.send("Successfully updated comment");
        }
      }
    )
  })
  .patch(function (req, res) {
    if (req.body.replyBody) {
      var dateObj = new Date();
      var data = {
        'name': req.body.name,
        'email': req.body.email,
        'comment': req.body.comment,
        'm': dateObj.toLocaleString('default', { month: 'long' }),
        'd': dateObj.getDate() + (dateObj.getDate() > 0 ? ['th', 'st', 'nd', 'rd'][(dateObj.getDate() > 3 && dateObj.getDate() < 21) || dateObj.getDate() % 10 > 3 ? 0 : dateObj.getDate() % 10] : ''),
        'y': dateObj.getFullYear(),
        'status': req.body.status,
        'profilePic': "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mtsacfoundation.org%2Fnew-blog%2F2018%2F7%2F13%2Felana-gofran&psig=AOvVaw3R52BXWeTTy3sNfvEBNDiP&ust=1613588508590000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOjL7OKL7-4CFQAAAAAdAAAAABAJ"
      };

      Comment.updateOne(
        { _id: req.params.commentId },
        { $push: { 'replies': data } },
        function (err) {
          if (!err) {
            res.send("Successfully updated reply");
          }
          else {
            res.send(err);
          }
        }
      )
    }
    else {
      if (req.body.isReplyStatus || req.body.isReplyPatch) {
        if (req.body.isReplyStatus) {
          Comment.updateOne(
            { _id: req.params.commentId, 'replies._id': req.body.replyId },
            { $set: { 'replies.$.status': req.body.status } },
            function (err) {
              if (!err) {
                res.send("Successfully updated status");
              }
              else {
                res.send(err);
              }
            }
          )
        }
        else {
          var dateObj = new Date();
          Comment.updateOne(
            { _id: req.params.commentId, 'replies._id': req.body.replyId },
            {
              $set: {
                'replies.$.name': req.body.name,
                'replies.$.email': req.body.email,
                'replies.$.comment': req.body.comment
              },
            },
            {
              'replies.m': dateObj.toLocaleString('default', { month: 'long' }),
              'replies.d': dateObj.getDate() + (dateObj.getDate() > 0 ? ['th', 'st', 'nd', 'rd'][(dateObj.getDate() > 3 && dateObj.getDate() < 21) || dateObj.getDate() % 10 > 3 ? 0 : dateObj.getDate() % 10] : ''),
              'replies.y': dateObj.getFullYear()
            },
            function (err) {
              if (!err) {
                res.send("Successfully updated reply");
              }
              else {
                res.send(err);
              }
            }
          )
        }
      }
      else {
        Comment.updateOne(
          { _id: req.params.commentId },
          { $set: req.body },
          function (err) {
            if (!err) {
              res.send("Successfully updated comment");
            }
            else {
              res.send(err);
            }
          }
        )

      }

    }
  })

  .delete(function (req, res) {
    if (req.body.isReply) {
      Comment.updateOne({ _id: req.params.commentId },
        { $pull: { replies: { _id: req.body.replyId } } },
        { safe: true, multi: true },
        function (err) {
          if (!err) {
            res.send("Successfully deleted reply");
          }
          else {
            res.send(err)
          }
        });
    }
    else {
      Comment.deleteOne({ _id: req.params.commentId }, function (err) {
        if (!err) {
          res.send("Successfully deleted comment");
        }
        else {
          res.send(err)
        }
      })
    }
  });

app.route("/api/send-email")
  .post(function (req, res) {
    var html = req.body.html;
    var template = handlebars.compile(html);
    var replacements = {
      randomString: req.body.randomString
    };
    var htmlToSend = template(replacements);
    const mailOptions = {
      from: 'Curly Haired <curlyhairedescapade@gmail.com>',
      to: req.body.to,
      subject: req.body.subject,
      html: htmlToSend
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.json({ success: false });
      } else {
        console.log('Email sent: ' + info.response);
        res.json({ success: true });
      }
    });
  });

app.route("/api/emails")
  .get(function (req, res) {
    Email.find(function (err, foundEmails) {
      if (!err) {
        res.send(foundEmails)
      }
      else {
        res.json({ success: false })
      }
    })
  })

  .post(function (req, res) {
    const newEmail = new Email({
      email: req.body.email,
      confirm: req.body.confirm,
      randomString: req.body.randomString
    });
    Email.findOne(
      { 'email': req.body.email },
      function (err, foundEmail) {
        if (!foundEmail) {
          newEmail.save(
            function (err) {
              if (!err) {
                res.json({ success: true });
              }
              else {
                res.json({ success: false })
              }
            })
        }
        else {
          Email.updateOne(
            { 'email': req.body.email },
            { $set: { 'randomString': req.body.randomString } },
            function (err) {
              if (!err) {
                res.json({ success1: true });
              }
              else {
                res.json({ success1: false });
              }
            })
        }
      })
  })

  .delete(function (req, res) {
    Email.deleteMany(function (err) {
      if (!err) {
        res.json({ success: true });
      }
      else {
        res.send(err)
      }
    })
  })

app.route("/api/emails/:randomString")
  .get(function (req, res) {
    Email.findOne({ "randomString": req.params.randomString }, function (err, foundEmail) {
      if (foundEmail) {
        res.send(foundEmail)
      } else {
        res.send("No email found");
      }
    })
  })
  .put(function (req, res) {
    Email.updateOne(
      { _id: req.params.emailId },
      {
        email: req.body.email,
        confirm: req.body.confirm
      },
      { overwrite: true },
      function (err) {
        if (!err) {
          res.send("Successfully updated email");
        }
      }
    )
  })
  .patch(function (req, res) {
    Email.updateOne(
      { 'randomString': req.params.randomString },
      { $set: req.body },
      function (err) {
        if (!err) {
          res.json({ success: true });
        }
        else {
          res.json({ success: false });
        }
      }
    )
  })

  .delete(function (req, res) {
    Email.deleteOne({ randomString: req.params.randomString }, function (err) {
      if (!err) {
        res.send("Successfully deleted email");
      }
      else {
        res.send(err);
      }
    })
  })

app.route("/api/templates")
  .get(function (req, res) {
    Template.find(function (err, foundTemplates) {
      if (!err) {
        res.send(foundTemplates);
      }
      else {
        res.send("Error")
      }
    })
  })

  .post(function (req, res) {
    const newTemplate = new Template({
      name: req.body.name,
      subject: req.body.subject,
      html: req.body.html
    })
    newTemplate.save(function (err) {
      if (!err) {
        res.send("Successfully added the template")
      }
      else {
        res.send(err);
      }
    })
  })

  .delete(function (req, res) {
    Template.deleteMany(function (err) {
      if (!err) {
        res.json({ success: true });
      }
      else {
        res.send(err)
      }
    })
  })

app.route("/api/templates/:templateId")
  .get(function (req, res) {
    Template.findOne({ _id: req.params.templateId }, function (err, foundTemplate) {
      if (foundTemplate) {
        res.send(foundTemplate)
      } else {
        res.send("No email found");
      }
    })
  })
  .put(function (req, res) {
    Template.updateOne(
      { _id: req.params.templateId },
      {
        name: req.body.name,
        subject: req.body.subject,
        html: req.body.html
      },
      { overwrite: true },
      function (err) {
        if (!err) {
          res.send("Successfully updated template");
        }
      }
    )
  })
  .patch(function (req, res) {
    Template.updateOne(
      { _id: req.params.templateId },
      {
        $set: req.body,
      },
      function (err) {
        if (!err) {
          res.send("Successfully updated template");
        }
        else {
          res.send(err);
        }
      }
    )
  })

  .delete(function (req, res) {
    Template.deleteOne({ _id: req.params.templateId }, function (err) {
      if (!err) {
        res.send("Successfully deleted template");
      }
      else {
        res.send(err);
      }
    })
  });

let port = process.env.PORT;
const hostname = 'https://curlyhairedescapade.herokuapp.com/';
if (port == null || port == "") {
  port = 3000;
}

const host = '0.0.0.0'

const server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`Node.js App Server at https://${hostname}:${port}/`);
});