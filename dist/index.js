(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactLoadBar"] = factory(require("react"));
	else
		root["ReactLoadBar"] = factory(root["React"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var Spinner_1 = __webpack_require__(4);
__webpack_require__(1);
var inRange = function (percent) { return percent > 1 && percent < 100; };
var BarState;
(function (BarState) {
    BarState[BarState["Visible"] = 1] = "Visible";
    BarState[BarState["Hidden"] = 2] = "Hidden";
})(BarState || (BarState = {}));
var LoadBar = (function (_super) {
    __extends(LoadBar, _super);
    function LoadBar(props) {
        var _this = _super.call(this, props) || this;
        _this.componentWillReceiveProps(props);
        return _this;
    }
    LoadBar.prototype.componentWillReceiveProps = function (nextProps) {
        var _a = (this.state || {}).barState, barState = _a === void 0 ? BarState.Hidden : _a;
        var isValidPercent = inRange(nextProps.percent);
        var newPercent = nextProps.percent || 1;
        var newBarState = barState;
        switch (barState) {
            case BarState.Hidden:
                if (isValidPercent) {
                    newBarState = BarState.Visible;
                }
                else {
                    newPercent = 1;
                }
                break;
            case BarState.Visible:
                if (!isValidPercent) {
                    newPercent = Math.max(1, Math.min(100, nextProps.percent));
                    newBarState = BarState.Hidden;
                }
                break;
            default:
                throw new Error("Unknown BarState: " + barState);
        }
        newPercent = +newPercent.toFixed(2);
        if (!this.state) {
            this.state = { barState: newBarState, prevBarState: barState, percent: newPercent };
        }
        else {
            this.setState({ barState: newBarState, prevBarState: barState, percent: newPercent });
        }
    };
    LoadBar.prototype.render = function () {
        var _a = this.props, barStyle = _a.barStyle, onVisibilityChange = _a.onVisibilityChange, _b = _a.showSpinner, showSpinner = _b === void 0 ? true : _b, _c = _a.spinnerStyle, spinnerStyle = _c === void 0 ? {} : _c;
        var _d = this.state, percent = _d.percent, barState = _d.barState, prevBarState = _d.prevBarState;
        var isVisible = barState === BarState.Visible;
        var wrapStyle = { opacity: !isVisible ? 0 : 1 };
        if (isVisible && prevBarState === BarState.Hidden) {
            wrapStyle.transition = 'none';
        }
        if (onVisibilityChange) {
            if (prevBarState === BarState.Hidden && isVisible) {
                onVisibilityChange(true);
            }
            else if (prevBarState === BarState.Visible && !isVisible) {
                onVisibilityChange(false);
            }
        }
        return (React.createElement("div", { className: 'loadbar-wrap', style: wrapStyle },
            showSpinner && React.createElement(Spinner_1.default, { style: spinnerStyle }),
            React.createElement("div", { className: 'loadbar-progress', style: __assign({}, barStyle, { width: Math.max(1, Math.min(100, percent)) + "%" }) })));
    };
    return LoadBar;
}(React.Component));
exports.LoadBar = LoadBar;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LoadBar_1 = __webpack_require__(2);
exports.LoadBar = LoadBar_1.LoadBar;
var SimulatedLoadBar_1 = __webpack_require__(5);
exports.SimulatedLoadBar = SimulatedLoadBar_1.SimulatedLoadBar;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
__webpack_require__(1);
var Spinner = (function (_super) {
    __extends(Spinner, _super);
    function Spinner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Spinner.prototype.render = function () {
        return React.createElement("div", { className: 'loadbar-spinner', style: this.props.style });
    };
    return Spinner;
}(React.Component));
exports.default = Spinner;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var LoadBar_1 = __webpack_require__(2);
__webpack_require__(1);
var TRANS_TIME_DELAY_MS = 850;
var MIN_TICK_INTERVAL = 20;
var MAX_PCT = 95;
var defaultProps = {
    onPercentChange: function () {
        return;
    },
    timeMs: 4000,
    numTicks: 40,
    isLoading: true
};
var SimulatedLoadBar = (function (_super) {
    __extends(SimulatedLoadBar, _super);
    function SimulatedLoadBar(props) {
        var _this = _super.call(this, props) || this;
        _this._timeout = 0;
        _this.init(props);
        return _this;
    }
    SimulatedLoadBar.prototype.init = function (props) {
        var _this = this;
        var attrs = __assign({}, props);
        var numTicks = attrs.numTicks || defaultProps.numTicks;
        var timeMs = (attrs.timeMs || defaultProps.timeMs);
        var tickIntervalMs = Math.max(MIN_TICK_INTERVAL, timeMs / numTicks);
        numTicks = timeMs / tickIntervalMs;
        var newState = { tickIntervalMs: tickIntervalMs, step: MAX_PCT / numTicks };
        var isLoading = typeof attrs.isLoading === 'boolean' ? attrs.isLoading : defaultProps.isLoading;
        if (this.state) {
            this.setState(newState);
        }
        else {
            this.state = __assign({}, newState, { percent: 1, isLoading: isLoading });
        }
        clearInterval(this._timeout);
        if (isLoading && tickIntervalMs) {
            var cb = function () {
                var percent = Math.min(MAX_PCT, _this.state.percent + _this.state.step);
                _this.setState({ percent: percent, isLoading: isLoading });
                if (attrs.onPercentChange) {
                    attrs.onPercentChange(percent);
                }
                if (percent === MAX_PCT) {
                    clearInterval(_this._timeout);
                }
            };
            this._timeout = setInterval(cb, this.state.tickIntervalMs);
        }
        else if (!isLoading && this.state.isLoading) {
            this.setState({ percent: 100, isLoading: isLoading }, function () {
                var cb = function () { return _this.setState({ percent: 1 }); };
                setTimeout(cb, TRANS_TIME_DELAY_MS);
            });
            if (attrs.onPercentChange) {
                attrs.onPercentChange(100);
            }
        }
    };
    SimulatedLoadBar.prototype.componentWillReceiveProps = function (nextProps) {
        this.init(nextProps);
    };
    SimulatedLoadBar.prototype.componentWillUnmount = function () {
        clearInterval(this._timeout);
    };
    SimulatedLoadBar.prototype.render = function () {
        return React.createElement(LoadBar_1.LoadBar, __assign({}, this.props, { percent: this.state.percent }));
    };
    return SimulatedLoadBar;
}(React.Component));
exports.SimulatedLoadBar = SimulatedLoadBar;


/***/ })
/******/ ]);
});