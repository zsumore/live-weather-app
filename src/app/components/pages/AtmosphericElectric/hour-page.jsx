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

import CommunicationLiveHelp from 'material-ui/lib/svg-icons/communication/live-help';
import ContentLink from 'material-ui/lib/svg-icons/content/link';

import request from 'superagent/lib/client';
import moment from 'moment';
import { Box } from 'react-layout-components/lib';

import DateTimeField from 'react-bootstrap-datetimepicker';
import TimerMixin from 'react-timer-mixin';

import HourMapChartOption from './hour-map-chart-option';
import HourLineChartOption from './hour-line-chart-option';
import HourHeatChartOption from './hour-heat-chart-option';


import { AEStationSet, AEStationCoordMap, AEStationNameMap, AEStationArray } from './ae-station-option';




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

        let geoCoord = AEStationCoordMap[data[i].stationid];

        if (geoCoord) {

            let geoStaion = AEStationNameMap[data[i].stationid];
            if (geoStaion) {
                // let _concatValue=geoCoord.concat(data[i].value);

                res.push({
                    name: data[i].stationid,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
    }

    return res;
};

/*
const getMapChartData = (data) => {
    let res = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].value[2] > 20) {
            res.push(data[i]);
        }
    }
    return res;
};
*/
const getNormalData = (data) => {
    let res = [];
    for (let i = 0; i < data.length; i++) {

        res.push(data[i]);

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




const getNowTime = () => {
    return moment().seconds(0).milliseconds(0);
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
            hourData: {},
            selectedStation: '59828'
        };
    },

    mixins: [StylePropable, StyleResizable, TimerMixin],


    handleChangeHourData() {
        request.get('data/ae-hour-heat-chart-data.json').type('form')
            .send({
                start: dt.format('YYYY-MM-DD HH:mm:ss')
            }).timeout(5000).end((err, res) => {

            let _hourData = JSON.parse(res.text);

        });
    },


    handleChangeMapChartData(dt) {
        const _page = this;


        request.post('http://10.151.78.189:8080/monitor/servlet/MapServlet')
            .type('form')
            .send({
                start: dt.format('YYYY-MM-DD HH:mm:ss')
            }).timeout(5000).end((err, res) => {

            let _mapChartData = JSON.parse(res.text);

            _page.state.mapChartOption.title.subtext = _mapChartData.datetime;
            let _tempset = new Set();
            for (let i = 0; i < _mapChartData.data.length; i++) {
                _tempset.add(_mapChartData.data[i].stationid);
            }
            //console.log(_tempset);
            for ( let x of AEStationSet ) {

                if (_tempset.has(x)) {

                } else {
                    let _tempdata = {
                        'last_time': '没数据',
                        'value': -999,
                        'stationid': x
                    };
                    _mapChartData.data.push(_tempdata);
                }
            }

            _mapChartData.data.sort((o1, o2) => {
                return o2.value - o1.value;
            });
            //console.log(_mapChartData.data);

            // console.log(convertData(_mapChartData.data));
            _page.state.mapChartOption.series[0].data = convertData(getNormalData(_mapChartData.data));
            _page.state.mapChartOption.series[1].data = convertData(getNormalData(_mapChartData.data));
            _page.state.mapChart.clear();
            _page.state.mapChart.setOption(_page.state.mapChartOption);

            _page.setState({
                mapChartData: _mapChartData
            });
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
                /*
                _lineChartOption.xAxis[0].data = getAELineChartxAxisData(_valueData.data).map((str) => {
                    return str.replace(' ', '\n')
                });
                */
                _lineChartOption.series[0].data = getAELineChartData(_valueData.data);
                _state.lineChart.setOption(_lineChartOption);
            });

        }

    },

    handleChangeHeatChartOption(option) {
        const _state = this.state;
        if (option) {
            _state.heatChart.setOption(option);
        } else {
            _state.heatChart.setOption(_state.heatChartOption);
            console.log(_state.heatChartOption.xAxis.data);
        }
    },

    handleChangeTimeByMinute(param) {


        let _time = moment(this.state.dateTime);

        _time.minutes(_time.minutes() + param);

        this.setState({
            dateTime: _time
        });

        this.handleChangeDatetime(_time);

    },

    handleRefreshTime() {

        let _time = getNowTime();

        this.setState({
            dateTime: _time
        });
        // console.log('refreshtime:' + _time);

    },
    handleChangeDatetime(value) {
        //console.log(value);

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

        //console.log(_page.props.params);

        const mapChart = _page.state.mapChart = echarts.init(document.getElementById('AtmosphericElectricHourPage.mapChart'));


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
            <div>
            <Box className='page-title'  justifyContent='space-between' alignItems='baseline'>
            <Box   justifyContent='space-between' alignItems='baseline'>
            <h3>大气电场时数据</h3>
            <a className={ 'hint--top-right' } data-hint={ '数据查询' } href="http://10.151.64.202:8097/home" target="_blank">
            <ContentLink style={{
                marginLeft: 10
            }} />
            />   
            </a>
            </Box>
            <div className={ 'hint--top-left' } data-hint={ '使用说明' }>
            <CommunicationLiveHelp  style={iconStyles} color={Colors.blue500} hoverColor={Colors.greenA200} onClick={() => alert('click help')} />
            </div>
            </Box>
            <Box width='100%'  justifyContent='space-around' alignItems='flex-start'  column={false} reverse={false}>
            <Box  flex={1} style={{
                width: this.state.lineChartWidth,
                height: this.state.mapChartHeight + 50
            }} column>
             <Box id='AtmosphericElectricHourPage.lineChart'  style={{

                height: (this.state.mapChartHeight + 50) * 0.4
            }}>
           </Box>
            <Box id='AtmosphericElectricHourPage.heatChart'  style={{

                height: (this.state.mapChartHeight + 50) * 0.6
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
            <IconButton tooltip="-1天" tooltipPosition='top-center'    onClick={this.handleChangeTimeByMinute.bind(this, -1440)} >
            <NavigationArrowBack  />
            </IconButton>
            <IconButton tooltip="-1小时"  tooltipPosition='top-center'  onClick={this.handleChangeTimeByMinute.bind(this, -60)}>
            <NavigationChevronLeft  />
            </IconButton>
            <div style={{
                width: 160
            }}>
            <DateTimeField format='YYYY-MM-DD HH:mm:ss' inputFormat='YYYY-MM-DD HH' dateTime={this.state.dateTime.format('YYYY-MM-DD HH:mm:ss')} />
            </div>
            <IconButton tooltip="+1小时" tooltipPosition='top-center'   onClick={this.handleChangeTimeByMinute.bind(this, 60)}>
            <NavigationChevronRight />
            </IconButton>
            <IconButton tooltip="+1天"  tooltipPosition='top-center'   onClick={this.handleChangeTimeByMinute.bind(this, 1440)}>
            <NavigationArrowForward />
            </IconButton>
            <IconButton tooltip="刷新"  tooltipPosition='top-center'  onClick={this.handleRefreshTime}>
            <NavigationRefresh color={Colors.green500} />
            </IconButton>
            </Box>
            
            </Box>

            <Box id='AtmosphericElectricHourPage.mapChart'   style={{
                width: this.state.mapChartHeight,
                height: this.state.mapChartHeight
            }} />
            </Box>
            </Box>
         
    </div>
            );
    }
});

export default AtmosphericElectricHourPage;
