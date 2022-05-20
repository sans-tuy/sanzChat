// RootNavigation.js

import {createNavigationContainerRef} from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Profile: {userId: string};
  Feed: {sort: 'latest' | 'top'} | undefined;
  Register: undefined;
  DashboarUser: undefined;
  Chat: undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigateData(screen: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screen);
  }
}

export function navigate({screen, params}: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screen, params);
  }
}

// add other navigation functions that you need and export them
