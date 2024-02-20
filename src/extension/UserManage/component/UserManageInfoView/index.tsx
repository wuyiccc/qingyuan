import React, { useEffect, useState } from 'react'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import LocalDBConstants from '@/infrastructure/constants/LocalDBConstants.ts'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import UserEntity from '@/infrastructure/pojo/entity/UserEntity.ts'
import UserManageApi from '@/infrastructure/api/UserManageApi.ts'
import UserApi from '@/infrastructure/api/UserApi.ts'
import { Descriptions } from 'antd'
import styles from '@/extension/UserLoginInfo/component/index.module.less'

export function UserManageInfoView({ userId = StringUtils.EMPTY }: { userId: string }) {
  const [userEntity, setUserEntity] = useState<UserEntity>(new UserEntity())

  useEffect(() => {
    doGetUserEntity()
  }, [userId])

  const doGetUserEntity = async function () {
    const curUserEntity = await UserApi.getUserById(userId)
    setUserEntity(curUserEntity)
  }

  return (
    <div>
      <Descriptions column={1}>
        <Descriptions.Item label='用户头像'>
          <img className={styles.bigUserImg} src={userEntity.faceUrl} alt='' />
        </Descriptions.Item>
        <Descriptions.Item label='用户id'>{userEntity.id}</Descriptions.Item>
        <Descriptions.Item label='登录名称'>{userEntity.username}</Descriptions.Item>
        <Descriptions.Item label='用户昵称'>{userEntity.nickname}</Descriptions.Item>
        <Descriptions.Item label='备注'>{userEntity.remark}</Descriptions.Item>
        <Descriptions.Item label='创建时间'>{userEntity.gmtCreate}</Descriptions.Item>
      </Descriptions>
    </div>
  )
}
