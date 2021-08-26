export const NOT_LOADED = "NOT_LOADED"; // 没有加载过
export const LOADING_SOURCE_CODE = "LOADING_SOURCE_CODE"; // 加载原代码
export const NOT_BOOTSTRAPPED = "NOT_BOOTSTRAPPED"; // 没有启动
export const BOOTSTRAPPING = "BOOTSTRAPPING"; // 启动中
export const NOT_MOUNTED = "NOT_MOUNTED"; // 没有挂载
export const MOUNTING = "MOUNTING"; // 挂载中
export const MOUNTED = "MOUNTED"; // 挂载完毕
export const UNMOUNTING = "UNMOUNTING"; // 卸载中

// 判断判断该应用是否已被挂载
export function isActive(app) {
    return app.status === MOUNTED;
}

// 判断该应用是否应该被加载
export function shouldBeActive(app) {
    return app.activeWhen(window.location)
}