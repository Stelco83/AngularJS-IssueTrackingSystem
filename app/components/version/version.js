'use strict';

angular.module('ITS.version', [
  'ITS.version.interpolate-filter',
  'ITS.version.version-directive'
])

.value('version', '0.1');
