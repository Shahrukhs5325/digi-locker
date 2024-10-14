import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { getSharedDocApi, postSharedDocApi } from '../../api/doc/docApi';
import TextInputCust from '../textInput/TextInput';
import { Button, Checkbox, Text } from 'react-native-paper';
import { palette } from '../../theme/themes';
import { FONT } from '../../theme/fonts';
import { UserContext } from '../../context/user/UserContext';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';

interface Props {
  item: any;
}

const ShareForm: React.FC<Props> = ({ item }) => {
  const userContext = React.useContext(UserContext);
  const todayDate = new Date()

  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    shareName: "John Doe",
    shareEmail: "test5@yopmail.com",
    validUptoDate: new Date(new Date(todayDate).setDate(todayDate.getDate() + 3)),
    isDownloadAccess: true,
    isViewAccess: true,
  });
  const [errors, setErrors] = React.useState("");
  const [open, setOpen] = React.useState(false)



  const shereDocomentHandler = async () => {

    setIsLoading(true);
    try {
      const payload = {
        "validUptoDate": moment(formData.validUptoDate).format("YYYY-MM-DD"),
        "shareName": formData.shareName,
        "shareEmail": formData.shareEmail,
        "isDownloadAccess": formData.isDownloadAccess,
        "isViewAccess": formData.isViewAccess,
        "senderEmail": userContext?.user,
        "uuid": item?.uuid
      }

      console.log(payload);

      const res = await postSharedDocApi(payload);
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

          <View style={styles.dateView}>
            <Text style={[styles.txtTextTitle, { marginHorizontal: 14 }]}>{formData.validUptoDate ? "Change Valid Upto Date:" : "Select Valid Upto Date:"}</Text>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Text style={[styles.txtTextTitle, { textDecorationLine: "underline" }]}>{moment(formData.validUptoDate).format("DD-MMM-YYYY")}</Text>
            </TouchableOpacity>
          </View>

          <DatePicker
            modal
            open={open}
            date={formData.validUptoDate}
            minimumDate={new Date()}
            mode='date'
            onConfirm={(date) => {
              setFormData({ ...formData, validUptoDate: date });
              setErrors("");
              setOpen(false)
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />

          <View style={{ marginVertical: 16 }}>
            <Button mode="outlined" style={{}}
              loading={isLoading}
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
  dateView: {
    flexDirection: 'row',
    alignContent: 'center'
  }
});
