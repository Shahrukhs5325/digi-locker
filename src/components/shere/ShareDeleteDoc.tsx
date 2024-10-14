import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { deleteSharedDocApi } from '../../api/doc/docApi';
import { UserContext } from '../../context/user/UserContext';
import { FONT } from '../../theme/fonts';
import { palette } from '../../theme/themes';
import TextInputCust from '../textInput/TextInput';

interface Props {
  item: any;
  closeBottomSteet: () => void;
  fetchData: () => void;
}

const ShareDeleteDoc: React.FC<Props> = ({ item, closeBottomSteet, fetchData }) => {
  const userContext = React.useContext(UserContext);

  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    shareName: "John Doe",
    shareEmail: "test5@yopmail.com.com",
  });
  const [errors, setErrors] = React.useState("");
  const [visibleSnackBar, setVisibleSnackBar] = React.useState(false);

  const onToggleSnackBar = () => setVisibleSnackBar(!visibleSnackBar);

  const onDismissSnackBar = () => setVisibleSnackBar(false);

  const deleteDocomentHandler = async () => {
    setIsLoading(true);
    try {
      const payload = {
        "senderEmail": item?.userEmail,
        "items": [
          {
            "shareEmail": formData?.shareEmail,
            "uuid": item?.uuid
          }
        ]
      }
      const res = await deleteSharedDocApi(payload);
      onToggleSnackBar();
      closeBottomSteet();
      fetchData();

    } catch (error) {
      console.error('Error deleteDocApi :', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <View style={styles.containerLoader}>
        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={{ gap: 14 }}>
            {/* <TextInputCust
            placeholder='Share user name'
            value={formData.shareName}
            onChangeText={value => {
              setFormData({ ...formData, shareName: value });
              setErrors("");
            }}
          /> */}
            <TextInputCust
              placeholder='Share user email'
              value={formData.shareEmail}
              onChangeText={value => {
                setFormData({ ...formData, shareEmail: value });
                setErrors("");
              }}
            />



            <View style={{ marginVertical: 16 }}>
              <Button mode="outlined" style={{}}
                loading={isLoading}
                disabled={isLoading}
                onPress={() => deleteDocomentHandler()}>
                Delete File
              </Button>
            </View>

          </View>
        </ScrollView>
      </View>
      <Snackbar
        visible={visibleSnackBar}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            onDismissSnackBar()
          },
        }}>
        File deleted successfully
      </Snackbar>
    </>
  );
};

export default ShareDeleteDoc;

const styles = StyleSheet.create({
  containerLoader: {
    flex: 1,
    justifyContent: "center",
    padding: 18,
  },
  txtTextTitle: {
    fontFamily: FONT.Able.regular,
    color: palette.black,
    fontSize: 15,
    fontWeight: '400'
  },
  dateView: {
    flexDirection: 'row',
    alignContent: 'center'
  }
});
