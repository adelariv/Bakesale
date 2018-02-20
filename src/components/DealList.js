import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  FlatList
} from 'react-native';
import Proptypes from 'prop-types';
import DealItem from './DealItem'

class DealList extends React.Component {
  static propTypes = {
    deals: Proptypes.array.isRequired,
    onItemPress: Proptypes.func.isRequired,
  }

  render() {
    return (
      <View style={styles.list}>
        <FlatList
          data={this.props.deals}
          renderItem={({item}) => (
          <DealItem deal={item}  onPress={this.props.onItemPress}/>
          )}
        />
      </View>

    );
  }
}
const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eee',
    width: '100%',
  },
});
export default DealList;
