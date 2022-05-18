// RootNavigation.js

import {createNavigationContainerRef} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Profile: {userId: string};
  Feed: {sort: 'latest' | 'top'} | undefined;
  screen: keyof RootStackParamList;
  params:
    | string
    | {userId: string}
    | {sort: 'latest' | 'top'}
    | {userId: string}
    | undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate({screen, params}: RootStackParamList) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screen, params);
  }
}

// add other navigation functions that you need and export them
