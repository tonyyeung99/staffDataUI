(function () {
'use strict';

angular.module('inputBasicDemo', ['ngMaterial', 'ngMessages', 'ui.router'])
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

    $scope.staffRecords = {};


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



    // read all Staff
    $scope.retrieveAll = function(){

        console.log("retrieveAll called !!")
        $http.get('http://localhost:8080/staffs/').
        then(function(response) {
            $scope.staffRecords = response.data;
            console.log($scope.staffRecords )
            console.log("retrieveAll called Success!!")
        });
    }

    $scope.showUpdateStaffForm = function(staffId){
      console.log("Staff id : " + staffId);
    }
    $scope.go = function ( path ) {
      $location.path( path );
    };
  })
  .config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  })

  angular.module('inputBasicDemo')
  .controller('EdtStaffDataCtrl', function( $scope, $stateParams, $http) {
    console.log("staffID from $stateParams :" + $stateParams.staffId)


    $scope.retrieve = function(staffId) {
      console.log("retrieve pressed!!")
      $http.get('http://localhost:8080/staffs/' + staffId).
      then(function(response) {
          $scope.user = response.data;
          console.log($scope.user);
      });
    };
    $scope.user = $scope.retrieve($stateParams.staffId);
  })

  angular.module('inputBasicDemo')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider){

    $urlRouterProvider
    .otherwise('/brwStaff');

    $stateProvider
    .state('brwStaff', {
      url : '/brwStaff',
      templateUrl: 'brw_staff_template.html'
    }).state('addStaff', {
      url : '/addStaff',
      templateUrl: 'add_staff_template.html'
    }).state('edtStaff', {
      url : '/edtStaff/:staffId',
      templateUrl: 'edt_staff_template.html',
      controller : 'EdtStaffDataCtrl'
    })
  }



})();
