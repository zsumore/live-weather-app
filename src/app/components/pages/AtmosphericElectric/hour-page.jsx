import React from 'react';
import echarts from 'echarts/echarts-all';
import { StylePropable, StyleResizable } from 'material-ui/lib/mixins';
import request from 'superagent/lib/client';

const AtmosphericElectricHourPage = React.createClass({

    propTypes: {
        onChangeMuiTheme: React.PropTypes.func,
        onChangeMapChartOption: React.PropTypes.func
    },

    contextTypes: {
        muiTheme: React.PropTypes.object
    },

    getInitialState() {
        return {
            mapChart: {},
            mapChartOption: {}

        };
    },

    mixins: [StylePropable, StyleResizable],


    handleChangeMapChartOption(option) {

        mapChart.setOption(option);

    },

    /**
    $.get('map/json/440600.json', function(foshanJson) {
            echarts.registerMap('foshan', foshanJson);
            var chart = echarts.init(document.getElementById('main'));
            chart.setOption({
                series: [{
                    type: 'map',
                    map: 'foshan'
                }]
            });
        });
        */
    componentDidMount() {
        const mapChart = this.state.mapChart = echarts.init(document.getElementById('AtmosphericElectricHourPage.mapChart'));
        request.get('map/json/440600.json').end(function(err, res) {
            //console.log(res);
            //console.log(res.text);

            echarts.registerMap('foshan', res.text);
            mapChart.setOption({
                series: [{
                    type: 'map',
                    map: 'foshan'
                }]
            });
        });

    },

    render() {
        return (
            <div><h2 className='page-title'>大气电场时数据</h2>
            <div>hello</div>
            <div id='AtmosphericElectricHourPage.mapChart' style={{
                width: '80%',
                height: 600
            }}>
        </div>
        </div>);
    }
});

export default AtmosphericElectricHourPage;
