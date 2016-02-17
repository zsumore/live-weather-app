import React from 'react';
import echarts from 'echarts/echarts-line-map';
import { StylePropable, StyleResizable } from 'material-ui/lib/mixins';
import request from 'superagent/lib/client';

function getMapChartHeight() {

    return window.innerHeight - 250;

}

const AtmosphericElectricDatePage = React.createClass({

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
            mapChartOption: {},
            mapChartHeight: getMapChartHeight(),
            mapChartWidth: getMapChartHeight()

        };
    },

    mixins: [StylePropable, StyleResizable],


    handleChangeMapChartOption(option) {

        mapChart.setOption(option);

    },



    componentDidMount() {
        const mapChart = this.state.mapChart = echarts.init(document.getElementById('AtmosphericElectricHourPage.mapChart'));
        request.get('map/json/440600.json').end(function(err, res) {

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
            <div><h2 className='page-title'>大气电场日数据</h2>
            <div>hello</div>
            <div id='AtmosphericElectricHourPage.mapChart' style={{
                width: this.state.mapChartWidth,
                height: this.state.mapChartHeight

            }}>
        </div>
        </div>);
    }
});

export default AtmosphericElectricDatePage;
