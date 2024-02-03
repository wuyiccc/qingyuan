import React from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Layout, Menu, theme, Watermark } from 'antd'
import { Navigate, Outlet } from 'react-router-dom'
import NavHeader from '@/component/NavHeader'
import NavFooter from '@/component/NavFooter'
import SideMenu from '@/component/SideMenu'
import styles from './index.module.less'

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
          <SideMenu />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, height: 50, background: colorBgContainer }}>
            <NavHeader />
          </Header>
          <Content className={styles.content}>
            <div className={styles.wrapper}>
              <Outlet></Outlet>
            </div>
            <NavFooter />
          </Content>
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
