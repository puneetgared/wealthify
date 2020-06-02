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
const Graph = ({
  forecastData,
  loading,
  timeHorizon,
  initialInvestment,
  monthlyContribution,
}) => {
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
    body = displayGraph(
      forecastData,
      timeHorizon,
      initialInvestment,
      monthlyContribution,
    );

  return (
    <View style={styles.graphContainer}>
      <Text style={styles.graphHeader}>Expected Outcome Forecast</Text>
      {body}
    </View>
  );
};

const calculateSum = (amounts) => {
  return [...amounts]
    .splice(amounts.length - 5, 5)
    .reduce((acc, curr) => curr + acc, 0)
    .toFixed(2);
};

const displayGraph = (
  forecastData,
  timeHorizon,
  initialInvestment,
  monthlyContribution,
) => {
  // {!loading && forecastData.length !== 0 &&
  const labels = forecastData
    .map((data, index) => (index % 2 == 0 ? data.year : null))
    .filter((year) => year !== null);

  const belowAverage = forecastData.map((data) => data.averages['5']);
  const average = forecastData.map((data) => data.averages['50']);
  const aboveAverage = forecastData.map((data) => data.averages['95']);

  let totalContribution = [initialInvestment];
  for (let i = 1; i <= timeHorizon + 5; i++) {
    const cumulativeTotalContribution =
      totalContribution[i - 1] + monthlyContribution * 12;
    totalContribution.push(cumulativeTotalContribution);
  }
  console.log('Total Contribution', totalContribution);

  const aboveAverageAmount = calculateSum(aboveAverage);
  const averageAmount = calculateSum(average);
  const belowAverageAmount = calculateSum(belowAverage);
  const totalContributionAmount = calculateSum(totalContribution);

  console.log('Above Average', aboveAverage, aboveAverageAmount);
  const charLinesDataSets = [
    {
      data: aboveAverage,
      color: (opacity = 1) => `rgba(77, 166, 255, ${opacity})`, // optional
      strokeWidth: 3, // optional
    },
    {
      data: average,
      color: (opacity = 1) => `rgba(163, 227, 76, ${opacity})`, // optional
      strokeWidth: 3, // optional
    },
    {
      data: totalContribution,
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
      strokeWidth: 3, // optional
    },
    {
      data: belowAverage,
      color: (opacity = 1) => `rgba(255, 198, 29, ${opacity})`, // optional
      strokeWidth: 3, // optional
    },
  ];

  const chartShadesDataSets = prepareChartShades(aboveAverage, average, belowAverage);

  return (
    <>
      <LineChart
        data={{
          labels,
          datasets: [
            ...charLinesDataSets,
            ...chartShadesDataSets
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={Dimensions.get('window').height / 2}
        withDots={true}
        withShadow={false}
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
          // fillShadowGradient:  `rgba(235, 245, 223, ${10})`,
          useShadowColorFromDataset: true,
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
          color="#ffff"
          body={totalContributionAmount}
        />
      </View>
    </>
  );
};

const prepareChartShades = (aboveAverage, average, belowAverage) => {
  
  //Above Average
  const allShades = [];
  for (let i = 90; i < 105; i++) {
    allShades.push({
      data: aboveAverage.map(amount => amount*(i/100)),
      color: (opacity = 1) => `rgba(151, 199, 247, ${opacity})`, // optional
      strokeWidth: 1, // optional
      withDots: false,
    });
  }

  //Average
  for (let i = 80; i < 124; i++) {
    allShades.push({
      data: average.map(amount => amount*(i/100)),
      color: (opacity = 1) => `rgba(206, 245, 154, ${opacity})`, // optional
      strokeWidth: 1, // optional
      withDots: false,
    });
  }

  //Below average
  for (let i = 95; i < 112; i++) {
    allShades.push({
      data: belowAverage.map(amount => amount*(i/100)),
      color: (opacity = 1) => `rgba(247, 231, 181, ${opacity})`, // optional
      strokeWidth: 1, // optional
      withDots: false,
    });
  }

  return allShades;
  
}

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
    flex: 9,
  },
  graphDetail: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    paddingBottom: 20,
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
