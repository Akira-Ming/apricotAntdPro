/*
 * @Author: AkiraMing
 * @Date: 2021-10-19 01:45:23
 * @LastEditTime: 2021-10-19 02:23:42
 * @LastEditors: AkiraMing
 * @Description: 描述
 * @FilePath: \apricotAntdPro\src\core\index.ts
 */
import BaseService from './service/base';
import { Service, Permission } from './service';
// import { Service, Permission, useService as aaa } from "./service";
// import { useRefs } from "./hook/core";
// import { useRouter } from "./router";
// import { useModule } from "./module";
// import router from "/@/router";
// import store from "/@/store";

// const services = aaa();

// async function bootstrap(app: any) {
// 	app.config.globalProperties.service = store.service = services;
// 	app.provide("service", services);

// 	useRouter();
// 	useModule(app);

// 	router.$plugin?.addViews(store.getters.routes || []);
// }

function usePermission(list: any[]) {
  // function deep(d: any) {
  // 	if (d.permission) {
  // 		d._permission = {};
  // 		for (const i in d.permission) {
  // 			d._permission[i] =
  // 				list.findIndex((e: string) =>
  // 					e.replace(/:/g, "/").includes(`${d.namespace}/${i}`)
  // 				) >= 0;
  // 		}
  // 	} else {
  // 		for (const i in d) {
  // 			deep(d[i]);
  // 		}
  // 	}
  // }
  // deep(services);
}

// export { Service, Permission, BaseService, services, bootstrap, useRefs, usePermission };
export { Service, Permission, BaseService, usePermission };
// export * from "./hook";
