import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import styles from './index.module.less'
import React, { useEffect, useState } from 'react'
import { Button, ConfigProvider, Input, Popover, Space, Table } from 'antd'
import NginxConfFileApi from '@/infrastructure/api/NginxConfFileApi.ts'
import NginxConfFileHistorySimpleEntity from '@/infrastructure/pojo/entity/NginxConfFileHistorySimpleEntity.ts'
import DevFileTreeEntity from '@/infrastructure/pojo/entity/DevFileTreeEntity.ts'
import HistoryVersionContentView from '@/extension/DevFileManage/component/DevFileManageVersionManageRightBar/NginxConfVersionTable/HistoryVersionContentView.tsx'
import PublishedNginxServiceTableView from '@/extension/DevFileManage/component/DevFileManageVersionManageRightBar/NginxConfVersionTable/PublishedNginxServiceTableView.tsx'
import DateUtils from '@/infrastructure/util/common/DateUtils.ts'
export default function NginxConfVersionTable({ id = StringUtils.EMPTY }: { id: string }) {
  const [historyList, setHistoryList] = useState<any>()
  const [historyVersionContent, setHistoryVersionContent] = useState<string>()
  const [reloadKey, setReloadKey] = useState(0)
  const addReloadKey = () => {
    // 点击按钮时更新状态，从而重新渲染 PublishedNginxServiceTableView 组件
    setReloadKey(prevKey => prevKey + 1)
  }

  useEffect(() => {
    console.log('useEffect')
    reload()
  }, [id])

  const reload = async () => {
    await doGetGetNginxConfFileHistoryList()
  }

  const doGetGetNginxConfFileHistoryList = async () => {
    const dataList: NginxConfFileHistorySimpleEntity[] = await NginxConfFileApi.getNginxConfFileHistoryList(id)

    const versionTableList = []
    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i]
      const versionTable = {
        key: data.id,
        id: data.id,
        fileId: data.fileId,
        fileCode: data.fileCode,
        fileVersion: data.fileVersion,
        gmtCreate: data.gmtCreate,
        gmtModified: data.gmtModified
      }
      versionTableList.push(versionTable)
    }

    setHistoryList(versionTableList)
  }

  const onClickDetail = async historyFileId => {
    const detailEntity = await NginxConfFileApi.getNginxHistoryConfFileDetail(historyFileId)
    setHistoryVersionContent(detailEntity.fileContent)
  }

  const columns = [
    {
      title: '文件编码',
      dataIndex: 'fileCode',
      key: 'fileCode'
    },
    {
      title: '版本',
      dataIndex: 'fileVersion',
      key: 'fileVersion'
    },
    {
      title: '创建时间',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate'
    },
    {
      title: '修改时间',
      dataIndex: 'gmtModified',
      key: 'gmtModified'
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render(_, record: DevFileTreeEntity) {
        return (
          <ConfigProvider
            theme={{
              token: {
                colorBgContainerDisabled: '#282A36',
                colorBgContainer: '#282A36',
                colorTextDisabled: '#bdbdbd',
                colorText: '#bdbdbd',
                colorBgElevated: '#282A36'
              },
              components: {
                Select: {
                  // selectorBg: 'grey'
                  optionActiveBg: '#17181f',
                  optionSelectedBg: '#17181f'
                },
                Table: {
                  cellFontSize: 12,
                  cellFontSizeMD: 12,
                  cellFontSizeSM: 12
                }
              }
            }}
          >
            <Space>
              <Popover
                content={<HistoryVersionContentView fileContent={historyVersionContent} />}
                title='文件内容'
                trigger='click'
                placement={'left'}
              >
                <Button size={'small'} onClick={() => onClickDetail(record.id)}>
                  查看
                </Button>
              </Popover>

              <Popover
                content={<PublishedNginxServiceTableView historyFileId={record.id} reloadCount={reloadKey} />}
                trigger='click'
                placement={'left'}
              >
                <Button size={'small'} onClick={addReloadKey}>
                  Nginx服务列表
                </Button>
              </Popover>
            </Space>
          </ConfigProvider>
        )
      }
    }
  ]

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainerDisabled: '#282A36',
          colorBgContainer: '#282A36',
          colorTextDisabled: '#bdbdbd',
          colorText: '#bdbdbd'
        },
        components: {
          Select: {
            // selectorBg: 'grey'
            optionActiveBg: '#17181f',
            optionSelectedBg: '#17181f'
          },
          Table: {
            cellFontSize: 12,
            cellFontSizeMD: 12,
            cellFontSizeSM: 12
          }
        }
      }}
    >
      <div className={styles.blankContentWrapper}>
        <div className={styles.buttonWrapper}>
          <Button className={styles.refreshButton} onClick={reload} size={'small'}>
            刷新
          </Button>
        </div>
        <Table dataSource={historyList} columns={columns} pagination={false} size={'small'} />
      </div>
    </ConfigProvider>
  )
}
