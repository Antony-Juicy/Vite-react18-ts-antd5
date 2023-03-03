import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import { render } from 'react-dom'
import { ConfigProvider, DatePicker as DatePick, message, theme } from 'antd'
import './App.css'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'antd/dist/reset.css'
import zh_CN from 'antd/locale/zh_CN'
import Router from './routes/index'
import { HashRouter } from 'react-router-dom'

dayjs.locale('zh_cn')
const DatePicker: any = DatePick

function App() {
  // const [date, setDate] = useState<any>(null)
  // const handleChange = (value: any) => {
  //   message.info(
  //     `您选择的日期是：${
  //       value ? value.format('YYYY年MM月DD日') : setDate(value)
  //     }`
  //   )
  // }
  return (
    <HashRouter>
      <ConfigProvider
        locale={zh_CN}
        theme={{
          token: {
            colorPrimary: '#1677FF',
          },
          // algorithm: theme.compactAlgorithm, //快速生成风格迥异的主题
        }}
      >
        {/* <div>
        <DatePicker onChange={handleChange}>
          <div>
            当前时间:{date ? date?.format('DD/MM/YYYY ') : '未选择时间日期'}
          </div>
        </DatePicker>
      </div> */}
        <Router />
      </ConfigProvider>
    </HashRouter>
  )
}

export default App
