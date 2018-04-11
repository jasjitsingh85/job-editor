const indeed = require('indeed-scraper');
const {Job} = require('./models');
var https = require('follow-redirects').https
const cheerio = require('cheerio')
var h2p = require('html2plaintext')


function getJobsFromIndeed(queryOptions, callback) {

	return new Promise (function(resolve, reject) {
			resolve(indeed.query(queryOptions));
		}).then(res => {
			let formattedResponse = [];
			res.forEach(function(value) {
				var newJob = Job ({
					title: value['title'],
				 	company: value['company'],
				 	location: value['location'],
				 	summary: value['summary'],
				 	url: value['url'],
				});
				newJob.save()
				formattedResponse.push(newJob);
			});
			return formattedResponse;
			// console.log(formattedResponse);
			// console.log(res);
		})
		.catch( err => console.log(err));
	// });
}

function getJobFromIndeed(url, callback) {

	return new Promise (function(resolve, reject) {
	      https.get(url, res => {
	        res.setEncoding("utf8");
	        let body = "";
	        res.on("data", data => {
	          body += data;
	        });
	        res.on("end", () => {
	          const $ = cheerio.load(body)
	          resolve(h2p($('.summary').html()));
	        });
	      });
	})
	.catch (err => console.log(err));
}

module.exports = { getJobsFromIndeed , getJobFromIndeed }