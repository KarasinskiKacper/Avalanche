import React from "react";
import { StyleSheet, View, } from "react-native";

const RadioButton = (props: any) => {
   return (
     <View style={styles.btn}>
        {props.selected ?
            <View style={styles.btnSelected}/>
            : null}
     </View>
   );
 }

 const styles = StyleSheet.create({
   btn: {
      height: 30,
      width: 30,
      backgroundColor: '#0E0F10',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#F28300',
      borderRadius: 50,
      borderWidth: 1
   },
   btnSelected: {
      height: 18,
      width: 18,
      backgroundColor: '#F28300',
      borderRadius: 50
   }
 });

 
export default RadioButton;
