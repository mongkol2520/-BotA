webpackJsonp([4],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/* globals XMLHttpRequest */
	
	var xin = __webpack_require__(1);
	
	var XHR = function (_xin$Component) {
	  _inherits(XHR, _xin$Component);
	
	  function XHR() {
	    _classCallCheck(this, XHR);
	
	    return _possibleConstructorReturn(this, (XHR.__proto__ || Object.getPrototypeOf(XHR)).apply(this, arguments));
	  }
	
	  _createClass(XHR, [{
	    key: '_urlChanged',
	    value: function _urlChanged() {
	      this.debounce('__request', this.__request, this.debounceDuration);
	    }
	  }, {
	    key: '_asChanged',
	    value: function _asChanged() {
	      this.debounce('__request', this.__request, this.debounceDuration);
	    }
	  }, {
	    key: '__request',
	    value: function __request() {
	      var url = this.generateUrl();
	      if (!url) {
	        return;
	      }
	
	      return this.request({
	        method: this.method,
	        url: url,
	        as: this.as
	      }).then(function (xhr) {
	        this.fire('response', {
	          body: xhr.body,
	          xhr: xhr
	        });
	      }.bind(this), function (err) {
	        this.fire('error', {
	          error: err,
	          xhr: err.xhr
	        });
	      }.bind(this));
	    }
	  }, {
	    key: 'generateUrl',
	    value: function generateUrl() {
	      return this.url;
	    }
	  }, {
	    key: '__prepareOptions',
	    value: function __prepareOptions(options) {
	      options = options || {};
	      options.method = (options.method || 'get').toUpperCase();
	      return options;
	    }
	  }, {
	    key: 'request',
	    value: function request(options) {
	      var _this2 = this;
	
	      options = this.__prepareOptions(options);
	
	      return new Promise(function (resolve, reject) {
	        var xhr = new XMLHttpRequest();
	        var doResolve = function doResolve() {
	          _this2.set('response', xhr.responseBody);
	          resolve(xhr);
	        };
	        var doReject = function doReject(err) {
	          _this2.set('error', err);
	          reject(err);
	        };
	
	        try {
	          xhr.open(options.method, options.url, options.async || true);
	          xhr.onload = function () {
	            var handleAs = options.as;
	            if (handleAs === 'intelligent') {
	              var contentType = xhr.getResponseHeader('Content-Type');
	              if (contentType.indexOf('json') >= 0) {
	                handleAs = 'json';
	              } else if (contentType.indexOf('html') >= 0) {
	                handleAs = 'html';
	              } else if (contentType.indexOf('xml') >= 0) {
	                handleAs = 'xml';
	              } else {
	                handleAs = 'text';
	              }
	            }
	            if (xhr.status >= 200 && xhr.status < 400) {
	              switch (handleAs) {
	                case 'json':
	                  try {
	                    xhr.responseBody = JSON.parse(xhr.responseText);
	                  } catch (err) {
	                    return doReject(err);
	                  }
	                  break;
	                case 'xml':
	                  xhr.responseBody = xhr.responseXML;
	                  break;
	                default:
	                  xhr.responseBody = xhr.response;
	                  break;
	              }
	              doResolve();
	            } else {
	              doReject(new Error('Http status ' + xhr.status));
	            }
	          };
	          xhr.onerror = doReject;
	          xhr.send(options.body);
	        } catch (err) {
	          doReject(err);
	        }
	      });
	    }
	  }, {
	    key: 'props',
	    get: function get() {
	      return {
	        method: {
	          type: String,
	          value: 'get'
	        },
	
	        url: {
	          type: String,
	          observer: '_urlChanged'
	        },
	
	        as: {
	          type: String,
	          value: 'intelligent',
	          observer: '_asChanged'
	        },
	
	        debounceDuration: {
	          type: Number,
	          value: 0
	        },
	
	        request: {
	          type: Object,
	          notify: true
	        },
	
	        response: {
	          type: Object,
	          notify: true
	        },
	
	        error: {
	          type: Object,
	          notify: true
	        }
	      };
	    }
	  }]);
	
	  return XHR;
	}(xin.Component);
	
	xin.define('xin-xhr', XHR);
	xin.XHR = XHR;
	
	module.exports = XHR;

/***/ }
]);
//# sourceMappingURL=xhr.js.map