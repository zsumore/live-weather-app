import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import { Spacing } from 'material-ui/lib/styles';
import { StylePropable, StyleResizable } from 'material-ui/lib/mixins';
import { Colors, getMuiTheme } from 'material-ui/lib/styles';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import ActionFavorite from 'material-ui/lib/svg-icons/action/favorite';
import ContentDrafts from 'material-ui/lib/svg-icons/content/drafts';

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
            backgroundColor: Colors.grey900,
            textAlign: 'center',
            paddingLeft: 256
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
        StyleResizable,
    ],

    getInitialState() {
        return {
            muiTheme: getMuiTheme(),
            leftNavOpen: true,
            styles: getStyles()
        };
    },

    getChildContext() {
        return {
            muiTheme: this.state.muiTheme,
        };
    },

    componentWillMount() {
        this.setState({
            muiTheme: this.state.muiTheme,
        });
    },

    componentWillReceiveProps(nextProps, nextContext) {
        const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
        this.setState({
            muiTheme: newMuiTheme,
        });
    },

    getStyles() {
        const darkWhite = Colors.darkWhite;

        const styles = {
            appBar: {
                position: 'fixed',
                // Needed to overlap the examples
                zIndex: this.state.muiTheme.zIndex.appBar + 1,
                top: 0
            },
            leftNav: {
                zIndex: this.state.muiTheme.zIndex.appBar
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
                backgroundColor: Colors.grey900,
                textAlign: 'center',
                paddingLeft: 256
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

        if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM) ||
                this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
            styles.content = this.mergeStyles(styles.content, styles.contentWhenMedium);
        }

        return styles;
    },

    handleTitleTouchTap() {

        this.setState({
            leftNavOpen: !this.state.leftNavOpen
        });

        let {leftNavOpen, styles} = this.state;
        if (!leftNavOpen) {

            styles.root.paddingLeft = 256;
            styles.footer.paddingLeft = 256;
        } else {
            styles.root.paddingLeft = 0;
            styles.footer.paddingLeft = 0;
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

    render() {

        const {history, location, children} = this.props;

        let {leftNavOpen, styles} = this.state;

        return (
            <div>
            <AppBar
            onTitleTouchTap={this.handleTitleTouchTap}
            title={'佛山气象数据展示平台'}
            style={styles.appBar}
            iconElementLeft={ <img src="images/logo-48.png" />}
            iconElementRight={<div style={{
                float: 'left'
            }}><div className={'menu'
            }><ul><li><a>天气雷达</a></li><li><IconMenu iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{
                horizontal: 'left',
                vertical: 'top'
            }}
            anchorOrigin={{
                horizontal: 'right',
                vertical: 'top'
            }}
            >
        <MenuItem leftIcon={<ActionFavorite color={Colors.grey500} hoverColor={Colors.orange300} />} primaryText='浅色主题' />
        <MenuItem leftIcon={<ActionFavorite color={Colors.grey900} hoverColor={Colors.orange300} />} primaryText='深色主题' />
        <Divider />
        <MenuItem leftIcon={<ContentDrafts color={Colors.cyanA400} hoverColor={Colors.orange300} />} primaryText='说明文档' />
        </IconMenu></li></ul></div>
        </div>}
            />
        
            {
            <div style={this.prepareStyles(styles.root)}>
            <div style={this.prepareStyles(styles.content)}>
              {React.cloneElement(children, {
                onChangeMuiTheme: this.handleChangeMuiTheme,
            })}
            </div>
          </div>
            }
         
            
        <AppLeftNav
            style={styles.leftNav}
            history={history}
            location={location}
            docked={true}
            onRequestChangeList={this.handleRequestChangeList}
            open={leftNavOpen}
            />
        <FullWidthSection style={styles.footer}>
          <p style={this.prepareStyles(styles.p)}>
            {'Hand crafted with love by the engineers at '}
            <a style={styles.a} href="http://call-em-all.com">
              Call-Em-All
            </a>
            {' and our awesome '}
            <a
            style={this.prepareStyles(styles.a)}
            href="https://github.com/callemall/material-ui/graphs/contributors"
            >
              contributors
            </a>.
          </p>
        </FullWidthSection>
      </div>
            );
    },
});

export default Master;
