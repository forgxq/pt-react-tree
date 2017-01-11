# pt-react-tree
 公司项目需要，基于[react-ui-tree](https://pqx.github.io/react-ui-tree)修改，在此非常感谢原作者[adjusted](https://www.npmjs.com/~adjusted)


### Installation
``` sh
npm install pt-react-tree --save
```
### Usage
``` javascript
<Tree
  paddingLeft={20}              
  tree={this.state.tree}  // 数据
  renderNode={this.renderNode} // 节点显示样式
  dragabled={true} // 是否能够拖拽改变树机构，默认为false
  onChange={this.handleChange}   // 改变树结构时触发的事件
/>

```

### License
MIT
