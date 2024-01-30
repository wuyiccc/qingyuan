import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import styles from './index.module.less'
import UserLoginBO from '@/infrastructure/pojo/bo/UserLoginBO.ts'
import UserApi from '@/infrastructure/api/UserApi.ts'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import HttpHeaderConstants from '@/infrastructure/constants/HttpHeaderConstants.ts'
import NoticeMessage from '@/infrastructure/message/NoticeMessage.ts'
import { message } from '@/infrastructure/util/message/AntdGlobal.tsx'
import RedirectUtils from '@/infrastructure/util/common/RedirectUtils.ts'
import { showLoading } from '@/infrastructure/util/loading'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const onFinish = async (value: UserLoginBO) => {
    try {
      setLoading(true)

      const token: string = await UserApi.login(value)

      setLoading(false)

      LocalDB.setString(HttpHeaderConstants.TOKEN, token)
      message.success(NoticeMessage.LOGIN_SUCCESS_NOTICE)
      RedirectUtils.goHomePage()
    } catch (error) {
      setLoading(false)
    }
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
            <Button type='primary' block htmlType='submit' loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
