## 准备工作
1. 先创建一个项目文件夹：**howToBuildMySingleSpa**
2. 再创建`index.html` 文件
3. 创建`README.md` (非必要，这个文件是我用来写这篇文章的)

ok，截图看看现在的目录情况吧。


![](https://files.mdnice.com/user/3934/2ed4d194-d850-4cb4-8fc1-7c9fb94d4426.png)

## 使用single-spa
先在index.html中引入single-spa

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script src="https://cdn.jsdelivr.net/npm/single-spa@5.9.3/lib/umd/single-spa.min.js"></script>
</body>
</html>
```
引入之后，就会在window中添加了个singleSpa对象。

接下来，我们注册两个微应用appA和appB。


```js
let appA = {
    bootstrap: [
        async () => {
            console.log("APP A bootstrap ----1");
        },
        async () => {
            console.log("APP A bootstrap ----2");
        }
    ],
    mount: async () => {
        console.log("APP A mount");
    },
    unmount: async () => {
        console.log("APP A unmount");
    }
}
let appB = {
    bootstrap: [
        async () => {
            console.log("APP B bootstrap ----1");
        },
        async () => {
            console.log("APP B bootstrap ----2");
        }
    ],
    mount: async () => {
        console.log("APP B mount");
    },
    unmount: async () => {
        console.log("APP B unmount");
    }
}
```

**微应用有一个特点，就是需要有bootstrap，mount，unmount三个生命周期函数。**

1. bootstrap是启动微应用的时候触发的。（只会触发一次）
2. mount是当微应用挂载到页面上的时候出发的。
3. unmount是卸载的时候触发。

**需要注意的是，每个周期函数，可以 是方法数组(如上面的bootstrap)，也可以是一个方法（如mount和unmount）。**

接下来，引入registerApplication方法来注册这两个应用和start方法来启动。

```js
let { registerApplication, start } = singleSpa;

···

registerApplication({
    name: "APPA",
    app: async () => { return appA },
    activeWhen: location => location.hash == "#/a",
    customProps: { author: "前端阳光" }
})
registerApplication(
    "APPB",
    async () => { return appB },
    location => location.hash == "#/b",
    { author: "前端阳光" }
)
start();
```
可以看到registerApplication接受四个参数，分别是：
1. `name`微应用的名称，用于防止注册重复的微应用，
2. `app`用于加载对应的微应用
3. `activeWhen`判断路径匹配的时候，渲染该微应用
4. `customProps`传递为微应用的参数。

可以以对象的形式传递参数（如上面注册APP A），也可以四个参数拆出来传递（如上面注册APP B）

然后执行start方法启动。

我们看看运行结果：

运行index.html
![](https://files.mdnice.com/user/3934/621a8c22-5b7e-4973-803d-5501797eb9f4.png)

然后点击App A


![](https://files.mdnice.com/user/3934/7cb3d5f0-048f-47b5-a1eb-9afee7c37009.png)

再点击App B

![](https://files.mdnice.com/user/3934/db0ab609-3b4b-4ad0-ad3b-812227299250.png)

再点击回APP A

![](https://files.mdnice.com/user/3934/039fb2e7-80f6-4e69-9b41-aa1f29ed4d4b.png)

可以看到 当点击App A 的时候，url的hash值 跟appA应用的路径匹配对上了，然后就启动APPA，再挂载AppA

当点击App B 的时候，url的hash值 跟appB应用的路径匹配对上了，然后就卸载APPA，启动APPB，再挂载AppB。

当再点击回APP A ，appA的bootstrap就不会再被触发了。

ok，对于single-spa的基本使用已经介绍完毕了，接下来，就自己来实现一个single-spa吧！

>先把目前的代码上传到github：https://github.com/Sunny-lucking/HowToBuildMySingleSpa/tree/b044a6caa1cf6e14ea37847403e0d9e2b893b5b6

## 创建自己的single-spa

如图所示：
1. 创建single-spa文件夹作为我们自己实现的single-spa。
2. start.js存放的是 start方法的实现
3. applications存放的是跟应用相关的文件，例如apps.js存放的是registerApplication方法的实现
4. single-spa.js是入口文件，引入start和registerApplication并导出

![](https://files.mdnice.com/user/3934/607ad2ee-136c-44a2-b504-266aa7e5e175.png)

**start.js**


```js
export function start() {
    console.log("start");
}
```

**apps.js**

```js
export function registerApplication() {
    console.log('register');
}
```
**single-spa.js**

```js
export { registerApplication } from "./applications/apps.js"
export { start } from "./start.js"
```
