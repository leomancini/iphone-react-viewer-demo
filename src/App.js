import React from "react";
import styled from "styled-components";
import Phone from "iphone-react-viewer";

const Page = styled.div`
  background-color: rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
`;

function App() {
  return (
    <Page>
      <Phone
        deviceType="iPhone 11 Pro"
        liveClock={true}
        statusBarColor="black"
        homeIndicatorColor="black"
        contentBackgroundColor="#fff"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
            color: "#000",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "3rem",
          }}
        >
          Hello world!
        </div>
      </Phone>
    </Page>
  );
}

export default App;
