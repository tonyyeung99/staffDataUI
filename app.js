(function () {
'use strict';

angular.module('inputBasicDemo', ['ngMaterial', 'ngMessages'])
.controller('StaffDataCtrl', function($scope, $http) {
    $scope.user = {
      staffName: {
        first: "",
        last: ""
      },
      title: '',
      div: '',
      dept: '',
      office: '',
      email: '',
      phoneNumbers: [{
        type: "",
        number: ""
      }]
    };


    $scope.phoneTypes = ('work mobile home').split(' ').map(function(type) {
        return {abbrev: type};
      });

    $scope.addNewPhone = function() {
        $scope.user.phoneNumbers.push({'type':'', 'number':''});
    };

    $scope.removePhone = function() {
        var lastItem = $scope.user.phoneNumbers.length-1;
        $scope.user.phoneNumbers.splice(lastItem);
    };


    $scope.submit = function() {
      console.log("submit pressed!!")
      console.log($scope.user)
      var res = $http.post('http://localhost:8080/staffs', $scope.user);
  		res.success(function(data, status, headers, config) {
  			// $scope.message = data;
        console.log("Success!");
        console.log(data);
  		});
  		res.error(function(data, status, headers, config) {
        console.log("Failure!");
        console.log(data)
        console.log(status)
        console.log(headers)
  			// alert( "failure message: " + JSON.stringify({data: data}));
  		});
    };

    $scope.retrieve = function() {
      console.log("retrieve pressed!!")
      $http.get('http://localhost:8080/staffs/5a8e3fd1b2d287728d4ff243').
      then(function(response) {
          $scope.user = response.data;
          console.log($scope.user);
      });
    };

  })
  .config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();
  });
})();
