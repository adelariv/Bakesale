import React, { Component } from 'react';
import { TextInput, StyleSheet} from 'react-native';

import Proptypes from 'prop-types';
import debounce from 'lodash.debounce';

class SearchBar extends React.Component {
  static propTypes = {
    searchDeals: Proptypes.func.isRequired,
    initialSearchTerm: Proptypes.string.isRequired,
  }
  state = {
    searchTerm: this.props.initialSearchTerm,
  }
  searchDeals = (searchTerm) => {
    this.props.searchDeals(searchTerm);
    this.inputElement.blur();
  }
  debounceSearchDetails = debounce(this.searchDeals, 300);
  handleChange = (searchTerm) => {
    this.setState({searchTerm}, () => {
      this.debounceSearchDetails(this.state.searchTerm);
    });
  }
  render() {
    return (
      <TextInput
        ref={(inputElement) => {this.inputElement = inputElement;}}
        value={this.state.searchTerm}
        placeholder="Search All Deals"
        style={styles.input}
        onChangeText={this.handleChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height:40,
    marginHorizontal: 12,
  },

});


export default SearchBar;
