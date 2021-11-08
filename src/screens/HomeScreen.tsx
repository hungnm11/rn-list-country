import React, {useEffect, useState} from 'react';
import {Text, FlatList} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';
import styled from 'styled-components/native';
import {getScreenStyle} from '../misc/getScreenStyle';
import {Navigation} from 'react-native-navigation';
import CountryFlag from 'react-native-country-flag';

interface IState {
  countries: {
    id: string;
    name: string;
    capital: object;
    alpha2Code: string;
  }[];
}

const Item = ({items, onPress}: any) => {
  return (
    <ListItem onPress={onPress}>
      <ItemView>
        <CountryFlag isoCode={items.alpha2Code} size={48} />
      </ItemView>
      <ItemView>
        <Title>{items?.name}</Title>
        <SubTitle>{items?.capital?.name}</SubTitle>
      </ItemView>
    </ListItem>
  );
};

export const HomeScreen: NavigationFunctionComponent<Props> = props => {
  const [countryList, setCountryList] = useState<IState['countries'] | null>(
    null,
  );

  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = async () => {
    const query = `
    {
      countries {
        id
        name
        alpha2Code
        capital {
          name
          id
        }
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
      setCountryList(data.countries);
    } catch (e) {
      console.log(e);
    }
  };

  const renderItem = ({item}: any) => {
    return (
      <Item
        items={item}
        onPress={() =>
          Navigation.push(props.componentId, {
            component: {
              name: 'CountryScreen',
              id: item.id,
              options: {
                topBar: {
                  title: {
                    text: 'Country Screen',
                  },
                },
              },
            },
          })
        }
      />
    );
  };
  
  return (
    <Root>
      <Header />
      <TitleList>List of countries</TitleList>
      {countryList == null ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={countryList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </Root>
  );
};

const Root = styled.View`
  flex: 1;
  background-color: #e6eeff;
`;

const ItemView = styled.View`
  display: flex;
  padding: 5px;
`;

const Header = styled.View`
  background-color: #ffbfcd;
  height: 35%;
  margin-bottom: 10px;
  border-bottom-left-radius: 35px;
`;

const ListItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: {width: 0, height: 2};
  shadow-opacity: 0.8;
  margin: 5px 15px;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

const TitleList = styled.Text`
  font-weight: bold;
  font-size: 18px;
  padding: 5px 15px;
`;

const SubTitle = styled.Text`
  font-size: 12px;
`;

HomeScreen.options = getScreenStyle();
//#endregion
