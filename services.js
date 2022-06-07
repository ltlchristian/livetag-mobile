import axios from "axios";

const baseURL = "https://livetag-backend.osc-fr1.scalingo.io/";
const base = axios.create({ baseURL });

const services = {
  getEventByCode(code) {
    return base.get(`/mobile/events/${code}`).then((res) => res.data);
  },

  getParticipantById(idParticipant) {
    return base
      .get(`/mobile/participants/${idParticipant}`)
      .then((res) => res.data);
  },

  getActivitiesById(idActivities) {
    return base
      .get(`/mobile/activities/${idActivities}`)
      .then((res) => res.data);
  },

  getActivitiesByEventId(idEvent) {
    return base.get(`/activities?idEvent=${idEvent}`).then((res) => res.data);
  },
};

export default services;
