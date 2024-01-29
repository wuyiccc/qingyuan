import request from '@/util/request.ts'
import { Button } from 'antd'
import StorageUtils from '@/util/common/StorageUtils.ts'
import NumberUtils from '@/util/common/NumberUtils.ts'
import DateUtils from '@/util/common/DateUtils.ts'

function handleClick() {
  request.post('/user/login', {
    username: 'admin',
    password: '1234'
  })
}

function handleStorage(type: number) {
  if (type === 1) {
    const formatNum = NumberUtils.formatNum('12333.5678')
    console.log(formatNum)
    const dateStr = DateUtils.formatDate(new Date(), DateUtils.DATETIME_FORMAT)
    console.log(dateStr)
    StorageUtils.setString('name', 'wuyiccc')
    StorageUtils.setNumber('age', 31)
  } else if (type === 2) {
    const name = StorageUtils.get('name')
    console.log('name:', name)
  } else if (type === 3) {
    StorageUtils.remove('name')
  } else if (type === 4) {
    StorageUtils.clear()
  }
}

export default function Welcome() {
  return (
    <div className='welcome'>
      <p>Welcome</p>
      <p>
        <Button onClick={handleClick}>点击事件</Button>
        <Button onClick={() => handleStorage(1)}>写入</Button>
        <Button onClick={() => handleStorage(2)}>读取</Button>
        <Button onClick={() => handleStorage(3)}>删除</Button>
        <Button onClick={() => handleStorage(4)}>清空</Button>
      </p>
    </div>
  )
}
