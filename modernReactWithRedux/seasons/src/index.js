import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";
class App extends React.Component {
	constructor(props) {
		// specific to JS
		super(props);

		//initialize state object
		// this is the ONLY time we do direct assignment
		this.state = { lat: null, errorMessage: "" };
	}

	//alternate way to initialize state, Babel will help translate it to js that popular browsers can understand
	//state = { lat: null, errorMessage: "" };

	componentDidMount() {
		window.navigator.geolocation.getCurrentPosition(
			(position) => {
				// to update state, we always called setState!
				this.setState({ lat: position.coords.latitude });
			}, // success callback
			(err) => {
				this.setState({ errorMessage: err.message });
			} // failure callback
		);
		console.log("did mount");
	}

	componentDidUpdate() {
		console.log("did update");
	}

	componentWillUnmount() {
		console.log("will unmount");
	}

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
			return <div>Error: {this.state.errorMessage}</div>;
		}

		if (!this.state.errorMessage && this.state.lat) {
			return <SeasonDisplay lat={this.state.lat} />;
		}

		return (
      <Spinner message='Please accept location request'/>
    )
  }
	// React says we have to define render!
	// render function will be called many times
	render() {
		return (
      <div className="border red">
        {this.renderContent()}
      </div>
    );
	}
}

ReactDOM.render(<App />, document.getElementById("root"));
