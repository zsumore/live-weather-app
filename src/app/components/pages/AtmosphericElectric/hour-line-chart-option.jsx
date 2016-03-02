import React from 'react';
import echarts from 'echarts/echarts-line-map';
import { AEStationCoordMap, AEStationNameMap } from './ae-station-option';

const HourLineChartOption = {
    title: {
        text: '大气电场预警值',
        subtext: '佛山气象局（季华）',
        x: 'center',
        align: 'right'
    },
    grid: {
        bottom: 80
    },

    toolbox: {
        show: true,
        orient: 'vertical',
        top: 'top',
        left: 'right',
        feature: {
            dataZoom: {
                show: true
            },
            dataView: {
                show: true
            },
            magicType: {
                show: true,
                type: ['line', 'bar']
            },
            restore: {},
            saveAsImage: {}
        }
    },
    tooltip: {
        trigger: 'axis',
        formatter: (params) => {
            // console.log(params);
            return params[0].name + '<br />'
                + params[0].seriesName + ' : ' + params[0].value + '次';

        },
        axisPointer: {
            animation: false
        }
    },
    legend: {
        data: ['预警值'],

        top: 'top',
        left: 'left'
    },
    xAxis: [
        {

            name: '时间',

            axisLine: {
                onZero: true
            },
            data: ['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60']
        }
    ],
    yAxis: [
        {
            name: '预警值(次)',
            type: 'value'
        }
    ],
    series: [
        {
            name: '预警值',
            type: 'bar',
            hoverAnimation: false,

            lineStyle: {
                normal: {
                    width: 1
                }
            },
            data: []
        }
    ]
};

export default HourLineChartOption;
