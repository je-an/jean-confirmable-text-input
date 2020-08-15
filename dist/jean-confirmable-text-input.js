(function (root, factory) { 
 	 if (typeof define === 'function' && define.amd) { 
	 	 define([], factory); 
	} else { 
	 	root.ConfirmableTextInput = root.ConfirmableTextInput || {}; 
	 	root.ConfirmableTextInput = factory();
	}
}(this, function() {
var require, define;
(function (window) {
    var modules = { resolved: {}, unresolved: {} };
    function getResolvedModules(dependencies) {
        for (var i = 0, resolvedModules = []; i < dependencies.length; i++) {
            var resolvedModule = modules.resolved[dependencies[i]];
            if (resolvedModule) {
                resolvedModules.push(resolvedModule);
            }
        }
        return resolvedModules;
    }
    function checkUnresolved() {
        for (var id in modules.unresolved) {
            var module = modules.unresolved[id];
            var resolvedModules = getResolvedModules(module.dependencies);
            resolve(id, module.factory, module.dependencies, resolvedModules, false);
        }
    }
    function resolve(id, factory, dependencies, resolvedModules, saveUnresolved) {
        if (resolvedModules.length === dependencies.length) {
            var mod = factory.apply(factory, resolvedModules);
            modules.resolved[id] = mod ? mod : {};
        } else if (saveUnresolved) {
            modules.unresolved[id] = {
                dependencies: dependencies,
                factory: factory
            }
        }
    }
    define = function (id, dependencies, factory) {
        if (modules.resolved[id]) {
            console.warn("There is already a module with id <" + id + "> defined. Therefore this module will be ignored");
            return;
        } else if ((typeof id !== "string") || (!Array.isArray(dependencies)) || (typeof factory !== "function")) {
            console.warn("Passed arguments for module are invalid");
            return;
        }
        if (dependencies.length === 0) {
            resolve(id, factory, dependencies, [], false);
        } else {
            resolve(id, factory, dependencies, getResolvedModules(dependencies), true);
        }
        checkUnresolved();
    };
    define.amd = {}; 
    require = function (dependencies, factory) {
        dependencies = Array.isArray(dependencies) ? dependencies : [dependencies];
        var resolvedModules = getResolvedModules(dependencies);
        if(resolvedModules.length === 1 && !factory){
            return resolvedModules[0];
        }
        if (resolvedModules.length === dependencies.length && factory) {
            factory.apply(factory, resolvedModules);
        } else {
            throw new Error("Not all modules are resolved");
        }
    };
})();
define("node_modules/jean-amd/dist/jean-amd", function(){});

define('TypeCheck',[], function () {
    return {
        /**
         * Checks if provided element type is string
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is string, false otherwise
         */
        isString: function (o) {
            return (typeof o === "string") ? true : false;
        },
        /** 
         * Checks if provided element type is boolean
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is boolean, false otherwise
         */
        isBoolean: function (o) {
            return (typeof o === "boolean") ? true : false;
        },
        /**
         * Checks if provided element type is boolean
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is boolean, false otherwise
         */
        isNumber: function (o) {
            return (typeof o === "number") ? true : false;
        },
        /**
         * Checks if provided element is an object
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is empty, false otherwise
         */
        isObject: function (o) {
            return !this.isArray(o) && o !== null && typeof o === 'object';
        },
        /**
         * Checks if provided element is an empty object
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is empty, false otherwise
         */
        isEmptyObject: function (o) {
            var isEmpty = false;
            if (this.isObject(o) && Object.keys(o).length === 0) {
                isEmpty = true;
            }
            return isEmpty;
        },
        /**
        * Checks if provided element is a function
        * @public
        * @memberof TypeCheck
        * @param {Any} o - element to be checked
        * @returns {Boolean} True, if element is a function, false otherwise
        */
        isFunction: function (o) {
            return (typeof o === "function") ? true : false;
        },
        /**
         * Checks if provided element is defined
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is defined, false otherwise
         */
        isDefined: function (o) {
            return (o !== undefined && o != null);
        },
        /**
         * Checks if provided element is an array
         * @public 
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} - true if o is an array, false otherwise
         */
        isArray: function (o) {
            return Array.isArray(o);
        },
        /**
         * Check id provided element is an empty array
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} - True if o is an empty array, false otherwise
         */
        isEmptyArray: function (o) {
            return this.isArray(o) && (o.length === 0);
        },
        /**
         * Checks if all elements in this array have the same type
         * @public
         * @memberof TypeCheck
         * @throws {TypeError} - If options.type is not a string
         * @throws {TypeError} - If options.array is not a string
         * @param {Any[]} array - Array to be checked
         * @param {String} type - Type of elements in this array. Valid values are all which matches 
         *                        to the typeof operator
         * @returns {Boolean} - true if all elements in the array have the same type, false otherwise
         */
        isArrayTypeOf: function (array, type) {
            var isTypeOf = true;
            if (!this.isString(type)) {
                throw new TypeError("options.type is not a string");
            }
            if (!Array.isArray(array)) {
                throw new TypeError("options.array is not an array");
            }
            if (array.length === 0) {
                isTypeOf = false;
            }
            for (var i = 0, length = array.length; i < length; i++) {
                var o = array[i];
                if (typeof o !== type) {
                    isTypeOf = false;
                    break;
                }
            }
            return isTypeOf;
        },
        /**
          * Checks if all objects within array have the same instance
          * @public
          * @memberof TypeCheck
          * @throws {TypeError} - If array is not an array
          * @throws {TypeError} - If constructor is not a function
          * @param {Object[]} array - The array which objects shall be checked
          * @param {Function} fn - the constructor function
          * @returns {Boolean} - True if all elements have the same instance, false otherwise
          */
        areObjectsInstanceOf: function (array, fn) {
            if (!this.isArray(array)) {
                throw new TypeError("array is not an array");
            }
            if (!this.isFunction(fn)) {
                throw new TypeError("fn is not a function");
            }
            var i, o, length = array.length, result = true;
            for (i = 0; i < length; i++) {
                o = array[i];
                if (!this.isObject(o) || !this.isInstanceOf(o, fn)) {
                    result = false;
                    break;
                }
            }
            return result;
        },
        /**
         * Checks if the objects have are instances of the provided constructors
         * @public
         * @memberof TypeCheck
         * @throws {TypeError} - If array is not an array
         * @throws {TypeError} - If constructors is not an array
         * @param {Object[]} objects - The array which objects shall be checked
         * @param {Function[]} constructors - An array of constructor functions
         * @returns {Boolean} - True if all elements have the same instance, false otherwise
         */
        areObjectsInstancesOf: function (objects, constructors) {
            var i, j, o, length = objects.length, constructorLength = constructors.length, result = true, noConstructorMatched;
            if (!this.isArray(objects)) {
                throw new TypeError("objects is not an array");
            }
            if (!this.isArray(constructors)) {
                throw new TypeError("constructors is not an array");
            }
            if (!this.isArrayTypeOf(constructors, "function")) {
                throw new TypeError("constructors is not an array of constructor functions");
            }
            for (i = 0; i < length; i++) {
                o = objects[i];
                noConstructorMatched = true;
                for (j = 0; j < constructorLength; j++) {
                    if (!this.isObject(o)) {
                        break;
                    }
                    if (this.isInstanceOf(o, constructors[j])) {
                        noConstructorMatched = false;
                        break;
                    }
                }
                if (noConstructorMatched === true) {
                    result = false;
                    break;
                }
            }
            return result;
        },
        /**
         * Checks if child is an instance of parent
         * @public
         * @memberof TypeCheck
         * @throws {TypeError} - If child is not an object
         * @throws {TypeError} - If parent is not a function
         * @param {Object} child - The object which shall be checked
         * @param {Function} parent - The function which shall be the constructor
         * @returns {Boolean} - True if child is an instance of parent, false otherwise
         */
        isInstanceOf: function (child, parent) {
            if (!this.isObject(child)) {
                throw new TypeError("child is not an object");
            }
            if (!this.isFunction(parent)) {
                throw new TypeError("parent is not a function");
            }
            return child instanceof parent;
        },
        /**
         * Checks if the provided value is a value of the provided object which is used as an enum
         * @throws {TypeError} - If value is not a string or a number
         * @throws {TypeError} - If o is not an object
         * @param {String|Number} value - the value
         * @param {Object} o - the object which shall be checked
         * @returns {Boolean} - True if value is part of o, false otherwise
         */
        isEnumValue: function (value, o) {
            if (!this.isDefined(value)) {
                return false;
            }
            if (!this.isString(value) && !this.isNumber(value)) {
                throw new TypeError("value must be a String or a Number");
            }
            if (!this.isObject(o)) {
                throw new TypeError("o is not an object");
            }
            var keys = Object.keys(o), length = keys.length, i, isValue = false;
            for (i = 0; i < length; i++) {
                if (o[keys[i]] === value) {
                    isValue = true;
                    break;
                }
            }
            return isValue;
        }
    };
});
define('Failure',[], function () {
    /**
     * Provides error throwing functionality 
     * @alias Failure 
     */
    return {
        /**
         * Throws an Error with the provided errorMessage
         * @throws {Error}
         * @param {String} [errorMessage=String.Empty] - Message which shall be displayed for this Error
         */
        throwError: function (errorMessage) {
            throw new Error(errorMessage);
        },
        /**
         * Throws an TypeError with the provided errorMessage
         * @throws {TypeError}
         * @param {String} [errorMessage=String.Empty] - Message which shall be displayed for this TypeError
         */
        throwTypeError: function (errorMessage) {
            throw new TypeError(errorMessage);
        }
    };
});
define('DomUtil',["TypeCheck", "Failure"], function (TypeCheck, Failure) {
    /**
     * Provides utility functions for DOM elements 
     * @alias DomUtil 
     */
    return {
        /**
        * @throws {TypeError} - if html is not a string
        * @param {String} html - the html markup 
        * @returns {HTMLElement} - the created DOM element
        */
        createElementFromMarkup: function (html) {
            if (!TypeCheck.isString(html)) {
                Failure.throwTypeError("html is not a string");
            }
            var div = document.createElement('div');
            div.innerHTML = html.trim();
            return div.firstChild;
        },
        /**
         * @param {HTMLElement} element - the element which shall be checked
         * @returns {Boolean} - True if element is within the viewport, false otherwise
         */
        isInViewPort: function (element) {
            if (!TypeCheck.isInstanceOf(element, HTMLElement)) {
                Failure.throwTypeError("element is not an instance of HTMLElement");
            }
            var bounds = element.getBoundingClientRect(), isInViewPort = ((bounds.top + bounds.height) > 0) && bounds.top < window.innerHeight;
            return isInViewPort;
        },
        /**
         * gets the child for the matched id
         * @param {HTMLElement} element - the element which childs shall be searched
         * @param {String} id - the id of the child which shall be found
         * @returns {HTMLElement|null} - the matched element or null if no element is found for the
         *                               provided id 
         */
        getChildById: function (element, id) {
            if (!TypeCheck.isInstanceOf(element, HTMLElement)) {
                Failure.throwTypeError("element is no instance of HTMLElement");
            }
            if (!TypeCheck.isString(id)) {
                Failure.throwTypeError("id is not a string");
            }
            var i, childs = element.children, length = childs.length, child, result = null;
            for (i = 0; i < length; i++) {
                child = childs[i];
                if (child.id === id) {
                    return child;
                }
            }
            for (i = 0; i < length; i++) {
                result = this.getChildById(childs[i], id);
                if (TypeCheck.isDefined(result)) {
                    return result;
                }
            }
            return null;
        },
        /**
         * Gets the first child for the matched class
         * @param {HTMLElement} element - the element which childs shall be searched
         * @param {String} className - the class name of the child which shall be found
         * @returns {HTMLElement|null} - the matched element or null if not element is found
         *                               for the provided class name
         */
        getChildByClass: function (element, className) {
            if (!TypeCheck.isInstanceOf(element, HTMLElement)) {
                Failure.throwTypeError("element is no instance of HTMLElement");
            }
            if (!TypeCheck.isString(className)) {
                Failure.throwTypeError("className is not a string");
            }
            var i, childs = element.children, length = childs.length, child, result = null;
            for (i = 0; i < length; i++) {
                child = childs[i];
                if (child.classList.contains(className)) {
                    return child;
                }
            }
            for (i = 0; i < length; i++) {
                result = this.getChildByClass(childs[i], className);
                if (TypeCheck.isDefined(result)) {
                    return result;
                }
            }
            return null;
        },
        /**
         * Gets the first ancestor for the matched id
         * @param {HTMLElement} element - the element which ancestors shall be searched
         * @param {String} id - the id of the ancestor which shall be found
         * @returns {HTMLElement|null} - the matched element or null if no element is found for the
         *                               provided id 
         */
        getAncestorById: function (element, id) {
            if (!TypeCheck.isInstanceOf(element, HTMLElement)) {
                Failure.throwTypeError("element is no instance of HTMLElement");
            }
            if (!TypeCheck.isString(id)) {
                Failure.throwTypeError("id is not a string");
            }
            if (!TypeCheck.isDefined(element.parentElement)) {
                return null;
            }
            if (element.parentElement.id === id) {
                return element.parentElement;
            } else {
                return this.getAncestorById(element.parentElement, id);
            }
        },
        /**
         * Gets the first ancestor for the matched class
         * @param {HTMLElement} element - the element which ancestors shall be searched
         * @param {String} className - the class name of the ancestor which shall be found
         * @returns {HTMLElement|null} - the matched element or null if not element is found
         *                               for the provided class name
         */
        getAncestorByClass: function (element, className) {
            if (!TypeCheck.isInstanceOf(element, HTMLElement)) {
                Failure.throwTypeError("element is no instance of HTMLElement");
            }
            if (!TypeCheck.isString(className)) {
                Failure.throwTypeError("className is not a string");
            }
            if (!TypeCheck.isDefined(element.parentElement)) {
                return null;
            }
            if (element.parentElement.classList.contains(className)) {
                return element.parentElement;
            } else {
                return this.getAncestorByClass(element.parentElement, className);
            }
        },
        /**
         * Gets the coordinates of plain html element
         * @param {HTMLElement} element - plain html element object
         * @returns {Object} - { top: Number, right: Number, bottom: Number, left: Number }
         */
        getElementCoordinates: function (element) {
            if (!TypeCheck.isInstanceOf(element, HTMLElement)) {
                Failure.throwTypeError("element is no instance of HTMLElement");
            }

            var box = element.getBoundingClientRect(),
                body = document.body,
                docEl = document.documentElement,
                scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop,
                scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft,
                clientTop = docEl.clientTop || body.clientTop || 0,
                clientLeft = docEl.clientLeft || body.clientLeft || 0,
                top = box.top + scrollTop - clientTop,
                left = box.left + scrollLeft - clientLeft;

            var docWidth = document.clientWidth,
                docHeight = document.clientHeight,
                elementWidth = element.clientWidth,
                borderWidth = 1 * 2,
                left = left + elementWidth + borderWidth,
                right = docWidth - left + elementWidth + borderWidth,
                bottom = docHeight - box.bottom;

            return { top: Math.round(top), right: Math.round(right), bottom: Math.round(bottom), left: Math.round(left) };
        },
    };
});
define('DomElement',[
    "TypeCheck",
    "Failure",
    "DomUtil"
], function (
    TypeCheck,
    Failure,
    DomUtil
) {
        /**
         * Abstract class for all control with native dom elements 
         * within jean environment 
         * @alias DomElement 
         * @abstract
         * @constructor
         * @throws {TypeError} - if options are undefined
         * @throws {TypeError} - if options.html is not a string
         * @param {Object} options - options object
         * @param {String} options.html - html markup of this element
         */
        var DomElement = function (options) {
            this.options = TypeCheck.isDefined(options) ? options : Failure.throwTypeError("options is undefined");
            this.element = TypeCheck.isString(options.html) ? DomUtil.createElementFromMarkup(options.html) : Failure.throwTypeError("options.html is not a string");
        };
        /** @returns {Boolean} - True if element is attached to DOM */
        DomElement.prototype.attachToDom = function () {
            this.element.style.display = "block";
            return true;
        };
        /** @returns {Boolean} - True if element is detached from DOM */
        DomElement.prototype.detachFromDom = function () {
            this.element.style.display = "none";
            return true;
        };
        return DomElement;
    });
define('Inheritance',["TypeCheck"], function (TypeCheck) {
    return {
        /**
         * Inherits constructor values
         * @param {Function} testator - Testator constructor which must be called for inheritance
         * @param {Object} instance - Instance of the inheritor
         * @param {Any[]|Object} options - Options, which will be passed to the testator
         * @returns {Boolean} - True if constructor values are inherited, false otherwise
         */
        inheritConstructor: function (testator, instance, options) {
            var isInherited = false, options = options ? options : {};
            if (TypeCheck.isFunction(testator) && TypeCheck.isObject(instance)) {
                if (Array.isArray(options)) {
                    testator.apply(instance, options);
                } else {
                    testator.apply(instance, [options]);
                }
                isInherited = true;
            }
            return isInherited;
        },
        /**
         * Inherits prototype from testator to inheritor
         * @param {Function} inheritor - The method which will be inherited from testator
         * @param {Function} testator - The method which pass its prototype to inheritor
         * @returns {Boolean} - True if prototype values are inherited, false otherwise
         */
        inheritPrototype: function (inheritor, testator) {
            var isInherited = false;
            if (TypeCheck.isFunction(inheritor) && TypeCheck.isFunction(testator)) {
                inheritor.prototype = Object.create(testator.prototype);
                inheritor.prototype.constructor = inheritor;
                isInherited = true;
            }
            return isInherited;
        }
    }
});
define('Merge',["TypeCheck", "Failure"], function (TypeCheck, Failure) {
    /**
     * Merges two objects into one 
     * Only able to merge flat objects - no deep copy
     * @throws {TypeError} - defaultOptions or options is not an object
     * @param {Object} defaultOptions - default options provided by system
     * @param {Object} options - options provided by user
     * @returns {Object} - an object with the merged values
     */
    return function merge(defaultOptions, options) {
        if (!TypeCheck.isObject(defaultOptions) || !TypeCheck.isObject(options)) {
            Failure.throwTypeError("defaultOptions or options is not an object");
        }
        var result = {}, i, key,
            optionsKeys = Object.keys(options), optionsLength = optionsKeys.length,
            defaultOptionsKeys = Object.keys(defaultOptions), defaultOptionsLength = defaultOptionsKeys.length;
        for (i = 0; i < defaultOptionsLength; i++) {
            key = defaultOptionsKeys[i];
            result[key] = defaultOptions[key];
        }
        for (i = 0; i < optionsLength; i++) {
            key = optionsKeys[i];
            result[key] = options[key];
        }
        return result;
    }
});
!function(t,e){"function"==typeof define&&define.amd?define('TextInput',[],e):(t.TextInput=t.TextInput||{},t.TextInput=e())}(this,function(){var t,e;return function(n){function r(t){for(var e=0,n=[];e<t.length;e++){var r=s.resolved[t[e]];r&&n.push(r)}return n}function i(){for(var t in s.unresolved){var e=s.unresolved[t],n=r(e.dependencies);o(t,e.factory,e.dependencies,n,!1)}}function o(t,e,n,r,i){if(r.length===n.length){var o=e.apply(e,r);s.resolved[t]=o||{}}else i&&(s.unresolved[t]={dependencies:n,factory:e})}var s={resolved:{},unresolved:{}};e=function(t,e,n){return s.resolved[t]?void console.warn("There is already a module with id <"+t+"> defined. Therefore this module will be ignored"):"string"==typeof t&&Array.isArray(e)&&"function"==typeof n?(0===e.length?o(t,n,e,[],!1):o(t,n,e,r(e),!0),void i()):void console.warn("Passed arguments for module are invalid")},e.amd={},t=function(t,e){t=Array.isArray(t)?t:[t];var n=r(t);if(1===n.length&&!e)return n[0];if(n.length!==t.length||!e)throw new Error("Not all modules are resolved");e.apply(e,n)}}(),e("node_modules/jean-amd/dist/jean-amd",function(){}),e("TypeCheck",[],function(){return{isString:function(t){return"string"==typeof t},isBoolean:function(t){return"boolean"==typeof t},isNumber:function(t){return"number"==typeof t},isObject:function(t){return!this.isArray(t)&&null!==t&&"object"==typeof t},isEmptyObject:function(t){var e=!1;return this.isObject(t)&&0===Object.keys(t).length&&(e=!0),e},isFunction:function(t){return"function"==typeof t},isDefined:function(t){return void 0!==t&&null!=t},isArray:function(t){return Array.isArray(t)},isEmptyArray:function(t){return this.isArray(t)&&0===t.length},isArrayTypeOf:function(t,e){var n=!0;if(!this.isString(e))throw new TypeError("options.type is not a string");if(!Array.isArray(t))throw new TypeError("options.array is not an array");0===t.length&&(n=!1);for(var r=0,i=t.length;r<i;r++){if(typeof t[r]!==e){n=!1;break}}return n},areObjectsInstanceOf:function(t,e){if(!this.isArray(t))throw new TypeError("array is not an array");if(!this.isFunction(e))throw new TypeError("fn is not a function");var n,r,i=t.length,o=!0;for(n=0;n<i;n++)if(r=t[n],!this.isObject(r)||!this.isInstanceOf(r,e)){o=!1;break}return o},areObjectsInstancesOf:function(t,e){var n,r,i,o,s=t.length,a=e.length,u=!0;if(!this.isArray(t))throw new TypeError("objects is not an array");if(!this.isArray(e))throw new TypeError("constructors is not an array");if(!this.isArrayTypeOf(e,"function"))throw new TypeError("constructors is not an array of constructor functions");for(n=0;n<s;n++){for(i=t[n],o=!0,r=0;r<a&&this.isObject(i);r++)if(this.isInstanceOf(i,e[r])){o=!1;break}if(!0===o){u=!1;break}}return u},isInstanceOf:function(t,e){if(!this.isObject(t))throw new TypeError("child is not an object");if(!this.isFunction(e))throw new TypeError("parent is not a function");return t instanceof e},isEnumValue:function(t,e){if(!this.isDefined(t))return!1;if(!this.isString(t)&&!this.isNumber(t))throw new TypeError("value must be a String or a Number");if(!this.isObject(e))throw new TypeError("o is not an object");var n,r=Object.keys(e),i=r.length,o=!1;for(n=0;n<i;n++)if(e[r[n]]===t){o=!0;break}return o}}}),e("Failure",[],function(){return{throwError:function(t){throw new Error(t)},throwTypeError:function(t){throw new TypeError(t)}}}),e("DomUtil",["TypeCheck","Failure"],function(t,e){return{createElementFromMarkup:function(n){t.isString(n)||e.throwTypeError("html is not a string");var r=document.createElement("div");return r.innerHTML=n.trim(),r.firstChild},isInViewPort:function(n){t.isInstanceOf(n,HTMLElement)||e.throwTypeError("element is not an instance of HTMLElement");var r=n.getBoundingClientRect();return r.top+r.height>0&&r.top<window.innerHeight},getChildById:function(n,r){t.isInstanceOf(n,HTMLElement)||e.throwTypeError("element is no instance of HTMLElement"),t.isString(r)||e.throwTypeError("id is not a string");var i,o,s=n.children,a=s.length,u=null;for(i=0;i<a;i++)if(o=s[i],o.id===r)return o;for(i=0;i<a;i++)if(u=this.getChildById(s[i],r),t.isDefined(u))return u;return null},getChildByClass:function(n,r){t.isInstanceOf(n,HTMLElement)||e.throwTypeError("element is no instance of HTMLElement"),t.isString(r)||e.throwTypeError("className is not a string");var i,o,s=n.children,a=s.length,u=null;for(i=0;i<a;i++)if(o=s[i],o.classList.contains(r))return o;for(i=0;i<a;i++)if(u=this.getChildByClass(s[i],r),t.isDefined(u))return u;return null},getAncestorById:function(n,r){return t.isInstanceOf(n,HTMLElement)||e.throwTypeError("element is no instance of HTMLElement"),t.isString(r)||e.throwTypeError("id is not a string"),t.isDefined(n.parentElement)?n.parentElement.id===r?n.parentElement:this.getAncestorById(n.parentElement,r):null},getAncestorByClass:function(n,r){return t.isInstanceOf(n,HTMLElement)||e.throwTypeError("element is no instance of HTMLElement"),t.isString(r)||e.throwTypeError("className is not a string"),t.isDefined(n.parentElement)?n.parentElement.classList.contains(r)?n.parentElement:this.getAncestorByClass(n.parentElement,r):null},getElementCoordinates:function(n){t.isInstanceOf(n,HTMLElement)||e.throwTypeError("element is no instance of HTMLElement");var r=n.getBoundingClientRect(),i=document.body,o=document.documentElement,s=window.pageYOffset||o.scrollTop||i.scrollTop,a=window.pageXOffset||o.scrollLeft||i.scrollLeft,u=o.clientTop||i.clientTop||0,c=o.clientLeft||i.clientLeft||0,l=r.top+s-u,f=r.left+a-c,h=document.clientWidth,p=document.clientHeight,d=n.clientWidth,f=f+d+2,y=h-f+d+2,m=p-r.bottom;return{top:Math.round(l),right:Math.round(y),bottom:Math.round(m),left:Math.round(f)}}}}),e("DomElement",["TypeCheck","Failure","DomUtil"],function(t,e,n){var r=function(r){this.options=t.isDefined(r)?r:e.throwTypeError("options is undefined"),this.element=t.isString(r.html)?n.createElementFromMarkup(r.html):e.throwTypeError("options.html is not a string")};return r.prototype.attachToDom=function(){return this.element.style.display="block",!0},r.prototype.detachFromDom=function(){return this.element.style.display="none",!0},r}),e("Inheritance",["TypeCheck"],function(t){return{inheritConstructor:function(e,n,r){var i=!1,r=r||{};return t.isFunction(e)&&t.isObject(n)&&(Array.isArray(r)?e.apply(n,r):e.apply(n,[r]),i=!0),i},inheritPrototype:function(e,n){var r=!1;return t.isFunction(e)&&t.isFunction(n)&&(e.prototype=Object.create(n.prototype),e.prototype.constructor=e,r=!0),r}}}),e("Merge",["TypeCheck","Failure"],function(t,e){return function(n,r){t.isObject(n)&&t.isObject(r)||e.throwTypeError("defaultOptions or options is not an object");var i,o,s={},a=Object.keys(r),u=a.length,c=Object.keys(n),l=c.length;for(i=0;i<l;i++)o=c[i],s[o]=n[o];for(i=0;i<u;i++)o=a[i],s[o]=r[o];return s}}),e("normalize",[],function(){function t(t,r,i){if(t.match(a)||t.match(s))return t;t=o(t);var u=i.match(s),c=r.match(s);return!c||u&&u[1]==c[1]&&u[2]==c[2]?n(e(t,r),i):e(t,r)}function e(t,e){if("./"==t.substr(0,2)&&(t=t.substr(2)),t.match(a)||t.match(s))return t;var n=e.split("/"),r=t.split("/");for(n.pop();curPart=r.shift();)".."==curPart?n.pop():n.push(curPart);return n.join("/")}function n(t,e){var n=e.split("/");for(n.pop(),e=n.join("/")+"/",i=0;e.substr(i,1)==t.substr(i,1);)i++;for(;"/"!=e.substr(i,1);)i--;e=e.substr(i+1),t=t.substr(i+1),n=e.split("/");var r=t.split("/");for(out="";n.shift();)out+="../";for(;curPart=r.shift();)out+=curPart+"/";return out.substr(0,out.length-1)}var r=/([^:])\/+/g,o=function(t){return t.replace(r,"$1/")},s=/[^\:\/]*:\/\/([^\/])*/,a=/^(\/|data:)/,u=function(e,n,r){n=o(n),r=o(r);for(var i,s,e,a=/@import\s*("([^"]*)"|'([^']*)')|url\s*\((?!#)\s*(\s*"([^"]*)"|'([^']*)'|[^\)]*\s*)\s*\)/gi;i=a.exec(e);){s=i[3]||i[2]||i[5]||i[6]||i[4];var u;u=t(s,n,r);var c=i[5]||i[6]?1:0;e=e.substr(0,a.lastIndex-s.length-c-1)+u+e.substr(a.lastIndex-c-1),a.lastIndex=a.lastIndex+(u.length-s.length)}return e};return u.convertURIBase=t,u.absoluteURI=e,u.relativeURI=n,u}),e("css",[],function(){if("undefined"==typeof window)return{load:function(t,e,n){n()}};var t=document.getElementsByTagName("head")[0],e=window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)|AndroidWebKit\/([^ ;]*)/)||0,n=!1,r=!0;e[1]||e[7]?n=parseInt(e[1])<6||parseInt(e[7])<=9:e[2]||e[8]||"WebkitAppearance"in document.documentElement.style?r=!1:e[4]&&(n=parseInt(e[4])<18);var i={};i.pluginBuilder="./css-builder";var o,s,a,u=function(){o=document.createElement("style"),t.appendChild(o),s=o.styleSheet||o.sheet},c=0,l=[],f=function(t){s.addImport(t),o.onload=function(){h()},31==++c&&(u(),c=0)},h=function(){a();var t=l.shift();if(!t)return void(a=null);a=t[1],f(t[0])},p=function(t,e){if(s&&s.addImport||u(),s&&s.addImport)a?l.push([t,e]):(f(t),a=e);else{o.textContent='@import "'+t+'";';var n=setInterval(function(){try{o.sheet.cssRules,clearInterval(n),e()}catch(t){}},10)}},d=function(e,n){var i=document.createElement("link");if(i.type="text/css",i.rel="stylesheet",r)i.onload=function(){i.onload=function(){},setTimeout(n,7)};else var o=setInterval(function(){for(var t=0;t<document.styleSheets.length;t++){if(document.styleSheets[t].href==i.href)return clearInterval(o),n()}},10);i.href=e,t.appendChild(i)};return i.normalize=function(t,e){return".css"==t.substr(t.length-4,4)&&(t=t.substr(0,t.length-4)),e(t)},i.load=function(t,e,r,i){(n?p:d)(e.toUrl(t+".css"),r)},i}),e("css!textinput-css",[],function(){}),e("src/TextInput",["DomElement","DomUtil","Inheritance","TypeCheck","Failure","Merge","css!textinput-css"],function(t,e,n,r,i,o){var s=function(i){n.inheritConstructor(t,this,o({html:'<div class="jean-text-input"><input class="input" type="text" /></div>',id:r.isString(i.id)?i.id:"",onValueChanged:r.isFunction(i.onValueChanged)?i.onValueChanged:function(){}},r.isDefined(i)?i:{})),this.input=e.getChildByClass(this.element,"input"),this.input.addEventListener("input",this._onValueChanged.bind(this)),this.element.setAttribute("id",this.options.id)};return n.inheritPrototype(s,t),s.prototype.setValue=function(t){this.input.value=t},s.prototype.getValue=function(t){return this.input.value},s.prototype.removeValue=function(){this.input.value=""},s.prototype._onValueChanged=function(){this.options.onValueChanged(this.input.value)},s}),function(t){var e=document,n="appendChild",r="styleSheet",i=e.createElement("style");i.type="text/css",e.getElementsByTagName("head")[0][n](i),i[r]?i[r].cssText=t:i[n](e.createTextNode(t))}(".jean-text-input {\n  padding: 5px;\n}\n.jean-text-input input {\n  color: white;\n  border-radius: 5px;\n  border: 1px solid white;\n  background: transparent;\n  width: 100%;\n}\n"),t("src/TextInput")});
!function(e,t){"function"==typeof define&&define.amd?define('Button',[],t):(e.Button=e.Button||{},e.Button=t())}(this,function(){var e,t;return function(n){function r(e){for(var t=0,n=[];t<e.length;t++){var r=s.resolved[e[t]];r&&n.push(r)}return n}function i(){for(var e in s.unresolved){var t=s.unresolved[e],n=r(t.dependencies);o(e,t.factory,t.dependencies,n,!1)}}function o(e,t,n,r,i){if(r.length===n.length){var o=t.apply(t,r);s.resolved[e]=o||{}}else i&&(s.unresolved[e]={dependencies:n,factory:t})}var s={resolved:{},unresolved:{}};t=function(e,t,n){return s.resolved[e]?void console.warn("There is already a module with id <"+e+"> defined. Therefore this module will be ignored"):"string"==typeof e&&Array.isArray(t)&&"function"==typeof n?(0===t.length?o(e,n,t,[],!1):o(e,n,t,r(t),!0),void i()):void console.warn("Passed arguments for module are invalid")},t.amd={},e=function(e,t){e=Array.isArray(e)?e:[e];var n=r(e);if(1===n.length&&!t)return n[0];if(n.length!==e.length||!t)throw new Error("Not all modules are resolved");t.apply(t,n)}}(),t("node_modules/jean-amd/dist/jean-amd",function(){}),t("TypeCheck",[],function(){return{isString:function(e){return"string"==typeof e},isBoolean:function(e){return"boolean"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:function(e){return!this.isArray(e)&&null!==e&&"object"==typeof e},isEmptyObject:function(e){var t=!1;return this.isObject(e)&&0===Object.keys(e).length&&(t=!0),t},isFunction:function(e){return"function"==typeof e},isDefined:function(e){return void 0!==e&&null!=e},isArray:function(e){return Array.isArray(e)},isEmptyArray:function(e){return this.isArray(e)&&0===e.length},isArrayTypeOf:function(e,t){var n=!0;if(!this.isString(t))throw new TypeError("options.type is not a string");if(!Array.isArray(e))throw new TypeError("options.array is not an array");0===e.length&&(n=!1);for(var r=0,i=e.length;r<i;r++){if(typeof e[r]!==t){n=!1;break}}return n},areObjectsInstanceOf:function(e,t){if(!this.isArray(e))throw new TypeError("array is not an array");if(!this.isFunction(t))throw new TypeError("fn is not a function");var n,r,i=e.length,o=!0;for(n=0;n<i;n++)if(r=e[n],!this.isObject(r)||!this.isInstanceOf(r,t)){o=!1;break}return o},areObjectsInstancesOf:function(e,t){var n,r,i,o,s=e.length,a=t.length,c=!0;if(!this.isArray(e))throw new TypeError("objects is not an array");if(!this.isArray(t))throw new TypeError("constructors is not an array");if(!this.isArrayTypeOf(t,"function"))throw new TypeError("constructors is not an array of constructor functions");for(n=0;n<s;n++){for(i=e[n],o=!0,r=0;r<a&&this.isObject(i);r++)if(this.isInstanceOf(i,t[r])){o=!1;break}if(!0===o){c=!1;break}}return c},isInstanceOf:function(e,t){if(!this.isObject(e))throw new TypeError("child is not an object");if(!this.isFunction(t))throw new TypeError("parent is not a function");return e instanceof t},isEnumValue:function(e,t){if(!this.isDefined(e))return!1;if(!this.isString(e)&&!this.isNumber(e))throw new TypeError("value must be a String or a Number");if(!this.isObject(t))throw new TypeError("o is not an object");var n,r=Object.keys(t),i=r.length,o=!1;for(n=0;n<i;n++)if(t[r[n]]===e){o=!0;break}return o}}}),t("Failure",[],function(){return{throwError:function(e){throw new Error(e)},throwTypeError:function(e){throw new TypeError(e)}}}),t("DomUtil",["TypeCheck","Failure"],function(e,t){return{createElementFromMarkup:function(n){e.isString(n)||t.throwTypeError("html is not a string");var r=document.createElement("div");return r.innerHTML=n.trim(),r.firstChild},isInViewPort:function(n){e.isInstanceOf(n,HTMLElement)||t.throwTypeError("element is not an instance of HTMLElement");var r=n.getBoundingClientRect();return r.top+r.height>0&&r.top<window.innerHeight},getChildById:function(n,r){e.isInstanceOf(n,HTMLElement)||t.throwTypeError("element is no instance of HTMLElement"),e.isString(r)||t.throwTypeError("id is not a string");var i,o,s=n.children,a=s.length,c=null;for(i=0;i<a;i++)if(o=s[i],o.id===r)return o;for(i=0;i<a;i++)if(c=this.getChildById(s[i],r),e.isDefined(c))return c;return null},getChildByClass:function(n,r){e.isInstanceOf(n,HTMLElement)||t.throwTypeError("element is no instance of HTMLElement"),e.isString(r)||t.throwTypeError("className is not a string");var i,o,s=n.children,a=s.length,c=null;for(i=0;i<a;i++)if(o=s[i],o.classList.contains(r))return o;for(i=0;i<a;i++)if(c=this.getChildByClass(s[i],r),e.isDefined(c))return c;return null},getAncestorById:function(n,r){return e.isInstanceOf(n,HTMLElement)||t.throwTypeError("element is no instance of HTMLElement"),e.isString(r)||t.throwTypeError("id is not a string"),e.isDefined(n.parentElement)?n.parentElement.id===r?n.parentElement:this.getAncestorById(n.parentElement,r):null},getAncestorByClass:function(n,r){return e.isInstanceOf(n,HTMLElement)||t.throwTypeError("element is no instance of HTMLElement"),e.isString(r)||t.throwTypeError("className is not a string"),e.isDefined(n.parentElement)?n.parentElement.classList.contains(r)?n.parentElement:this.getAncestorByClass(n.parentElement,r):null}}}),t("DomElement",["TypeCheck","Failure","DomUtil"],function(e,t,n){var r=function(r){this.options=e.isDefined(r)?r:t.throwTypeError("options is undefined"),this.element=e.isString(r.html)?n.createElementFromMarkup(r.html):t.throwTypeError("options.html is not a string")};return r.prototype.attachToDom=function(){return this.element.style.display="block",!0},r.prototype.detachFromDom=function(){return this.element.style.display="none",!0},r}),t("Inheritance",["TypeCheck"],function(e){return{inheritConstructor:function(t,n,r){var i=!1,r=r||{};return e.isFunction(t)&&e.isObject(n)&&(Array.isArray(r)?t.apply(n,r):t.apply(n,[r]),i=!0),i},inheritPrototype:function(t,n){var r=!1;return e.isFunction(t)&&e.isFunction(n)&&(t.prototype=Object.create(n.prototype),t.prototype.constructor=t,r=!0),r}}}),t("Merge",["TypeCheck","Failure"],function(e,t){return function(n,r){e.isObject(n)&&e.isObject(r)||t.throwTypeError("defaultOptions or options is not an object");var i,o,s={},a=Object.keys(r),c=a.length,l=Object.keys(n),u=l.length;for(i=0;i<u;i++)o=l[i],s[o]=n[o];for(i=0;i<c;i++)o=a[i],s[o]=r[o];return s}}),t("normalize",{}),t("css",{load:function(e){throw new Error("Dynamic load not allowed: "+e)}}),t("css!button-css",[],function(){}),t("src/Button",["DomElement","DomUtil","Inheritance","TypeCheck","Failure","Merge","css!button-css"],function(e,t,n,r,i,o){var s=function(t){n.inheritConstructor(e,this,o({id:r.isString(t.id)?t.id:i.throwTypeError("options.id is not a string"),name:r.isString(t.name)?t.name:i.throwTypeError("options.name is not a string"),html:'<div id="'+t.id+'" class="jean-button">'+t.name+"</div>",onButtonClick:r.isString(t.heading)?t.heading:"Collapsible",isSelected:!!r.isBoolean(t.isSelected)&&t.isSelected},r.isDefined(t)?t:{})),this.element.addEventListener("click",this._onButtonClick.bind(this)),this.id=this.options.id,this._setState()};return s.selectType=s.prototype.selectType={SELECTED:"selected",DESELECTED:"deselected"},s.prototype._onButtonClick=function(){this.options.isSelected=!this.options.isSelected,this._setState(),this.options.onButtonClick(this.options.id,this.options.isSelected)},s.prototype._setState=function(){this.options.isSelected?this.element.classList.add("jean-button-selected"):this.element.classList.remove("jean-button-selected")},s.prototype.select=function(){this.options.isSelected=!0,this._setState()},s.prototype.deselect=function(){this.options.isSelected=!1,this._setState()},s}),function(e){var t=document,n="appendChild",r="styleSheet",i=t.createElement("style");i.type="text/css",t.getElementsByTagName("head")[0][n](i),i[r]?i[r].cssText=e:i[n](t.createTextNode(e))}(".jean-button {\n  border: 1px solid white;\n  padding: 5px;\n  color: white;\n  border-radius: 5px;\n  text-align: center;\n  display: inline-block;\n  background: #4A4949;\n}\n.jean-button .selected {\n  color: lightgreen;\n  border-color: lightgreen;\n}\n.jean-button:hover {\n  color: lightgreen;\n  border-color: lightgreen;\n  cursor: pointer;\n}\n.jean-button-selected {\n  color: lightgreen;\n  border-color: lightgreen;\n}\n"),e("src/Button")});
/**
 * @license text 2.0.16 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/text/LICENSE
 */
/*jslint regexp: true */
/*global require, XMLHttpRequest, ActiveXObject,
  define, window, process, Packages,
  java, location, Components, FileUtils */

define('text',['module'], function (module) {
    'use strict';

    var text, fs, Cc, Ci, xpcIsWindows,
        progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'],
        xmlRegExp = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
        bodyRegExp = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
        hasLocation = typeof location !== 'undefined' && location.href,
        defaultProtocol = hasLocation && location.protocol && location.protocol.replace(/\:/, ''),
        defaultHostName = hasLocation && location.hostname,
        defaultPort = hasLocation && (location.port || undefined),
        buildMap = {},
        masterConfig = (module.config && module.config()) || {};

    function useDefault(value, defaultValue) {
        return value === undefined || value === '' ? defaultValue : value;
    }

    //Allow for default ports for http and https.
    function isSamePort(protocol1, port1, protocol2, port2) {
        if (port1 === port2) {
            return true;
        } else if (protocol1 === protocol2) {
            if (protocol1 === 'http') {
                return useDefault(port1, '80') === useDefault(port2, '80');
            } else if (protocol1 === 'https') {
                return useDefault(port1, '443') === useDefault(port2, '443');
            }
        }
        return false;
    }

    text = {
        version: '2.0.16',

        strip: function (content) {
            //Strips <?xml ...?> declarations so that external SVG and XML
            //documents can be added to a document without worry. Also, if the string
            //is an HTML document, only the part inside the body tag is returned.
            if (content) {
                content = content.replace(xmlRegExp, "");
                var matches = content.match(bodyRegExp);
                if (matches) {
                    content = matches[1];
                }
            } else {
                content = "";
            }
            return content;
        },

        jsEscape: function (content) {
            return content.replace(/(['\\])/g, '\\$1')
                .replace(/[\f]/g, "\\f")
                .replace(/[\b]/g, "\\b")
                .replace(/[\n]/g, "\\n")
                .replace(/[\t]/g, "\\t")
                .replace(/[\r]/g, "\\r")
                .replace(/[\u2028]/g, "\\u2028")
                .replace(/[\u2029]/g, "\\u2029");
        },

        createXhr: masterConfig.createXhr || function () {
            //Would love to dump the ActiveX crap in here. Need IE 6 to die first.
            var xhr, i, progId;
            if (typeof XMLHttpRequest !== "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject !== "undefined") {
                for (i = 0; i < 3; i += 1) {
                    progId = progIds[i];
                    try {
                        xhr = new ActiveXObject(progId);
                    } catch (e) {}

                    if (xhr) {
                        progIds = [progId];  // so faster next time
                        break;
                    }
                }
            }

            return xhr;
        },

        /**
         * Parses a resource name into its component parts. Resource names
         * look like: module/name.ext!strip, where the !strip part is
         * optional.
         * @param {String} name the resource name
         * @returns {Object} with properties "moduleName", "ext" and "strip"
         * where strip is a boolean.
         */
        parseName: function (name) {
            var modName, ext, temp,
                strip = false,
                index = name.lastIndexOf("."),
                isRelative = name.indexOf('./') === 0 ||
                             name.indexOf('../') === 0;

            if (index !== -1 && (!isRelative || index > 1)) {
                modName = name.substring(0, index);
                ext = name.substring(index + 1);
            } else {
                modName = name;
            }

            temp = ext || modName;
            index = temp.indexOf("!");
            if (index !== -1) {
                //Pull off the strip arg.
                strip = temp.substring(index + 1) === "strip";
                temp = temp.substring(0, index);
                if (ext) {
                    ext = temp;
                } else {
                    modName = temp;
                }
            }

            return {
                moduleName: modName,
                ext: ext,
                strip: strip
            };
        },

        xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,

        /**
         * Is an URL on another domain. Only works for browser use, returns
         * false in non-browser environments. Only used to know if an
         * optimized .js version of a text resource should be loaded
         * instead.
         * @param {String} url
         * @returns Boolean
         */
        useXhr: function (url, protocol, hostname, port) {
            var uProtocol, uHostName, uPort,
                match = text.xdRegExp.exec(url);
            if (!match) {
                return true;
            }
            uProtocol = match[2];
            uHostName = match[3];

            uHostName = uHostName.split(':');
            uPort = uHostName[1];
            uHostName = uHostName[0];

            return (!uProtocol || uProtocol === protocol) &&
                   (!uHostName || uHostName.toLowerCase() === hostname.toLowerCase()) &&
                   ((!uPort && !uHostName) || isSamePort(uProtocol, uPort, protocol, port));
        },

        finishLoad: function (name, strip, content, onLoad) {
            content = strip ? text.strip(content) : content;
            if (masterConfig.isBuild) {
                buildMap[name] = content;
            }
            onLoad(content);
        },

        load: function (name, req, onLoad, config) {
            //Name has format: some.module.filext!strip
            //The strip part is optional.
            //if strip is present, then that means only get the string contents
            //inside a body tag in an HTML string. For XML/SVG content it means
            //removing the <?xml ...?> declarations so the content can be inserted
            //into the current doc without problems.

            // Do not bother with the work if a build and text will
            // not be inlined.
            if (config && config.isBuild && !config.inlineText) {
                onLoad();
                return;
            }

            masterConfig.isBuild = config && config.isBuild;

            var parsed = text.parseName(name),
                nonStripName = parsed.moduleName +
                    (parsed.ext ? '.' + parsed.ext : ''),
                url = req.toUrl(nonStripName),
                useXhr = (masterConfig.useXhr) ||
                         text.useXhr;

            // Do not load if it is an empty: url
            if (url.indexOf('empty:') === 0) {
                onLoad();
                return;
            }

            //Load the text. Use XHR if possible and in a browser.
            if (!hasLocation || useXhr(url, defaultProtocol, defaultHostName, defaultPort)) {
                text.get(url, function (content) {
                    text.finishLoad(name, parsed.strip, content, onLoad);
                }, function (err) {
                    if (onLoad.error) {
                        onLoad.error(err);
                    }
                });
            } else {
                //Need to fetch the resource across domains. Assume
                //the resource has been optimized into a JS module. Fetch
                //by the module name + extension, but do not include the
                //!strip part to avoid file system issues.
                req([nonStripName], function (content) {
                    text.finishLoad(parsed.moduleName + '.' + parsed.ext,
                                    parsed.strip, content, onLoad);
                }, function (err) {
                    if (onLoad.error) {
                        onLoad.error(err);
                    }
                });
            }
        },

        write: function (pluginName, moduleName, write, config) {
            if (buildMap.hasOwnProperty(moduleName)) {
                var content = text.jsEscape(buildMap[moduleName]);
                write.asModule(pluginName + "!" + moduleName,
                               "define(function () { return '" +
                                   content +
                               "';});\n");
            }
        },

        writeFile: function (pluginName, moduleName, req, write, config) {
            var parsed = text.parseName(moduleName),
                extPart = parsed.ext ? '.' + parsed.ext : '',
                nonStripName = parsed.moduleName + extPart,
                //Use a '.js' file name so that it indicates it is a
                //script that can be loaded across domains.
                fileName = req.toUrl(parsed.moduleName + extPart) + '.js';

            //Leverage own load() method to load plugin value, but only
            //write out values that do not have the strip argument,
            //to avoid any potential issues with ! in file names.
            text.load(nonStripName, req, function (value) {
                //Use own write() method to construct full module value.
                //But need to create shell that translates writeFile's
                //write() to the right interface.
                var textWrite = function (contents) {
                    return write(fileName, contents);
                };
                textWrite.asModule = function (moduleName, contents) {
                    return write.asModule(moduleName, fileName, contents);
                };

                text.write(pluginName, nonStripName, textWrite, config);
            }, config);
        }
    };

    if (masterConfig.env === 'node' || (!masterConfig.env &&
            typeof process !== "undefined" &&
            process.versions &&
            !!process.versions.node &&
            !process.versions['node-webkit'] &&
            !process.versions['atom-shell'])) {
        //Using special require.nodeRequire, something added by r.js.
        fs = require.nodeRequire('fs');

        text.get = function (url, callback, errback) {
            try {
                var file = fs.readFileSync(url, 'utf8');
                //Remove BOM (Byte Mark Order) from utf8 files if it is there.
                if (file[0] === '\uFEFF') {
                    file = file.substring(1);
                }
                callback(file);
            } catch (e) {
                if (errback) {
                    errback(e);
                }
            }
        };
    } else if (masterConfig.env === 'xhr' || (!masterConfig.env &&
            text.createXhr())) {
        text.get = function (url, callback, errback, headers) {
            var xhr = text.createXhr(), header;
            xhr.open('GET', url, true);

            //Allow plugins direct access to xhr headers
            if (headers) {
                for (header in headers) {
                    if (headers.hasOwnProperty(header)) {
                        xhr.setRequestHeader(header.toLowerCase(), headers[header]);
                    }
                }
            }

            //Allow overrides specified in config
            if (masterConfig.onXhr) {
                masterConfig.onXhr(xhr, url);
            }

            xhr.onreadystatechange = function (evt) {
                var status, err;
                //Do not explicitly handle errors, those should be
                //visible via console output in the browser.
                if (xhr.readyState === 4) {
                    status = xhr.status || 0;
                    if (status > 399 && status < 600) {
                        //An http 4xx or 5xx error. Signal an error.
                        err = new Error(url + ' HTTP status: ' + status);
                        err.xhr = xhr;
                        if (errback) {
                            errback(err);
                        }
                    } else {
                        callback(xhr.responseText);
                    }

                    if (masterConfig.onXhrComplete) {
                        masterConfig.onXhrComplete(xhr, url);
                    }
                }
            };
            xhr.send(null);
        };
    } else if (masterConfig.env === 'rhino' || (!masterConfig.env &&
            typeof Packages !== 'undefined' && typeof java !== 'undefined')) {
        //Why Java, why is this so awkward?
        text.get = function (url, callback) {
            var stringBuffer, line,
                encoding = "utf-8",
                file = new java.io.File(url),
                lineSeparator = java.lang.System.getProperty("line.separator"),
                input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), encoding)),
                content = '';
            try {
                stringBuffer = new java.lang.StringBuffer();
                line = input.readLine();

                // Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
                // http://www.unicode.org/faq/utf_bom.html

                // Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
                // http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
                if (line && line.length() && line.charAt(0) === 0xfeff) {
                    // Eat the BOM, since we've already found the encoding on this file,
                    // and we plan to concatenating this buffer with others; the BOM should
                    // only appear at the top of a file.
                    line = line.substring(1);
                }

                if (line !== null) {
                    stringBuffer.append(line);
                }

                while ((line = input.readLine()) !== null) {
                    stringBuffer.append(lineSeparator);
                    stringBuffer.append(line);
                }
                //Make sure we return a JavaScript string and not a Java string.
                content = String(stringBuffer.toString()); //String
            } finally {
                input.close();
            }
            callback(content);
        };
    } else if (masterConfig.env === 'xpconnect' || (!masterConfig.env &&
            typeof Components !== 'undefined' && Components.classes &&
            Components.interfaces)) {
        //Avert your gaze!
        Cc = Components.classes;
        Ci = Components.interfaces;
        Components.utils['import']('resource://gre/modules/FileUtils.jsm');
        xpcIsWindows = ('@mozilla.org/windows-registry-key;1' in Cc);

        text.get = function (url, callback) {
            var inStream, convertStream, fileObj,
                readData = {};

            if (xpcIsWindows) {
                url = url.replace(/\//g, '\\');
            }

            fileObj = new FileUtils.File(url);

            //XPCOM, you so crazy
            try {
                inStream = Cc['@mozilla.org/network/file-input-stream;1']
                           .createInstance(Ci.nsIFileInputStream);
                inStream.init(fileObj, 1, 0, false);

                convertStream = Cc['@mozilla.org/intl/converter-input-stream;1']
                                .createInstance(Ci.nsIConverterInputStream);
                convertStream.init(inStream, "utf-8", inStream.available(),
                Ci.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);

                convertStream.readString(inStream.available(), readData);
                convertStream.close();
                inStream.close();
                callback(readData.value);
            } catch (e) {
                throw new Error((fileObj && fileObj.path || '') + ': ' + e);
            }
        };
    }
    return text;
});


define('text!confirmabletextinput-html',[],function () { return '<div class="jean-confirmable-text-input">\r\n\r\n</div>';});

/*
 * css.normalize.js
 *
 * CSS Normalization
 *
 * CSS paths are normalized based on an optional basePath and the RequireJS config
 *
 * Usage:
 *   normalize(css, fromBasePath, toBasePath);
 *
 * css: the stylesheet content to normalize
 * fromBasePath: the absolute base path of the css relative to any root (but without ../ backtracking)
 * toBasePath: the absolute new base path of the css relative to the same root
 * 
 * Absolute dependencies are left untouched.
 *
 * Urls in the CSS are picked up by regular expressions.
 * These will catch all statements of the form:
 *
 * url(*)
 * url('*')
 * url("*")
 * 
 * @import '*'
 * @import "*"
 *
 * (and so also @import url(*) variations)
 *
 * For urls needing normalization
 *
 */

define('normalize',[],function() {
  
  // regular expression for removing double slashes
  // eg http://www.example.com//my///url/here -> http://www.example.com/my/url/here
  var slashes = /([^:])\/+/g
  var removeDoubleSlashes = function(uri) {
    return uri.replace(slashes, '$1/');
  }

  // given a relative URI, and two absolute base URIs, convert it from one base to another
  var protocolRegEx = /[^\:\/]*:\/\/([^\/])*/;
  var absUrlRegEx = /^(\/|data:)/;
  function convertURIBase(uri, fromBase, toBase) {
    if (uri.match(absUrlRegEx) || uri.match(protocolRegEx))
      return uri;
    uri = removeDoubleSlashes(uri);
    // if toBase specifies a protocol path, ensure this is the same protocol as fromBase, if not
    // use absolute path at fromBase
    var toBaseProtocol = toBase.match(protocolRegEx);
    var fromBaseProtocol = fromBase.match(protocolRegEx);
    if (fromBaseProtocol && (!toBaseProtocol || toBaseProtocol[1] != fromBaseProtocol[1] || toBaseProtocol[2] != fromBaseProtocol[2]))
      return absoluteURI(uri, fromBase);
    
    else {
      return relativeURI(absoluteURI(uri, fromBase), toBase);
    }
  };
  
  // given a relative URI, calculate the absolute URI
  function absoluteURI(uri, base) {
    if (uri.substr(0, 2) == './')
      uri = uri.substr(2);

    // absolute urls are left in tact
    if (uri.match(absUrlRegEx) || uri.match(protocolRegEx))
      return uri;
    
    var baseParts = base.split('/');
    var uriParts = uri.split('/');
    
    baseParts.pop();
    
    while (curPart = uriParts.shift())
      if (curPart == '..')
        baseParts.pop();
      else
        baseParts.push(curPart);
    
    return baseParts.join('/');
  };


  // given an absolute URI, calculate the relative URI
  function relativeURI(uri, base) {
    
    // reduce base and uri strings to just their difference string
    var baseParts = base.split('/');
    baseParts.pop();
    base = baseParts.join('/') + '/';
    i = 0;
    while (base.substr(i, 1) == uri.substr(i, 1))
      i++;
    while (base.substr(i, 1) != '/')
      i--;
    base = base.substr(i + 1);
    uri = uri.substr(i + 1);

    // each base folder difference is thus a backtrack
    baseParts = base.split('/');
    var uriParts = uri.split('/');
    out = '';
    while (baseParts.shift())
      out += '../';
    
    // finally add uri parts
    while (curPart = uriParts.shift())
      out += curPart + '/';
    
    return out.substr(0, out.length - 1);
  };
  
  var normalizeCSS = function(source, fromBase, toBase) {

    fromBase = removeDoubleSlashes(fromBase);
    toBase = removeDoubleSlashes(toBase);

    var urlRegEx = /@import\s*("([^"]*)"|'([^']*)')|url\s*\((?!#)\s*(\s*"([^"]*)"|'([^']*)'|[^\)]*\s*)\s*\)/ig;
    var result, url, source;

    while (result = urlRegEx.exec(source)) {
      url = result[3] || result[2] || result[5] || result[6] || result[4];
      var newUrl;
      newUrl = convertURIBase(url, fromBase, toBase);
      var quoteLen = result[5] || result[6] ? 1 : 0;
      source = source.substr(0, urlRegEx.lastIndex - url.length - quoteLen - 1) + newUrl + source.substr(urlRegEx.lastIndex - quoteLen - 1);
      urlRegEx.lastIndex = urlRegEx.lastIndex + (newUrl.length - url.length);
    }
    
    return source;
  };
  
  normalizeCSS.convertURIBase = convertURIBase;
  normalizeCSS.absoluteURI = absoluteURI;
  normalizeCSS.relativeURI = relativeURI;
  
  return normalizeCSS;
});
;
/*
 * Require-CSS RequireJS css! loader plugin
 * 0.1.10
 * Guy Bedford 2014
 * MIT
 */

/*
 *
 * Usage:
 *  require(['css!./mycssFile']);
 *
 * Tested and working in (up to latest versions as of March 2013):
 * Android
 * iOS 6
 * IE 6 - 10
 * Chrome 3 - 26
 * Firefox 3.5 - 19
 * Opera 10 - 12
 * 
 * browserling.com used for virtual testing environment
 *
 * Credit to B Cavalier & J Hann for the IE 6 - 9 method,
 * refined with help from Martin Cermak
 * 
 * Sources that helped along the way:
 * - https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent
 * - http://www.phpied.com/when-is-a-stylesheet-really-loaded/
 * - https://github.com/cujojs/curl/blob/master/src/curl/plugin/css.js
 *
 */

define('css',[],function() {
  if (typeof window == 'undefined')
    return { load: function(n, r, load){ load() } };

  var head = document.getElementsByTagName('head')[0];

  var engine = window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)|AndroidWebKit\/([^ ;]*)/) || 0;

  // use <style> @import load method (IE < 9, Firefox < 18)
  var useImportLoad = false;
  
  // set to false for explicit <link> load checking when onload doesn't work perfectly (webkit)
  var useOnload = true;

  // trident / msie
  if (engine[1] || engine[7])
    useImportLoad = parseInt(engine[1]) < 6 || parseInt(engine[7]) <= 9;
  // webkit
  else if (engine[2] || engine[8] || 'WebkitAppearance' in document.documentElement.style)
    useOnload = false;
  // gecko
  else if (engine[4])
    useImportLoad = parseInt(engine[4]) < 18;

  //main api object
  var cssAPI = {};

  cssAPI.pluginBuilder = './css-builder';

  // <style> @import load method
  var curStyle, curSheet;
  var createStyle = function () {
    curStyle = document.createElement('style');
    head.appendChild(curStyle);
    curSheet = curStyle.styleSheet || curStyle.sheet;
  }
  var ieCnt = 0;
  var ieLoads = [];
  var ieCurCallback;
  
  var createIeLoad = function(url) {
    curSheet.addImport(url);
    curStyle.onload = function(){ processIeLoad() };
    
    ieCnt++;
    if (ieCnt == 31) {
      createStyle();
      ieCnt = 0;
    }
  }
  var processIeLoad = function() {
    ieCurCallback();
 
    var nextLoad = ieLoads.shift();
 
    if (!nextLoad) {
      ieCurCallback = null;
      return;
    }
 
    ieCurCallback = nextLoad[1];
    createIeLoad(nextLoad[0]);
  }
  var importLoad = function(url, callback) {
    if (!curSheet || !curSheet.addImport)
      createStyle();

    if (curSheet && curSheet.addImport) {
      // old IE
      if (ieCurCallback) {
        ieLoads.push([url, callback]);
      }
      else {
        createIeLoad(url);
        ieCurCallback = callback;
      }
    }
    else {
      // old Firefox
      curStyle.textContent = '@import "' + url + '";';

      var loadInterval = setInterval(function() {
        try {
          curStyle.sheet.cssRules;
          clearInterval(loadInterval);
          callback();
        } catch(e) {}
      }, 10);
    }
  }

  // <link> load method
  var linkLoad = function(url, callback) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    if (useOnload)
      link.onload = function() {
        link.onload = function() {};
        // for style dimensions queries, a short delay can still be necessary
        setTimeout(callback, 7);
      }
    else
      var loadInterval = setInterval(function() {
        for (var i = 0; i < document.styleSheets.length; i++) {
          var sheet = document.styleSheets[i];
          if (sheet.href == link.href) {
            clearInterval(loadInterval);
            return callback();
          }
        }
      }, 10);
    link.href = url;
    head.appendChild(link);
  }

  cssAPI.normalize = function(name, normalize) {
    if (name.substr(name.length - 4, 4) == '.css')
      name = name.substr(0, name.length - 4);

    return normalize(name);
  }

  cssAPI.load = function(cssId, req, load, config) {

    (useImportLoad ? importLoad : linkLoad)(req.toUrl(cssId + '.css'), load);

  }

  return cssAPI;
});


define('css!confirmabletextinput-css',[],function(){});
define(
    'src/ConfirmableTextInput',[
        "DomElement",
        "DomUtil",
        "Inheritance",
        "TypeCheck",
        "Failure",
        "Merge",
        "TextInput",
        "Button",
        "text!confirmabletextinput-html",
        "css!confirmabletextinput-css"
    ], function (DomElement, DomUtil, Inheritance, TypeCheck, Failure, Merge, TextInput, Button, controlHtml) {
        /**
         * Provides a text button together with the capability to confirm the input as soon as ready 
         * @alias ConfirmableTextInput 
         * @constructor
         * @param {Object} options - options object
         * @param {String} options.id - id of element
         * @param {String="Ok"} options.buttonName - Name  of the button
         * @param {Function} options.onValueChanged - Get's called if the value changed
         * @param {Function} options.onValueConfirmed - Get's called if the user is pushing the button
         */
        var ConfirmableTextInput = function (options) {
            Inheritance.inheritConstructor(DomElement, this, Merge({
                html: controlHtml,
                id: TypeCheck.isString(options.id) ? options.id : "",
                buttonName: TypeCheck.isString(options.buttonName) ? options.buttonName : "Ok",
                onValueChanged: TypeCheck.isFunction(options.onValueChanged) ? options.onValueChanged : function () { },
                onValueConfirmed: TypeCheck.isFunction(options.onValueConfirmed) ? options.onValueConfirmed : function () { }
            }, TypeCheck.isDefined(options) ? options : {}));
            var instance = this;
            this.input = new TextInput({
                onValueChanged: this.options.onValueChanged.bind(this)
            });
            this.button = new Button({
                id: this.options.id,
                name: this.options.buttonName,
                onButtonClick: function () {
                    var value = instance.input.getValue();
                    if (value !== "") {
                        instance.options.onValueConfirmed(value);
                        instance.input.removeValue();
                    }                    
                }
            });
            this.input.element.style.float = "left";
            this.element.appendChild(this.input.element);
            this.element.appendChild(this.button.element);
        };
        Inheritance.inheritPrototype(ConfirmableTextInput, DomElement);
        return ConfirmableTextInput;
    });

(function(c){var d=document,a='appendChild',i='styleSheet',s=d.createElement('style');s.type='text/css';d.getElementsByTagName('head')[0][a](s);s[i]?s[i].cssText=c:s[a](d.createTextNode(c));})
('.jean-confirmable-text-input{\r\n    \r\n}');

 	 return require('src/ConfirmableTextInput'); 
}));
