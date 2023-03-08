import React, { useState, useEffect } from 'react'
// import './index.less'
// function TrafficLight() {
//   const [color, setColor] = useState('red')

//   useEffect(() => {
//     let intervalId: any

//     if (color === 'red') {
//       intervalId = setInterval(() => {
//         setColor('green')
//       }, 20000)
//     } else if (color === 'green') {
//       let blink = false
//       intervalId = setInterval(() => {
//         if (blink) {
//           setColor('black')
//         } else {
//           setColor('green')
//         }
//         blink = !blink
//       }, 5000)
//       setTimeout(() => {
//         setColor('yellow')
//       }, 15000)
//     } else {
//       intervalId = setInterval(() => {
//         setColor('red')
//       }, 5000)
//     }

//     return () => {
//       clearInterval(intervalId)
//     }
//   }, [color])

//   return (
//     <div>
//       <div
// style={{
//   width: '50px',
//   height: '50px',
//   borderRadius: '50%',
//   backgroundColor: color === 'red' ? 'red' : 'black',
//   margin: '10px',
// }}
//       />
//       <div
//         style={{
//           width: '50px',
//           height: '50px',
//           borderRadius: '50%',
//           backgroundColor: color === 'yellow' ? 'yellow' : 'black',
//           margin: '10px',
//         }}
//       />
//       <div
//         style={{
//           width: '50px',
//           height: '50px',
//           borderRadius: '50%',
//           backgroundColor: color === 'green' ? 'green' : 'black',
//           margin: '10px',
//         }}
//       />
//     </div>
//   )
// }

// export default TrafficLight

const TrafficLightController = () => {
  const TRAFFIC_LIGHT_COLORS = {
    RED: 'red',
    YELLOW: 'yellow',
    GREEN: 'green',
  }

  const TRAFFIC_LIGHT_TIMINGS = {
    [TRAFFIC_LIGHT_COLORS.RED]: 20,
    [TRAFFIC_LIGHT_COLORS.YELLOW]: 5,
    [TRAFFIC_LIGHT_COLORS.GREEN]: 20,
    [`${TRAFFIC_LIGHT_COLORS.GREEN}-BLINK`]: 5,
  }

  const TrafficLight = ({ color }: any) => (
    <div
      style={{
        backgroundColor: color,
        borderRadius: '50%',
        height: '50px',
        width: '50px',
        margin: '10px',
      }}
    />
  )
  const [currentColor, setCurrentColor] = useState(TRAFFIC_LIGHT_COLORS.RED)
  const [remainingTime, setRemainingTime] = useState(
    TRAFFIC_LIGHT_TIMINGS[TRAFFIC_LIGHT_COLORS.RED]
  )

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime === 0) {
        switch (currentColor) {
          case TRAFFIC_LIGHT_COLORS.RED:
            setCurrentColor(TRAFFIC_LIGHT_COLORS.GREEN)
            setRemainingTime(TRAFFIC_LIGHT_TIMINGS[TRAFFIC_LIGHT_COLORS.GREEN])
            break
          case TRAFFIC_LIGHT_COLORS.GREEN:
            setCurrentColor(TRAFFIC_LIGHT_COLORS.YELLOW)
            setRemainingTime(TRAFFIC_LIGHT_TIMINGS[TRAFFIC_LIGHT_COLORS.YELLOW])
            break
          case TRAFFIC_LIGHT_COLORS.YELLOW:
            setCurrentColor(`${TRAFFIC_LIGHT_COLORS.GREEN}-BLINK`)
            setRemainingTime(
              TRAFFIC_LIGHT_TIMINGS[`${TRAFFIC_LIGHT_COLORS.GREEN}-BLINK`]
            )
            break
          case `${TRAFFIC_LIGHT_COLORS.GREEN}-BLINK`:
            setCurrentColor(TRAFFIC_LIGHT_COLORS.RED)
            setRemainingTime(TRAFFIC_LIGHT_TIMINGS[TRAFFIC_LIGHT_COLORS.RED])
            break
          default:
            break
        }
      } else {
        setRemainingTime((prevTime) => prevTime - 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [currentColor, remainingTime])

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <TrafficLight
        color={
          currentColor === TRAFFIC_LIGHT_COLORS.RED
            ? TRAFFIC_LIGHT_COLORS.RED
            : 'gray'
        }
      />
      <TrafficLight
        color={
          currentColor === TRAFFIC_LIGHT_COLORS.YELLOW
            ? TRAFFIC_LIGHT_COLORS.YELLOW
            : 'gray'
        }
      />
      <TrafficLight
        color={
          currentColor === TRAFFIC_LIGHT_COLORS.GREEN ||
          currentColor === `${TRAFFIC_LIGHT_COLORS.GREEN}-BLINK`
            ? TRAFFIC_LIGHT_COLORS.GREEN
            : 'gray'
        }
      />
    </div>
  )
}
export default TrafficLightController
