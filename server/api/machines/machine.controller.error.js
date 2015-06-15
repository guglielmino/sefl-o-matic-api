
'use strict';

var errorStatuses = {
	'KeyViolation' : 304,
};

exports.errorCodeToStatus = function (code) {
	var res = 500;

	if (code in errorStatuses) {
		res = errorStatuses[code];
	}

	return res;
}

