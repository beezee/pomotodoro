'use strict';

/* Filters */

angular.module('pomotodo.filters', [])
  .filter('MMSS', function(){
    return function(seconds) {
      return (new Date).clearTime()
        .addSeconds(seconds)
          .toString('mm:ss');  
    };
  })
  .filter('truncate', function () {
    return function (text, length, end) {
      if (!text)
        return;

      if (isNaN(length))
          length = 10;

      if (end === undefined)
          end = "...";

      if (text.length <= length || text.length - end.length <= length) {
          return text;
      }
      else {
          return String(text).substring(0, length-end.length) + end;
      }

    };
  });

