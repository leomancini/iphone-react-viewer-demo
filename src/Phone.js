import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const importDeviceImages = (device, statusBarColor) => {
  const baseDevicePath = "./assets/devices";
  const filenames = {
    DeviceImage: "Device.png",
    StatusBarImage:
      statusBarColor === "black"
        ? "Status Bar Black.png"
        : "Status Bar White.png",
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
  background: ${(props) => props.contentBackgroundColor};
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
  color: ${(props) => (props.color === "white" ? "white" : "black")};
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
  background-color: ${(props) => (props.color === "white" ? "white" : "black")};
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
  liveClock,
  statusBarColor,
  homeIndicatorColor,
  contentBackgroundColor,
  children,
}) {
  const phoneRef = useRef(null);

  const { DeviceImage, StatusBarImage, DynamicIslandImage } =
    importDeviceImages(deviceType, statusBarColor);

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

  const Clock = ({ live }) => {
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

    if (live) {
      return <Time>{formatTime(currentTime)}</Time>;
    } else {
      return <Time>9:41</Time>;
    }
  };

  return (
    <DeviceWrapper>
      <Device ref={phoneRef} background={DeviceImage}>
        <Screen contentBackgroundColor={contentBackgroundColor}>
          <StatusBar background={StatusBarImage} color={statusBarColor}>
            <DynamicIsland background={DynamicIslandImage} />
            <Clock live={liveClock} />
          </StatusBar>
          <HomeIndicator color={homeIndicatorColor} />
          {children}
        </Screen>
      </Device>
    </DeviceWrapper>
  );
}

export default Phone;
