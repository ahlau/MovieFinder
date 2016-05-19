class UrlConfiguration {
  constructor() {
    this.props = {}
  }

  urlForQueryAndPage(path, params, pageNumber) {
    var data = {
      api_key: API_KEY,
    };
    if(params !== null) {
      data = Object.assign(data, params);
    }
    var queryString = Object.keys(data).map(key => key + "=" + encodeURIComponent(data[key])).join('&');
    return 'http://api.themoviedb.org/3' + path + "?" + queryString;
  }

  setConfiguration(response){
    this.props.base_url = response.images.base_url;
    this.props.backdrop_sizes = response.images.backdrop_sizes;
    this.props.poster_sizes = response.images.poster_sizes;
  }

  getConfiguration(key) {
    if(this.props.includes(key)) {
      return this.props[key]
    }
    throw "Unexpected key " + key
  }

  getBaseUrl() {
    if(this.props.length === 0) {
      throw "No configurations"
    }
    return this.props.base_url;
  }

  getBackdropSize() {
    if(this.props.backdrop_sizes.length === 0){
      throw "Missing backdrop sizes"
    }
    return this.props.backdrop_sizes[1];
  }

  getPosterSize(size) {
    if(size === null) {
      return this.props.poster_sizes[1];
    } 
    size = this.props.poster_sizes.filter( poster_size => poster_size === size)[0];
    return size;
  }

  getBackdropImageUrl(path, size=null) {
    return this.getBaseUrl() + this.getBackgropSize(size) + path;
  }

  getPosterImageUrl(path, size=null) {
    return this.getBaseUrl() + this.getPosterSize(size) + path;
  }


  toString() {
    return JSON.stringify(this.props);
  }
}
// Insert your TMDB API key here. If you need one, head over 
// to www.themoviedb.org to register one for yourself.
const API_KEY="MYAPIKEY";

const urlConfiguration = new UrlConfiguration();

export default urlConfiguration;
