import React from 'react';
import echarts from 'echarts/echarts-line-map';

import { ClearFix } from 'material-ui';
import { StylePropable, StyleResizable } from 'material-ui/lib/mixins';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import Colors from 'material-ui/lib/styles/colors';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';

import NavigationRefresh from 'material-ui/lib/svg-icons/navigation/refresh';
import NavigationChevronLeft from 'material-ui/lib/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import NavigationArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back';
import NavigationArrowForward from 'material-ui/lib/svg-icons/navigation/arrow-forward';
import IconButton from 'material-ui/lib/icon-button';

import request from 'superagent/lib/client';
import { Box } from 'react-layout-components/lib';

import Datetime from 'react-datetime';
import zh_cn from 'moment/locale/zh-cn';

import ScatterChartOption from './scatter-chart-option';
import LineChartOption from './line-chart-option';
import { AEStationCoordMap, AEStationNameMap } from './ae-station-option';


const getScatterChartHeight = () => {
    return window.innerHeight - 250;
};

const getLineChartWidth = (isClose) => {
    if (isClose)
        return window.innerWidth - getScatterChartHeight();
    return window.innerWidth - 280 - getScatterChartHeight();
};

const convertData = (data) => {
    let res = [];
    for (let i = 0; i < data.length; i++) {

        let geoCoord = AEStationCoordMap[data[i].sid];

        if (geoCoord) {

            let geoStaion = AEStationNameMap[data[i].sid];
            if (geoStaion) {
                // let _concatValue=geoCoord.concat(data[i].value);

                res.push({
                    name: data[i].sid,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
    }

    return res;
};


const getWarnData = (data) => {
    let res = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].value[2] > 20) {
            res.push(data[i]);
        }
    }
    return res;
};


const getNormalData = (data) => {
    let res = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].value[2] <= 20) {
            res.push(data[i]);
        }
    }
    return res;
};

const getNowTime = () => {
    let _date = new Date();
    _date.setSeconds(0);
    _date.setMilliseconds(0);
    return _date;
};


const iconStyles = {
    marginTop: 8
};

const tableData = [
    {
        name: 'John Smith',
        status: 'Employed',
        selected: true,
    },
    {
        name: 'Randal White',
        status: 'Unemployed',
    },
    {
        name: 'Stephanie Sanders',
        status: 'Employed',
        selected: true,
    },
    {
        name: 'Steve Brown',
        status: 'Employed',
    },
    {
        name: 'Joyce Whitten',
        status: 'Employed',
    },
    {
        name: 'Samuel Roberts',
        status: 'Employed',
    },
    {
        name: 'Adam Moore',
        status: 'Employed',
    }
];

