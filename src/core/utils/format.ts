/*
 * @Author: AkiraMing
 * @Date: 2021-10-23 02:00:09
 * @LastEditTime: 2021-10-26 01:31:26
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\core\utils\format.ts
 */

export function toTreeData(data: any, params: { id: any; parentId: any }) {
  if (!params) {
    return null;
  }
  // 删除 所有 children,以防止多次调用
  data.forEach(function (item: { children: any }) {
    delete item.children;
  });

  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  const map = {};
  data.forEach(function (item: { id: string | number }) {
    map[item[params.id]] = item;
  });
  const val: any[] = [];
  data.forEach(function (item: { parentId: string | number }) {
    // 以当前遍历项，的parentId,去map对象中找到索引的id
    const parent = map[item[params.parentId]];
    // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
      val.push(item);
    }
  });
  return val;
}
