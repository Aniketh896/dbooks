import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import MyComponent from "./MyComponent";
import Navcomponent from "./Components/Navcomponent"
import "./App.css";


const drizzle = new Drizzle(drizzleOptions);

const App = () => {
  return (
    <div className='container'>
      {/* <DrizzleContext.Provider drizzle={drizzle}>
        <DrizzleContext.Consumer>
          {drizzleContext => {
            const { drizzle, drizzleState, initialized } = drizzleContext;

            if (!initialized) {
              return "Loading..."
            }

            return (
              <MyComponent drizzle={drizzle} drizzleState={drizzleState} />
            )
          }}
        </DrizzleContext.Consumer>
      </DrizzleContext.Provider> */}
      <Navcomponent />
    </div>
    
  );
}

export default App;
