import React, { useState } from 'react'
import { Button, ConfigProvider, Form, Input } from 'antd'
import styles from './index.module.less'
import UserLoginBO from '@/infrastructure/pojo/bo/UserLoginBO.ts'
import UserApi from '@/infrastructure/api/UserApi.ts'
import RedirectUtils from '@/infrastructure/util/common/RedirectUtils.ts'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import LocalDBConstants from '@/infrastructure/constants/LocalDBConstants.ts'
import { EventStreamContentType, fetchEventSource } from '@microsoft/fetch-event-source'

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

  const sseTest = () => {
    fetchEventSource('http://localhost:83/chatSse/chat', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      // 这里要JSON.stringify一下,不能直接丢JSON对象。后端正常用@RequestBody接收就行。
      body: JSON.stringify({
        chatId: 'xxx ',
        requestMessage: '测试问题'
      }),
      onmessage(event) {
        console.log(event.data)
      },
      onclose() {
        console.log('close=>')
      },
      onerror(event) {
        console.log('error=>', event)
        throw new Error('中断重试功能')
      },
      async onopen(response) {
        if (response.ok && response.headers.get('content-type') === EventStreamContentType) {
          return // everything's good
        } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
          // client-side errors are usually non-retriable:
          console.log('status error:', response.status)
        } else {
          console.log('other status error:', response.status)
        }
      }
    })
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainerDisabled: '#110E14',
          colorBgContainer: '#110E14',
          colorTextDisabled: '#bdbdbd',
          colorText: '#bdbdbd',
          colorBorder: 'black'
        }
      }}
    >
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

            <ConfigProvider
              theme={{
                token: {
                  // Seed Token，影响范围大
                  colorPrimary: '#A852FF'
                },
                components: {
                  Button: {
                    defaultBorderColor: '#A852FF',
                    defaultBg: '#A852FF',
                    defaultHoverBg: '#A852FF',
                    defaultActiveColor: 'white',
                    defaultColor: 'white',
                    defaultHoverColor: '#d7d7d7'
                  }
                }
              }}
            >
              <Button className={styles.loginButton} block htmlType='submit' loading={loading}>
                确认登录
              </Button>
              <Button className={styles.loginButton} onClick={sseTest}>
                sse测试
              </Button>
            </ConfigProvider>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  )
}
