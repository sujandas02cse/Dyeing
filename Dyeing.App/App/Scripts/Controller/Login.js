app.controller("LoginController", ["$scope", "$rootScope", "CommonFactory", function ($scope, $rootScope, CommonFactory) {
        
    $scope.submitForm = function () {
        CommonFactory.LoginCheck($scope.Login, function (response) {
            console.log("data", response);
            if (response.IsPermitted == true) {
                window.localStorage.setItem('UserId', $scope.Login.UserName);                
                window.localStorage.setItem('EmpName', response.Name);
                window.localStorage.setItem('Designation', response.Designation);

                window.location.pathname = 'Home/Index';
                //window.location.pathname = '/Angular/app/home.html';                
                
            } else {
                $scope.Msg = 'Please! Type Valid User ID and Password...';
            }
        });        
    }

    $scope.SendPassword = function (empCode) {
        //alert('dd')
        //alert(empCode)
        if (empCode != null) {
            CommonFactory.SendPassword(empCode, function (data) {
                //alert(angular.toJson(data));
                if (data.ErrorMsg == null) {
                    $scope.Msg = data.Msg;
                }
                else $scope.Msg = data.ErrorMsg;
            });
        }
        else {
            $scope.Msg = "Please Enter Username!!!";
        }

    }

    
    //function GetAccessToken() {
    //    alert($scope.Login.UserName)
    //    $http({ 
    //        method: 'POST',
    //        url: baseApiURL + 'Token', 
    //        data: $.param({ grant_type: 'password', username: $scope.Login.UserName, password: $scope.Login.PassWord })
    //      //  headers: {'Content-Type':'application/x-www-form-urlencoded'} 
    //    }).then(function successCallback(response) { 
            
    //        alert(response); 
        
    //    }, function errorCallback(response) {
    //        alert("Error To Get Token: " + response.data.ExceptionMessage);
    //    });
    //}
    // initializing the time Interval
    $scope.myInterval = 3000;

    // Initializing  slide rray  
    $scope.slides = [
        { image: '/Content/img/slider/1.jpg'},
        { image: '/Content/img/slider/2.jpg'},
        { image: '/Content/img/slider/3.jpg'},
        //{ image: '/Content/img/slider/4.jpg' },
        { image: '/Content/img/slider/5.jpg' },
        { image: '/Content/img/slider/6.jpg' }
    ];    

    $scope.prev = function () {
        alert('Previous')
    }
    $scope.next = function () {
        alert('Next')
    }
    $('.carousel-control.left').click(function () {
        debugger;
        $('#myCarousel').carousel('prev');
    });

    $('.carousel-control.right').click(function () {
        $('#myCarousel').carousel('next');
    });
    $scope.ClearMsg = function () {
        $scope.Msg = '';
    }
}]);

