import React from 'react';
import { StyleSheet,View,Text } from 'react-native';

const Graph = () => {
    return ( 
        <View style={styles.graphContainer}>
            <Text style={styles.graphHeader}>Expected Outcome</Text>
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
    graphText:{
        color: '#ffffff',
    },
    graphHeader: {
        color: '#ffffff',
        fontSize: 30,
    }
});
 
export default Graph;