import {Navigation} from 'react-native-navigation';
import {HomeScreen} from '~/screens/HomeScreen';
import {CountryScreen} from '~/screens/CountryScreen';
import {LanguageScreen} from '~/screens/LanguageScreen';

Navigation.registerComponent('HomeScreen', () => HomeScreen);
Navigation.registerComponent('CountryScreen', () => CountryScreen);
Navigation.registerComponent('LanguageScreen', () => LanguageScreen);
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
