import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

// User bileşeni sadece user objesi değiştiğinde yeniden render edilir.
// React.memo ile sarılmış, bu da onu performans açısından optimize eder.
const User = ({ user }) => {
  console.log("User component re-render");
  return (
    <View style={styles.container}>
      <Text>User</Text>
      <Text>{JSON.stringify(user)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        borderTopWidth: 2,
        paddingTop: 10,
        alignItems: "center"
    },
});

export default React.memo(User);