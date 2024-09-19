import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { UserContext } from '../../context/user/UserContext';
import { FONT } from '../../theme/fonts';
import { palette } from '../../theme/themes';
import { DOC_LIST } from '../../constant/constant';
import SharedDocItem from '../../components/doc/SharedDocItem';
import FileAddBtn from '../../components/button/FileAddBtn';
import { getDocApi } from '../../api/doc/docApi';

type Props = {};



const SharedScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);

  const [documents, setDocuments] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const payload = { userEmail: 'ezy@yopmail.com' };
      const response = await getDocApi(payload);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.txtTitleSty}>Shared Documents</Text>
          </View>

          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              data={documents}
              renderItem={({ item }) =>
                <SharedDocItem item={item} />
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

export default SharedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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


