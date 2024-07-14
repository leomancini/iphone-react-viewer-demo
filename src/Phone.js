import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const importDeviceImages = (device, statusBarMode) => {
  const baseDevicePath = "./assets/devices";
  const filenames = {
    DeviceImage: "Device.png",
    StatusBarImage:
      statusBarMode === "light"
        ? "Status Bar Light.png"
        : "Status Bar Dark.png",
    DynamicIslandImage: "Dynamic Island.png",
  };

  switch (device) {
    case "iPhone 11 Pro":
      return {
        DeviceImage: require(`${baseDevicePath}/iPhone 11 Pro/${filenames.DeviceImage}`),
        StatusBarImage: require(`${baseDevicePath}/iPhone 11 Pro/${filenames.StatusBarImage}`),
        DynamicIslandImage: require(`${baseDevicePath}/iPhone 11 Pro/${filenames.DynamicIslandImage}`),
      };
    default:
      return {
        DeviceImage: null,
        StatusBarImage: null,
        DynamicIslandImage: null,
      };
  }
};

const DeviceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Device = styled.div`
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
  background: ${(props) => props.backgroundColor};
  border-radius: 56px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const StatusBar = styled.div`
  width: 393px;
  height: 54px;
  background-image: url(${(props) => props.background});
  background-size: 143px 54px;
  background-repeat: no-repeat;
  background-position: right;
  color: ${(props) => (props.mode === "light" ? "white" : "black")};
`;

const DynamicIsland = styled.div`
  width: 127px;
  height: 37px;
  background-image: url(${(props) => props.background});
  background-size: cover;
  position: absolute;
  top: 52px;
  left: 50%;
  transform: translateX(-50%);
`;

const HomeIndicator = styled.div`
  background-color: ${(props) => (props.mode === "dark" ? "black" : "white")};
  height: 5px;
  position: absolute;
  bottom: 48px;
  width: 138px;
  left: 50%;
  border-radius: 2.5px;
  transform: translateX(-50%);
`;

function Phone({
  deviceType,
  statusBarMode,
  homeIndicatorMode,
  backgroundColor,
  children,
}) {
  const phoneRef = useRef(null);

  const { DeviceImage, StatusBarImage, DynamicIslandImage } =
    importDeviceImages(deviceType, statusBarMode);

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

  const CurrentTime = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      return `${formattedHours}:${formattedMinutes}`;
    };

    const Time = styled.div`
      color: white;
      font-size: 17px;
      position: absolute;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, sans-serif;
      font-weight: 500;
      top: 59px;
      left: 66px;
      letter-spacing: 0.5px;
      width: 88px;
      text-align: center;
      color: inherit;
    `;

    return <Time>{formatTime(currentTime)}</Time>;
    // return <Time>9:41</Time>;
  };

  return (
    <DeviceWrapper>
      <Device ref={phoneRef} background={DeviceImage}>
        <Screen backgroundColor={backgroundColor}>
          <StatusBar background={StatusBarImage} mode={statusBarMode}>
            <DynamicIsland background={DynamicIslandImage} />
            <CurrentTime />
          </StatusBar>
          <HomeIndicator mode={homeIndicatorMode} />
          {children}
        </Screen>
      </Device>
    </DeviceWrapper>
  );
}

export default Phone;
