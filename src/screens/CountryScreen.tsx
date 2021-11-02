import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Text} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {getScreenStyle} from '../misc/getScreenStyle';
import CountryFlag from 'react-native-country-flag';
import styled from 'styled-components/native';
import {Navigation} from 'react-native-navigation';

interface IState {
  countries: {
    id: string;
    name: string;
    capital: object;
    alpha2Code: string;
    callingCodes: [];
    languages: [];
    population: string;
  };
}

export const CountryScreen: NavigationFunctionComponent<Props> = props => {
  const [getCountry, setCountry] = useState<IState['countries'] | null>(null);

  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = useCallback(async () => {
    const query = `
    {
      countries(where: {id: {eq: "${props.componentId}"}}) {
        name
        alpha2Code
        callingCodes
        population
        languages {
					id
					name
    		}
    	}
    }
    `;

    try {
      const res = await fetch(
        'https://api.everbase.co/graphql?apikey=1a784e37-7ce8-4913-9fef-7b669ee578d6',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({query}),
        },
      );
      let {data} = await res.json();
      setCountry(data.countries[0]);
    } catch (e) {
      console.log(e);
    }
  }, [props]);

  const numberWithCommas = (x: any) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleLanguages = (language: any) => {
    return language.map((lang: any) => (
      <ListItem
        key={lang.id}
        onPress={() =>
          Navigation.push(props.componentId, {
            component: {
              name: 'LanguageScreen',
              id: lang.name,
              options: {
                topBar: {
                  title: {
                    text: 'Language Screen',
                  },
                },
              },
            },
          })
        }>
        <LangText>{lang.name}</LangText>
      </ListItem>
    ));
  };

  return (
    <Fragment>
      {getCountry == null ? (
        <Text>Loading...</Text>
      ) : (
        <Fragment>
          <CountryView>
            <CountryFlag isoCode={getCountry.alpha2Code} size={80} />
            <CountryName>
              <Title>{getCountry.name}</Title>
            </CountryName>
            <CountryDetail>
              <CountryColumnLeft>
                <Text>alpha2Code</Text>
                <Text>callingCodes</Text>
                <Text>population</Text>
                <Text>languages</Text>
              </CountryColumnLeft>
              <CountryColumnRight>
                <Text>{getCountry.alpha2Code}</Text>
                <Text>{getCountry.callingCodes[0]}</Text>
                <Text>{numberWithCommas(getCountry.population)}</Text>
                <CountryLanguage>
                  {handleLanguages(getCountry.languages)}
                </CountryLanguage>
              </CountryColumnRight>
            </CountryDetail>
          </CountryView>
        </Fragment>
      )}
    </Fragment>
  );
};

const CountryView = styled.View`
  display: flex;
  padding: 15px;
  align-items: center;
  justify-content: center;
`;

const CountryName = styled.View`
  display: flex;
  padding: 10px 0;
`;

const CountryColumnLeft = styled.View`
  flex: 1;
`;

const CountryColumnRight = styled.View`
  flex: 1;
  align-items: flex-end;
`;

const CountryDetail = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
`;

const LangText = styled.Text`
  color: blue;
  text-decoration: underline;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

const ListItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
`;

const CountryLanguage = styled.View`
  display: flex;
`;

CountryScreen.options = getScreenStyle();

CountryScreen.options = {};
