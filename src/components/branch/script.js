'use strict';

const $ = require('jquery');
const mockData = require('../../data/_mockData.js');

$.fn.branch = function () {
    this.each(function () {
        let markup = `
            <h2>Branch:</h2>
            <div class="swipejobs-card_branch-name">${mockData.branch}</div>
            <div class="swipejobs-card_branch-number"><a href="">${mockData.branchPhoneNumber}</a></div>
        `;

        $(this).append(markup);

	});
	return this;
};
