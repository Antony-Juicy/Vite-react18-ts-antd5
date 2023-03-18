import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Style from './index.module.less';

let oneSecInterval: NodeJS.Timeout;
let thirtySecInterval: NodeJS.Timeout;

const TrafficLightController = () => {
  const [isRedLightOpened, setIsRedLightOpened] = useState<boolean>(false);
  const [isYellowLightOpened, setIsYellowLightOpened] = useState<boolean>(false);
  const [isGreenLightOpened, setIsGreenLightOpened] = useState<boolean>(false);

  const circleLights = () => {
    let sec: number = 0;
    const cicle = () => {
      setIsRedLightOpened(true);

      oneSecInterval = setInterval(() => {
        sec = sec + 1;
        console.log('@!sec', sec);

        if (sec === 20) {
          setIsRedLightOpened(false);
          setIsYellowLightOpened(true);
        } else if (sec === 25) {
          setIsYellowLightOpened(false);
          setIsGreenLightOpened(true);
        } else if (sec > 25) {
          if (sec >= 30) {
            setIsGreenLightOpened(false);

            sec = 0;
            clearInterval(oneSecInterval);
          } else if (!(sec % 2)) {
            setIsGreenLightOpened(false);
            console.log('====');
          } else if (sec % 2) {
            setIsGreenLightOpened(true);
            console.log('----');
          }
        }
      }, 1000);
    };
    cicle();
    thirtySecInterval = setInterval(() => {
      cicle();
    }, 30 * 1000);
  };

  useEffect(() => {
    circleLights();
    return () => {
      clearInterval(thirtySecInterval);
      clearInterval(oneSecInterval);
    };
  }, []);

  return (
    <>
      <div>
        <div
          className={cx(Style.defaultLight, isRedLightOpened ? Style.redLight : Style.greyLight)}
        />
        <div
          className={cx(
            Style.defaultLight,
            isYellowLightOpened ? Style.yellowLight : Style.greyLight,
          )}
        />
        <div
          className={cx(
            Style.defaultLight,
            isGreenLightOpened ? Style.greenLight : Style.greyLight,
          )}
        />
      </div>
    </>
  );
};
export default TrafficLightController;
