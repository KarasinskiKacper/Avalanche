import React from "react";
import { StyleSheet, View, } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Cog from './svg/Cog'
import Friends from './svg/Friends'
import Group from './svg/Group'
import Arrow from './svg/Arrow'
import CustomText from './CustomText'

const ProfileOption = (props: any) => {
  return (
    <TouchableOpacity style={styles.wrap} onPress={() => {
      props.nav.navigate('ChangeAccountDetails', {
        type: `${props.text === 'Zmień Nazwę Użytkownika' ? 'username' :
          props.text === 'Zmień Email' ? 'email' :
            props.text === 'Zmień Hasło' ? 'password' : ''
          }`
      })
    }}>
      <View style={styles.main}>
        {props.svg === 'cog' ? <Cog /> : props.svg === 'friends' ? <Friends /> : props.svg === 'group' && <Group />}

        {
          props.secondaryText ?
            <View style={styles.textWrap}>
              <CustomText content={props.text} style={styles.text}/>
              <CustomText content={props.secondaryText} style={styles.text2}/>
            </View> :
            <CustomText content={props.text} style={[styles.text, { marginLeft: 8 }]}/>
        }
      </View>

      <Arrow type='option' />
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    width: 320,
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#E7EBEF',
    fontSize: 18,
    lineHeight: 21,
    width: 256,
  },
  text2: {
    color: '#9A9A9A',
    fontSize: 14,
    lineHeight: 16,
  },
  textWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 256,
    height: 42,
    marginLeft: 8,
  }
});

export default ProfileOption;
