'use strict';

$(function() {
	let jobs_data;
	let BASE_URL
	
	// if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
	// 	 BASE_URL = "http://localhost:8080/jobs";
	// } else {
		BASE_URL = "https://peaceful-stream-17579.herokuapp.com/jobs";
	// }

	function getDataFromApi(callback) {
	  const settings = {
	    url: BASE_URL,
	    dataType: 'json',
	    type: 'GET',
	    success: callback
	  };
	  console.log(settings)
	  $.ajax(settings);
	}
	
	// var MOCK_JOBS = {
	// "jobs_data": [
	// 		{
	// 			"id": 1,
	//             "title": "Marketing Analyst 1",
	//             "company": "aaaaaa",
	//             "location": "Atlanta",
	//             "description": "Johgfsgfsge",
	//             "publishedAt": 1470016976609
	// 		},
	// 		{
	// 			"id": 2,
	//             "title": "Marketing Analyst 2",
	//             "company": "bbbb",
	//             "location": "Atlanta",
	//             "description": "asf Doe",
	//             "publishedAt": 1470016976609
	// 		},
	// 		{
	// 			"id": 3,
	//             "title": "Marketing Analyst 3",
	//             "company": "cccccc",
	//             "location": "Atlanta",
	//             "description": "Johsde",
	//             "publishedAt": 1470016976609
	// 		},
	// 		{
	// 			"id": 4,
	//             "title": "Marketing Analyst 4",
	//             "company": "dddd",
	//             "location": "Atlanta",
	//             "description": "John Doe",
	//             "publishedAt": 1470016976609
	// 		}
	// 	]
	// }

	var SAVED_JOBS = {
		jobs: [
			{
				"session_id": 1,
				"email": "",
				"description":" ",
			}
		]
	}

	function displaySearchResults(data) {
		jobs_data = data['jobs'];
		console.log(jobs_data);
		$(".job-table tr").remove();
		jobs_data.forEach(function(value) {
			let table_row = `<tr data-id="${value['id']}" class="job-row clickable-row"><td>${value["title"]}</td><td>${value["company"]}</td><td>${value["location"]}</td></tr>`;
			$(".job-table tbody").append(table_row);
		});
		addListenerOnJobRow();
		$('.job-table tr').eq(0).click();
	}

	$('.search-button').on('click', function() {
		getDataFromApi(displaySearchResults);
	});

	function addListenerOnJobRow() {
		$('.job-row').on('click', function() {
			let data_id = $(this).data('id');
			let job_description = jobs_data.find(x => x.id === data_id).description;
			$(".job-table tr").removeClass('table-active');
			$(this).addClass("table-active")
			$('#sample-text-area').val(job_description);
		});
	}

});