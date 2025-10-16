var app = angular.module('MascoDyeing', ["ngRoute", "ngMaterial", "md.time.picker",
    //'long2know',
    'ngSanitize',
    'ui.bootstrap',
    'ui.bootstrap.typeahead',
    'ui.router',
    'ngRoute',
    /*'numeric-keyboard',*/
    //'ui.multiselect',
    //'angularjs-autocomplete',
    //'angularjs-dropdown-multiselect',
    'angular-virtual-keyboard',
    
    'ngAnimate',
    'ngPrint',
    //'ui.select',    
    'angularjs-dropdown-multiselect',
    //'ui.select2',
    'ui']);

app.config(['VKI_CONFIG', function (VKI_CONFIG) {
    VKI_CONFIG.layout.Numpad = {
        'name': "Numpad", 'keys': [
            [["1", '1'], ["2", "2"], ["3", "3"], ["Bksp", "Bksp"]],
            [["4", "4"], ["5", "5"], ["6", '6'], ["Enter", "Enter"]],
            [["7", "7"], ["8", "8"], ["9", "9"], [".","."]],
            [["0", "0"], ["-"], ["+"], ["R"]]
        ], 'lang': ["pt-BR-num"]
    };
}]);

app.run(function ($rootScope, $templateCache, $mdDialog, $mdToast, $anchorScroll) {
    //$rootScope.$on('$viewContentLoaded', function () {

    //Form Action Button
    $rootScope.btnSave = "Save";
    $rootScope.btnRefresh = "Refresh";
    $rootScope.btnPreview = "Preview";
    $rootScope.btnPreviewShow = false;
    $rootScope.btnPrint = "Print";
    $rootScope.btnPrintShow = false;
    $rootScope.btnClose = "Close";
  

    //Report Action Button
    $rootScope.btnWordView = " Word";
    $rootScope.btnExcelView = " Excel";
    $rootScope.btnPDFView = " PDF";
    $rootScope.btnRefresh = "Refresh";
    $rootScope.btnClose = "Close";

    $rootScope.menu = true;

    $rootScope.UserId = window.localStorage.getItem('UserId');
    $rootScope.EmpName = window.localStorage.getItem('EmpName');
    $rootScope.Designation = window.localStorage.getItem('Designation');

    $rootScope.keyPressHandler = function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
    //$rootScope.$on('$viewContentLoaded', function () {
    //    alert('ll')
    //    $templateCache.removeAll();
    //});

    //$rootScope.$on('$routeChangeStart', function (event, next, current) {
        
    //    if (typeof (current) !== 'undefined') {
    //        $templateCache.remove(current.templateUrl);            
    //    }
    //});

   // $templateCache.removeAll();
    $rootScope.Close = function () {
        window.location.href = '/Home/Index';
    };
    //$rootScope.Refresh = function () {
    //    window.location.reload();
    //};

    $rootScope.alert = function (msg) {
        $mdDialog.show(
        $mdDialog.alertMessage({
            locals: {
                model: { 'message': msg }
            }            
        }))
    }

    $rootScope.showAlert = function (msg) {
        $mdDialog.show({
            //$mdDialog.alertMessage({
            //locals: {
            //    model: { 'message': msg }
            //}
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            template: `<md-dialog aria-label="Confirmation Dialog" class="_md md-transition-in" role="dialog" tabindex="-1" aria-describedby="dialogContent_0" style="">
                <md-toolbar class="_md _md-toolbar-transitions">
                    <div class="md-toolbar-tools">
                        <h5 style="margin-left:33%;margin-top:3%;" class="ng-binding">Update Confirmation</h5>
                        <span flex="" class="flex"></span>
                        <button class="md-icon-button md-button md-ink-ripple" type="button" ng-transclude="" aria-label="Cancel" ng-click="cancel()">
                            <img src="../../Content/img/close_icon.png" height="15" width="20" style="margin-top:9%;margin-left:1%" class="ng-scope">
                        </button>
                    </div>
                </md-toolbar>

                <md-dialog-content id="dialogContent_0">
                    <div class="md-dialog-content">
                        <p style="text-align:center;margin-bottom: 0%;margin-top: 2%; font-size:14px;"><strong class="ng-binding">`+msg+` </strong></p>
                    </div>
                </md-dialog-content>

                <md-dialog-actions layout="row" class="layout-row">
                        <span flex="" class="flex"></span>
                        <button class="md-raised md-primary md-button md-ink-ripple" type="button" ng-transclude="" aria-label="Yes" ng-click="action(model.Mode)">Yes</button>
                        <button class="md-raised md-warn md-button md-ink-ripple" type="button" ng-transclude="" aria-label="No" ng-click="cancel()">No</button>

                </md-dialog-actions>
            </md-dialog>`,
            locals: {

            },
            controller: DialogController
            //})
        })
    }
    //$rootScope.confirm = function (msg) {
    //    $mdDialog.show(
    //    $mdDialog.confirmDialog({
    //        locals: {
    //            model: { 'message': msg }
    //        }
    //    }))
    //}

    //$rootScope.Toast = function (msg) {
    //    $mdToast.show($mdToast.customToast({ locals: { message: msg } }));
    //}
    $rootScope.getSelectedInfo = function (eId, srcValue, aName) {
        var selectedId = angular.element(eId).find('option[value="' + srcValue + '"]').attr(aName);
        return selectedId;
    }
    //$rootScope.valid = function (msg) {
    //    $mdToast.show($mdToast.customValid({ locals: { message: msg } }));
    //}
    $anchorScroll.yOffset = 500;


    let loaderVisible = false;

    $rootScope.ShowLoader = function (message = "Please wait...") {
        if (loaderVisible) return; // prevent multiple loaders
        loaderVisible = true;

        $mdDialog.show({
            templateUrl: '/App/template/Loader/GlobalLoader.html?ts=' + new Date().getTime(),
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            escapeToClose: false,
            hasBackdrop: true,
            locals: { message: message },
            controller: function ($scope, $mdDialog, message) {
                $scope.message = message;
            }
        });
    };

    $rootScope.HideLoader = function () {
        if (!loaderVisible) return;
        loaderVisible = false;
        $mdDialog.hide();
    };
});

