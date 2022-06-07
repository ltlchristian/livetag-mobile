import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import services from "../services";
import { useIsFocused } from "@react-navigation/native";

export default function Activities({ route, navigation }) {
  const regex = /["]/g;

  const idActivity = route.params.data.idActivity.replace(regex, "");
  const idEvent = route.params.data.idEvent.replace(regex, "");

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

    /* On recherche le participant et on vérifie si l'activité choisie fait parti des activités du role ou des activités en option */
    const participant = await services.getParticipantById(idParticipant);
    const refActivities = participant.role.activities;
    const refOptionalActivities = participant.optional_activities.map(
      (activity) => activity._id
    ); //On fait cela car on a le populate dans la requete backend

    if (
      refActivities.includes(idActivity) ||
      refOptionalActivities.includes(idActivity)
    ) {
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
