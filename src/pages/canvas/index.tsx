/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import RGL, { WidthProvider, Layout } from 'react-grid-layout';
import { cloneDeep } from 'lodash';
import 'react-grid-layout/css/styles.css';
import styles from './index.less';

const ReactGridLayout = WidthProvider(RGL);

export default class AllowOverlap extends React.PureComponent {
  state = {
    canvasData: [
      {
        i: '1651409911423',
        h: 20,
        w: 20,
        x: 45,
        y: 242,
        static: false,
        isDraggable: true,
        moved: true,
      },
      {
        w: 20,
        h: 20,
        x: 34,
        y: 390,
        i: '1651409912287',
        moved: true,
        static: false,
        isDraggable: true,
      },
      {
        i: '1651409913641',
        h: 200,
        w: 20,
        x: 24,
        y: 156,
        static: false,
        isDraggable: true,
        moved: true,
      },
    ],
  };

  onDrop = (layout: Layout[], item: Layout, e: any) => {
    const code = e.dataTransfer.getData('text/plain');
    item.i = code;
    item.h = 200;
    const canvasData: any = cloneDeep(this.state.canvasData);
    canvasData.push(item);
    this.setState({
      canvasData,
    });
  };

  render() {
    return (
      <div className={styles.canvas}>
        <div className="droppable-element" draggable unselectable="on" onDragStart={(e) => e.dataTransfer.setData('text/plain', Date.now().toString())}>
          Droppable Element (Drag me!)
        </div>
        <ReactGridLayout
          className="layout"
          /** 数据源 */
          layout={this.state.canvasData}
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
          onLayoutChange={(layout) => {
            // this.setState({
            //   canvasData: layout,
            // });
          }}
          /** 拖拽结束前修改值 */
          onDropDragOver={() => ({ w: 20, h: 20 })}
          /** 放大缩小改变 */
          onResizeStop={(layout) => {
            this.setState({
              canvasData: layout,
            });
          }}
          /** 拖拽结束 */
          onDragStop={(layout) => {
            this.setState({
              canvasData: layout,
            });
          }}
          /** 拖拽结束 */
          onDrop={this.onDrop}
          /** 是否有边界 */
          isBounded={false}
        >
          {this.state.canvasData.map((item) => {
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
