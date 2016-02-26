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

import DateTimeField from 'react-bootstrap-datetimepicker';
import TimerMixin from 'react-timer-mixin';

import HourMapChartOption from './hour-map-chart-option';
import HourLineChartOption from './hour-line-chart-option';
import HourHeatChartOption from './hour-heat-chart-option'
import { AEStationCoordMap, AEStationNameMap } from './ae-station-option';


const getMapChartHeight = () => {
    let _height = window.innerHeight - 250;
    if (_height >= 510) {
        return _height;
    } else {
        return 510;
    }
};

const getLineChartWidth = (isClose) => {
    if (isClose)
        return window.innerWidth - getMapChartHeight();
    return window.innerWidth - 280 - getMapChartHeight();
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


const getMapChartData = (data) => {
    let res = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].value[2] > 20) {
            res.push(data[i]);
        }
    }
    return res;
};

const getAELineChartxAxisData = (data) => {
    let res = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].dt) {
            res.push(data[i].dt);
        }
    }
    //console.log(res);
    return res;
};

const getAELineChartData = (data) => {
    let res = [];
    for (let i = 0; i < data.length; i++) {

        res.push(data[i].value);

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
    _date.setMinutes(0);
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
            mapChartHeight: getMapChartHeight(),
            leftNavClose: true,
            mapChart: {},
            mapChartOption: HourMapChartOption,
            lineChart: {},
            lineChartOption: HourLineChartOption,
            heatChart: {},
            heatChartOption: HourHeatChartOption,
            lineChartWidth: getLineChartWidth(true),
            dateTime: getNowTime(),
            auto: true,
            mapChartData: {
                data: []
            },
            timer: null,
            selectedStation: '59828'
        };
    },

    mixins: [StylePropable, StyleResizable, TimerMixin],


    handleChangeMapChartData(param) {
        const _page = this;
        const _state = this.state;

        request.get('data/ae-5m-warn.json').end((err, res) => {


            let _mapChartData = JSON.parse(res.text);
            _page.setState({
                mapChartData: _mapChartData
            });

            _state.mapChartOption.series[0].data = convertData(_mapChartData.data);
            _state.mapChartOption.series[1].data = convertData(_mapChartData.data);
            _state.mapChart.setOption(_state.mapChartOption);
        });

    },
    handleChangeMapChartOption(option) {

        mapChart.setOption(option);

    },

    handleChangeLineChartOption(option) {

        const _state = this.state;
        if (option) {
            _state.lineChart.setOption(option);
        } else {



            request.get('data/ae-hour-data.json').end((err, res) => {

                let _valueData = JSON.parse(res.text);
                let _lineChartOption = _state.lineChartOption
                _lineChartOption.xAxis[0].data = getAELineChartxAxisData(_valueData.data).map((str) => {
                    return str.replace(' ', '\n')
                });
                _lineChartOption.series[0].data = getAELineChartData(_valueData.data);
                _state.lineChart.setOption(_lineChartOption);
            });

        }

    },

    handleChangeHeatChartOption(option) {
        const _state = this.state;
        if (option) {
            _state.lineChart.setOption(option);
        } else {

        }
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
    handleChangeDatetime(value) {
        console.log(event);

    },
    handleChangeStation(sid) {

        if (this.state.selectedStation !== sid) {

            let _name = AEStationNameMap[sid];
            if (_name) {
                this.state.lineChartOption.title.subtext = _name;
                this.state.lineChart.setOption(this.state.lineChartOption);

                this.setState({
                    selectedStation: sid
                });
            }
        }

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
        const _page = this;

        const mapChart = _page.state.mapChart = echarts.init(document.getElementById('AtmosphericElectricHourPage.mapChart'));

        _page.state.timer = _page.setInterval(_page.handleRefreshTime, 60000);

        mapChart.on('click', function(param) {
            _page.handleChangeStation(param.name);

        });
        request.get('map/json/440600.json').end((err, res) => {

            echarts.registerMap('foshan', res.text);

            _page.handleChangeMapChartData(_page.state.dateTime);
        });

        _page.state.lineChart = echarts.init(document.getElementById('AtmosphericElectricHourPage.lineChart'));

        _page.handleChangeLineChartOption();

        _page.state.heatChart = echarts.init(document.getElementById('AtmosphericElectricHourPage.heatChart'));

        _page.handleChangeHeatChartOption();

    },

    render() {


        return (
            <div><h2 className='page-title'>大气电场时数据</h2>
            
            <Box width='100%'  justifyContent='space-around' alignItems='flex-start'  column={false} reverse={false}>
            <Box  flex={1} style={{
                width: this.state.lineChartWidth,
                height: this.state.mapChartHeight + 50
            }} column>
             <Box id='AtmosphericElectricHourPage.lineChart'  style={{
                width: '95%',
                height: (this.state.mapChartHeight + 50) * 0.4
            }}>
           </Box>
            <Box id='AtmosphericElectricHourPage.lineChart'  style={{
                width: '95%',
                height: (this.state.heatChartHeight + 50) * 0.6
            }}>
            </Box>
            </Box>
            <Box style={{
                width: this.state.mapChartHeight,
                height: this.state.mapChartHeight + 50
            }} column>
            <Box width='100%' justifyContent='space-between'>
            <Box alignItems='center' style={{
                height: 50
            }}>
            <IconButton tooltip="-1天" tooltipPosition='top-center'  value={-5}  onClick={this.handleChangeTimeByMinute} >
            <NavigationArrowBack  />
            </IconButton>
            <IconButton tooltip="-1小时"  tooltipPosition='top-center' value={-1}  onClick={this.handleChangeTimeByMinute}>
            <NavigationChevronLeft  />
            </IconButton>
            <DateTimeField />
            <IconButton tooltip="+1小时" tooltipPosition='top-center' value={1}  onClick={this.handleChangeTimeByMinute}>
            <NavigationChevronRight />
            </IconButton>
            <IconButton tooltip="+1天"  tooltipPosition='top-center' value={5}  onClick={this.handleChangeTimeByMinute}>
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

            <Box id='AtmosphericElectricHourPage.mapChart'   style={{
                width: this.state.mapChartHeight,
                height: this.state.mapChartHeight
            }} />
            </Box>
            </Box>
         
    
        </div>);
    }
});

export default AtmosphericElectricHourPage;
