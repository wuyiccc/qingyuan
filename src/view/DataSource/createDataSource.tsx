import React from 'react'
import molecule from '@dtinsight/molecule'
import API from '../../api'
import { FormItem } from '@/component/formItem'
import styles from './index.module.less'
import { NotificationController } from '@dtinsight/molecule/esm/controller'
import { Button, message } from 'antd'
import { existCreateDataSourceView } from '@/extension/DataSource/base.tsx'

const MButton = molecule.component.Button

export class CreateDataSourceView extends React.Component {
  state = {
    data: [],
    currentDataSource: undefined
  }

  formRef: React.RefObject<HTMLFormElement>

  constructor(props: any) {
    super(props)
    this.formRef = React.createRef()
  }

  componentDidMount() {}

  submit = (e: React.FormEvent) => {
    console.log('创建成功')
    // const form = new FormData(this.formRef.current || undefined)
    // const dataSource = {
    //   name: form.get('name')?.toString() || '',
    //   type: form.get('type')?.toString() || '',
    //   jdbcUrl: form.get('jdbcUrl')?.toString() || '',
    //   updateTime: new Date().getTime().toString()
    // }

    // await API.createDataSource(dataSource).then((res: any) => {
    //   if (res.code === 200) {
    // molecule.notification.add([
    //   {
    //     id: 2,
    //     value: dataSource,
    //     render(item) {
    //       return (
    //         <p>
    //           Create the Database <b>{item.value.name}</b> is success!
    //         </p>
    //       )
    //     }
    //   }
    // ])
    message.success('创建成功')
    // container.resolve(NotificationController).toggleNotifications()
    // molecule.notification.toggleNotification() // Invalid
    // }
    // })
  }

  close = async (e: React.FormEvent) => {
    existCreateDataSourceView()
  }

  render() {
    return (
      <div className={styles.createDataSource}>
        <form ref={this.formRef} onSubmit={this.submit}>
          <FormItem label='Name' name='name' />
          <FormItem label='Type' name='type' />
          <FormItem label='JdbcUrl' name='jdbcUrl' />
          <FormItem style={{ textAlign: 'left' }}>
            <Button className={styles.createDataBtn} style={{ marginLeft: 0 }} onClick={this.submit}>
              Create
            </Button>
            <Button className={styles.createDataBtn} onClick={this.close}>
              Close
            </Button>
          </FormItem>
        </form>
      </div>
    )
  }
}

export default CreateDataSourceView
