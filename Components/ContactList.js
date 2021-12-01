// Components/ContactList.js

import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import ContactItem from "./ContactItem";

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.request = 1;
  }

  _isContactFavorite(contact) {
    if (
      this.props.favoritesContact.findIndex(
        (item) => item.id === contact.id
      ) !== -1
    ) {
      return true;
    }
    return false;
  }

  render() {
    const { doGet } = this.props;
    return (
      <FlatList
        style={styles.list}
        data={this.props.contacts}
        extraData={this.props.favoritesFilm}
        keyExtractor={(item) => item.id.toString()}
        refreshing={false}
        onRefresh={() => {
          doGet(this.request);
          this.request == 1 ? (this.request = 2) : (this.request = 1);
        }}
        renderItem={({ item }) => (
          <ContactItem
            isContactFavorite={this._isContactFavorite(item)}
            contact={item}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesContact: state.toggleFavorite.favoritesContact,
  };
};

export default connect(mapStateToProps)(ContactList);
