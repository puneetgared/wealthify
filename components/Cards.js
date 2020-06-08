import {Card, ListItem, Button, Icon} from 'react-native-elements';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';

const items = [
  {
    title: 'Initial Investment',
    defaultVal: '10000',
    metric: 'INR',
    icon: 'money',
    shortName: 'initial',
    maxLength : 7,
    rightTitle : '£'
  },
  {
    title: 'Time Horizon',
    defaultVal: '5',
    metric: 'Years',
    icon: 'hourglass',
    shortName: 'time',
    maxLength : 2,
    rightTitle : 'Years'
  },
  {
    title: 'Monthly Contribution',
    defaultVal: '250',
    metric: 'INR',
    icon: 'calendar',
    shortName: 'monthlyContribution',
    maxLength : 5,
    rightTitle : '£'
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
              style = {{marginRight : -35}}
              key={i}
              title={item.title}
              titleStyle={styles.title}
              rightTitle= {item.rightTitle}
              rightTitleStyle = {item.shortName == 'time' ? styles.rightTitleTime : styles.rightTitleCurrency }
              leftIcon={
                <Icon name={item.icon} type="font-awesome"   color= '#0162FF'   />
              }
              input={{
                containerStyle : {maxWidth : '30%', marginLeft : -50},
                keyboardType: 'numeric',
                defaultValue: item.defaultVal,
                inputStyle:  item.shortName == 'time' ? styles.inputValueTime : styles.inputValueCurrency,
                onChangeText: (value) => setInputText(value, item.shortName),
                maxLength : item.maxLength
              }}
              bottomDivider
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
  title: {
    color: '#333840',
    letterSpacing: 0.4,
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'SF Pro Display',
    lineHeight: 18,
  },
  inputValueCurrency: {
    color: '#0162FF',
    letterSpacing: 0.4,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Display',
    textAlign: 'justify',
  },
  inputValueTime: {
    color: '#0162FF',
    letterSpacing: 0.4,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Display',
    textAlign: 'left',
    right : 10
  },
  button: {
    height: 52,
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#0162FF',
  },
  rightTitleCurrency: {
    color: '#0162FF',
    paddingRight : 20,
    bottom : 3,
    fontWeight: 'bold',
    fontSize: 18,
  },
  rightTitleTime : {
    color: '#0162FF',
    left : 37,
    bottom : 3,
    fontWeight: 'bold',
    fontSize: 18,
  } 
});
