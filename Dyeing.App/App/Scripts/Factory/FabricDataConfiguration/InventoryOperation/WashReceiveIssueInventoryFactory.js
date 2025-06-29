app.factory("WashReceiveIssueInventory", ['$http', function ($http) {
    var _obj = {};

    _obj.GetTrackingNo = function (cb) {       
        $http.get(baseApiURL + 'WashReceiveIssueInventory/GetTrackingNo').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Tracking No Information....");
        });
    }

    _obj.GetBuyer = function (cb) {        
        $http.get(baseApiURL + 'WashReceiveIssueInventory/GetBuyer').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Buyer Information....");
        });
    }

    _obj.GetJob = function (BuyerId,cb) {        
        $http.get(baseApiURL + 'WashReceiveIssueInventory/GetJob?BuyerId=' + BuyerId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Job Information....");
        });
    }

    _obj.GetOrder = function (BuyerId, JobNo, cb) {        
        $http.get(baseApiURL + 'WashReceiveIssueInventory/GetOrder?BuyerId=' + BuyerId + '&JobNo=' + JobNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Order Information....");
        });
    }

    _obj.GetColor = function (BuyerId, JobNo,OrderNo, cb) {        
        $http.get(baseApiURL + 'WashReceiveIssueInventory/GetColor?BuyerId=' + BuyerId + '&JobNo=' + JobNo + '&OrderNo=' + OrderNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Load Color Information....");
        });
    }
  
    _obj.GetDataInfo = function (TrackingNo,cb) {      
        $http.get(baseApiURL + 'WashReceiveIssueInventory/GetDataInfo?TrackingNo=' + TrackingNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Data....");
        });       
    }

    _obj.GetDataInfoOth = function (BuyerId, JobId, OrderId, ColorId, cb) {
        debugger
        $http.get(baseApiURL + 'WashReceiveIssueInventory/GetDataInfoOth?BuyerId=' + BuyerId + '&JobId=' + JobId + '&OrderId=' + OrderId + '&ColorId=' + ColorId ).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Data....");
        });
    }

    _obj.GetUnitId = function (TrackingNo, cb) {        
        $http.get(baseApiURL + 'WashReceiveIssueInventory/GetUnitId?TrackingNo=' + TrackingNo).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Unit Data....");
        });
    }

    _obj.GetUnitIdOth = function (BuyerId, JobId, OrderId, ColorId, cb) {       
        $http.get(baseApiURL + 'WashReceiveIssueInventory/GetUnitIdOth?BuyerId=' + BuyerId + '&JobId=' + JobId + '&OrderId=' + OrderId + '&ColorId=' + ColorId).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Unit Data....");
        });
    }

    _obj.GetDispatchList = function (cb) {
        $http.get(baseApiURL + 'WashReceiveIssueInventory/GetDispatchList').then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Loading Dispatch Data....");
        });
    }

    _obj.WashReceiveIssueInventory_SaveUpdate = function (Model, cb) {       
        $http.post(baseApiURL + 'WashReceiveIssueInventory/WashReceiveIssueInventory_SaveUpdate', Model).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Data Processing....");
        });
    }   

    _obj.Dispatch_SaveUpdate = function (DispatchData, cb) {       
        $http.post(baseApiURL + 'WashReceiveIssueInventory/Dispatch_SaveUpdate', DispatchData).then(function successCallback(response) {
            cb(response.data);
        }, function errorCallback(response) {
            alert("Error Occured during Dispatch Save Data Processing....");
        });
    }   

   
    return _obj;
}]);