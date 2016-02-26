import React from 'react';
import echarts from 'echarts/echarts-line-map';
import { AEStationCoordMap, AEStationNameMap } from './ae-station-option';

const HourHeatChartOption = {
    tooltip: {
        position: 'top'
    },
    animation: false,
    grid: {
        height: '50%',
        y: '10%'
    },
    xAxis: {
        type: 'category',
        data: {}
    },
    yAxis: {
        type: 'category',
        data: {}
    },
    visualMap: {
        min: 1,
        max: 10,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%'
    },
    series: [{
        name: '热力图',
        type: 'heatmap',
        data: {},
        label: {
            normal: {
                show: true
            }
        },
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
};

export default HourHeatChartOption;
