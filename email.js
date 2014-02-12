
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport("SMTP",{
	//service: "Gmail",
	host: "mail.soaps4lives.com",
	secureConnection: true,
	port: 993,
	auth: {
		user: "contact@soaps4lives.com",
		pass: "*****"
	}
});


var heroVol = {}; 
var from = "Soaps4Lives<shengyunzhou@gmail.com>",
	to = "Sheng Yunzhou<shengyunzhou@msn.com>";


exports.hero_volunteer = function (req, res, callback) {
	var name = req.body.heroVolName,
		email = req.body.heroVolEmail,
		organisation = req.body.heroVolOrg,
		position = req.body.heroVolPos,
		phone = req.body.heroVolPhone,
		message = req.body.heroVolMsg;

	smtpTransport.sendMail({
		from: from, // sender address
		to: to, // comma separated list of receivers
		subject: "New Soaps4Lives Hero Volunteer Information", // Subject line
		html: "<p>Name: " + name + "</p>" + 
			"<p>Email: " + email + "</p>" + 
			"<p>Orgnisation: " + organisation + "</p>" +
			"<p>Position: " + position + "</p>" +
			"<p>Phone: " + phone + "</p>" +
			"<p>Message: " + message + "</p>"
	}, callback);

	console.log("\nSending Hero Volunteer Email...\n");

};

exports.corp_gift = function (req, res, callback) {
    var name = req.body.corpName,
		email = req.body.corpEmail,
		organisation = req.body.corpOrg,
		position = req.body.corpPos,
		phone = req.body.corpPhone,
		message = req.body.corpMsg;

	smtpTransport.sendMail({
		from: from, // sender address
		to: to, // comma separated list of receivers
		subject: "New Soaps4Lives Corporate Gift Information", // Subject line
		html: "<p>Name: " + name + "</p>" + 
			"<p>Email: " + email + "</p>" + 
			"<p>Orgnisation: " + organisation + "</p>" +
			"<p>Position: " + position + "</p>" +
			"<p>Phone: " + phone + "</p>" +
			"<p>Message: " + message + "</p>"
	}, callback);

	console.log("\nSending Corporate Gift Email...\n");

};