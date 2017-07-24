var myApp = angular.module("myApp", ["ngRoute"]);
myApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/home.html"
        })
        .when("/list", {
            templateUrl: "views/list.html",
        })
        .when("/single/:id", {
            templateUrl: "views/single.html"
        })
        .when("/users", {
            templateUrl: "views/users.html"
        })
        .when("/user", {
            templateUrl: "views/user.html"
        })
});
myApp.controller('allGetController', function ($scope, $http, $location, $routeParams) {
    $http.get("http://localhost:3000/api/chirps")
        .then(function (response) {
            $scope.allChirps = response.data
        })



    $scope.insertdata = function () {
        console.log('clicked')
        $http.post("http://localhost:3000/api/chirps", { 'user': $scope.user, 'message': $scope.message })
            .success(function (data, status, headers, config) {
                $scope.user = ''
                $scope.message = ''

            });
        $http.get("http://localhost:3000/api/chirps")

            .then(function (response) {
                console.log('got')
                $scope.allChirps = response.data;
            })
    }
    $scope.deleteSingle = function (id) {
        $http.delete('/api/chirps/one/' + id)
            .success(function (data, status, headers, config) {
                $http.get("http://localhost:3000/api/chirps")
                    .then(function (response) {
                        $scope.allChirps = response.data;
                        console.log('deleted')
                    })
            });
    }
    $scope.goToSingle = function (id) {
        $http.get('/api/chirps/')
            .then(function () {
                $location.path('/single/' + id)
                id = ($location.path('/single/' + id))
            })
    }
});

myApp.controller('UserController', function ($scope, $http, $location, $routeParams) {
    $http.get("http://localhost:3000/api/users")
        .then(function (response) {
            $scope.allUsers = response.data
            console.log(response.data)

        })
    $scope.goToUser = function (user) {

        console.log('gotoworked')
        $http.get('/api/chirps/')
            .then(function () {
                $location.path('/user/' + user)
                console.log(user)
            })


    }

})
myApp.controller('oneUserController', function ($scope, $routeParams, $http, $location) {
    var currentUser = $routeParams.user;
    console.log(currentUser)
    $http.get("http://localhost:3000/api/chirps/user/" + currentUser)
        .then(function (response) {
            $scope.thisUser = response.data;
            console.log(response)
            console.log(response.data)
        })
})
myApp.controller('oneController', function ($scope, $routeParams, $http, $location) {
    var currentId = $routeParams.id;
    console.log(currentId)
    $http.get("http://localhost:3000/api/chirps/one/" + currentId)
        .then(function (response) {
            $scope.thisChirp = response.data;
            console.log(location.hash)
            console.log(response.data)
        })
    $scope.deleteSingle = function (id) {
    $http.delete('/api/chirps/one/' + id )

    .success(function (data, status, headers, config) {
            $http.get("http://localhost:3000/api/chirps")
                .then(function (response) {
                    console.log('working')
                    $location.path("/list/")
                })
        });
     }
});


