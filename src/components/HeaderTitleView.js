import React, { Component } from 'react';
import {DeviceEventEmitter, Modal, View, Text, Button} from 'react-native';
import StyleKit from "@Style/StyleKit";
import PlatformStyles from "../models/PlatformStyles";
import { EventRegister } from 'react-native-event-listeners';

export default class HeaderTitleView extends Component {

  constructor(props) {
    super(props);
  }

  onPrev() {
    EventRegister.emit('actSwitchNote', -1);
  }
  onNext() {
    EventRegister.emit('actSwitchNote', 1);
  }

  renderNoteSwitcher() {
    if (this.props.showNoteSwitcher) {
      return (
        <View style={this.getStyles().get('noteSwitchContainer')}>
          <View style={{marginRight:5}} ><Button onPress={this.onPrev} title="<<"/></View>
          <View style={{marginLeft:5}} ><Button onPress={this.onNext} title=">>"/></View>
        </View>
        );
    }
  }

  render() {
    let styles = this.getStyles();

    let subtitleStyles = styles.get('headerSubtitle');
    if(this.props.subtitleColor) {
      subtitleStyles[0].color = this.props.subtitleColor;
      subtitleStyles[0].opacity = 1.0;
    }

    return (
      <View style={styles.get('headerContainer')}>

        <View>
          <Text style={styles.get('headerTitle')}>{this.props.title}</Text>

          {this.props.subtitle &&
            <Text numberOfLines={1} style={subtitleStyles} adjustsFontSizeToFit={true}>
              {this.props.subtitle}
            </Text>
          }
        </View>
        {this.renderNoteSwitcher()}
      </View>
    )
  }

  getStyles() {
    return new PlatformStyles({
      headerContainer: {
        backgroundColor: StyleKit.variable("stylekitContrastBackgroundColor"),
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: "row"
      },

      noteSwitchContainer: {
        flexDirection: "row"
      },

      headerContainerAndroid: {
        alignItems: 'flex-start',
      },

      headerTitle: {
        color: StyleKit.variable("stylekitForegroundColor"),
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
      },

      headerSubtitle: {
        color: StyleKit.variable("stylekitForegroundColor"),
        opacity: 0.6,
        fontSize: 12,
      },

      headerSubtitleIOS: {
        textAlign: "center",
      },

      headerSubtitleAndroid: {
        fontSize: 13,
      }
    });
  }
}
