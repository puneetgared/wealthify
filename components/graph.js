import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import GraphDetail from './GraphDetail';

// import {forecastData} from './forecastData';
// forecastData,
const Graph = ({forecastData,loading, timeHorizon, initialInvestment, monthlyContribution}) => {
    console.log('Graph forecastdata', JSON.stringify(forecastData, null, 2));
  let body;

  if (loading)
    body = (
      <ActivityIndicator
        size={50}
        style={styles.activityIndicator}
        color="#fff"
      />
    );
  if (!loading && !Array.isArray(forecastData))
    body = <Text>{forecastData}</Text>;

  if (!loading && forecastData.length > 0)
    body = displayGraph(forecastData, timeHorizon);

  return (
    <View style={styles.graphContainer}>
      <Text style={styles.graphHeader}>Expected Outcome Forecast</Text>
      {body}
    </View>
  );
};
const calculateSum = (amounts) => {
    return amounts
    .splice(amounts.length - 5, 5)
    .reduce((acc, curr) => curr + acc, 0)
    .toFixed(2);
}
const displayGraph = (forecastData, timeHorizon,initialInvestment, monthlyContribution) => {
  // {!loading && forecastData.length !== 0 &&
  const labels = forecastData
    .map((data, index) => (index % 2 == 0 ? data.year : null))
    .filter((year) => year !== null);

  const belowAverage = forecastData.map((data) => data.averages['5']);
  const average = forecastData.map((data) => data.averages['50']);
  const aboveAverage = forecastData.map((data) => data.averages['95']);
  // const totalContribution = initialInvestment + 

  const aboveAverageAmount = calculateSum(aboveAverage);
  const averageAmount = calculateSum(average);
  const belowAverageAmount = calculateSum(belowAverage);
  
  console.log('Above Average', aboveAverage, aboveAverageAmount);

  return (
    <>
      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: belowAverage,
              color: (opacity = 1) => `rgba(255, 198, 29, ${opacity})`, // optional
              strokeWidth: 5, // optional
            },
            {
              data: average,
              color: (opacity = 1) => `rgba(163, 227, 76, ${opacity})`, // optional
              strokeWidth: 5, // optional
            },
            {
              data: aboveAverage,
              color: (opacity = 1) => `rgba(77, 166, 255, ${opacity})`, // optional
              strokeWidth: 5, // optional
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={420}
        withDots={true}
        withShadow={true}
        withInnerLines={false}
        // yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        getDotProps={(dataPoint, index) => {
          const fillOpacity = index == timeHorizon ? 1 : 0;
          return {fillOpacity, r: '6'};
        }}
        chartConfig={{
          backgroundColor: '#333840',
          backgroundGradientFrom: '#333840',
          backgroundGradientTo: '#333840',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            // fillOpacity: 0
            // r: "6",
            // strokeWidth: "2",
            // stroke: "#ffa726"
          },
        }}
        // bezier
        style={styles.graph}
      />
        <View style={[styles.graphDetail]}>
          <GraphDetail
            header="Above-average Scenario"
            color="#4da6ff"
            body={aboveAverageAmount}
          />
          <GraphDetail
            header="Average Scenario"
            color="#a3e34c"
            body={averageAmount}
          />
        </View>
        <View style={[styles.graphDetail]}>
          <GraphDetail
            header="Below-average Scenario"
            color="#ffc61d"
            body={belowAverageAmount}
          />
          <GraphDetail
            header="Total Contributions"
            color="#000000"
            body={aboveAverageAmount}
          />
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  graphContainer: {
    flex: 1,
    // height: '60%',
    backgroundColor: '#333840',
    color: '#ffffff',
  },
  graph: {
    paddingLeft: 10,
    borderRadius: 16,
    flex:9
  },
  graphDetail: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    paddingBottom: 20
  },
  graphHeader: {
    color: '#ffffff',
    fontSize: 30,
  },
  activityIndicator: {
    color: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Graph;
