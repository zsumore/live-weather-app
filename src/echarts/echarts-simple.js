define(function (require) {
    var echarts = require('./lib/echarts');

    require('./lib/chart/line');
    require('./lib/chart/bar');
    require('./lib/chart/pie');
    require('./lib/component/grid');

    return echarts;
});


