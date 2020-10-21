import React, { Component } from 'react';

import Layout from './containers/Layout/Layout';
//import Auth from './containers/Auth/Auth';
//import * as actionCreators from './store/action/index';
import Search from './containers/Search/Search';
import { connect } from 'react-redux';

import { Route, Switch, withRouter } from 'react-router-dom';

class App extends Component {
  // componentDidMount(){
  //   this.props.onAuthCheck();
  // }
  render(){
    return (
    <div >
      <Layout>
        <Switch>

          <Route path="/" exact component={Search}/>
        </Switch>        

      </Layout>
    </div>
  );
  }
  
}

//put between <switch> when done
          // <Route path="/auth" component={Auth}/>
          // <Route path="/recommendations" component={Recommendations}/>
          // <Route path="/explore" component={Explore}/>

// const mapDispatchToProps = dispatch => {
//   return {
//     onAuthCheck: () => dispatch(actionCreators.authCheckState())
//   }
// }

export default withRouter(App);
