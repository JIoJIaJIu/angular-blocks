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
    // https://docs.angularjs.org/error/$injector/modulerr
    if (arguments[0] === 'ng')
        return angularModule.apply(angular, arguments);

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
        var m = ensure(blocks, module.name, Object);
        m[name] = {
            fn: constructor,
            props: props
        }
    }

    module.directive('block', [ '$injector', '$compile', function ($injector, $compile) {
        return {
            rectrict: 'E',
            priority: 1000,
            terminal: true,
            replace: true,
            scope: {
                data: '=?init'
            },

            template: function ($element, $attrs) {
                var block = getBlockByName($attrs.block);

                return block.props.template;
            },

            compile: function () {
                var block;

                return {
                    pre: function ($scope, $element, $attrs) {
                        block = getBlockByName($attrs.block);
                    },

                    post: function ($scope, $element, $attrs) {
                        $element.removeAttr('block');
                        $compile($element)($scope);
                    }
                }
            }
        }

        function getBlockByName (name) {
            try {
                return blocks[module.name][name];
            } catch (e) {
                throw new Error('Couldn\'t get block constructor, module:', module.name, 'block name:', name, '\n', e);
            }
        }

    }]);


    return module;
}

})(window);
