/**
 * @license Angular-blocks
 * (c) 2015
 * License: MIT
 */

/**
 * module.block('blockName', function () {}, props);
 *
 **/
(function (window, undefined) {

var angularModule = angular.module;
var blocks = {};

angular.module = angularDecorator;

function ensure(obj, name, factory) {
    return obj[name] || (obj[name] = factory());
}

function angularDecorator () {
    if (arguments.length === 1)
        return angularModule.apply(angular, arguments);

    var module = angularModule.apply(angular, arguments);

    /**
     * @param {String} name - name of block, block="checkbox"
     * @param {Function} constructor
     * @param {Object} props
     *   @key {String} template - html template string
     */
    module.block = function moduleBlock (name, constructor, props) {
        ensure(blocks, name, constructor);
    }

    return module;
}

angular.module('ng').directive('block', [ '$injector', '$parse', function ($injector) {
    return {
        rectrict: 'A',
        priority: 1000,
        terminate: true,
        scope: {
            data '=?init'
        },
        compile: {
            pre: function ($scope, $element, $attrs) {
                console.log('xxx');
            },

            post: function ($scope, $element, $attrs) {
            }
        }
    }

}]);

})(window);
