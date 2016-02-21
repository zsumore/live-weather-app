import React from 'react';
import echarts from 'echarts/echarts-line-map';
import { AEStationCoordMap, AEStationNameMap } from './ae-station-option';

const LineChartOption = {
    title: {
        text: '大气电场值折线图',
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
                show: false
            },
            restore: {},
            saveAsImage: {}
        }
    },
    tooltip: {
        trigger: 'axis',
        formatter: (params) => {
            return params[0].name + '<br/>'
                + params[0].seriesName + ' : ' + params[0].value + ' (KV/m)';

        },
        axisPointer: {
            animation: false
        }
    },
    legend: {
        data: ['电场值'],

        top: 'top',
        left: 'left'
    },
    dataZoom: [
        {
            show: true,
            realtime: true,
            start: 60,
            end: 80
        },
        {
            type: 'inside',
            realtime: true,
            start: 60,
            end: 80
        }
    ],
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            axisLine: {
                onZero: false
            },
            data: []
        }
    ],
    yAxis: [
        {
            name: '电场值(KV/m)',
            type: 'value'
        }
    ],
    series: [
        {
            name: '电场值',
            type: 'line',
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

export default LineChartOption;
