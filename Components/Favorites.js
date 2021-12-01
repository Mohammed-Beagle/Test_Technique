// Components/Favorites.js

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import ContactList from "./ContactList";
import { connect } from "react-redux";

import Avatar from "./Avatar";

class Favorites extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.avatar_container}>
          <Avatar />
        </View>
        <ContactList contacts={this.props.favoritesContact} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  avatar_container: {
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesContact: state.toggleFavorite.favoritesContact,
  };
};

export default connect(mapStateToProps)(Favorites);
