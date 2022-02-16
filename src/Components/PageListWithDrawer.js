import { createDrawerNavigator } from "@react-navigation/drawer";
import Dashboard from "./Dashboard/Dashboard";
import Razorpayment from "./Payment/Razorpayment";
import React from "react";
const Drawer=createDrawerNavigator();

export default PageListWithDrawer = () => {
    return (
     <Drawer.Navigator initialRouteName="DashBoard">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Razorpayment" component={Razorpayment} />
     </Drawer.Navigator>
     );
    };