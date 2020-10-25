import * as React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createStore } from "redux";
import { Provider } from "react-redux";

import MainScreen from "./src/screens/MainScreen";
import TrainingScreen from "./src/screens/TrainingScreen";
import CompetitiveScreen from "./src/screens/CompetitiveScreen";
import ChangeAccountDetailsScreen from "./src/screens/ChangeAccountDetailsScreen";
import ManageNotificationScreen from "./src/screens/ManageNotificationsScreen";
import SelectedTrainingScreen from "./src/screens/SelectedTrainingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

import PushUpSetup from "./src/screens/pushUp/PushUpSetup";
import PushUpTraining from "./src/screens/pushUp/PushUpTraining";
import PushUpProgress from "./src/screens/pushUp/PushUpProgress";

import reducers from "./src/reducers/index";
import { useFonts } from "expo-font";

const App = () => {
  const [loaded, error] = useFonts({
    Lato: require("./src/fonts/Lato-Regular.ttf"),
  });

  error === null ? null : console.log("Font error msg", error);

  if (!loaded) {
    return null;
  }

  const Stack = createStackNavigator(
    {
      initialRouteName: LoginScreen,
      Main: {
        screen: MainScreen,
      },
      Training: {
        screen: TrainingScreen,
      },
      Competitive: {
        screen: CompetitiveScreen,
      },
      ChangeAccountDetails: {
        screen: ChangeAccountDetailsScreen,
      },
      ManageNotifications: {
        screen: ManageNotificationScreen,
      },
      SelectedTraining: {
        screen: SelectedTrainingScreen,
      },
      PushUpSetup: {
        screen: PushUpSetup,
      },
      PushUpTraining: {
        screen: PushUpTraining,
      },
      PushUpProgress: {
        screen: PushUpProgress,
      },
      Login: {
        screen: LoginScreen,
      },
      Register: {
        screen: RegisterScreen,
      },
    },
    {
      headerMode: "none",
    }
  );
  const Index = createAppContainer(Stack);
  return (
    <Provider store={createStore(reducers)}>
      <Index />
    </Provider>
  );
};

export default App;
