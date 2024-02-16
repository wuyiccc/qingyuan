import styles from './index.module.less'
import UserEntity from '@/infrastructure/pojo/entity/UserEntity.ts'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import LocalDBConstants from '@/infrastructure/constants/LocalDBConstants.ts'
import React, { useEffect, useState } from 'react'
import { Button, ConfigProvider, Descriptions, Form, Input, Modal, Upload } from 'antd'
import HttpHeaderConstants from '@/infrastructure/constants/HttpHeaderConstants.ts'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

function UserLoginInfo() {
  const userEntity: UserEntity = LocalDB.get(LocalDBConstants.USER_ENTITY_KEY)

  const [showUserInfoModal, setShowUserInfoModal] = useState<boolean>()
  const [userLoginInfoForm] = Form.useForm()

  const openShowUserInfoModal = () => {
    userLoginInfoForm.setFieldsValue({
      id: userEntity.id,
      username: userEntity.username,
      nickname: userEntity.nickname,
      remark: userEntity.remark,
      faceUrl: userEntity.faceUrl,
      gmtCreate: userEntity.gmtCreate
    })
    setShowUserInfoModal(true)
  }

  const closeShowUserInfoModal = () => {
    setShowUserInfoModal(false)
  }

  const labelStyle = {
    color: '#a4a3a3'
  }

  const contentStyle = {
    color: '#a4a3a3'
  }
  return (
    <div>
      <div className={styles.userFaceWrapper}>
        <img src={userEntity.faceUrl} alt='' className={styles.userImg} onClick={openShowUserInfoModal} />
      </div>
      <Modal title='用户信息' width={600} open={showUserInfoModal} footer={null} onCancel={closeShowUserInfoModal}>
        <Descriptions column={1} labelStyle={labelStyle} contentStyle={contentStyle}>
          <Descriptions.Item label='用户头像'>
            <img className={styles.bigUserImg} src={userEntity.faceUrl} alt='' />
          </Descriptions.Item>
          <Descriptions.Item label='用户id'>{userEntity.id}</Descriptions.Item>
          <Descriptions.Item label='登录名称'>{userEntity.username}</Descriptions.Item>
          <Descriptions.Item label='用户昵称'>{userEntity.nickname}</Descriptions.Item>
          <Descriptions.Item label='备注'>{userEntity.remark}</Descriptions.Item>
          <Descriptions.Item label='创建时间'>{userEntity.gmtCreate}</Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  )
}

export default UserLoginInfo
