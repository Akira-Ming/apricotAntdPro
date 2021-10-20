/*
 * @Author: AkiraMing
 * @Date: 2021-10-21 00:14:46
 * @LastEditTime: 2021-10-21 00:14:58
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\apricot\modules\base\utils\index.ts
 */
export const revisePath = (path: string) => {
  if (!path) {
    return '';
  }

  if (path[0] == '/') {
    return path;
  } else {
    return `/${path}`;
  }
};

export function firstMenu(list: any[]) {
  let path = '';

  const fn = (arr: any[]) => {
    arr.forEach((e: any) => {
      if (e.type == 1) {
        if (!path) {
          path = e.path;
        }
      } else {
        fn(e.children);
      }
    });
  };

  fn(list);

  return path || '/404';
}

export function createLink(url: string, id?: string) {
  const link = document.createElement('link');
  link.href = url;
  link.type = 'text/css';
  link.rel = 'stylesheet';
  if (id) {
    link.id = id;
  }

  document.getElementsByTagName('head')?.item(0)?.appendChild(link);
}
