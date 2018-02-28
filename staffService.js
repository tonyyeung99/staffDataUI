(function() {
    'use strict';

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

        this.retrieveAllStaffRecords = function() {
          $http.get('http://localhost:8080/staffs/').
          then(function(response) {
            return response.data;
          });
        }

        this.retrieveStaffRecord = function(staffId) {
          $http.get('http://localhost:8080/staffs/' + staffId).
          then(function(response) {
            return response.data;
          });
        }


      });
  });
