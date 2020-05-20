import {Card,ListItem, Button,Icon} from 'react-native-elements';
import React from 'react'
import {
    View,
    Text,
    StyleSheet
  } from 'react-native';
  const items = [{
    name:'Initial Investment',
    defaultVal : '10000',
    metric : 'INR',
    icon: 'money'
},
{
    name:'Time Horizon',
    defaultVal : '5',
    metric : 'Years',
    icon: 'hourglass'
   
},
{
    name:'Monthly Contribution',
    defaultVal : '250',
    metric : 'INR',
    icon: 'calendar'
},
] ;
export default cards = () => {
    return(
    <Card >
    {
     items.map((item,i) => {
      return(  <ListItem
        key={i}
        title={item.name}
        bottomDivider
        titleStyle={styles.inputText}
        leftIcon = {
          <Icon
            name= {item.icon}
            type='font-awesome'
            color='#517fa4'
          />
        }
        input = {{
          keyboardType: 'numeric',
          defaultValue: item.defaultVal,
          inputStyle : styles.inputValue
        }}
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
        fontFamily:'SF Pro Display',
        textAlign:'right'
    
      },
    button : {
      height:52,
      width:343,
      borderRadius:4,
      backgroundColor:'#0162FF'
    }  
   
  });
