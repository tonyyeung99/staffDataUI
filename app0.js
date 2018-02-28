(function() {
  'use strict';

//   angular.module('StaffManagement',[])
//     .controller('StaffDataBrwCtrl', StaffDataBrwCtrl);
//
// StaffDataBrwCtrl.$inject = ['StaffEntityService'];
//     function StaffDataBrwCtrl($scope,StaffEntityService) {
//
//       $scope.initBrowsePage = function() {
//
//       }
//
//       // read all Staff
//       $scope.retrieveAll = function() {
//         StaffEntityService.retrieveAllStaffRecords($scope);
//       }
//     }

  angular.module('StaffManagement', ['ngMaterial', 'ngMessages', 'ui.router'])
    .controller('StaffDataCtrl', function($scope, $http, $stateParams, StaffEntityService) {


      $scope.staffRecords = {};


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


      // read all Staff
      $scope.retrieveAll = function() {

        console.log("retrieveAll called !!")
        $http.get('http://localhost:8080/staffs/').
        then(function(response) {
          $scope.staffRecords = response.data;
          console.log($scope.staffRecords)
          console.log("retrieveAll called Success!!")
        });
      }

      $scope.showUpdateStaffForm = function(staffId) {
        console.log("Staff id : " + staffId);
      }
      $scope.go = function(path) {
        $location.path(path);
      };
    })
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();

    })


  angular.module('StaffManagement')
    .config(RoutesConfig);

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



  angular.module('StaffManagement')
    .service('StaffEntityService', function($http) {

      this.addStaffRecord = function(staff) {
        var res = $http.post('http://localhost:8080/staffs', staff);
        res.success(function(data, status, headers, config) {
          console.log("Success!");
        });
        res.error(function(data, status, headers, config) {
          console.log("Failure!");
        });
      }

      this.retrieveAllStaffRecords = function($scope) {
        $http.get('http://localhost:8080/staffs/').
        then(function(response) {
          $scope.user = response.data;
        });
      }

      this.retrieveStaffRecord = function(staffId, $scope) {
        $http.get('http://localhost:8080/staffs/' + staffId).
        then(function(response) {
          $scope.user = response.data
        });
      }
    });

})();
