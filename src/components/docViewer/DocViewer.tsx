import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface Props {
  navbar?: boolean | undefined;
  isCross?: boolean | undefined;
}

const DocViewer: React.FC<Props> = () => {
  return (
    <View style={styles.containerLoader}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

export default DocViewer;

const styles = StyleSheet.create({
  containerLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25,
  },
});