app.directive("readText", function () {
    return {
        link: function ($scope, el) {
            el.bind("change", function (e) {
                $scope.file = (e.srcElement || e.target).files[0];
                $scope.getTextFile();
            });
        }
    };
});
app.directive('ngConfirmClick', [
    function () {
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click', function (event) {
                    if (window.confirm(msg)) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }]);


app.directive('typeaheadDblClickOpen', function ($parse, $timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function ($scope, elem, attrs) {
            triggerFunc = function (evt) {
                var ctrl = elem.controller('ngModel'),
                    prev = ctrl.$modelValue || '';
                if (prev) {
                    ctrl.$setViewValue('');
                    $timeout(function () {
                        ctrl.$setViewValue(prev);
                    });
                } else {
                    ctrl.$setViewValue(' ');
                }
            }
            elem.bind('dblclick', triggerFunc);
        }
    }
});
app.directive('typeaheadOpenOnFocus', function ($timeout) {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            element.bind('click', function () {
                var vv = ctrl.$viewValue;
                //ctrl.$setViewValue(vv ? vv + ' ' : ' ');
                $timeout(function () { ctrl.$setViewValue(vv ? vv : ''); }, 10)
            });
        }
    };
});
app.directive('onModelChange', function ($parse) {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function (scope, elem, attrs, ctrl) {
            scope.$watch(attrs['ngModel'], function (newValue, oldValue) {
                if (typeof (newValue) === "undefined" || newValue == oldValue) {
                    return;
                }
                var changeExpr = $parse(attrs['onModelChange']);
                if (changeExpr) {
                    changeExpr(scope);
                }
            });
        }
    };
});
app.directive('autoFocus', function ($timeout) {
    return {
        restrict: 'AC',
        link: function (_scope, _element) {
            $timeout(function () {
                _element[0].focus();
            }, 0);
        }
    };
});
app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
app.directive('myKeypress', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) return '';
                var transformedInput = inputValue.replace(/[^0-9.]/g, '');
                if (transformedInput !== inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    };
});
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown, keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});
app.directive('onReadFile', function ($parse) {
    return {
        restrict: 'A',
        scope: {
            onReadFile: "&"
        },
        link: function (scope, element, attrs) {
            element.on('change', function (e) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    scope.$apply(function () {
                        scope.onReadFile({ $content: e.target.result });
                    });
                };
                reader.readAsText((e.srcElement || e.target).files[0]);
            });
        }
    };
});
app.filter('range', function () {
    return function (input, min, max) {
        min = parseInt(min); //Make string input int
        max = parseInt(max);
        for (var i = min; i < max; i++)
            input.push(i);
        return input;
    };
});


