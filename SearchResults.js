'use strict';

var ReactNative = require('react-native');
var React = require('react');
var DetailsView = require("./DetailsView");
var { StyleSheet, Image, View, TouchableHighlight, ListView, Text } = ReactNative
import Config from './UrlConfiguration';

var styles = StyleSheet.create({
  thumb: {
    width: 60,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  votes: {
    fontSize: 18,
    color: '#00BFFF'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#656565',
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      { rowHasChanged: (r1, r2) => r1.id !== r2.id }
    );
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.listings)
    };
  }

  rowPressed(rowId) {
    var movie = this.props.listings[rowId] // .filter(prop => prop.guid === propertyGuid)[0];
    this.props.navigator.push({
      title: 'Movie Details',
      component: DetailsView,
      passProps: {movie: movie}
    });
  }

  renderRow(rowData, sectionId, rowId) {
    var vote_average = Math.floor(rowData.vote_average)
    return(
      <TouchableHighlight
        underlayColor= '#dddddd'
        onPress={() => this.rowPressed(rowId)} >
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} 
                source={{ uri: Config.getPosterImageUrl(rowData.poster_path) }} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>
                {rowData.title}
              </Text>
              <Text style={styles.votes}>{vote_average}/10</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    )
  }
}

module.exports = SearchResults;