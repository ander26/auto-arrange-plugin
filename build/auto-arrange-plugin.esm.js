/*!
* rete-auto-arrange-plugin v0.3.0 
* (c) 2019 Vitaliy Stoliarov 
* Released under the MIT license.
*/
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var AutoArrange =
/*#__PURE__*/
function () {
  function AutoArrange(editor, margin, depth) {
    _classCallCheck(this, AutoArrange);

    this.editor = editor;
    this.margin = margin;
    this.depth = depth;
  }

  _createClass(AutoArrange, [{
    key: "getNodes",
    value: function getNodes(node) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'output';
      var nodes = [];
      var key = "".concat(type, "s");
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = node[key].values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var io = _step.value;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = io.connections.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var connection = _step2.value;
              nodes.push(connection[type === 'input' ? 'output' : 'input'].node);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return nodes;
    }
  }, {
    key: "getNodesTable",
    value: function getNodesTable(node) {
      var _this = this;

      var cols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      if (this.depth && depth > this.depth) return;
      if (!cols[depth]) cols[depth] = [];
      if (cols[depth].includes(node)) return;
      cols[depth].push(node);
      this.getNodes(node, 'output').map(function (n) {
        return _this.getNodesTable(n, cols, depth + 1);
      });
      this.getNodes(node, 'input').map(function (n) {
        return _this.getNodesTable(n, cols, depth - 1);
      });
      return cols;
    }
  }, {
    key: "nodeSize",
    value: function nodeSize(node) {
      var el = this.editor.view.nodes.get(node).el;
      return {
        width: el.clientWidth,
        height: el.clientHeight
      };
    }
  }, {
    key: "arrange",
    value: function arrange() {
      var _this2 = this;

      var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.editor.nodes[0];

      var completePaths = _toConsumableArray(this.editor.nodes);
      var maximumHeight = 0;
      var heightOffset = 0;

      var _loop = function _loop() {

        var table = _this2.getNodesTable(completePaths[0]); // completePaths = completePaths.filter(x => !table[0].includes(x));


        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = table[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var individualTable = _step3.value;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = individualTable[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var _node = _step4.value;
                counterNumber = 0;
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                  for (var _iterator5 = completePaths[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var nodes = _step5.value;

                    if (_node == nodes) {
                      completePaths.splice(counterNumber, 1);
                    }

                    counterNumber++;
                  }
                } catch (err) {
                  _didIteratorError5 = true;
                  _iteratorError5 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                      _iterator5["return"]();
                    }
                  } finally {
                    if (_didIteratorError5) {
                      throw _iteratorError5;
                    }
                  }
                }
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                  _iterator4["return"]();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        var normalized = Object.keys(table).sort(function (i1, i2) {
          return +i1 - +i2;
        }).map(function (key) {
          return table[key];
        });
        var widths = normalized.map(function (col) {
          return Math.max.apply(Math, _toConsumableArray(col.map(function (n) {
            return _this2.nodeSize(n).width;
          })));
        });
        var x = _this2.margin.x;

        for (var _i = 0, _Object$entries = Object.entries(normalized); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              i = _Object$entries$_i[0],
              col = _Object$entries$_i[1];

          var heights = col.map(function (n) {
            return _this2.nodeSize(n).height;
          });
          var fullHeight = heights.reduce(function (a, b) {
            return a + b + _this2.margin.y;
          });
          var y = 0;

          for (var _i2 = 0, _Object$entries2 = Object.entries(col); _i2 < _Object$entries2.length; _i2++) {
            var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
                j = _Object$entries2$_i[0],
                n = _Object$entries2$_i[1];

            if (j == 0) {
              y += heights[j] + _this2.margin.y + heightOffset;
            } else {
              y += heights[j] + _this2.margin.y;
            }

            maximumHeight = Math.max(maximumHeight, y); // this.editor.view.nodes.get(n).translate(x, y - fullHeight / 2);

            _this2.editor.view.nodes.get(n).translate(x, y);

            _this2.editor.view.updateConnections({
              node: n
            });
          }

          x += widths[i] + _this2.margin.x;
        }

        heightOffset = maximumHeight + 50;
      };

      while (completePaths.length > 0) {
        var counterNumber;

        _loop();
      }
    }
  }]);

  return AutoArrange;
}();

function install(editor, _ref) {
  var _ref$margin = _ref.margin,
      margin = _ref$margin === void 0 ? {
    x: 50,
    y: 50
  } : _ref$margin,
      _ref$depth = _ref.depth,
      depth = _ref$depth === void 0 ? null : _ref$depth;
  editor.bind('arrange');
  var ar = new AutoArrange(editor, margin, depth);
  editor.on('arrange', function (_ref2) {
    var node = _ref2.node;
    return ar.arrange(node);
  });

  editor.arrange = function (node) {
    console.log("Deprecated: use editor.trigger('arrange', { node }) instead");
    ar.arrange(node);
  };
}

var index = {
  name: 'auto-arrange',
  install: install
};

export default index;
//# sourceMappingURL=auto-arrange-plugin.esm.js.map
