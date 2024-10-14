import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { Animated, Dimensions, FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { UserContext } from '../../context/user/UserContext';
import { FONT } from '../../theme/fonts';
import { palette } from '../../theme/themes';
import IssuedDocItem from '../../components/doc/IssuedDocItem';
import FileAddBtn from '../../components/button/FileAddBtn';
import { getDocApi } from '../../api/doc/docApi';
import Loader from '../../components/loader/Loader';
import moment from 'moment';

const WIDTH = Dimensions.get('window').width;


type Props = {};



const VerifiedList: React.FC<Props> = () => {
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);
  const refRBSheet = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;


  const [isLoading, setIsLoading] = React.useState(false);
  const [documents, setDocuments] = React.useState([]);



  React.useEffect(() => {
    fetchData();
  }, [userContext]);

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

  // if (isLoading) {
  //   return (
  //     <Loader />
  //   )
  // }

  return (
    <>
      <View style={styles.container}>


        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={[...documents, ...documents]}
            renderItem={({ item }) =>
              <View style={styles.itemContainer}>
                <View >
                  {console.log(item)}
                  <Text style={styles.txtTitleSty} numberOfLines={2}>{item?.fileName}</Text>
                  <Text style={styles.txtCatSty}>{item?.sharedStatus ? "Shared" : "Not Shared"}</Text>
                  <Text style={styles.txtCatSty}>{moment(item?.createdDate).format("DD-MMM-YYYY hh:mm a")}</Text>
                </View>
              </View>
            }
            style={styles.listContents}
            contentContainerStyle={styles.list}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          />
        </View>


      </View>
    </>
  );
};

export default VerifiedList;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    margin: 16,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: palette.black,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: WIDTH - 80
  },
  txtTitleSty: {
    fontFamily: FONT.Able.regular,
    fontSize: 15,
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
  },
  txtCatSty: {
    //  fontFamily: FONT.Able.regular,
    fontSize: 13,
    fontWeight: '400',
    color: palette.black,
  }



});


