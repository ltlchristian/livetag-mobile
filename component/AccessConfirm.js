import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import services from "../services";
import { Ionicons } from "@expo/vector-icons";

export default function AccessConfirm({ route, navigation }) {
  const regex = /["]/g;
  const idParticipant = route.params.data.idParticipant.replace(regex, "");
  const idEvent = route.params.data.idEvent.replace(regex, "");

  const [participant, setParticipant] = useState({
    role: {
      activities: [],
    },
    event: {},
    optional_activities: [{}],
  });

  const [activities, setActivities] = useState({});

  const [display, setDisplay] = useState([{}]);

  const fetchParticipantData = () => {
    Promise.all([
      services.getParticipantById(idParticipant),
      services.getActivitiesByEventId(idEvent),
    ]).then((values) => {
      const [searchParticipant, searchActivities] = values;

      const refActivities = searchParticipant.role.activities;
      const refOptionalActivities = searchParticipant.optional_activities.map(
        (activity) => activity._id
      );

      const allRefActivities = refActivities.concat(refOptionalActivities);

      const displayActivities = [];

      searchActivities.map((activity) => {
        if (allRefActivities.includes(activity._id)) {
          displayActivities.push(activity);
        }
      });

      setDisplay(displayActivities);
      setParticipant(searchParticipant);
      setActivities(searchActivities);
    });
  };

  useEffect(() => {
    fetchParticipantData();
  }, []);

  console.log("activities", activities);

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <Ionicons name="md-checkmark-circle" size={100} color="green" />

        <View style={styles.confirmAccess}>
          <Text style={styles.confirmAccessText}>Confirmé</Text>
        </View>
        <View styles={styles.infos}>
          <Text style={styles.containerTitle}>Id du participant :</Text>
          <Text style={styles.containerText}>Nom :</Text>
          <Text style={styles.containerData}> {participant.lastname}</Text>
          <Text style={styles.containerText}>Prénom :</Text>
          <Text style={styles.containerData}> {participant.firstname}</Text>
        </View>
        <View>
          <Text style={styles.containerTitle}>Rôle du participant :</Text>
          <Text style={styles.containerData}>{participant.role.role_name}</Text>
        </View>

        <View>
          <Text style={styles.containerTitle}>Activités :</Text>
        </View>

        <View style={styles.containerScroll}>
          <ScrollView>
            {display.map((element, key) => {
              return (
                <View key={key}>
                  <Text style={styles.containerDataActivities}>
                    {element.activity_name}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.containerButton}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>RETOUR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  confirmAccess: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    height: 120,
    width: 300,
    borderRadius: 10,
    backgroundColor: "green",
    marginBottom: 15,
    marginTop: 15,
  },
  confirmAccessText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },

  containerTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
    marginTop: 5,
  },

  infos: {
    flex: 1,
  },

  containerText: {
    textAlign: "center",
    fontSize: 15,
    textDecorationLine: "underline",
  },

  containerData: {
    textTransform: "capitalize",
    color: "green",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },

  containerDataActivities: {
    color: "green",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },

  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    backgroundColor: " rgb(1, 80, 104)",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  containerScroll: {
    flex: 1,
  },

  containerButton: {
    flex: 0.5,
    marginTop: 5,
  },
});
