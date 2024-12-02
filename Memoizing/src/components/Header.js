import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'

const Header = ({ increment }) => {
    console.log("Header compnent re-render");

    // Rastgele bir dizi oluşturuyoruz ve ekranda gösteriyoruz
    const array = new Array(5).fill().map(() => Math.floor(Math.random() * 10));

  return (
    <View style={styles.container}>
      <Text>Header</Text>
      <Text>{JSON.stringify(array)}</Text>
      <Button onPress={() => increment(5)} title="Increase"/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 60,
        borderBottomWidth: 2,
        alignItems: "center",
        paddingBottom: 10,
    },
});

// React.memo, Header bileşeninin prop'ları değişmediğinde yeniden render edilmesini engeller.
export default React.memo(Header);