'use strict';

import ReactNative from 'react-native';
import React from 'react';
import Config from './UrlConfiguration';

var {StyleSheet, Image, View, ScrollView, Text} = ReactNative;

var styles = StyleSheet.create({
  contentContainer: {
  },
  container: {
    marginBottom: 50
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD',
  },
  image: {
    width: 400,
    height: 400,
  },
  votes: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  title: {
    fontSize: 25,
    margin: 5,
    fontWeight: 'bold',
    color: '#545454'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  },
  release_date: {
    fontSize: 20,
    margin: 5,
    color: '#DC143C'
  }

});

class DetailsView extends React.Component {
  render() {
    var movie = this.props.movie;

    return(
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}>
          <Image style={styles.image}
            source={{uri: Config.getPosterImageUrl(movie.poster_path, 'w500')}} />
          <View style={styles.heading}>
            <Text style={styles.title}>{movie.title}</Text>
            <View style={styles.separator}/>
          </View>
          <Text style={styles.release_date}>Released {movie.release_date}</Text>
          <Text style={styles.description}>{movie.overview}</Text>
        </View>
      </ScrollView>
    );
  }
}

module.exports = DetailsView;

