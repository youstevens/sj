'use strict';
const moment = require('moment-timezone');

const $ = require('jquery');
const mockData = require('../../data/_mockData.js');

$.fn.details = function () {

    this.each(function () {
        // Helper function to format dates
        function dateFormat(dateStr, formatStr) {
            let date = dateStr.replace(/ /g, '');
            date = moment.tz(date, 'America/Los_Angeles').format(formatStr);
            return date;
        }

        // Calculates the start and end dates of the job
        function calcStartEndDate(arr) {
            let start = arr[0];
            let end = arr[arr.length - 1];

            start = dateFormat(start.startDate, 'ddd, MMM D');
            end = dateFormat(end.endDate,'ddd, MMM D');

            let markup = `${start} - ${end}`;
            return markup;
        }

        // Calculate and construct markup for the hours/days for the job
        function calchours(arr) {
            let markup = arr.map(obj => {
                let start = dateFormat(obj.startDate, 'ddd, MMM D h:mm:ss A zz');
                start = start.split(' ');
                return `<li>
                            <span class="day">${start[0]}</span>
                            <span class="month">${start[1]}</span>
                            <span class="date">${start[2]}</span>
                            <span class="time">${start[3]}</span>
                            <span class="ampm">${start[4]}</span>
                            <span class="timezone">${start[5]}</span>
                        </li>`;
            });
            return markup.join("");
        }

        // hourly rate
        let hourlyrate = (mockData.wagePerHourInCents && (parseInt(mockData.wagePerHourInCents) > 0)) ? parseInt(mockData.wagePerHourInCents)/100 : 0;
        // list of hours
        let hours = calchours(mockData.shifts);
        // start and end dates
        let startenddate = calcStartEndDate(mockData.shifts);

        let markup = `
            <div class="swipejobs-card_details">
                <div class="swipejobs-card_image"><div class="swipejobs-card_image-wrapper"><img src="${mockData.company.logo}" alt="${mockData.company.name}"></div></div>
                <div class="swipejobs-card_company">
                    <h2>${mockData.title}</h2>
                    <h3>${mockData.company.name}</h3>
                    <p class="swipejobs-card_hourlyrate">$${parseFloat(hourlyrate).toFixed(2)}/hour</p>
                    <p class="swipejobs-card_startenddate">${startenddate}</p>
                </div>
            </div>
            <div class="swipejobs-card_hours">
                <label>If you take this job you are agreeing to work <span>all days.</span></label>
                <ul>${hours}</ul>
            </div>
        `;

        $(this).append(markup);
	});
	return this;
};
