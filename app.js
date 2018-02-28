(function() {
  'use strict';

  var app = angular.module('StaffManagement', ['ngMaterial', 'ngMessages', 'ui.router'])
  .controller('StaffDataCtrl', StaffDataCtrl)
  .controller('StaffDataBrwCtrl', StaffDataBrwCtrl)
  .service('StaffEntityService', StaffEntityService);


  StaffEntityService.$inject = ['$http'];
      function StaffEntityService($http) {
        var service = this;
        service.addStaffRecord = function(staff) {
          var res = $http.post('http://localhost:8080/staffs', staff);
          res.success(function(data, status, headers, config) {
            console.log("Success!");
          });
          res.error(function(data, status, headers, config) {
            console.log("Failure!");
          });
        }

        service.retrieveAllStaffRecords = function($scope) {
          $http.get('http://localhost:8080/staffs/').
          then(function(response) {
            console.log(response.data)
            $scope.staffRecords = response.data;
          });
        }

        service.retrieveStaffRecord = function(staffId, $scope) {
          $http.get('http://localhost:8080/staffs/' + staffId).
          then(function(response) {
            $scope.user = response.data
          });
        }
      };



  StaffDataBrwCtrl.$inject = ['StaffEntityService', "$scope"];
  function StaffDataBrwCtrl(StaffEntityService, $scope) {
    console.log("test 1a =" + $scope)
    console.log("test 1b =" + StaffEntityService)
    var brwCtrl = this;
    brwCtrl.initBrowsePage = function() {
      console.log("test 1");
      brwCtrl.retrieveAll();
    }

    // read all Staff
    brwCtrl.retrieveAll = function() {
      console.log("test 2");
      StaffEntityService.retrieveAllStaffRecords($scope);
    }
  }


  StaffDataCtrl.$inject = ['$scope', '$http', '$stateParams','StaffEntityService'];
  function StaffDataCtrl($scope, $http, $stateParams, StaffEntityService) {

    $scope.phoneTypes = ('work mobile home').split(' ').map(function(type) {
      return {
        abbrev: type
      };
    });

    $scope.initAddPage = function() {
      $scope.user = {};
      $scope.user.phoneNumbers = [];
    }

    $scope.initEditPage = function() {
      $scope.user = $scope.retrieve($stateParams.staffId, $scope);
    }

    $scope.addNewPhone = function() {
      $scope.user.phoneNumbers.push({
        'type': '',
        'number': ''
      });
    };

    $scope.removePhone = function() {
      var lastItem = $scope.user.phoneNumbers.length - 1;
      $scope.user.phoneNumbers.splice(lastItem);
    };


    $scope.addSubmit = function() {
      StaffEntityService.addStaffRecord($scope.user);

    };

    $scope.retrieve = function(staffId, $scope) {
      StaffEntityService.retrieveStaffRecord(staffId, $scope);
    };


    // // read all Staff
    // $scope.retrieveAll = function() {
    //
    //   console.log("retrieveAll called !!")
    //   $http.get('http://localhost:8080/staffs/').
    //   then(function(response) {
    //     $scope.staffRecords = response.data;
    //     console.log($scope.staffRecords)
    //     console.log("retrieveAll called Success!!")
    //   });
    // }

    $scope.showUpdateStaffForm = function(staffId) {
      console.log("Staff id : " + staffId);
    }
    $scope.go = function(path) {
      $location.path(path);
    };
  };

  app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  })


  app.config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider
      .otherwise('/brwStaff');

    $stateProvider
      .state('brwStaff', {
        url: '/brwStaff',
        templateUrl: 'brw_staff_template.html'
      }).state('addStaff', {
        url: '/addStaff',
        templateUrl: 'add_staff_template.html'
      }).state('edtStaff', {
        url: '/edtStaff/:staffId',
        templateUrl: 'edt_staff_template.html',
        controller: 'StaffDataCtrl'
      })
  }



})();
