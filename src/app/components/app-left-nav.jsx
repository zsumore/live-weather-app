import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';
import { Colors, Spacing, Typography } from 'material-ui/lib/styles';
import { StylePropable } from 'material-ui/lib/mixins';

const SelectableList = SelectableContainerEnhance(List);

const AppLeftNav = React.createClass({

    propTypes: {
        docked: React.PropTypes.bool.isRequired,
        history: React.PropTypes.object.isRequired,
        location: React.PropTypes.object.isRequired,
        onRequestChangeList: React.PropTypes.func.isRequired,
        open: React.PropTypes.bool.isRequired,
        style: React.PropTypes.object
    },

    contextTypes: {
        muiTheme: React.PropTypes.object,
        router: React.PropTypes.func
    },

    mixins: [
        StylePropable
    ],

    handleRequestChangeLink(event, value) {
        window.location = value;
    },

    handleTouchTapHeader() {
        this.props.history.push('/');
        this.setState({
            leftNavOpen: true
        });
    },

    getStyles() {
        return {
            logo: {
                cursor: 'pointer',
                fontSize: 24,
                color: Typography.textFullWhite,
                lineHeight: Spacing.desktopKeylineIncrement + 'px',
                fontWeight: Typography.fontWeightLight,
                backgroundColor: Colors.cyan500,
                paddingLeft: Spacing.desktopGutter,
                marginBottom: 8
            },
        };
    },

    render() {
        const {location, docked, onRequestChangeLeftNav, onRequestChangeList, open, style} = this.props;

        const styles = this.getStyles();

        return (
            <LeftNav
            style={style}
            docked={docked}
            open={open}
            onRequestChange={onRequestChangeLeftNav}
            >
      <div style={this.prepareStyles(styles.logo)} onTouchTap={this.handleTouchTapHeader}>
          Material-UI
        </div>
        <SelectableList
            valueLink={{
                value: location.pathname,
                requestChange: onRequestChangeList
            }}
            >
          <ListItem
            leftAvatar={<Avatar src="images/ae-128.png" />}
            primaryText="大气电场"
            primaryTogglesNestedList={true}
            nestedItems={[
                <ListItem leftAvatar={<Avatar  backgroundColor={Colors.cyan600}>H</Avatar>} primaryText="时数据" value="/atmospheric-electric/hour" />,
                <ListItem leftAvatar={<Avatar  backgroundColor={Colors.cyan800}>D</Avatar>} primaryText="日数据" value="/atmospheric-electric/date" />
            ]}
            />
        </SelectableList>
        <Divider />
      </LeftNav>
            );
    }
});

export default AppLeftNav;
