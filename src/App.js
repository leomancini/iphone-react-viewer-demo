import React from "react";
import styled from "styled-components";
import Phone from "iphone-react-viewer";

const Page = styled.div`
  background-color: rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;

const DemoScreen = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
`;

function App() {
  return (
    <Page>
      <Phone
        deviceType="iPhone 15 Pro"
        liveClock={true}
        statusBarColor="black"
        homeIndicatorColor="black"
        contentBackgroundColor="#fff"
      >
        <DemoScreen>Hello world!</DemoScreen>
      </Phone>
    </Page>
  );
}

export default App;
