import React from 'react';
import { Tree, Input } from 'antd';

const { Search } = Input;

const x = 3;
const y = 2;
const z = 1;
let gData: never[] = [];

const generateData = (
  _level: number,
  _preKey?: string | undefined,
  _tns?: any[] | undefined,
): any => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

const dataList: { key: any; title: any }[] = [];
const generateList = (data: string | any[]) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key } = node;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(gData);

const getParentKey = (key: any, tree: string | any[]): any => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item: { key: any }) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

class SearchTree extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
  };

  props: any = this.props;

  onExpand = (expandedKeys: any) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
    const { dataTrreList } = this.props;

    const expandedKeys = dataTrreList
      .map((item: { title: string | any[]; key: any }) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, gData);
        }
        return null;
      })
      .filter((item: any, i: any, self: string | any[]) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };

  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const loop = (data: any[]): any =>
      data.map((item: { title: string; children: any; key: any }) => {
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          );
        if (item.children) {
          return { title, key: item.key, children: loop(item.children) };
        }

        return {
          title,
          key: item.key,
        };
      });
    // console.log(this.props);
    const { treeData, onCheck, initExpandedKeys } = this.props;
    // expandedKeys = initExpandedKeys;
    gData = treeData;
    // console.log('%c 11111111111', 'color:red', gData);
    // console.log('%c 22222222222', 'color:red', loop(gData));

    return (
      <div>
        <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
        <div
          style={{
            height: '200px',
            overflow: 'auto',
            border: '1px solid #d9d9d9',
            borderRadius: '2px',
          }}
        >
          <Tree
            checkable
            onExpand={this.onExpand}
            expandedKeys={expandedKeys}
            defaultCheckedKeys={initExpandedKeys}
            // defaultExpandedKeys={initExpandedKeys}
            autoExpandParent={autoExpandParent}
            treeData={loop(gData)}
            onCheck={onCheck}
          />
        </div>
      </div>
    );
  }
}

export default SearchTree;
