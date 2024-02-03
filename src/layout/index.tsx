import React from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Layout, Menu, theme, Watermark } from 'antd'
import { Navigate } from 'react-router-dom'
import NavHeader from '@/component/NavHeader'

const { Header, Content, Footer, Sider } = Layout

const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`
}))

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <Watermark content='vega'>
      <Layout>
        <Sider
          breakpoint='lg'
          collapsedWidth='0'
          onBreakpoint={broken => {
            console.log(broken)
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type)
          }}
        >
          侧边栏
        </Sider>
        <Layout>
          <Header style={{ padding: 0, height: 50, background: colorBgContainer }}>
            <NavHeader />
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG
              }}
            >
              content
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
