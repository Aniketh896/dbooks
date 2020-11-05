import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import EBookListing from "./Components/EBookListing";
import Navcomponent from "./Components/Navcomponent";
import Homepage from "./Components/pages/Homepage";
import { portis } from "./drizzleOptions";

import LoadingImg from "./Components/Loading";

import "./App.css";
import PublishBook from "./Components/PublishBook";
import Profilepage from "./Components/pages/Profilepage";

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

//to add files to ipfs when using it, under event handler.
/*ipfs.add(this.state.buffer, (error,result) => {
	//do stuff here...
})*/

const App = (props) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 6000);
  }, []);

  const [walletAddress, setWalletAddress] = useState();
  const [email, setEmail] = useState();
  const [reputation, setReputation] = useState();

  useEffect(() => {
    // const web3 = props.drizzle.web3
    // web3.eth.getAccounts().then(accounts => {
    // 	this.account = accounts[0]
    // })

    portis.onLogin((walletAddress, email, reputation) => {
      setWalletAddress(walletAddress);
      setEmail(email);
      setReputation(reputation);

      // console.log(walletAddress, email, reputation)
    });

    portis.onLogout(() => {
      setWalletAddress("");
      setEmail("");
      setReputation("");

      console.log("User logged out");
    });
  }, []);

  return (
    <>
      {loading === false ? (
        <Router>
          <div className={classes.navigation}>
            <Navcomponent
              walletAddress={walletAddress}
              email={email}
              reputation={reputation}
            />
          </div>
          <div
            className="container"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Switch className="route-wrapper">
              <Route exact path="/">
                <Homepage {...props} />
              </Route>
              <Route exact path="/ebooks">
                <EBookListing {...props} />
              </Route>
              <Route exact path="/user">
                <Profilepage {...props} />
              </Route>
              <Route exact path="/publish">
                <PublishBook {...props} />
              </Route>
              <Route exact path="/purchase">
                <EBookListing {...props} />
              </Route>
              <Route exact path="/clientLibrary">
                <EBookListing {...props} />
              </Route>
            </Switch>
          </div>
        </Router>
      ) : (
        <LoadingImg />
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  navigation: {
    marginTop: 0,
    marginBottom: "auto",
    position: "fixed",
    width: "100%",
    height: 63.99,
  },
}));

export default App;
