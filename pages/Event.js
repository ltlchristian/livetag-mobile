import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import services from "../services";
import dayjs from "dayjs";
import RNPickerSelect from "react-native-picker-select";
import { useForm } from "react-hook-form";

export default function Event({ route, navigation }) {
  const code = route.params.data.code;

  const [event, setEvent] = useState({});
  const [selectActivity, setSelectActivity] = useState();
  const [selectActivities, setSelectActivities] = useState([]);

  const fetchEventData = () => {
    services.getEventByCode(code).then((result) => {
      services.getActivitiesByEventId(result._id).then((activities) => {
        const selectNewActivities = activities.map((activity) => {
          return {
            label: activity.activity_name,
            value: activity._id,
          };
        });

        setSelectActivities(selectNewActivities);
      });
      setEvent(result);
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue: { value: "" },
  });

  function onSubmit(data) {
    navigation.navigate("Entry", { data: event });
  }

  const handleActivity = (idActivity) => {
    setSelectActivity(idActivity);
  };

  useEffect(() => {
    fetchEventData();
  }, [code]);

  const handlePressActivity = () => {
    if (selectActivity === null) {
      return alert("La sélection d'une activité est obligatoire");
    } else {
      return navigation.navigate("Activities", {
        data: { idActivity: selectActivity, idEvent: event._id },
      });
    }
  };

  const placeholder = {
    label: "Liste des activités",
    value: null,
    color: "#9EA0A4",
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          style={styles.homeLogo}
          source={require("../assets/logoQR.png")}
        ></Image>
      </View>

      <View style={styles.containerText}>
        <Text style={styles.containerTitle}>Évènement :</Text>
        <Text style={styles.containerTitle2}>{event.event_name}</Text>

        <Text style={styles.containerComment}>Code : {event.code}</Text>
        <Text style={styles.containerComment}>{event.description}</Text>
        <Text style={styles.containerComment}>
          Du {dayjs(event.start_date).format("DD.MM.YYYY")} au{" "}
          {dayjs(event.end_date).format("DD.MM.YYYY")}
        </Text>
      </View>

      <View style={styles.containerText}>
        <Text style={styles.containerTitle}>Vous souhaitez?</Text>
        <Text style={styles.containerActionText}>
          Sélectionner le scanner approprié
        </Text>
      </View>

      <View style={styles.containerAction}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>ENTRÉE</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerAction}>
        <Text style={styles.containerActionText}>
          Choisir une activité dans la liste
        </Text>

        <RNPickerSelect
          placeholder={placeholder}
          onValueChange={(value) => handleActivity(value)}
          items={selectActivities}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={() => handlePressActivity()}>
            ACTIVITÉS
          </Text>
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

  containerLogo: {
    marginTop: 30,
    width: "70%",
    height: "10%",
  },

  homeLogo: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },

  containerText: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    width: "70%",
  },

  containerTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
  },

  containerTitle2: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 5,
    color: " rgb(1, 80, 104)",
  },

  containerComment: {
    marginTop: 5,
  },

  containerAction: {
    alignItems: "center",
    justifyContent: "center",
  },

  containerActionText: {
    marginBottom: 10,
    fontStyle: "italic",
  },

  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 10,
    backgroundColor: " rgb(1, 80, 104)",
    margin: 20,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
