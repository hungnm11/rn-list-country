import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Text, FlatList} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {getScreenStyle} from '../misc/getScreenStyle';
import styled from 'styled-components/native';

interface IState {
  countries: [];
  alpha2Code: string;
}

export const LanguageScreen: NavigationFunctionComponent<Props> = props => {
  const [getLanguage, setLanguage] = useState<IState | null>(null);
  console.log(getLanguage);
  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = useCallback(async () => {
    const query = `
    {
        languages(where: {name: {eq: "${props.componentId}"}}) {
          countries {
            name
          }
          alpha2Code
        }
      }
    `;

    try {
      const res = await fetch(
        'https://api.everbase.co/graphql?apikey=YOUR_KEY',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({query}),
        },
      );
      let {data} = await res.json();
      setLanguage(data?.languages[0]);
    } catch (e) {
      console.log(e);
    }
  }, [props]);

  const renderItem = ({item}: any) => {
    return (
      <ListItemView key={item.name}>
        <LangText>{item?.name}</LangText>
      </ListItemView>
    );
  };

  return (
    <Fragment>
      <LanguageView>
        {getLanguage == null ? (
          <Text>Loading...</Text>
        ) : (
          <Fragment>
            <Header>
              <Title>{props.componentId}</Title>
            </Header>
            <CountryDetail>
              <CountryColumnLeft>
                <Text>alpha2Code</Text>
                <Text>countries</Text>
              </CountryColumnLeft>
              <CountryColumnRight>
                <Alpha2Code>{getLanguage.alpha2Code}</Alpha2Code>
                <CountryLanguage>
                  <FlatList
                    data={getLanguage.countries}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                  />
                </CountryLanguage>
              </CountryColumnRight>
            </CountryDetail>
          </Fragment>
        )}
      </LanguageView>
    </Fragment>
  );
};

const LanguageView = styled.View`
  flex: 1;
  background-color: #e6eeff;
  padding: 15px;
`;

const CountryDetail = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 10px 0;
`;

const CountryColumnLeft = styled.View`
  flex: 1;
`;

const CountryColumnRight = styled.View`
  flex: 1;
  align-items: flex-end;
`;

const ListItemView = styled.View`
  align-items: flex-end;
`;

const CountryLanguage = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 30px;
`;

const Alpha2Code = styled.Text`
  font-weight: bold;
  font-size: 15px;
`;

const LangText = styled.Text`
  color: blue;
  text-decoration: underline;
`;

const Header = styled.View`
  align-items: center;
`;

LanguageScreen.options = getScreenStyle();

LanguageScreen.options = {};
