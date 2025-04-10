import React, { useRef } from "react";
import { View, Image, StyleSheet, Animated, PanResponder, Dimensions } from "react-native";
import map from "../../../assets/images/map.png";
const { width, height } = Dimensions.get("window");

const MapScreen = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {},
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.mapContainer,
          { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
        ]}
        {...panResponder.panHandlers}
      >
        <Image source={map} style={styles.map} />
      </Animated.View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    width: width * 2, 
    height: height * 2,
    position: "absolute",
  },
  map: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
