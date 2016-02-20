import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import { Spacing } from 'material-ui/lib/styles';
import { StylePropable, StyleResizable } from 'material-ui/lib/mixins';
import { Colors, getMuiTheme } from 'material-ui/lib/styles';
import { Styles } from 'material-ui/lib';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import ActionFavorite from 'material-ui/lib/svg-icons/action/favorite';
import ContentDrafts from 'material-ui/lib/svg-icons/content/drafts';

import Dialog from 'material-ui/lib/dialog';

import Divider from 'material-ui/lib/divider';
import MenuItem from 'material-ui/lib/menus/menu-item';

import AppLeftNav from './app-left-nav';
import FullWidthSection from './full-width-section';


function getStyles() {
    const darkWhite = Colors.darkWhite;

    const styles = {
        appBar: {
            position: 'fixed',
            // Needed to overlap the examples
            zIndex: 2,
            top: 0
        },
        leftNav: {
            zIndex: 1
        },
        root: {
            paddingTop: Spacing.desktopKeylineIncrement,
            minHeight: 400,
            paddingLeft: 256
        },
        content: {
            margin: Spacing.desktopGutter
        },
        contentWhenMedium: {
            margin: `${Spacing.desktopGutter * 2}px ${Spacing.desktopGutter * 3}px`
        },
        footer: {
            position: 'fixed',
            zIndex: 0,
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: Colors.grey900,
            textAlign: 'center',
            paddingLeft: 280
        },
        a: {
            color: darkWhite
        },
        p: {
            margin: '0 auto',
            padding: 0,
            color: Colors.lightWhite,
            maxWidth: 335
        },
        iconButton: {
            color: darkWhite
        }
    };


    return styles;
}


const LightTheme = getMuiTheme();
const DarkTheme = getMuiTheme(Styles.darkBaseTheme);


const Master = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        history: React.PropTypes.object,
        location: React.PropTypes.object
    },
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    mixins: [
        StylePropable,
        StyleResizable
    ],
    getInitialState() {
        return {
            muiTheme: LightTheme,
            leftNavOpen: true,
            styles: getStyles(),
            dialogOpen: false
        };
    },
    getChildContext() {
        return {
            muiTheme: this.state.muiTheme
        };
    },
    componentWillMount() {
        this.setState({
            muiTheme: this.state.muiTheme
        });
    },
    componentWillReceiveProps(nextProps, nextContext) {
        const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
        this.setState({
            muiTheme: newMuiTheme
        });
    },
    handleMenuItemTap(index, menuItem) {

        if (menuItem.props.value === 'light') {

            this.handleChangeMuiTheme(LightTheme);
        } else if (menuItem.props.value === 'dark') {

            this.handleChangeMuiTheme(DarkTheme);
        } else if (menuItem.props.value === 'doc') {
            this.handleDialogOpen();
        } else {
            console.log('[handleMenuItemTap] menuItem.props.value:' + menuItem.props.value);
        }

    },
    handleTitleTouchTap() {

        this.setState({
            leftNavOpen: !this.state.leftNavOpen
        });

        let {leftNavOpen, styles} = this.state;
        if (!leftNavOpen) {

            styles.root.paddingLeft = 280;
            styles.footer.paddingLeft = 280;
        } else {
            styles.root.paddingLeft = 24;
            styles.footer.paddingLeft = 24;
        }
    },
    handleChangeRequestLeftNav(open) {
        this.setState({
            leftNavOpen: open
        });

    },
    handleRequestChangeList(event, value) {
        this.props.history.push(value);
    },
    handleChangeMuiTheme(newMuiTheme) {
        this.setState({
            muiTheme: newMuiTheme
        });
    },
    handleDialogOpen() {

        this.setState({
            dialogOpen: true
        });
    // console.log(this.state);
    },
    handleDialogClose() {
        this.setState({
            dialogOpen: false
        });
    },
    render() {

        const {history, location, children} = this.props;

        let {leftNavOpen, styles} = this.state;

        const actions = [<FlatButton label='确定' primary={ true }
        keyboardFocused={ true }
        onTouchTap={ this.handleDialogClose } />];

        return (
            <div>
      <AppBar
            onTitleTouchTap={ this.handleTitleTouchTap }
            title={ '佛山气象监测预警系统' }
            style={ styles.appBar }
            iconElementLeft={ <img src="images/logo-48.png" /> }
            iconElementRight={ <div style={ {
                float: 'left'
            }}>
                                   <div className={ 'menu' }>
                                     <ul>
                                       <li>
                                         <a>天气雷达</a>
                                       </li>
                                       <li>
                                         <IconMenu
            onItemTouchTap={ this.handleMenuItemTap }
            iconButtonElement={ <IconButton className={ 'hint--bottom' } data-hint={ '设置' }>
                                                                         <MoreVertIcon />
                                                                       </IconButton> }
            targetOrigin={ {
                horizontal: 'left',
                vertical: 'top'
            }}
            anchorOrigin={ {
                horizontal: 'right',
                vertical: 'top'
            }}>
                                           <MenuItem value='light' leftIcon={ <ActionFavorite color={ Colors.cyanA200 } hoverColor={ Colors.orange300 } /> } primaryText='浅色主题' />
                                           <MenuItem value='dark' leftIcon={ <ActionFavorite color={ Colors.cyanA700 } hoverColor={ Colors.orange300 } /> } primaryText='深色主题' />
                                           <Divider />
                                           <MenuItem value='doc' leftIcon={ <ContentDrafts color={ Colors.greenA400 } hoverColor={ Colors.orange300 } /> } primaryText='说明文档' />
                                         </IconMenu>
                                       </li>
                                     </ul>
                                   </div>
                                 </div> } />
      { <div style={ this.prepareStyles(styles.root)}>
          <div style={ this.prepareStyles(styles.content)}>
            { React.cloneElement(children, {
                onChangeMuiTheme: this.handleChangeMuiTheme,
                isLeftNavClose: this.state.leftNavOpen
            })}
          </div>
        </div> }
      <AppLeftNav
            style={ styles.leftNav }
            history={ history }
            location={ location }
            docked={ true }
            onRequestChangeList={ this.handleRequestChangeList }
            open={ leftNavOpen } />
      <FullWidthSection style={ styles.footer }>
        <p style={ this.prepareStyles(styles.p)}>
          版权所有© <a
            href='http://www.fs121.com'
            target='_blank'
            className={ 'hint--right hint--info' }
            data-hint={ '佛山市气象公众网' }>佛山市气象局</a>
        </p>
      </FullWidthSection>
      <Dialog
            title='使用说明'
            actions={ actions }
            modal={ false }
            open={ this.state.dialogOpen }
            onRequestClose={ this.handleDialogClose }>
        <div>
          1、点击标题“佛山气象数据展示平台”隐藏/展示左侧导航栏。<br />
          备注：本系统使用HTML5技术实现，支持IE9+、Firefox、Chrome等浏览器，建议使用Webkit核心的浏览器，如：chrome、360浏览器等。
        </div>
      </Dialog>
    </div>
            );
    },
});

export default Master;
