// Components/Avatar.js

import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import * as ImagePicker from "expo-image-picker";

class Avatar extends React.Component {
  constructor(props) {
    super(props);
  }

  useEffect =
    (() => {
      (async () => {
        if (Platform.OS !== "web") {
          const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
          }
        }
      })();
    },
    []);

  _avatarClicked = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      let requireSource = { uri: result.uri };
      // we create an action with the selected image and we send it to the Redux Store
      const action = { type: "SET_AVATAR", value: requireSource };
      this.props.dispatch(action);
    }
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={this._avatarClicked}
      >
        <Image style={styles.avatar} source={this.props.avatar} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  touchableOpacity: {
    margin: 5,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    borderColor: "white",
    borderWidth: 6,
  },
});

// we map the avatar inside the state to the component props
const mapStateToProps = (state) => {
  return {
    avatar: state.setAvatar.avatar,
  };
};

export default connect(mapStateToProps)(Avatar);
