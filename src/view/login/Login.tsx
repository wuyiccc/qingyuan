import React from 'react'
import { Button, Form, Input } from 'antd'
import styles from './index.module.less'
import UserLoginBO from '@/infrastructure/pojo/bo/UserLoginBO.ts'
import UserApi from '@/infrastructure/api/UserApi.ts'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import HttpHeaderConstants from '@/infrastructure/constants/HttpHeaderConstants.ts'
import NoticeMessage from '@/infrastructure/message/NoticeMessage.ts'
import { message } from '@/infrastructure/util/message/AntdGlobal.tsx'

export default function Login() {
  const onFinish = async (value: UserLoginBO) => {
    const token: string = await UserApi.login(value)

    LocalDB.setString(HttpHeaderConstants.TOKEN, token)
    message.success(NoticeMessage.LOGIN_SUCCESS_NOTICE)
    // RedirectUtils.goWelcome()
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>系统登录</div>
        <Form name='basic' initialValues={{ remember: true }} onFinish={onFinish} autoComplete='off'>
          <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
            <Input />
          </Form.Item>

          <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type='primary' block htmlType='submit'>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
