import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { UserContext } from '../../context/user/UserContext';
import { FONT } from '../../theme/fonts';
import { palette } from '../../theme/themes';
import IssuedDocItem from '../../components/doc/IssuedDocItem';
import FileAddBtn from '../../components/button/FileAddBtn';
import { getDocApi } from '../../api/doc/docApi';
import Loader from '../../components/loader/Loader';

type Props = {};



const IssuedScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);
  const refRBSheet = useRef();

  const [isLoading, setIsLoading] = React.useState(false);
  const [documents, setDocuments] = React.useState([]);



  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const payload = { userEmail: userContext.user };
      const response = await getDocApi(payload);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Loader />
    )
  }

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
              data={documents}
              renderItem={({ item }) =>
                <IssuedDocItem item={item} fetchData={fetchData} />
              }
              style={styles.listContents}
              contentContainerStyle={styles.list}
              ListEmptyComponent={<View style={styles.errView}>
                <Text style={styles.emtTxt}>Data not found</Text>
              </View>}
            />
          </View>

        </ScrollView>

        <FileAddBtn refRBSheet={refRBSheet} />
      </View>
    </>
  );
};

export default IssuedScreen;

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

  },
  errView: {
    flex: 1,
    marginTop: "30%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  emtTxt: {
    fontFamily: FONT.Able.regular,
    fontSize: 16,
    fontWeight: '400',
    color: palette.black,
    letterSpacing: 2,
  }



});


