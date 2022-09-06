import { Alert } from 'react-native';

export const alertError = (error) => Alert.alert('Ops', String(Object.values(error)[0]['message']))