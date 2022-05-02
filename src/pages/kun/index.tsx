import React, { useState, useCallback } from 'react';
import { cloneDeep } from 'lodash';
import { Layout } from 'react-grid-layout';
import Canvas from './components/canvas';
import { layout } from './config';
import styles from './index.less';

function Kun() {
  const [canvasData, setCanvasData] = useState<any>(layout);

  const onDrop = useCallback(
    (_layout: Layout[], _item: Layout, e: any) => {
      const layoutItem = _item;
      const code = e.dataTransfer.getData('text/plain');
      layoutItem.i = code;
      layoutItem.h = 200;
      const newCanvasData: any = cloneDeep(canvasData);
      newCanvasData.push(_item);
      setCanvasData(newCanvasData);
    },
    [canvasData],
  );

  return (
    <div className={styles.kun}>
      <div className="droppable-element" draggable unselectable="on" onDragStart={(e) => e.dataTransfer.setData('text/plain', Date.now().toString())}>
        Droppable Element (Drag me!)
      </div>
      <Canvas layout={canvasData} onDrop={onDrop} onChange={(data) => setCanvasData(data)} />
    </div>
  );
}

export default Kun;
