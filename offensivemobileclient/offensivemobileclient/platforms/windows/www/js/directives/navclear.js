angular.module('offensiveapp')
.directive('navClear', ['$ionicViewService', function($ionicViewService) {
    return {
        restrict: 'AC',
        link: function($scope, $element, $attr) {
            $element.bind('click', function(){
                $ionicViewService.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
            });
        }
    };
}]);