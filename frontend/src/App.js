import React, { Component } from 'react';

import Layout from './containers/Layout/Layout';
//import Auth from './containers/Auth/Auth';
//import * as actionCreators from './store/action/index';
import Search from './containers/Search/Search';
import MoviePage from './containers/MoviePage/MoviePage';
import Login from './containers/Auth/Login';
import Profile from './containers/Profile/Profile';
import Register from './containers/Auth/Register';
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
          <Route path="/movie/:id" exact component={(routerProps) => <MoviePage mvId={routerProps.match.params.id}/>} />
          <Route path='/login' exact component={Login}/>
          <Route path='/register' exact component={Register}/>
          <Route path='/profile' exact component={Profile}/>
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
