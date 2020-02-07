import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { addItem, otherAction } from  './actions/items';

class App extends Component {

  handleOnClick = event => {
    // This call to store means that the App component is dependent on Redux for its state management.
    // This should be avoided in case we want to NOT use Redux in the future, or want to use a different back end.
    // *** this.props.store.dispatch(addItem());

    // This is good. _dispatch_ is accessed through props.
    this.props.addItem()
  }

  render() {
    // debugger;
    return (
      <div className="App">
        <button onClick={(event) => this.handleOnClick(event)}>
          Click
          </button>
        <p>{this.props.items.length}</p>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    items: state.items
  };
};

const mapDispatchToProps = dispatch => {
  // LONG WAY OF WRITING IT OUT
  // return  {
  //   addItem: () => {
  //     dispatch(addItem())
  //   },
  //   otherAction: () => {
  //     dispatch(otherAction())
  //   }
  // };

  // SHORTHAND WAY OF WRITING IT OUT
  // return {
  //   addItem: addItem,
  //   otherAction: otherAction
  // }

  // EVEN SHORTER WAY WITH ES6
  return {
    addItem,
    otherAction
  }
};

// THIS IS THE FLOW OF PRESSING A BUTTON, AND UPDATING STATE.
// WITHOUT DIRECTLY ACCESSING THE STORE FROM THE COMPONENT.
    // ACTION
    // The button is clicked, and _dispatch_ is fired with the function addItem() as it's argument (for an action).
    // *** addItem() is a _functional component_ from _items.js_, which returns a properly formatted action

    // REDUCER
    // When the store was created, the _shoppingListItemReducer_ was specified as the reducer, so that is what is called by dispatch.

    // NEW STATE
    // The _shoppingListItemReducer_ updates the store's state, which triggers a page render

    // _connect_ recognizes the change of state, and the _mapStateToProps_ and _mapDispatchToProps_ functions are passed as arguments.

    // _mapStateToProps_ has a default argument of the store.state and returns data from the updated state that is relevant to the re-render
    // *** Relevant data is the data we want our component (App) to have access to

    // _mapDispatchToProps has a default argument of store.dispatch and returns an object, with keys that call the dispatch function with the appropriate action
    // *** So calling this.props.addItem() call dispatch, which calls the reducer, which starts the whole process over again.
    // *** The point of mapDispatchToProps is to give the App a prop that will call _dispatch_ 

    // The returns of both _mapStateToProps_ and _mapDispatchToProps_ will now be accessible to the component (App) as props.
    // Without connect, if it was being directly passed from _index.js_, it would look like this:
    //    <App items={state.items} /> 

    // When the new App component is created, its render() is called, and it now has access to the items AND the dispatch function as props.
    //    SEE: {this.props.items.length}



// ORIGINAL EXPORT - DISPATCH MUST BE ACCESSED BY THE APP THROUGH STORE, WHICH IS BAD.
// export default connect(mapStateToProps)(App);



// EXPORT WITH A DECLARED _mapDispatchToProps_ FUNCTION
// export default connect(mapStateToProps, mapDispatchToProps)(App);



// SHORTEST REASONABLE EXPORT IF YOU HAVE ONLY A FEW DISPATCH ACTIONS:
export default connect(mapStateToProps, { addItem, otherAction })(App);



// EVEN SHORTER WAY! - WITHOUT EVEN HAVING A _mapStateToProps_ FUNCTION!
// BUT IN A COMPLICATED APPLICATION THIS WOULD GET RIDICULOUS...
// export default connect( state => ({ items: state.items }), { addItem, otherAction })(App);



// *** NOTE: By default, _mapDispatchToProps_ is just 
    // dispatch => ({ dispatch })
// So if no second argument is specified in _connect()_ calling _this.props.dispatch()_ would still work
// So it could be called _this.props.dispatch({ type: 'INCREASE_COUNT' })_ and it would work