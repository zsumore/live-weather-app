import React from 'react';
import echarts from 'echarts/echarts-line-map';
import { AEStationCoordMap, AEStationNameMap } from './ae-station-option';

const NowMapChartOption = {
    backgroundColor: '#404a59',
    title: {
        text: '佛山大气电场预警',
        left: 'center',
        textStyle: {
            color: '#fff'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: (params, ticket, callback) => {

            let content = '站点：' + AEStationNameMap[params.name] + '<br />' + '经纬度：' + params.value[0] + ',' + params.value[1] + '<br />' + '预警值：' + params.value[2];

            return content;
        }
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        top: 'top',
        left: 'right',
        feature: {
            dataZoom: {
                show: false
            },
            dataView: {
                show: true
            },
            magicType: {
                show: false
            },
            restore: {
                show: false
            },
            saveAsImage: {
                backgroundColor: 'white'
            }
        },
        iconStyle: {
            normal: {
                borderColor: '#eceff1',
                color: 'none'
            },
            emphasis: {
                borderColor: '#3E98C5'
            }
        }
    },
    legend: {
        orient: 'vertical',
        top: 'bottom',
        left: 'right',
        data: [{
            name: '橙色以上',
            // 强制设置图形为圆。
            icon: 'circle',
            textStyle: {
                color: 'white'
            }
        }
            , {
                name: '黄色以下',
                icon: 'circle',
                // 设置文本为红色
                textStyle: {
                    color: 'white'
                }
            }]

    },
    visualMap: {
        type: 'piecewise',
        pieces: [{
            min: 30,
            color: '#ff5252'
        }, {
            min: 20,
            max: 30,
            color: '#ffab40'
        }, {
            min: 10,
            max: 20,
            color: '#ffff00'
        }, {
            min: 0,
            max: 10,
            color: '#40c4ff'
        }, {
            max: 0,
            color: '#fafafa'
        }],
        calculable: true,
        //color: ['#d94e5d', '#eac736', '#50a3ba'],
        textStyle: {
            color: '#fff'
        }
    },
    geo: {
        map: 'foshan',
        label: {
            emphasis: {
                show: false
            }
        },
        itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#111'
            },
            emphasis: {
                areaColor: '#2a333d'
            }
        }
    },
    series: [
        {
            name: '黄色以下',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [],
            symbolSize: 10,
            label: {
                normal: {

                    position: 'right',
                    show: false,
                    formatter: (params, ticket, callback) => {

                        return AEStationNameMap[params.name];
                    }
                },
                emphasis: {
                    show: true,

                    formatter: (params, ticket, callback) => {

                        return AEStationNameMap[params.name];
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#ffff00'
                }
            },
            color: ['#ffff00']
        },
        {
            name: '橙色以上',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: [],
            symbolSize: 10,
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {

                    position: 'right',
                    show: true,
                    formatter: (params, ticket, callback) => {

                        return AEStationNameMap[params.name];
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#ffab40',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 1,
            color: ['#ffab40']
        }
    ]
};

export default NowMapChartOption;
