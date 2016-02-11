import React from 'react';
import echarts from 'echarts/lib/echarts';
import { StylePropable, StyleResizable } from 'material-ui/lib/mixins';

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
            mapChart: '',
            mapChartOption: ''

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
        this.state.mapChart = echarts.init(document.getElementById('AtmosphericElectricHourPage.mapChart'));
        console.log('hello world!');
    },

    render() {
        return (
            <div><h2 className='page-title'>大气电场时数据</h2>
            <div id='AtmosphericElectricHourPage.mapChart' style={{
                width: '80%',
                height: 600
            }}>hello
        </div>
        </div>);
    }
});

export default AtmosphericElectricHourPage;
