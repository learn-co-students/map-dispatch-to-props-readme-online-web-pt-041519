import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { addItem } from  './actions/items';

class App extends Component {

  handleOnClick() {
    this.props.addItem();
  }

  render() {
    console.log(this.props)
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

// const mapStateToProps = (state) => {
//   console.log(state)
//   return {
//     items: state.items
//   };
// };

// const mapDispatchToPrps = dispatch => {
//   return {
//     addItem: () => {
//       dispatch(addItem())
//     }
//   }
// }

// export defaul connect(mapStateToProps, mapDispatchToProps)(App);
export default connect(state => ({ items: state.items }), { addItem })(App);
