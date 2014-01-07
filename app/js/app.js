'use strict';


// Declare app level module which depends on filters, and services
angular.module('pomotodo', [
  'ngRoute',
  'pomotodo.filters',
  'pomotodo.services',
  'pomotodo.directives',
  'pomotodo.controllers',
  'ui.sortable',
  'angularLocalStorage'
])
