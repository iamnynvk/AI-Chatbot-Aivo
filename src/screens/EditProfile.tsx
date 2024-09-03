import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../components/Header/Header';

const EditProfile = () => {
  return (
    <View style={styles.container}>
      <Header title={`Edit Profile`} isBack={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EditProfile;
