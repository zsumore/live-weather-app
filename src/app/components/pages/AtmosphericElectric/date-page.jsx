import React from 'react';
import { Link } from 'react-router';
import echarts from 'echarts/echarts-line-map';
import { StylePropable, StyleResizable } from 'material-ui/lib/mixins';

import CommunicationLiveHelp from 'material-ui/lib/svg-icons/communication/live-help';
import ContentLink from 'material-ui/lib/svg-icons/content/link';
import Colors from 'material-ui/lib/styles/colors';

import request from 'superagent/lib/client';



import { Box } from 'react-layout-components/lib';


const iconStyles = {
    marginTop: 8
};

function getMapChartHeight() {

    return window.innerHeight - 250;

}

const AtmosphericElectricDatePage = React.createClass({

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
            <div>
            <Box className='page-title'  justifyContent='space-between' alignItems='baseline'>
            <Box   justifyContent='space-between' alignItems='baseline'>
            <h3>大气电场日数据</h3>
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




            </div>);
    }
});

export default AtmosphericElectricDatePage;
