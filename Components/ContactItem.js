// Components/ContactItem.js

import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import FedIn from "../Animations/FedIn";

import { connect } from "react-redux";

class FilmItem extends React.Component {
  _toggleFavorite(contact) {
    const action = { type: "TOGGLE_FAVORITE", value: contact };
    this.props.dispatch(action);
  }

  _displayFavoriteImage() {
    var imageUrl = require("../Images/vide.png");
    if (this.props.isContactFavorite) imageUrl = require("../Images/plein.png");
    return <Image style={styles.favorite_image} source={imageUrl} />;
  }

  render() {
    const { contact } = this.props;
    return (
      <FedIn>
        <View
          style={styles.main_container}
          onPress={() => displayDetailForFilm(film.id)}
        >
          <Image style={styles.image} source={{ uri: contact.avatar }} />
          <View style={styles.content_container}>
            <View style={styles.content_1}>
              <Text style={styles.title_text}>
                {contact.last_name} {contact.first_name}
              </Text>
              <TouchableOpacity onPress={() => this._toggleFavorite(contact)}>
                {this._displayFavoriteImage()}
              </TouchableOpacity>
            </View>
            <Text style={styles.title_text}>{contact.email}</Text>
          </View>
        </View>
      </FedIn>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    borderWidth: 3,
    borderColor: "green",
    margin: 5,
    height: 86,
    flexDirection: "row",
    borderRadius: 15,
  },
  image: {
    width: 70,
    height: 70,
    margin: 5,
    backgroundColor: "gray",
    borderRadius: 15,
  },
  content_container: {
    flex: 1,
    margin: 5,
  },
  content_1: {
    flexDirection: "row",
    alignItems: "center",
  },
  header_container: {
    flex: 3,
    flexDirection: "row",
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 15,
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 5,
    color: "black",
  },
  vote_text: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#666666",
  },
  description_container: {
    flex: 7,
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666",
  },
  date_container: {
    flex: 1,
  },
  date_text: {
    textAlign: "right",
    fontSize: 14,
  },
  favorite_image: {
    width: 40,
    height: 40,
    marginRight: 5,
    marginTop: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesContact: state.toggleFavorite.favoritesContact,
  };
};

export default connect(mapStateToProps)(FilmItem);
