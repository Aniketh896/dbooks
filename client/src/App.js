import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import MyComponent from "./MyComponent";
import Navcomponent from "./Components/Navcomponent"
import Leftbar from "./Components/Leftbar"
import Bookcard from "./Components/Bookcard"
import "./App.css";


const drizzle = new Drizzle(drizzleOptions);

const App = () => {
  return (
    <>
      <div className="navigation">
        <Navcomponent />
      </div>
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
        
        <div className="content">
          <div className="leftbar">
            <Leftbar />
          </div>
          <div className="books">
            <h3>Latest Books</h3>
            <hr style={{margin: "0 20px 10px 20px"}}/>
            <div className="bookcard">
              <Bookcard />
              <Bookcard />
              <Bookcard />
              <Bookcard />
              <Bookcard />
            </div>
            <h3>Explore Books</h3>
            <hr style={{margin: "0 20px 10px 20px"}}/>
            <div className="bookcard">
              <Bookcard />
              <Bookcard />
              <Bookcard />
              <Bookcard />
              <Bookcard />
            </div>
          </div>
        </div>
      </div>
    </>
    
    
  );
}

export default App;
