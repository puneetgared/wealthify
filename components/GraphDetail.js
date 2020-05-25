import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const GraphDetail = ({color, header, body}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.header}>{header}</Text>
      <View style={styles.bodyRow}>
        <View style={[styles.circle, {backgroundColor: color}]}></View>
        <Text style={styles.body}>£ {body}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingLeft:30
    // flexDirection: "row",
    // justifyContent: "flex-start",
    // alignItems: "flex-start"
  },
  header: {
    color: '#ffffff',
    fontSize: 16
  },
  body: {
    // flex:1,
    color: '#ffffff',
    fontSize: 15,
    marginLeft: 20
  },
  bodyRow: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
  
    
  },  
  circle: {
    height: 15,
    width: 15,
    borderRadius: 30,
  },
});

export default GraphDetail;
