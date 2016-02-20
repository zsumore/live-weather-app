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

import Checkbox from 'material-ui/lib/checkbox';
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
import TimerMixin from 'react-timer-mixin';

import ScatterChartOption from './scatter-chart-option';
import LineChartOption from './line-chart-option';
import { AEStationCoordMap, AEStationNameMap } from './ae-station-option';


const getScatterChartHeight = () => {
    let _height = window.innerHeight - 250;
    if (_height >= 510) {
        return _height;
    } else {
        return 510;
    }
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
            dateTime: getNowTime(),
            auto: true,
            warnData: {
                data: []
            },
            timer: null
        };
    },

    mixins: [StylePropable, StyleResizable, TimerMixin],


    handleChangeWarnData(param) {
        const _page = this;
        const _state = this.state;
        const scatterChart = this.state.scatterChart;
        const scatterChartOption = this.state.scatterChartOption;

        request.get('data/ae-5m-warn.json').end((err, res) => {


            let _warnData = JSON.parse(res.text);
            _page.setState({
                warnData: _warnData
            });

            scatterChartOption.series[0].data = getNormalData(convertData(_warnData.data));
            scatterChartOption.series[1].data = getWarnData(convertData(_warnData.data));
            scatterChart.setOption(scatterChartOption);
        });

    },
    handleChangeScatterChartOption(option) {

        scatterChart.setOption(option);

    },

    handleChangeTimeByMinute(event) {


        let _time = new Date();
        _time.setTime(this.state.dateTime.getTime());

        _time.setMinutes(_time.getMinutes() + parseInt(event.target.value));

        this.setState({
            dateTime: _time
        });

    },

    handleRefreshTime() {

        let _time = getNowTime();

        this.setState({
            dateTime: _time
        });
        console.log('refreshtime:' + _time);

    },

    handleCheckBoxChange(e, isInputChecked) {
        if (isInputChecked) {
            if (this.state.timer) {
                this.clearInterval(this.state.timer);
            }

            this.state.timer = this.setInterval(this.handleRefreshTime, 60000);
        } else {
            if (this.state.timer) {
                this.clearInterval(this.state.timer);
            }
        }
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
        const _state = this.state;
        const _page = this;

        this.state.timer = this.setInterval(this.handleRefreshTime, 60000);

        scatterChart.on('click', function(param) {

            let _name = AEStationNameMap[param.name];
            if (_name) {
                _state.lineChartOption.title.subtext = _name;
                _state.lineChart.setOption(_state.lineChartOption);

            }

        });
        request.get('map/json/440600.json').end((err, res) => {

            echarts.registerMap('foshan', res.text);

            _page.handleChangeWarnData(_state.dateTime);
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
              <TableHeaderColumn tooltip="预警值">预警值</TableHeaderColumn>
              <TableHeaderColumn tooltip="最后更新时间">更新时间</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
            showRowHover={true}
            stripedRows={true}
            >
            {this.state.warnData.data.map((row, index) => (
            <TableRow key={index} selected={row.selected}>
                <TableRowColumn>{AEStationNameMap[row.sid]}</TableRowColumn>
                <TableRowColumn>{row.value}</TableRowColumn>
                <TableRowColumn>{row.last_time}</TableRowColumn>
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
            <Box width='100%' justifyContent='space-between'>
            <Box alignItems='center' style={{
                height: 50
            }}>
            <IconButton tooltip="-5分钟" tooltipPosition='top-center'  value={-5}  onClick={this.handleChangeTimeByMinute} >
            <NavigationArrowBack  />
            </IconButton>
            <IconButton tooltip="-1分钟"  tooltipPosition='top-center' value={-1}  onClick={this.handleChangeTimeByMinute}>
            <NavigationChevronLeft  />
            </IconButton>
            <Datetime dateFormat='YYYY-MM-DD' timeFormat='HH:mm' locale='zh_cn' value={this.state.dateTime} />
            <IconButton tooltip="+1分钟" tooltipPosition='top-center' value={1}  onClick={this.handleChangeTimeByMinute}>
            <NavigationChevronRight />
            </IconButton>
            <IconButton tooltip="+5分钟"  tooltipPosition='top-center' value={5}  onClick={this.handleChangeTimeByMinute}>
            <NavigationArrowForward />
            </IconButton>
            <IconButton tooltip="刷新"  tooltipPosition='top-center'  onClick={this.handleRefreshTime}>
            <NavigationRefresh color={Colors.green500} />
            </IconButton>
            </Box>
            <Box alignItems='center' style={{
                height: 50,
                width: 120
            }}>
            <Checkbox
            label="自动更新"
            defaultChecked={this.state.auto}
            onCheck={this.handleCheckBoxChange}
            />
            </Box>
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
