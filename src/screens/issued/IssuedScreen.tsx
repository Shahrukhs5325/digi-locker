import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { UserContext } from '../../context/user/UserContext';
import { FONT } from '../../theme/fonts';
import { palette } from '../../theme/themes';
import IssuedDocItem from '../../components/doc/IssuedDocItem';
import { DOC_LIST } from '../../constant/constant';
import FileAddBtn from '../../components/button/FileAddBtn';

type Props = {};



const IssuedScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);


  return (
    <>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.txtTitleSty}>My Issued Documents</Text>
          </View>

          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              data={DOC_LIST}
              renderItem={({ item }) =>
                <IssuedDocItem item={item} />
              }
              style={styles.listContents}
              contentContainerStyle={styles.list}
            />
          </View>

        </ScrollView>

        <FileAddBtn onPress={() => console.log()} />
      </View>
    </>
  );
};

export default IssuedScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    margin: 16,
  },
  txtTitleSty: {
    fontFamily: FONT.Able.regular,
    fontSize: 18,
    fontWeight: '700',
    color: palette.black,
    letterSpacing: 2,
  },
  list: {
    gap: 16
  },
  listContents: {
    marginVertical: 16

  }



});


