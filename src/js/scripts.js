require('../sass/styles.scss');

'use strict';
require('../components/details/script.js');
require('../components/location/script.js');
require('../components/branch/script.js');

const $ = require('jquery');

$(function() {
	$('.swipejobs-card_job-details').details();
	$('.swipejobs-card_location').location();
	$('.swipejobs-card_branch').branch();
});
