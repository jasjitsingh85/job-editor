'use strict';

$(function() {
	let jobs_data;
	let BASE_URL
	
	if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
		 BASE_URL = "http://localhost:8080/";
	} else {
		BASE_URL = "https://peaceful-stream-17579.herokuapp.com/";
	}

	function getDataFromApi(url, query, callback) {
	  const settings = {
	    url: BASE_URL + url,
	    dataType: 'json',
	    data: { "query" : query },
	    type: 'GET',
	    success: callback
	  };
	  $.ajax(settings);
	}

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
		let query = $('.query').val();
		if (query.length > 0) {
			getDataFromApi("jobs", query, displaySearchResults);
		} else {
			alert("Please add a job type into the search box");
		}
	});

	function addListenerOnJobRow() {
		$('.job-row').on('click', function() {
			let data_id = $(this).data('id');
			let job_description = jobs_data.find(x => x.id === data_id).description;
			$(".job-table tr").removeClass('table-active');
			$(this).addClass("table-active")
			$('#sample-text-area').val(job_description);
			let url = "jobs/" + data_id;
			getDataFromApi(url, "", displayJobContent)
		});
	}

	function displayJobContent(data) {
		$('#source-text-area').val(data['job_description']);
	}

});