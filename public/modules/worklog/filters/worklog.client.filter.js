'use strict';

angular.module('worklog')
    .filter('sumByKey', function() {
        return function(data, key) {
            if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
                return 0;
            }

            var sum = 0;
            for (var i = data.length - 1; i >= 0; i--) {
                sum += parseInt(data[i][key]);
            }

            return sum;
        };
    });

/*	.filter('sumOfTwoValues', function () {
		return function (data, key1, key2) {
			if (typeof (data) === 'undefined' || typeof (key1) === 'undefined' || typeof (key2) === 'undefined') {
				return 0;
			}
			var keyObjects1 = key1.split('.');
			var keyObjects2 = key2.split('.');
			var sum = 0;
			for (i = 0; i < data.length; i++) {
				var value1 = data[i];
				var value2 = data[i];
				for (j = 0; j < keyObjects1.length; j++) {
					value1 = value1[keyObjects1[j]];
				}
				for (k = 0; k < keyObjects2.length; k++) {
					value2 = value2[keyObjects2[k]];
				}
				sum = sum + (value1 * value2);
			}
			return sum;
		};
	});
	*/
