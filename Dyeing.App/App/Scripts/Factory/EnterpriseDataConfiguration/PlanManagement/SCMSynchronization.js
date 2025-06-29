app.factory("SCMSynchronization", [
  "$http",
  function($http) {
    var _obj = {};

    _obj.GetBatchNo = function(cb) {
      debugger;
      $http.get(baseApiURL + "PlanManagement/GetSCMIssuedBatchNo").then(
        function successCallback(response) {
          /*  $http.get(baseApiURL + 'BatchWiseGSM/GetBatchNo').then(function successCallback(response) {*/

          cb(response.data);
        },
        function errorCallback(response) {
          alert("Error Occured during Loading Batch No....");
        }
      );
    };

    _obj.SCMSynchronization_Save = function(obj, cb) {
      $http
        .post(baseApiURL + "PlanManagement/SCMSynchronization_Save", obj)
        .then(
          function successCallback(response) {
            cb(response.data);
          },
          function errorCallback(response) {
            alert("Error Occured during Data Processing....");
          }
        );
    };

    return _obj;
  }
]);
