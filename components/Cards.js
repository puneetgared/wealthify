import {Card,ListItem, Button} from 'react-native-elements';
import React from 'react'
import {
    View,
    Text,
    StyleSheet
  } from 'react-native';
  const items = [{
    name:'Initial Investment',
    val : 47500
},
{
    name:'Time Horizon',
    val : '10 Years'
},
{
    name:'Monthly Contribution',
    val : 250
},
{
    name:'Your Portfolio is at',
    val : 'risk level 4'
}] ;
export default cards = () => {
    return(
    <Card >
    {
     items.map((item,i) => {
      return(  <ListItem
        key={i}
        title={item.name}
        bottomDivider
        rightTitle={item.val}
        titleStyle={styles.inputText}
        rightTitleStyle={styles.inputValue}
      />
      );
     })
    }
    <Button
    buttonStyle={styles.button}
    title='Confirm this amount' />
    </Card>
    )
};


const styles = StyleSheet.create({
    inputText: {
      color :'#333840',
      letterSpacing : 0.4,
      fontSize: 15,
      lineHeight:18,
      fontFamily:'SF Pro Display',
      lineHeight: 18
    },
    inputValue: {
        color :'#0162FF',
        letterSpacing : 0.4,
        fontSize: 18,
        lineHeight:24,
        fontWeight:'bold',
        fontFamily:'SF Pro Display'
      },
    button : {
      height:52,
      width:343,
      borderRadius:4,
      backgroundColor:'#0162FF'
    }  
   
  });
