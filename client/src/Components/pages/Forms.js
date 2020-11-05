import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import { DrizzleContext } from "@drizzle/react-plugin";

const { AccountData, ContractData, ContractForm } = newContextComponents;

const FormPage = ({drizzle, drizzleState}) => (
    
  <DrizzleContext.Provider drizzle={drizzle}>
    <DrizzleContext.Consumer>
      {(drizzleContext) => {
        const { drizzle, drizzleState, initialized } = drizzleContext;
        if (!initialized) {
          return "Loading...";
        }

        const { accounts } = drizzleState;

        return (
          <div className="uploadForm">
            <h2>Current Active Account</h2>

            <AccountData
              drizzle={drizzle}
              drizzleState={drizzleState}
              accountIndex={0}
              units="ether"
              precision={3}
              render={({ address, balance, units }) => (
                <div>
                  My Address: <span style={{ color: "red" }}>{address}</span>{" "}
                  <br />
                  My Ether: <span style={{ color: "red" }}>{balance}</span>{" "}
                  {units}
                </div>
              )}
            />

            <h2>SimpleStorage</h2>
            <p>
              This shows a simple ContractData component with no arguments,
              along with a form to set its value.
            </p>
            <p>
              <strong>Stored Value: </strong>
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="SimpleStorage"
                method="storedData"
              />
            </p>

            <p></p>

            <h2>SimpleStorage with Custom Rendering</h2>
            <p>
              This is the same contract as above, but here we customize the
              ContractForm's rendered component's style.
            </p>

            <ContractForm
              drizzle={drizzle}
              drizzleState={drizzleState}
              contract="SimpleStorage"
              method="set"
              render={({
                inputs,
                inputTypes,
                state,
                handleInputChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  {inputs.map((input, index) => (
                    <input
                      style={{ fontSize: 30 }}
                      key={input.name}
                      type={inputTypes[index]}
                      name={input.name}
                      value={state[input.name]}
                      placeholder={input.name}
                      onChange={handleInputChange}
                    />
                  ))}
                  <button
                    key="submit"
                    type="button"
                    onClick={handleSubmit}
                    style={{ fontSize: 30 }}
                  >
                    Submit Big
                  </button>
                </form>
              )}
            />
          </div>
        );
      }}
    </DrizzleContext.Consumer>
  </DrizzleContext.Provider>
);

export default FormPage;