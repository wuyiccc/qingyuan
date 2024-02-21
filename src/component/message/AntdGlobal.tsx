import { MessageInstance } from 'antd/es/message/interface'
import { ModalStaticFunctions } from 'antd/es/modal/confirm'
import { App } from 'antd'
import { NotificationInstance } from 'antd/es/notification/interface'

let notification: NotificationInstance
let modal: Omit<ModalStaticFunctions, 'warn'>

export default () => {
  const staticFunction = App.useApp()
  modal = staticFunction.modal
  notification = staticFunction.notification

  return null
}

export { notification, modal }
