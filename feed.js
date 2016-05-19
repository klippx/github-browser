'use strict';

var React = require('react');
var ReactNative = require('react-native');
var moment = require('moment');
var PushPayload = require('./push-payload');

var {
  Text,
  View,
  ListView,
  StyleSheet,
  ActivityIndicatorIOS,
  Image,
  TouchableHighlight
} = ReactNative;

var Feed = React.createClass({
  getInitialState() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    return {
      dataSource: dataSource,
      showProgress: true
    }
  },

  componentDidMount() {
    this.fetchFeed();
  },

  fetchFeed() {
    require('./auth-service').getAuthInfo((err, authInfo) => {
      var url = `https://api.github.com/users/${authInfo.user.login}/received_events`;
      fetch(url, { headers: authInfo.headers })
        .then(response => response.json())
        .then(responseData => {
          var pushEvents = responseData.filter(e => e.type === 'PushEvent');
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(pushEvents),
            showProgress: false
          })
        })
        .catch(console.error);
    })
  },

  pressRow(rowData) {
    this.props.navigator.push({
      title: 'Push Event',
      component: PushPayload,
      passProps: {
        pushEvent: rowData
      }
    });
  },

  renderRow(rowData) {
    return (
      <TouchableHighlight
        onPress={() => this.pressRow(rowData)}
        underLayColor='#ddd'
      >
        <View style={styles.listViewRow}>
          <Image
            style={styles.listViewRow__avatar}
            source={{uri: rowData.actor.avatar_url}} />
          <View style={styles.listViewRow__stackedBox}>
            <Text style={styles.listViewRow__stackedBox_text}>{moment(rowData.created_at).fromNow()}</Text>
            <Text style={styles.listViewRow__stackedBox_bold}>{rowData.actor.login}</Text>
            <Text style={styles.listViewRow__stackedBox_text}>pushed to {rowData.payload.ref.replace('refs/heads/','')} at</Text>
            <Text style={styles.listViewRow__stackedBox_bold}>{rowData.repo.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  },

  render() {
    if (this.state.showProgress) {
      return (
        <View style={styles.spinner}>
          <ActivityIndicatorIOS
            size="large"
            animating={true}
            />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          />
      </View>
    )
  }
});

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 60
  },
  listViewRow: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderColor: '#d7d7d7',
    borderBottomWidth: 1
  },
  listViewRow__avatar: {
    height: 36,
    width: 36,
    borderRadius: 18
  },
  listViewRow__stackedBox: {
    paddingLeft: 20
  },
  listViewRow__stackedBox_bold: {
    fontWeight: '600'
  }
});

module.exports = Feed;
