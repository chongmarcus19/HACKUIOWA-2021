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
	const query ='select * from users;';
	
	db.task('get-everything',function(task) {
		return task.batch([
			task.any(query),
		]);
	})
	.then(function(data) {
		res.render('pages/homePage', {
			users:data[0], 
		});
	})
	.catch(function(err) {
		console.log(`Query Error ${err}`);
		res.render('pages/homePage', {
			users:[]
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
		console.log('Registration Successful');
		res.send({registrationWorked:true});
	})
	.catch(function(err) {
		console.log(`Registration Failed`);
		res.send({registrationWorked:false});
	});
});

app.post('/interests/create',function(req,res) {
	const email=req.body.email;
	const first = req.body.first;
	const last = req.body.last;
	const country = req.body.country;
	const interest1=req.body.interest1;
	const interest2=req.body.interest2;
	const interest3=req.body.interest3;
	const interest4=req.body.interest4;
	const interest5=req.body.interest5;
	const query=`INSERT INTO interests(email, firstname, lastname, home_country, interest1, interest2, interest3, interest4, interest5) VALUES('${email}','${first}','${last}','${country}','${interest1}','${interest2}','${interest3}','${interest4}','${interest5}');`;
	db.any(query)
	.then(function(info) {
		console.log('Registration Successful');
		res.send({interestWorked:true});
	})
	.catch(function(err) {
		console.log(`Registration Failed`);
		res.send({interestWorked:false});
	});
});


app.listen(3000);
console.log('3000 is the magic port');