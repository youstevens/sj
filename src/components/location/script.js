'use strict';

const $ = require('jquery');
const mockData = require('../../data/_mockData.js');

$.fn.location = function () {
    this.each(function () {
        let markup = `
            <h2>Location</h2>
            <div class="swipejobs-card_address"><a href="">${mockData.company.address}</a></div>
        `;

        $(this).append(markup);

    });
    return this;
};
