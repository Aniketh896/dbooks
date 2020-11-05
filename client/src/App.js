import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import MyComponent from "./MyComponent";
import Navcomponent from "./Components/Navcomponent"
import Leftbar from "./Components/Leftbar"
import Bookcard from "./Components/Bookcard"
import Homepage from "./Components/pages/Homepage"
import "./App.css";


const drizzle = new Drizzle(drizzleOptions);

const App = () => {
  return (
    <>
      <div className='container' style={{display:"flex", flexDirection: "column"}}>
        <DrizzleContext.Provider drizzle={drizzle}>
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
        </DrizzleContext.Provider>
        
        <Homepage />
      </div>
      
    </>
    
    
  );
}

export default App;
