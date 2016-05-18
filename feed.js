'use strict';

var React = require('react');
var ReactNative = require('react-native');

var {
  Text,
  View,
  ListView,
  StyleSheet,
  ActivityIndicatorIOS
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
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData),
            showProgress: false
          })
        })
        .catch(console.error);
    })
  },

  renderRow(rowData) {
    return <Text style={styles.listViewRow}>
      {rowData.actor.login}
    </Text>
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
    justifyContent: 'flex-start'
  },
  listViewRow: {
    color: '#333',
    alignSelf: 'center'
  }
});

module.exports = Feed;
