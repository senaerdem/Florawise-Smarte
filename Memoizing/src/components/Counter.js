import { View, Text, Button, StyleSheet } from "react-native";
import React, { useState, useMemo, useCallback } from "react";
import Header from "./Header";
import User from "./User";

const Counter = () => {
    const [count, setCount] = useState(0); // Sayı için state tanımlıyoruz
    const [name, setName] = useState("Sena"); // Kullanıcı adı için state tanımlıyoruz

    // useMemo: name değiştiğinde user objesini yeniden oluşturur.
    // Eğer name değişmezse, aynı user objesi döner ve yeniden hesaplanmaz.
    const user = useMemo(() => {
        return {
            id: 1,
            name,
        }
    } , [name] ); // name bağımlılığıyla user objesini tekrar oluşturuyoruz

    console.log("Counter component re-render")

    // useCallback: increment fonksiyonu her render'da yeniden oluşturulmaz.
    // Yalnızca bağımlılık olan state (burada bağımlılık yok) değişirse yeniden oluşturulur.
    const increment = useCallback((amount) => {
        setCount((prev) => prev + amount);
    }, []); // Boş bağımlılıklar array'i, bu fonksiyonun her render'da yeniden oluşturulmasını engeller

    //const increment = () => setCount(count + amount) // Her render'da yeniden tanımlanır.

    return (
        <View style={styles.container}>
            <Header increment={increment}/>

            <Text style={styles.text}>{count}</Text>
            <Button title="Increase" onPress={() => increment(1)}/>
            <Button title="Change name" onPress={() => setName("Nur")}/>

            <User user={user}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
    },
});

export default Counter;