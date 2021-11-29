import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
// import ScreenTitle from '../components/ScreenTitle';
// import AppScreen from './AppScreen';

function MyMorningScreen(props) {
  const [data, setData] = useState([
    {
      order: 1,
      label: "Start Timeular"
    },
    {
      order: 2,
      label: "Workout"
    },
    {
      order: 3,
      label: "Shower"
    }
  ]);

  const renderItem = ({ item, index, drag, isActive }) => (
    <TouchableOpacity style={styles.item} onLongPress={drag}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.screen}>
      <ScreenTitle title="My Morning" />
      <View style={{ flex: 1 }}>
        <DraggableFlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onDragEnd={({ data }) => setData({ data })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default MyMorningScreen;
