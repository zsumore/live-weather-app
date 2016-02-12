define(function (require) {
    var echarts = require('./lib/echarts');

    require('./lib/chart/line');
    require('./lib/chart/bar');
    require('./lib/component/grid');
    require('./lib/chart/pie');
    require('./lib/chart/scatter');
    require('./lib/component/tooltip');
    require('./lib/component/polar');
    require('./lib/chart/radar');

    require('./lib/component/legend');

    require('./lib/chart/map');
    require('./lib/chart/treemap');
    require('./lib/chart/graph');
    require('./lib/chart/gauge');
    require('./lib/chart/funnel');
    require('./lib/chart/parallel');
    require('./lib/chart/sankey');
    require('./lib/chart/boxplot');
    require('./lib/chart/candlestick');
    require('./lib/chart/effectScatter');
    require('./lib/chart/lines');
    require('./lib/chart/heatmap');

    require('./lib/component/geo');
    require('./lib/component/parallel');

    require('./lib/component/title');

    require('./lib/component/dataZoom');
    require('./lib/component/visualMap');

    require('./lib/component/markPoint');
    require('./lib/component/markLine');

    require('./lib/component/timeline');
    require('./lib/component/toolbox');

    require('zrenderjs/vml/vml');

    return echarts;
});
