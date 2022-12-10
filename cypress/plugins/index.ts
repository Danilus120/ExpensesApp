import admin from "firebase-admin";
import cypressFirebase from "cypress-firebase";

const cypressFirebasePlugin = cypressFirebase.plugin;

const fn = (on: any, config: any) => {
  const extendedConfig = cypressFirebasePlugin(on, config, admin);

  return extendedConfig;
};

export default fn;
