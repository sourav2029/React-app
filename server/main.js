import { Meteor } from 'meteor/meteor';
import moment from 'moment-timezone'


Meteor.startup(() => {
  // code to run on server at startup
    process.env.DISABLE_WEBSOCKETS = 1;
    process.env.MONGO_URL = "none";
    moment.tz.setDefault("UTC");
});
