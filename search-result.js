'use strict';

var React = require('react');
var ReactNative = require('react-native');
var moment = require('moment');
var Icon = require('react-native-vector-icons/FontAwesome');

var {
  Text,
  View,
  ListView,
  StyleSheet,
  ActivityIndicatorIOS,
  TouchableHighlight
} = ReactNative;

var AuthService = require('./auth-service');

var SearchResult = React.createClass({
  getInitialState() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    return {
      dataSource: dataSource,
      searchQuery: this.props.searchQuery,
      showProgress: true
    }
  },

  componentDidMount() {
    this.doSearch(this.state.searchQuery)
  },

  doSearch(query) {
    AuthService.getAuthInfo((err, authInfo) => {
      var url = `https://api.github.com/search/repositories?q=${query}`;
      AuthService.fetchWrapper(url, authInfo.header)
        .then(response => response.json())
        .then(responseData => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.items),
            showProgress: false
          })
        })
        .catch(console.error);
    })
  },

  pressRow(rowData) {
    console.log('pressRow')
    console.log(rowData)
  },

  renderRow(rowData) {
    return (
      <TouchableHighlight
        onPress={() => this.pressRow(rowData)}
        underLayColor='#ddd'
      >
        <View style={styles.listViewRow}>
          <View style={styles.listViewRow__repository}>
            <Text style={styles.boldText}>Repository</Text>
            <Text>{rowData.full_name}</Text>
          </View>

          <View style={styles.listViewRow__iconWithText}>
            <Icon name='star-o' size={20} />
            <Text>{rowData.stargazers_count}</Text>
          </View>

          <View style={styles.listViewRow__iconWithText}>
            <Icon name='code-fork' size={20} />
            <Text>{rowData.forks_count}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  },

  render() {
    if (this.state.showProgress) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>
            Searching for {this.state.searchQuery}...
          </Text>
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
  container: {
    flex: 1,
    paddingTop: 80,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  text: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 20
  },
  listViewRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: '#d7d7d7',
    paddingVertical: 10,
    borderBottomWidth: 1
  },
  boldText: {
    fontWeight: '600'
  },
  listViewRow__repository: {
    flex: 3,
    paddingHorizontal: 20,
    overflow: 'hidden'
  },
  listViewRow__iconWithText: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

module.exports = SearchResult;