app.filter('round', function () {
    return function (input) {
        var multiplier = Math.pow(10, 2 || 0);
        return Math.round(input * multiplier) / multiplier;
    };
});
app.filter('chunk', function () {
    function cacheIt(func) {
        var cache = {};
        return function (arg) {
            // if the function has been called with the argument
            // short circuit and use cached value, otherwise call the
            // cached function with the argument and save it to the cache as well then return
            return cache[arg] ? cache[arg] : cache[arg] = func(arg);
        };
    }

    function chunk(items, chunk_size) {
        var chunks = [];
        if (angular.isArray(items)) {
            console.log(chunk_size);
            if (isNaN(chunk_size))
                chunk_size = 6;
            for (var i = 0; i < items.length; i += chunk_size) {
                chunks.push(items.slice(i, i + chunk_size));
            }
        } else {
            console.log("items is not an array: " + angular.toJson(items));
        }
        return chunks;
    }

    return cacheIt(chunk);
});

app.directive('contenteditable', function () {
    return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) return; // do nothing if no ng-model

            // Specify how UI should be updated
            ngModel.$render = function () {
                element.html(ngModel.$viewValue || '');
            };

            // Listen for change events to enable binding
            element.on('blur keyup change', function () {
                scope.$apply(read);
            });
            read(); // initialize

            // Write data to the model
            function read() {
                var html = element.html();
                // When we clear the content editable the browser leaves a <br> behind
                // If strip-br attribute is provided then we strip this out
                if (attrs.stripBr && html == '<br>') {
                    html = '';
                }
                ngModel.$setViewValue(html);
            }
        }
    };
});

app.directive("select2", function ($timeout, $parse) {
    return {
        restrict: 'AC',
        require: 'ngModel',
        link: function (scope, element, attrs) {
            $timeout(function () {
                element.select2();
                element.select2Initialized = true;
            });

            var refreshSelect = function () {
                if (!element.select2Initialized) return;
                $timeout(function () {
                    element.trigger('change');
                });
            };

            var recreateSelect = function () {
                if (!element.select2Initialized) return;
                $timeout(function () {
                    element.select2('destroy');
                    element.select2();
                });
            };

            scope.$watch(attrs.ngModel, refreshSelect);

            if (attrs.ngOptions) {
                var list = attrs.ngOptions.match(/ in ([^ ]*)/)[1];
                // watch for option list change
                scope.$watch(list, recreateSelect);
            }

            if (attrs.ngDisabled) {
                scope.$watch(attrs.ngDisabled, refreshSelect);
            }
        }
    };
});

app.directive("nextFocus", function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind('keydown', function (e) {
                var code = e.keyCode || e.which;
                if (code === 13) {
                    try {
                        if (attrs.tabindex != undefined) {
                            var currentTabIndex = attrs.tabindex;
                            var nextTabIndex = parseInt(attrs.tabindex) + 1;
                            $("[tabindex=" + nextTabIndex + "]").focus();
                        }
                    } catch (e) {

                    }
                }
            });
        }
    };
    
});
