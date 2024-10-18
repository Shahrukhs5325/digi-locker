import React from 'react';
import { View, StyleSheet } from 'react-native';

const TopSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.curvedPart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    // zIndex: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  curvedPart: {
    width: '100%',
    height: 260,
    backgroundColor: '#4a47e3',
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 200,
    transform: [{ scaleX: 1.5 }],
  },
});

export default TopSection;
