const indeed = require('indeed-scraper');
const {Job} = require('./models');


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

module.exports = { getJobsFromIndeed }