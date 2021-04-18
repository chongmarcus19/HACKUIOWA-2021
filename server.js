var express = require('express'); 
var app = express();
var bodyParser = require('body-parser'); 
app.use(bodyParser.json());            
app.use(bodyParser.urlencoded({ extended: true })); 


var pgp = require('pg-promise')();

const dbConfig = {
	host: 'db',
	port: 5432,
	database: 'abroad_db',
	user: 'postgres',
	password: 'pwd'
};

var db = pgp(dbConfig);


app.set('view engine', 'ejs');
app.use(express.static(__dirname));

var cookieParser = require('cookie-parser');
app.use(cookieParser());


app.get('/',function(req,res) {
	res.redirect('/Login');
});


app.get('/Login',function(req,res) {
	res.render('pages/loginPage');
});

app.get('/register',function(req,res) {
	res.render('pages/registerPage');
});

app.get('/interests',function(req,res) {
	res.render('pages/interests');
});

app.get('/homePage', function(req, res) {
	const query_1='select * from posts ORDER BY vote_amount DESC;'; // gets every post
	const query_2='select * from subforums;'; // gets every subforum
	
	db.task('get-everything',function(task) {
		return task.batch([
			task.any(query_1),
			task.any(query_2)
		]);
	})
	.then(function(data) {
		//console.log(data[0])
		//console.log(data[1])
		res.render('pages/homePage', {
			posts:data[0], 		// posts
			subForums:data[1]	// subforums
		});
	})
	.catch(function(err) {
		console.log(`Query Error ${err}`);
		res.render('pages/homePage', {
			subForums:[''],
			posts:[]
		});
	});
});

app.post('/login/submit',function(req,res) {
	const emailInput=req.body.emailInput;
	const passwordInput=req.body.passwordInput;
	const query=`select exists(select * from logins where username='${emailInput}' and pwd='${passwordInput}');`;
	db.any(query)
	.then(function(info) {

		const validLogin=info[0].exists;
		if(validLogin) {
			console.log("Valid Login");
			res.cookie('email', emailInput).send({validLogin:true});
		}
		else {
			console.log("Invalid Login");
			res.send({validLogin:false});
		}
	})
	.catch(function(err) {
		console.log(`Login Error:\n ${err}`);
	});
});

app.post('/register/create',function(req,res) {
	const newEmail=req.body.newEmail;
    const newPassword=req.body.newPassword;
    const newFirst = req.body.newFirst;
    const newLast = req.body.newLast;
    const newUni = req.body.newUni;
    const newCountry = req.body.newCountry;

	const query=`INSERT INTO users(email, pwd, firstname, lastname, uni, home_country) VALUES('${newEmail}','${newPassword}','${newFirst}','${newLast}','${newUni}','${newCountry}');`;
	db.any(query)
	.then(function(info) {
		console.log('Successful Registration');
		res.send({registrationWorked:true});
	})
	.catch(function(err) {
		console.log(`Registration Error:\n ${err}`);
		res.send({registrationWorked:false});
	});
});

app.post('/interests/create',function(req,res) {
	const newUsername=req.body.newUsername;
	const newPassword=req.body.newPassword;
	const query=`INSERT INTO logins(username, pwd) VALUES('${newUsername}','${newPassword}');`;
	db.any(query)
	.then(function(info) {
		console.log('Successful Registration');
		res.send({registrationWorked:true});
	})
	.catch(function(err) {
		console.log(`Registration Error:\n ${err}`);
		res.send({registrationWorked:false});
	});
});


app.listen(3000);
console.log('3000 is the magic port');