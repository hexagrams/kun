import React from 'react';
import styles from './index.module.less';

export default () => {
  const indexHref = '#/';
  return (
    <div className={styles.basicnotfound}>
      <div className={styles.exceptioncontent}>
        <img src="https://img.alicdn.com/tfs/TB1txw7bNrI8KJjy0FpXXb5hVXa-260-260.png" className={styles.imgException} alt="页面不存在" />
        <div className="prompt">
          <h3 className={styles.title}>抱歉，你访问的页面不存在</h3>
          <p className={styles.description}>
            您要找的页面没有找到，请返回
            <a
              onClick={() => {
                window.location.href = indexHref;
              }}
            >
              首页
            </a>
            继续浏览
          </p>
        </div>
      </div>
    </div>
  );
};
