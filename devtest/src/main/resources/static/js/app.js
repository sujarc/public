(function(){

  var app = angular.module('notesApp',['ngRoute', 'ngMaterial']);

  app.config(['$locationProvider', '$routeProvider',
      function ($locationProvider, $routeProvider) {

        $routeProvider
          .when('/', {
            templateUrl: '/partials/notes-view.html',
            controller: 'notesController'
          })
          .when('/login', {
             templateUrl: '/partials/login.html',
             controller: 'loginController',
          })
          .otherwise('/');
      }
  ]);

  app.run(['$rootScope', '$location', 'AuthService', function ($rootScope, $location, AuthService) {
      $rootScope.$on('$routeChangeStart', function (event) {

          if ($location.path() == "/login"){
             return;
          }

          if (!AuthService.isLoggedIn()) {
              console.log('DENY');
              event.preventDefault();
              $location.path('/login');
          }
      });
  }]);


  app.service('AuthService', function($http){
        var loggedUser = null;

        function login (username, password){
            return $http.post("api/login", {username: username, password: password}).then(function(user){
                loggedUser = user;
            }, function(error){
                loggedUser = null;
            })
        }

        function isLoggedIn(){
            return loggedUser != null;
        }
        return {
            login : login,
            isLoggedIn: isLoggedIn
        }
  });

  app.controller('loginController', function($scope, AuthService, $location){

    $scope.invalidCreds = false;
    $scope.login = {
        username : null,
        password : null
    };

    $scope.login = function(){
        AuthService.login($scope.login.username, $scope.login.password).then(function(user){
            console.log(user);
            $location.path("/");
        }, function(error){
            console.log(error);
            $scope.invalidCreds = true;
        });
    };
  });


  app.controller('notesController', function($scope, $http){

    $scope.isEditCreateView = false;

    $scope.newNoteView = function(){
        $scope.isEditCreateView = true;
    };

    $scope.deleteNote = function (i) {
      var r = confirm("Are you sure you want to delete this note?");
      if (r == true){
        //TODO delete the note
      }
    };

    $scope.listNotes = function () {
    /*    return $http.get("api/notes", {user: $scope.login.username}).then(function(notes) {
            console.log("notes: " + notes);
            notes.forEach(note => {
                $scope.noteArray.push(note);
            });
        });*/
        $scope.noteArray = [
            {
                "noteSummary": "This is a note",
                "timedate": "12/11/39"
            },
            {
                "noteSummary": "This is a note",
                "timedate": "12/11/39"
            },
            {
                "noteSummary": "This is a note",
                "timedate": "12/11/39"
            },
            {
                "noteSummary": "This is a note",
                "timedate": "12/11/39"
            },
            {
                "noteSummary": "This is a note",
                "timedate": "12/11/39"
            },
            {
                "noteSummary": "This is a note",
                "timedate": "12/11/39"
            }];
    }

    $scope.viewNote = function(){
        //TODO

    }

    $scope.cancelNote = function () {
        $scope.isEditCreateView = false;
    }

    $scope.newNote = function (note) {
        var data = $.param({
            notes: note,
            user: $scope.login.username
        });
        return $http.post("api/notes", data).then(function(notes) {
            console.log("notes: " + notes);
        });
    }
  });

})();