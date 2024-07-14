import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Content from "./Content";

import DeviceImage from "./assets/devices/iPhone 11 Pro/Device.png";
import StatusBarImage from "./assets/devices/iPhone 11 Pro/Status Bar.png";
import HomeIndicatorImage from "./assets/devices/iPhone 11 Pro/Home Indicator.png";

const Page = styled.div`
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden; // Ensure no overflow
`;

const PhoneWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Phone = styled.div`
  width: 473px;
  height: 932px;
  position: relative;
  transform-origin: center;
  margin: 88px 0;
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Screen = styled.div`
  width: 393px;
  height: 852px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 56px;
`;

const StatusBar = styled.div`
  width: 393px;
  height: 54px;
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
`;

const HomeIndicator = styled.div`
  width: 393px;
  height: 21px;
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  position: absolute;
  bottom: 2.5rem;
`;

function App() {
  const phoneRef = useRef(null);

  useEffect(() => {
    const resizePhone = () => {
      if (phoneRef.current) {
        const phoneWidth = 393;
        const phoneHeight = 852;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const margin = 88;

        const scaleWidth = windowWidth / phoneWidth;
        const scaleHeight = (windowHeight - margin) / phoneHeight;
        const scale = Math.min(scaleWidth, scaleHeight);

        phoneRef.current.style.transform = `scale(${scale})`;
      }
    };
    resizePhone();

    window.addEventListener("resize", resizePhone);
    return () => window.removeEventListener("resize", resizePhone);
  }, []);

  return (
    <Page>
      <PhoneWrapper>
        <Phone ref={phoneRef} background={DeviceImage}>
          <Screen>
            <StatusBar background={StatusBarImage} />
            <HomeIndicator background={HomeIndicatorImage} />
            <Content />
          </Screen>
        </Phone>
      </PhoneWrapper>
    </Page>
  );
}

export default App;
