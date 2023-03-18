import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Login } from '../../../http/interface'
import {
  UserOutlined,
  LockOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import { loginApi, loginApi1 } from '../../../http/modules/login'
import styles from './index.module.less'
import { setCompanyInfo, setAccessToken } from '@/utils/auth'
import { useBoolean } from 'ahooks'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

const LoginForm = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  // 设备指纹
  const [fpHash, setFpHash] = React.useState('')
  const [loading, setLoading] = useState<boolean>(false)
  // const [loading, { setTrue: showLoading, setFalse: hideLoading }] =
  //   useBoolean(false)
  // 登录
  const onFinish = async (loginForm: Login.ReqLoginForm) => {
    try {
      setLoading(true)
      const { data } = await loginApi1(loginForm)
      message.success('登录成功！')
      form.resetFields()
      setCompanyInfo(loginForm)
      setAccessToken(fpHash)
      navigate('/home')
    } finally {
      setLoading(false)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const goRegister = async () => {
    navigate('/register')
  }
  useEffect(() => {
    const setFp = async () => {
      const fp = await FingerprintJS.load()

      const { visitorId } = await fp.get()

      setFpHash(visitorId)
    }
    setFp()
  })

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 5 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      size="large"
      autoComplete="off"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input
          className={styles.account}
          allowClear
          placeholder="用户名"
          prefix={<UserOutlined />}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password
          className={styles.Password}
          allowClear
          autoComplete="new-password"
          placeholder="密码"
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Form.Item className="login-btn">
        <Button
          onClick={() => {
            goRegister()
          }}
          className={styles.btn}
        >
          去注册
        </Button>
        <Button
          className={styles.btn}
          type="primary"
          htmlType="submit"
          loading={loading}
          icon={<UserOutlined />}
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
