import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { getSharedDocApi } from '../../api/doc/docApi';
import TextInputCust from '../textInput/TextInput';
import { Button, Checkbox } from 'react-native-paper';
import { palette } from '../../theme/themes';
import { FONT } from '../../theme/fonts';
import { UserContext } from '../../context/user/UserContext';

interface Props {
  navbar?: boolean | undefined;
  isCross?: boolean | undefined;
}

const ShareForm: React.FC<Props> = ({ item }) => {
  const userContext = React.useContext(UserContext);

  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    shareName: "John Doe",
    shareEmail: "test5@yopmail.com.com",
    validUptoDate: "2024-10-16",
    isDownloadAccess: true,
    isViewAccess: true,
  });
  const [errors, setErrors] = React.useState("");

  const shereDocomentHandler = async () => {

    setIsLoading(true);
    try {
      const payload = [
        {
          "validUptoDate": formData.validUptoDate,
          "shareName": formData.shareName,
          "shareEmail": formData.shareEmail,
          "isDownloadAccess": formData.isDownloadAccess,
          "isViewAccess": formData.isViewAccess,
          "senderEmail": userContext?.user,
          "uuid": item?.uuid
        }
      ];
      const res = await getSharedDocApi(payload);
      console.log(res?.data);

    } catch (error) {
      console.error('Error deleteDocApi :', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.containerLoader}>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{ gap: 14 }}>
          <TextInputCust
            placeholder='Share user name'
            value={formData.shareName}
            onChangeText={value => {
              setFormData({ ...formData, shareName: value });
              setErrors("");
            }}
          />
          <TextInputCust
            placeholder='Share user email'
            value={formData.shareEmail}
            onChangeText={value => {
              setFormData({ ...formData, shareEmail: value });
              setErrors("");
            }}
          />
          <Checkbox.Item
            status={formData?.isViewAccess ? "checked" : "unchecked"}
            onPress={() => setFormData({ ...formData, isViewAccess: !formData?.isDownloadAccess })}
            uncheckedColor={palette.black}
            color={palette.primaryDark}
            labelStyle={styles.txtTextTitle}
            label='View Access'
            position='trailing'
          />
          <Checkbox.Item
            status={formData?.isDownloadAccess ? "checked" : "unchecked"}
            onPress={() => setFormData({ ...formData, isDownloadAccess: !formData?.isDownloadAccess })}
            uncheckedColor={palette.black}
            color={palette.primaryDark}
            labelStyle={styles.txtTextTitle}
            label='Download Access'
            position='trailing'
          />

          <View style={{}}>
            <Button mode="outlined" style={{}}
              disabled={isLoading}
              onPress={() => shereDocomentHandler()}>
              Share File
            </Button>
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

export default ShareForm;

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
});
