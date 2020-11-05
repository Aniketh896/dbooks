import React, { Component } from "react";
import { EpubView } from "react-reader";

class App extends Component {
  render() {
    return (
      /* The ReactReader will expand to 100% of width/height, so be sure to set a height on the parent element, either with position it absolute of window, set height or use paddingTop for proporsjonal scaling */
      <div style={{ position: "relative", height: "100%" }}>
        <EpubView
          url={"/alice.epub"}
          location={"epubcfi(/6/2[cover]!/6)"}
          locationChanged={epubcifi => console.log(epubcifi)}
          tocChanged={toc => console.log(toc)}
        />
      </div>
    );
  }
}

export default EpubView