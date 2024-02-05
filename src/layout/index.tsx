import React, { useEffect } from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Layout, Menu, theme, Watermark } from 'antd'
import { Navigate, Outlet } from 'react-router-dom'
import NavHeader from '@/component/NavHeader'
import NavFooter from '@/component/NavFooter'
import SideMenu from '@/component/SideMenu'
import styles from './index.module.less'
import UserApi from '@/infrastructure/api/UserApi.ts'
import UserEntity from '@/infrastructure/pojo/entity/UserEntity.ts'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import StatusDB from '@/infrastructure/db/StatusDB.ts'
// import RessoDB from '@/infrastructure/db/RessoDB.ts'

const { Header, Content, Footer, Sider } = Layout

const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`
}))

const MyLayout: React.FC = () => {
  const state = StatusDB.db()

  useEffect(() => {
    getCurrentUserInfo()
  }, [])
  const getCurrentUserInfo = async () => {
    const userEntity: UserEntity = await UserApi.getCurrentUserInfo()

    console.log('userEntity', userEntity)
    state.setUserEntity(userEntity)
  }

  return (
    <Watermark content='vega'>
      <Layout>
        <Sider collapsed={state.collapsed}>
          <SideMenu />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, height: 50 }}>
            <NavHeader />
          </Header>
          <div className={styles.wrapper}>
            <Outlet></Outlet>
          </div>
          <NavFooter />
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default MyLayout
