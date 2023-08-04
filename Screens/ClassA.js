import React, { Component } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native';

export class ClassA extends Component {
    state = {
        name: "visman"
    }
  render() {
    return (
      <View>
      <Text style = {{fontSize:25}}>
         {/* Hello from class {this.props.email} */}
         {this.state.name}
      </Text>
        <Button title='Click me' onPress={()=>this.setState({name:'Text changed'})}/>
      </View>
    )
  }
 

}



export default ClassA
