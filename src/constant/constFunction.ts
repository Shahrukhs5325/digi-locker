import moment from 'moment';
import { convertDistance, getDistance } from 'geolib';
import { Linking, Platform } from 'react-native';


export const utcDateConvoter = (date: any) => {
  return moment(date, 'YYYY-MM-DD').format('DD MMM YYYY');
};

export const calculateDistance = (user: any, coupon: any) => {
  const result = getDistance(
    { latitude: "24.7136", longitude: "46.6753" },
    // { latitude: user?.geoLocation?.coords?.latitude, longitude: user?.geoLocation?.coords?.longitude },
    { latitude: coupon?.latitude, longitude: coupon?.longitude }
  )
  const distance = convertDistance(result, "km").toFixed(2)
  return Number(distance)
}

export const openAddressOnMap = (lat: any, long: any, storeName: string) => {
  const scheme = Platform.select({
    ios: 'maps:0,0?q=',
    android: 'geo:0,0?q=',
  });
  const latLng = `${lat},${long}`;
  const label = storeName;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });
  Linking.openURL(url);
};

export const handleCognitoError = (error: any) => {
  if (error.code === 'UsernameExistsException') {
    return 'An account with the given username already exists.';
  } else if (error.code === 'UserNotFoundException') {
    return 'User does not exist.';
  } else if (error.code === 'UserNotConfirmedException') {
    return 'User is not confirmed.';
  } else if (error.code === 'CodeMismatchException') {
    return 'Invalid code';
  } else if (error.code === 'ExpiredCodeException') {
    return 'The code has expired.';
  } else if (error.code === 'AliasExistsException') {
    return 'An account with the given email/phone number already exists.';
  } else if (error.code === 'InvalidPasswordException') {
    return 'Password does not conform to policy.';
  } else if (error.code === 'NotAuthorizedException') {
    return 'Incorrect username or password.';
  } else if (error.code === 'LimitExceededException') {
    return 'Limit exceeded.';
  } else if (error.code === 'InternalErrorException') {
    return 'Internal error.';
  } else if (error.code === 'UserLambdaValidationException') {
    return 'User validation failed.';
  } else if (error.code === 'UserPasswordValidationException') {
    return 'Password validation failed.';
  } else if (error.code === 'ResourceNotFoundException') {
    return 'Resource not found.';
  } else if (error.code === 'TooManyRequestsException') {
    return 'Too many requests.';
  } else {
    return 'Something went wrong';
  }
};