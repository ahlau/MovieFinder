'use strict';
import ReactNative from 'react-native';
import React from 'react';
import SearchResults from './SearchResults';
import Config from './UrlConfiguration';

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component
} = ReactNative;

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  image: {
    marginTop: 50,
    width: 256,
    height: 256,
    alignSelf: 'center',
  },
  tmdb_logo: {
    height: 30,
    width: 150,
    alignSelf: 'center',

  },
  tmdb_notice: {
    fontSize: 11,
    textAlign: 'center',
  },
  tmdb_footer: {
  }

});

class SearchPage extends React.Component {

  constructor(props){
    super(props);
    this.state={
      searchString: '',
      isLoading: false,
      message: ''
    };
    var query = Config.urlForQueryAndPage('/configuration', null, 1)
    console.log("SearchPage url: " + query)

    fetch(query)
      .then(response => {
        if(!response.ok) {
          throw response.status + " - " + response.statusText
        }
        return response.json()
      })
      .then(json => this._handleConfiguration(json))
      .catch(error => 
        this.setState({
          isLoading: false,
          message: "Configuration: " + error
        }));
  }

  _handleConfiguration(json) {
    this.setState({ isLoading: false, message: ''});
    Config.setConfiguration(json);
  }

  onSearchTextChanged(event){
    this.setState({ searchString: event.nativeEvent.text });
  }

  _executeQuery(query){
    console.log(query);
    this.setState({ isLoading: true });
    fetch(query)
      .then(response => {
            if(response.ok === false) {
              throw ("" + response.status + " - " + response.statusText);
            }
            return response.json();
           })
      .then(json => {
        this._handleResponse(json)
      })
      .catch(error =>
             this.setState({
               isLoading: false,
               message: 'Something bad happened ' + error
             })
            );
  }

  _handleResponse(json) {
    this.setState({ isLoading: false, message: '' });
    this.props.navigator.push({
      title: 'Results',
      component: SearchResults,
      passProps: {
        listings: json.results,
      }
    })
  }

  onSearchPressed() {
    var query = Config.urlForQueryAndPage("/movie/popular", null, 1);
    console.log("onSearchPressed: " + query)
    this._executeQuery(query);
  }

  onLocationPressed() {
    navigator.geolocation.getCurrentPosition(
      location => {
        var search = location.coords.latitude + ', ' + location.coords.longitude;
        this.setState({ searchString: search });
        var query = urlForQueryAndPage('centre_point', search, 1);
        this._executeQuery(query);
      },
      error => {
        console.log(error);
        this.setState({
          message: "Error (" + error.code + "): " + error.message
        });
      },
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000}
    );
  }

  render() {
    var spinner = this.state.isLoading ?
      ( <ActivityIndicatorIOS size="large"/> ) : ( <View/>);

    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Find the most popular movies for today!
        </Text>
        <View style={styles.flowRight}>
          <TouchableHighlight style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.onSearchPressed.bind(this)}>
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
        </View>
        <Image source={require('./Resources/popcorn-1.png')} style={styles.image}/>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
        <View style={styles.tmdb_footer}>
          <Image source={require('./Resources/tmdb_logo_v5.png')} style={styles.tmdb_logo} />
          <Text style={styles.tmdb_notice}>
            This product uses the TMDb API but is not endorsed or certified by TMDb.
          </Text>
        </View>
      </View>
    );
  }
}


module.exports = SearchPage;
