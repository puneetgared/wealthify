import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { forecastData } from './forecastData';

const Graph = () => {
    const labels = forecastData
                        .map((data,index) => index%2 == 0 ? data.year : null)
                        .filter(year => year !== null);
    const belowAverage = forecastData.map(data => data.averages["5"])
    const average = forecastData.map(data => data.averages["50"])
    const aboveAverage = forecastData.map(data => data.averages["95"])

    const timeHorizon = 5 //TimeHorizon input by the user
    const hidePointsAtIndex = forecastData.map((data, index) => index).filter(index => index+1 !== timeHorizon);
    console.log("hidePointsAtIndex", hidePointsAtIndex);
    return (
        <View style={styles.graphContainer}>
            <Text style={styles.graphHeader}>Expected Outcome Forecast</Text>

            <LineChart
                data={{
                    labels,
                    datasets: [
                        {
                            data: belowAverage,
                            color: (opacity = 1) => `rgba(255, 198, 29, ${opacity})`, // optional
                            strokeWidth: 5 // optional
                            
                        },
                        {
                            data: average,
                            color: (opacity = 1) => `rgba(163, 227, 76, ${opacity})`, // optional
                            strokeWidth: 5 // optional
                        },
                        {
                            data: aboveAverage,
                            color: (opacity = 1) => `rgba(77, 166, 255, ${opacity})`, // optional
                            strokeWidth: 5 // optional
                        }
                    ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={420}
                withDots={true}
                withShadow={true}
                withInnerLines={false}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                getDotProps={(dataPoint, index)=> {
                    const fillOpacity =  index == timeHorizon? 1: 0
                    return { fillOpacity, r: "6" }
                }}
                chartConfig={{
                    backgroundColor: "#333840",
                    backgroundGradientFrom: "#333840",
                    backgroundGradientTo: "#333840",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        // fillOpacity: 0
                        // r: "6",
                        // strokeWidth: "2",
                        // stroke: "#ffa726"
                    }
                }}
                // bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    graphContainer: {
        flex: 1,
        height: '60%',
        backgroundColor: '#333840',
        color: '#ffffff'
    },
    graphText: {
        color: '#ffffff',
    },
    graphHeader: {
        color: '#ffffff',
        fontSize: 30,
    }
});

export default Graph;