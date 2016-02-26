import React from 'react';
import echarts from 'echarts/echarts-line-map';
import { StylePropable, StyleResizable } from 'material-ui/lib/mixins';
import request from 'superagent/lib/client';

function getMapChartHeight() {

    return window.innerHeight - 250;

}

const AtmosphericElectricMonthPage = React.createClass({

    propTypes: {
        onChangeMuiTheme: React.PropTypes.func,
        onChangeMapChartOption: React.PropTypes.func
    },

    contextTypes: {
        muiTheme: React.PropTypes.object
    },

    getInitialState() {
        return {

        };
    },

    mixins: [StylePropable, StyleResizable],


    handleChangeMapChartOption(option) {

        mapChart.setOption(option);

    },



    componentDidMount() {},

    render() {
        return (
            <div><h2 className='page-title'>大气电场月数据</h2>
            <div>开发中</div>
            <div id='AtmosphericElectricHourPage.mapChart' style={{
                width: this.state.mapChartWidth,
                height: this.state.mapChartHeight

            }}>
        </div>
        </div>);
    }
});

export default AtmosphericElectricMonthPage;
