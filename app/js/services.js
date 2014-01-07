'use strict';

/* Services */

angular.module('pomotodo.services', ['ng'])
  .factory('TodoService', function() {
    var TodoService = function() {
      var self = this;
      self.todos = [];
      
      var Todo = function(description) {
        var self = this;
        self.description = description;
        self.complete = false;
        self.comments = [];

        self.toggleComplete = function() {
          self.complete = !self.complete;
        };

        self.addComment = function(comment) {
          if (_.find(self.comments, function(c) { return c == comment; }))
            return;
          self.comments.push(comment);
        };

        self.removeComment = function(comment) {
          self.comments = _.reject(self.comments, function(c) { return c == comment; });
        };

      };
          
      self.add = function(description) {
        if (_.find(self.todos, function(t) { return t.description == description; }))
          return;
        self.todos.push(new Todo(description));
      };

      self.remove = function(todo) {
        self.todos = _.reject(self.todos, function(t) { return t.description == todo.description; });
      };

      self.incompleteTodos = function() {
        return _.filter(self.todos, function(t) { return !t.complete; });
      };

      self.populate = function(todoData) {
        return _.extend(new Todo(), todoData);
      };
    };
    
    return new TodoService();
  })
  .factory('Timer', ['$interval', '$window', function($interval, $window) {

    var Timer = function() {

      var self = this;

      self.ticked = function(){};

      self.currentState = 'Pomodoro';
      self.currentPomodoroCount = 1;
      var interval = false;

      var setTimeInMinutes = function(minutes){
        self.timeRemaining = 60 * minutes;
      };

      setTimeInMinutes(25);

      var stateTransitions = {
        'Pomodoro': function() {
          return (((self.currentPomodoroCount) % 4 == 0))
            ? 'Long Break'
            : 'Short Break';
        },
        'Short Break': function() {
          return 'Pomodoro';
        },
        'Long Break': function() {
          return 'Pomodoro';
        }
      };

      var enterState = {
        'Pomodoro': function() {
          self.currentState = 'Pomodoro';
          setTimeInMinutes(25);
        },
        'Short Break': function() {
          self.currentPomodoroCount++;
          self.currentState = 'Short Break';
          setTimeInMinutes(5);
        },
        'Long Break': function() {
          self.currentPomodoroCount++;
          self.currentState = 'Long Break';
          setTimeInMinutes(15);
        }
      };

      self.tick = function(){
        self.timeRemaining--;
        if (self.timeRemaining === 0)
          self.changeState();
      };

      self.changeState = function(){
        var nextState = stateTransitions[self.currentState]();
        $window.setTimeout(function() { $window.alert("Starting "+nextState); }, 0);
        enterState[nextState]();
      };

      self.start = function(){
        if (interval)
          $interval.cancel(interval);
        interval = $interval(self.tick, 1000);
      };

      self.stop = function(){
        if (interval)
          $interval.cancel(interval);
        interval = false;
      };
      
      self.toggle = function() {
        if (self.running())
          return self.stop();
        self.start();
      };

      self.running = function(){
        return interval;
      };   

      self.reset = function() {
        enterState[self.currentState]();
      };

    };

    return new Timer();
  }]);
