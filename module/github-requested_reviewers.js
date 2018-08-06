// see: https://developer.github.com/v3/pulls/review_requests/
const githubRequestedReviewer = function(settings) {
	this.request = require("request");
	this.auth = { user: settings.user, password: settings.password };
	this.options = {
    url: settings.api_endpoint + "repos/" + settings.repository + '/pulls/3/requested_reviewers',
		method: "POST",
		json: true,
		headers: {
			"Content-Type":"application/json",
			"User-Agent": "ReviewSupportBot"
		},
	};

	this.show = () => {
		console.log(this.options);
	};

	this.setAuthData = (data) => {
		this.auth = data;
	};

	this.assign = (prNumber) => {
		return new Promise( (resolve, reject) => {
			this.options.auth = this.auth;
			this.options.form = JSON.stringify({
				reviewers: ["mo10sa10"],
        team_reviewers: []
			});

			this.request(this.options, (err, res)=>{
				if(err) reject(err);
				if([200, 201].indexOf(res.statusCode) == -1) reject(res.statusCode);
				return resolve(res);
			});
		});
	};
};

module.exports = params => {return new githubRequestedReviewer(params);};
