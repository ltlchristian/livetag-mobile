import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function AccessDenied({ navigation }) {
  return (
    <View style={styles.container}>
      <Ionicons name="md-close-circle" size={100} color="red" />
      <View style={styles.AccessDenied}>
        <Text style={styles.AccessDeniedText}>Refusé</Text>
      </View>
      <View styles={styles.infos}>
        <Text style={styles.containerTitle}>Participant non inscrit</Text>
        <Text style={styles.containerTitle}>Accès non autorisé</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>RETOUR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  AccessDenied: {
    textAlign: "center",
    justifyContent: "center",
    height: 120,
    width: 300,
    borderRadius: 10,
    backgroundColor: "red",
    marginBottom: 100,
  },
  AccessDeniedText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },

  containerTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
    justifyContent: "center",
    textAlign: "center",
  },

  infos: {
    flex: 1,
  },

  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    backgroundColor: " rgb(1, 80, 104)",
    marginTop: 30,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
