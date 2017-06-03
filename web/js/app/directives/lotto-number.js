angular.module('lottoApp')
    .directive('lottoNumber', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            numbers: '@',   // @ means one way binding from controller
            multiplier: '@',
            placeholder: '@'
        },
        templateUrl: function ($element, $attrs) {
            return $attrs.templateUrl || 'lotto/tickets/lotto-numbers.tpl.html'
        },
        link: function(scope, elm, attrs) {
            scope.editable = 'editable' in attrs;
        }
    }
});