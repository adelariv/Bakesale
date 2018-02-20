import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Dimensions
} from 'react-native';
import ajax from '../ajax';
import DealList from './DealList';
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';

type Props = {};
export default class App extends Component<Props> {
  titleXPos = new Animated.Value(0);
  state = {
    deals: [],
    dealsFormSearch: [],
    currentDealId: null,
    activeSearchTerm: '',
  };
  animateTitle = (direction = 1) => {
    const width = Dimensions.get('window').width - 150;
    Animated.timing(this.titleXPos, {
      toValue: direction * (width / 2),
      duration: 1000,
      easing: Easing.ease,
    }).start(({ finished }) => {
      if (finished) {
        this.animateTitle(-1 * direction);
      }
    });
  }
  async componentDidMount(){
    this.animateTitle();
    const deals = await ajax.fetchInitialDeals();
    //console.log(deals);
    this.setState({ deals });
  }
  searchDeals = async (searchTerm) => {
    let dealsFormSearch = [];
    if (searchTerm) {
      dealsFormSearch = await ajax.fetchDealsSearchResults(searchTerm);
    }
    this.setState({ dealsFormSearch, activeSearchTerm: searchTerm });
  }
  setCurrentDeal = (dealId) => {
    this.setState({
      currentDealId: dealId
    });
  }
  unsetCurrentDeal = () => {
    this.setState({
      currentDealId: null
    });
  }
  currentDeal = () => {
    return this.state.deals.find((deal) => deal.key === this.state.currentDealId);
  }

  render() {
    if (this.state.currentDealId) {
      return (
        <View style={styles.main}>
          <DealDetail
            initialDealData={this.currentDeal()}
            onBack={this.unsetCurrentDeal}
           />
        </View>
      );
    }
    const dealsToDisplay =
      this.state.dealsFormSearch.length > 0
      ? this.state.dealsFormSearch
      : this.state.deals;

    if (dealsToDisplay.length > 0) {
      return (
        <View style={styles.main}>
          <SearchBar
            searchDeals={this.searchDeals}
            initialSearchTerm={this.state.activeSearchTerm}
          />
          <DealList
            deals={dealsToDisplay}
            onItemPress={this.setCurrentDeal}
          />
        </View>
      );
    }
    return (
      <Animated.View style={[ {left: this.titleXPos}, styles.container]}>
          <Text style={styles.header}>Bakesale</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  main: {
    marginTop: 50,
  },
  header: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
