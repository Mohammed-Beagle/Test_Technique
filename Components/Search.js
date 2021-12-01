// Components/Search.js

import React from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  ActivityIndicator,
  LogBox,
} from "react-native";

import ContactList from "./ContactList";
import films from "../Helpers/ContactsData";

import SearchBar from "react-native-searchbar";

import { requestApi } from "../API/GivenApi";

LogBox.ignoreLogs([
  "Warning: componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.",
]);

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.request = 1;
    this.state = {
      contactsForSearchBar: [],
      contactsForList: [],
      isLoading: false,
      margin: 0,
    };
  }

  _doGET = (request) => {
    var url = "https://reqres.in/api/users?page=1&delay=1";
    if (request != 1) url = "https://reqres.in/api/users?page=2&delay=1";

    requestApi(url).then((results) => {
      this.setState({
        contactsForSearchBar: results.data,
        contactsForList: results.data,
      });
    });

    this.request = request;
  };

  // I have used this function to display loading while searshing for data
  // but with the pull to refretsh of FlatList we have spinner intergrated with ...

  /* _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }
  } */

  _handleResults = (results) => {
    this.setState({ contactsForList: results });
  };

  componentDidMount() {
    this._doGET(1);
  }

  _onBack = () => {
    this.setState({
      margin: 0,
    });
    this.searchBar.hide();
    this._doGET(this.request);
  };

  render() {
    return (
      <View style={styles.main_container}>
        <SearchBar
          ref={(ref) => (this.searchBar = ref)}
          data={this.state.contactsForSearchBar}
          handleResults={this._handleResults}
          onBack={this._onBack}
          allDataOnEmptySearch
          placeholder="Nom, Prénom ou Email"
        />
        <View style={[styles.main_container, { marginTop: this.state.margin }]}>
          <View style={styles.search_container}>
            <Button
              title="Search"
              color="green"
              onPress={() => {
                this.setState({
                  margin: 65,
                });
                this.searchBar.show();
              }}
            />
            <Text style={styles.total_text}>
              Total : {this.state.contactsForList.length}
            </Text>
          </View>
          <ContactList
            contacts={this.state.contactsForList}
            doGet={this._doGET}
          />
          {/* {this._displayLoading()} */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  search_container: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  textinput: {
    flex: 1,
    margin: 10,
    height: 50,
    borderColor: "#000000",
    borderWidth: 2,
    borderRadius: 30,
    paddingLeft: 20,
  },
  total_text: {
    color: "green",
    margin: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Search;
