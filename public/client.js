'use strict';

$(function() {
	
	var MOCK_JOBS = {
	"jobs_data": [
			{
				"id": "1",
	            "title": "Marketing Analyst 1",
	            "company": "aaaaaa",
	            "location": "Atlanta",
	            "description": "John Doe",
	            "publishedAt": 1470016976609
			},
			{
				"id": "2",
	            "title": "Marketing Analyst 2",
	            "company": "aaaaaa",
	            "location": "Atlanta",
	            "description": "John Doe",
	            "publishedAt": 1470016976609
			},
			{
				"id": "3",
	            "title": "Marketing Analyst 3",
	            "company": "aaaaaa",
	            "location": "Atlanta",
	            "description": "John Doe",
	            "publishedAt": 1470016976609
			},
			{
				"id": "4",
	            "title": "Marketing Analyst 4",
	            "company": "aaaaaa",
	            "location": "Atlanta",
	            "description": "John Doe",
	            "publishedAt": 1470016976609
			}
		]
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

	$('.search-button').on('click', function() {
		$(".job-table tr").remove();
		MOCK_JOBS['jobs_data'].forEach(function(value) {
			let table_row = `<tr data-id="${value['id']}" class="job-row clickable-row"><td>${value["title"]}</td><td>${value["company"]}</td><td>${value["location"]}</td></tr>`;
			$(".job-table tbody").append(table_row);
		});
		addListenerOnJobRow();
		$('.job-table tr').eq(0).click();
	});

	function addListenerOnJobRow() {
		$('.job-row').on('click', function() {
			let data_id = $(this).data('id');
			$(".job-table tr").removeClass('table-active');
			$(this).addClass("table-active")
		});
	}

});