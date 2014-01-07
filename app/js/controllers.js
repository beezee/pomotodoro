'use strict';

/* Controllers */

angular.module('pomotodo.controllers', []).
  controller('todoController', ['$scope', 'TodoService', 'Timer', 'storage', 
    function($scope, TodoService, Timer, storage) {

      $scope.todoService = TodoService; 
      $scope.timer = Timer;

      $scope.todoService.todos = _.isArray(storage.get('pomotodos'))
        ? _.map(storage.get('pomotodos'), function(t) { return TodoService.populate(t); })
        : [];

      $scope.addTodo = function() {
        if (!$scope.newTodo)
          return;
        $scope.todoService.add($scope.newTodo);
        $scope.newTodo = '';
      };

      $scope.activateTodo = function(todo) {
        $scope.activeTodo = todo;
      };

      $scope.$watch(function() { return $scope.todoService.todos; }, function(todos) {
        if ($scope.activeTodo
              && !_.find(todos, 
                function(t) { return t.description == $scope.activeTodo.description; }))
          $scope.activeTodo = false;
        storage.set('pomotodos', todos);
      }, true);

    }]);
