define(function(require) {
var echarts = require('./lib/echarts');

require('./lib/chart/line');


require('./lib/chart/map');
require('./lib/component/geo');

require('./lib/chart/scatter');
require('./lib/component/visualMap');


require('./lib/component/tooltip');
require('./lib/component/legend');

require('./lib/component/grid');
require('./lib/component/title');

require('./lib/component/markPoint');
require('./lib/component/markLine');
require('./lib/component/dataZoom');
require('./lib/component/toolbox');

require('zrenderjs/vml/vml');

return echarts;
});
