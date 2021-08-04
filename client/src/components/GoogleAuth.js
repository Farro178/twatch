import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
class GoogleAuth extends React.Component {
  // this value begins as null because we don't know if the user is signed in already.

  componentDidMount() {
    // second argument is a callback to let the component know when the library load has been complete.
    window.gapi.load("client:auth2", () => {
      // init returns a promise once the library has been initialised
      window.gapi.client
        .init({
          clientId:
            "249262560684-befs4qoh9a4odtjb57vtm94f7hlhbcjh.apps.googleusercontent.com",
          scope: "email",
        })
        // inside the then function we can decide what to do once the user is signed in
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          // Once a user is logged in we want to update the component to display that. For that we use in component state.
          // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn();
    } else {
      this.props.signOut();
    }
  };

  onSignIn = () => {
    this.auth.signIn();
  };

  onSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOut} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignIn} className="ui red google button">
          <i className="google icon" />
          Sign in with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(null, { signIn, signOut })(GoogleAuth);
