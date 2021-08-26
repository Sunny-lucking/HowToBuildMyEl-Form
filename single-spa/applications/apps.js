import { NOT_LOADED } from "./app.helper.js";

/**
 * 
 * @param {*} name 应用昵称
 * @param {*} loadApp 加载应用
 * @param {*} activeWhen 匹配路径
 * @param {*} customProps 参数
 */
let app = [] // 将所有注册的应用都放在一起
export function registerApplication(name, loadApp, activeWhen, customProps) {
    let registeration;
    if(typeof name === "object"){ // 参数是对象的形式
        registeration = appName
    }else {
        registeration = {
            name,
            loadApp,
            activeWhen,
            customProps
        }
    }
    // 添加状态
    registeration.status = NOT_LOADED
    app.push(registeration);

    reroute();// 重写路径，后续切换路由要再做这些事情
}