const AtmosphericElectricHourPage = React.createClass({

    propTypes: {
        onChangeMuiTheme: React.PropTypes.func,
        isLeftNavClose: React.PropTypes.bool

    },

    contextTypes: {
        muiTheme: React.PropTypes.object
    },

    getInitialState() {
        return {
            leftNavClose: true,
            scatterChart: {},
            scatterChartOption: ScatterChartOption,
            scatterChartHeight: getScatterChartHeight(),
            lineChart: {},
            lineChartOption: LineChartOption,
            lineChartWidth: getLineChartWidth(true),
            dateTime: getNowTime()
        };
    },

    mixins: [StylePropable, StyleResizable],


    handleChangeMapChartOption(option) {

        scatterChart.setOption(option);

    },

    handleChangeTimeByMinute(event) {

        console.log('调整时间:' + event.target.value);

    },

    componentWillReceiveProps(nextProps, nextContext) {
        const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
        this.setState({
            muiTheme: newMuiTheme,
            leftNavClose: this.props.isLeftNavClose !== nextProps.isLeftNavClose ? nextProps.isLeftNavClose : this.state.leftNavClose

        });

        this.state.lineChart.resize();
    },


    componentDidMount() {
        const scatterChart = this.state.scatterChart = echarts.init(document.getElementById('AtmosphericElectricHourPage.scatterChart'));
        const scatterChartOption = this.state.scatterChartOption;

        scatterChart.on('click', function(param) {
            let selected = param;
            console.log(selected);
        });
        request.get('map/json/440600.json').end((err, res) => {

            echarts.registerMap('foshan', res.text);
            scatterChartOption.series[0].data = getNormalData(convertData([
                {
                    sid: '59828',
                    value: 30
                },
                {
                    sid: 'AE2267',
                    value: 20
                },
                {
                    sid: 'AE2213',
                    value: 30
                },
                {
                    sid: 'AE6834',
                    value: 32
                }, {
                    sid: 'AE2264',
                    value: 0
                },
                {
                    sid: 'AE2262',
                    value: -1
                },
                {
                    sid: 'AE2270',
                    value: 18
                }, {
                    sid: 'AE2229',
                    value: 9
                },
                {
                    sid: 'AE6963',
                    value: 22
                },
                {
                    sid: 'AE6946',
                    value: 20
                }, {
                    sid: 'AE2224',
                    value: 10
                },
                {
                    sid: 'AE6949',
                    value: 12
                },
                {
                    sid: 'AE7019',
                    value: -999
                }, {
                    sid: 'AE7032',
                    value: 9
                },
                {
                    sid: 'AE7031',
                    value: 25
                }
            ]));
            scatterChartOption.series[1].data = getWarnData(convertData([
                {
                    sid: '59828',
                    value: 30
                },
                {
                    sid: 'AE2267',
                    value: 20
                },
                {
                    sid: 'AE2213',
                    value: 30
                },
                {
                    sid: 'AE6834',
                    value: 32
                }, {
                    sid: 'AE2264',
                    value: 0
                },
                {
                    sid: 'AE2262',
                    value: -1
                },
                {
                    sid: 'AE2270',
                    value: 18
                }, {
                    sid: 'AE2229',
                    value: 9
                },
                {
                    sid: 'AE6963',
                    value: 22
                },
                {
                    sid: 'AE6946',
                    value: 20
                }, {
                    sid: 'AE2224',
                    value: 10
                },
                {
                    sid: 'AE6949',
                    value: 12
                },
                {
                    sid: 'AE7019',
                    value: -999
                }, {
                    sid: 'AE7032',
                    value: 9
                },
                {
                    sid: 'AE7031',
                    value: 25
                }
            ]));
            scatterChart.setOption(scatterChartOption);
        });

        this.state.lineChart = echarts.init(document.getElementById('AtmosphericElectricHourPage.lineChart'));
        this.state.lineChart.setOption(this.state.lineChartOption);

    },

    render() {
        return (
            <div><h2 className='page-title'>大气电场时数据</h2>
            
            <Box width='100%'  justifyContent='space-around' alignItems='flex-start'  column={false} reverse={false}>
            <Box  flex={1} style={{
                width: this.state.lineChartWidth,
                height: this.state.scatterChartHeight + 50
            }} column>
             <Box id='AtmosphericElectricHourPage.lineChart'  style={{
                width: '95%',
                height: (this.state.scatterChartHeight + 50) * 0.6
            }}>
       </Box>
            <Box style={{
                width: '95%',
                height: (this.state.scatterChartHeight + 50) * 0.4,
                marginRight: 50
            }}>
          <Table
            width={'100%'}
            fixedHeader={false}
            selectable={true}
            multiSelectable={false}
            onRowSelection={this._onRowSelection}
            >
          <TableHeader enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{
                textAlign: 'center'
            }}>
                Super Header
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="站名">站名</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={true}
            showRowHover={true}
            stripedRows={true}
            >
            {tableData.map((row, index) => (
            <TableRow key={index} selected={row.selected}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.status}</TableRowColumn>
              </TableRow>
            ))}
            </TableBody>
            </Table>
            </Box>
            </Box>
            <Box style={{
                width: this.state.scatterChartHeight,
                height: this.state.scatterChartHeight + 50
            }} column>
            <Box width='100%' alignItems='center' style={{
                height: 50
            }}>
            <IconButton tooltip="-5分钟" touch={true}  value={-5} tooltipPosition='top-center' onClick={this.handleChangeTimeByMinute} >
            <NavigationArrowBack  />
            </IconButton>
            <IconButton tooltip="-1分钟"  tooltipPosition='top-center'>
            <NavigationChevronLeft  />
            </IconButton>
            <Datetime dateFormat='YYYY-MM-DD' timeFormat='HH:mm' locale='zh_cn' value={this.state.dateTime} />
            <IconButton tooltip="+1分钟" tooltipPosition='top-center'>
            <NavigationChevronRight />
            </IconButton>
            <IconButton tooltip="+5分钟" touch={true} tooltipPosition='top-center'>
            <NavigationArrowForward />
            </IconButton>
            <IconButton tooltip="刷新" touch={true} tooltipPosition='top-center'>
            <NavigationRefresh color={Colors.green500} />
            </IconButton>
           
            </Box>
            <Box id='AtmosphericElectricHourPage.scatterChart'   style={{
                width: this.state.scatterChartHeight,
                height: this.state.scatterChartHeight
            }} />
            </Box>
            </Box>
         
    
        </div>);
    }
});

export default AtmosphericElectricHourPage;
