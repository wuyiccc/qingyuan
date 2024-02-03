import styles from './index.module.less'
function NavFooter() {
  return (
    <div className={styles.footer}>
      <div>
        <a href='http://www.wuyiccc.com' target='_blank' rel='noreferrer'>
          个人主页
        </a>
        <span className='gutter'>|</span>
        <a href='http://www.wuyiccc.com' target='_blank' rel='noreferrer'>
          个人主页
        </a>
        <span className='gutter'>|</span>
        <a href='http://www.wuyiccc.com' target='_blank' rel='noreferrer'>
          个人主页
        </a>
      </div>
      <div>Copyright @2024 Vega All Rights Reserved</div>
    </div>
  )
}

export default NavFooter
