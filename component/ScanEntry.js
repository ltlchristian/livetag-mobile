import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import services from "../services";
import { useIsFocused } from "@react-navigation/native";

export default function Entry({ route, navigation }) {
  const idEvent = route.params.data._id;

  const [hasPermission, setHasPermission] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    const regex = /["]/g;
    const idParticipant = data.replace(regex, "");

    /* On recherche le participant et on vérifie si l'event choisie est bien l'event inscript pour le participant */
    const participant = await services.getParticipantById(idParticipant);

    if (idEvent === participant.event._id) {
      return navigation.navigate("AccessConfirm", {
        data: { idEvent: idEvent, idParticipant: participant._id },
      });
    } else {
      return navigation.navigate("AccessDenied");
    }
  };

  if (hasPermission === null) {
    return <Text>Request for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerCam}>
        {isFocused ? (
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  containerCam: {
    height: "80%",
    width: "80%",
  },
});
