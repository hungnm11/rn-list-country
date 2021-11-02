import {Navigation} from 'react-native-navigation';
import {HomeScreen} from '~/screens/HomeScreen';
import {CountryScreen} from '~/screens/CountryScreen';

Navigation.registerComponent('HomeScreen', () => HomeScreen);
Navigation.registerComponent('CountryScreen', () => CountryScreen);
Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'HomeScreen',
            },
          },
        ],
      },
    },
  });
});
