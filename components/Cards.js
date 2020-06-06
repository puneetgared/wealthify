import {Card, ListItem, Button, Icon} from 'react-native-elements';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';

const items = [
  {
    name: 'Initial Investment',
    defaultVal: '10000',
    metric: 'INR',
    icon: 'money',
    shortName: 'initial',
  },
  {
    name: 'Time Horizon',
    defaultVal: '5',
    metric: 'Years',
    icon: 'hourglass',
    shortName: 'time',
  },
  {
    name: 'Monthly Contribution',
    defaultVal: '250',
    metric: 'INR',
    icon: 'calendar',
    shortName: 'monthlyContribution',
  },
];
export default cards = (props) => {
  const {
    setInitial,
    setTime,
    setMonthlyContribution,
    setchartData,
    setLoading,
  } = props;

  const [panelState, setPanelState] = useState({
    initial: 10000,
    time: 5,
    monthlyContribution: 250,
  });

  const confirmAmount = async () => {
    console.log('Cards confirmAmount', panelState);
    try {
      setLoading(true);
      const url = `https://wealthexpert.fidelity.de/api/goal/forecast?initialContribution=${panelState.initial}&monthlyContribution=${panelState.monthlyContribution}&timeHorizon=${panelState.time + 5}`
      console.log('URL LLL ', url)
      const result = await axios.get(url);
      setchartData(result.data);
      console.log('Forecast api data', result.data)

      setTime(panelState.time);
      setInitial(panelState.initial);
      setMonthlyContribution(panelState.monthlyContribution);

      setLoading(false);
    } catch (e) {
      console.log('Caught in Catch', e);
      setLoading(false);
      setchartData('Error Occurred While running forcaster');
    }
  };
  
  const setInputText = (value, shortName) => {
    setPanelState({...panelState, [shortName]: +value});
  };
  
  return (
    <View>
      <Card containerStyle={styles.root}>
        {items.map((item, i) => {
          return (
            <ListItem
              key={i}
              title={item.name}
              bottomDivider
              titleStyle={styles.inputText}
              leftIcon={
                <Icon name={item.icon} type="font-awesome" color="#517fa4" />
              }
              input={{
                keyboardType: 'numeric',
                defaultValue: item.defaultVal,
                inputStyle: styles.inputValue,
                onChangeText: (value) => setInputText(value, item.shortName),
              }}
            />
          );
        })}
      </Card>
      <Button
        buttonStyle={styles.button}
        title="Confirm this amount"
        onPress={confirmAmount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    margin:0,
    padding:0
  },
  inputText: {
    color: '#333840',
    letterSpacing: 0.4,
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'SF Pro Display',
    lineHeight: 18,
  },
  inputValue: {
    color: '#0162FF',
    letterSpacing: 0.4,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Display',
    textAlign: 'right',
  },
  button: {
    height: 52,
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#0162FF',
  },
});
