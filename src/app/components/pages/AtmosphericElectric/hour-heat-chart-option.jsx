import React from 'react';
import echarts from 'echarts/echarts-line-map';
import { AEStationNameMap, AEStationArray } from './ae-station-option';
const getAEStationNameArray = () => {
    let _temp = [];

    for ( let s of AEStationArray ) {

        if (AEStationNameMap[s]) {

            _temp.push(AEStationNameMap[s]);
        }

    }

    return _temp;
};
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
        data: getAEStationNameArray()
    },
    yAxis: {
        type: 'category',
        data: ['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60']
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
        data: [[0, 0, 5], [0, 1, 5], [0, 2, 5], [0, 11, 8], [1, 0, 6], [2, 0, 6], [15, 11, 9]],
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
