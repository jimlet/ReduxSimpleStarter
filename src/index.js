import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import Secrets from './secrets';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

// Create a new component.
// This component should produce some HTML.
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
    };

    this.videoSearch('surfboards');
  }

  videoSearch(term) {
    YTSearch({ key: Secrets.GOOGLE_API_KEY, term }, (videos) => {
      this.setState({
        videos,
        selectedVideo: videos[0],
      });
    });
  }

  render() {
    return (
      <div>
        <SearchBar onSearchTermChange={term => this.videoSearch(term)} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList videos={this.state.videos} onVideoSelect={selectedVideo => this.setState({ selectedVideo })} />
      </div>
    );
  }
}

// Take this component's generated HTML and put it on the page (in the DOM).
// <App /> vs App: <App /> makes an instance that can be added.
// You add instances to the DOM, not classes/types.
// Under the covers, Babel is calling React.createElement to do this - you can
// see this by pasting React/JSX code in the REPL at babeljs.io.
// So when you want to make use of a component, wrap it in JSX tags.
ReactDOM.render(<App />, document.querySelector('.container'));
