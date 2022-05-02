/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import RGL, { WidthProvider, Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import styles from './index.less';

const ReactGridLayout = WidthProvider(RGL);

interface CanvasProps extends ReactGridLayout.ReactGridLayoutProps {
  onChange?: (value: Layout[]) => void;
}
export default class Canvas extends React.PureComponent<CanvasProps> {
  render() {
    const { onChange, layout } = this.props;
    return (
      <div className={styles.canvas}>
        <ReactGridLayout
          className="layout"
          /** 数据源 */
          layout={layout}
          /** 自动缩放大小 */
          autoSize
          /** 是否可以重叠 */
          allowOverlap
          /** 分成100份 */
          cols={100}
          /** 高度默认1 */
          rowHeight={1}
          /** 间隔 */
          margin={[0, 0]}
          /** 容器padding */
          containerPadding={[0, 0]}
          /** 是否允许拖拽 */
          isDroppable
          /** 在每次拖动或调整大小停止后使用 (currentLayout) 回调  */
          // onLayoutChange={(layout) => {
          // this.setState({
          //   canvasData: layout,
          // });
          // }}
          /** 拖拽结束前修改值 */
          onDropDragOver={() => ({ w: 20, h: 20 })}
          /** 放大缩小改变 */
          onResizeStop={onChange}
          /** 拖拽结束 */
          onDragStop={onChange}
          /** 拖拽结束 */
          // onDrop={this.onDrop}
          /** 是否有边界 */
          isBounded={false}
          {...this.props}
        >
          {(layout || []).map((item) => {
            return (
              <div key={item.i} data-grid={item} className="canvas-item">
                <div className="item">{item.i}</div>
              </div>
            );
          })}
        </ReactGridLayout>
      </div>
    );
  }
}
