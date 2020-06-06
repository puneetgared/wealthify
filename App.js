/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Graph from './components/graph';
import Cards from './components/Cards';
const App = () => {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [timeHorizon, setTimeHorizon] = useState(5);
  const [monthlyContribution, setMonthlyContribution] = useState(250);
  const [chartData, setchartData] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <View style={styles.appContainer}>
        <View style={styles.graph}>
          <Graph
            forecastData={chartData}
            loading={loading}
            timeHorizon={timeHorizon}
            initialInvestment={initialInvestment}
            monthlyContribution={monthlyContribution}
          />
        </View>
        <View style={styles.panel}>
          <Cards
            setInitial={setInitialInvestment}
            setTime={setTimeHorizon}
            setMonthlyContribution={setMonthlyContribution}
            setchartData={setchartData}
            setLoading={setLoading}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    justifyContent: 'center',
    flex:1,
    // flexWrap: "wrap"    
  },
  graph: {
    flex: 1.9,
  },
  panel: {
    flex: 1,
    // paddingBottom:10
  },
});

export default App;
