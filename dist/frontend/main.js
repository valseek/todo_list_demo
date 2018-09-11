'use strict';

var _index = require('./apps/index');

var _index2 = _interopRequireDefault(_index);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

require('./style/common.css');

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _edit = require('./apps/edit');

var _edit2 = _interopRequireDefault(_edit);

var _list = require('./apps/list');

var _list2 = _interopRequireDefault(_list);

var _vueSvgicon = require('vue-svgicon');

var _vueSvgicon2 = _interopRequireDefault(_vueSvgicon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routers = [{
    path: "/edit",
    component: _edit2.default
}, {
    path: "/list",
    component: _list2.default
}];

var router = new _vueRouter2.default({ routes: routers });

_vue2.default.use(_vueRouter2.default);
_vue2.default.use(_vueSvgicon2.default, {
    tagName: 'svgicon'
});

new _vue2.default({
    el: "#vue-app",
    router: router,
    render: function render(h) {
        return h(_index2.default);
    }
});
//# sourceMappingURL=main.js.map