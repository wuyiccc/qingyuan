import React, { useState } from 'react'
import { Button, ConfigProvider, Form, Input } from 'antd'
import styles from './index.module.less'
import UserLoginBO from '@/infrastructure/pojo/bo/UserLoginBO.ts'
import UserApi from '@/infrastructure/api/UserApi.ts'
import RedirectUtils from '@/infrastructure/util/common/RedirectUtils.ts'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import LocalDBConstants from '@/infrastructure/constants/LocalDBConstants.ts'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const onFinish = async (value: UserLoginBO) => {
    try {
      setLoading(true)

      const token: string = await UserApi.login(value)

      setLoading(false)

      LocalDB.setString(LocalDBConstants.TOKEN, token)

      const userEntity = await UserApi.getCurrentUserInfo()

      LocalDB.set(LocalDBConstants.CURRENT_LOGIN_USER_ENTITY, userEntity)

      RedirectUtils.toCallbackUrl()
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginImg}></div>
        <div className={styles.title}>欢迎来到Vega</div>
        <Form
          name='loginForm'
          requiredMark={false}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
          layout='vertical'
        >
          <Form.Item
            label={<label style={{ color: 'white' }}>用户名</label>}
            name='username'
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder='请输入用户名' className={styles.input} />
          </Form.Item>

          <Form.Item
            label={<label style={{ color: 'white' }}>登录密码</label>}
            name='password'
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input type='password' placeholder='请输入密码' className={styles.input} />
          </Form.Item>

          <Form.Item>
            <ConfigProvider
              theme={{
                token: {
                  // Seed Token，影响范围大
                  colorPrimary: '#A852FF'
                }
              }}
            >
              <Button className={styles.loginButton} type='primary' block htmlType='submit' loading={loading}>
                确认登录
              </Button>
            </ConfigProvider>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
