export const quickStart = `
# 快速开始

TINY-NODE-FAAS是一款开源的、基于NodeJs的FaaS解决方案，它可以让我们使用Serverless的方式编写JS代码。
TINY-NODE-FAAS使用浏览器指纹标注用户信息，因此无需登录。
但请注意，如果您更换了新的浏览器，则无法查看到在旧的浏览器编写的函数了。

## 一、函数信息配置
首先点击函数编辑页前往函数编辑器。
我们可以在“函数信息tab”配置该函数的所有配置信息。
（1）命名空间：用于归类某一系列的函数。
（2）超时时间：函数最大执行时间。
（3）函数描述：用于描述函数的功能。

## 二、函数编写
我们可以在“函数编辑tab”编辑我们的faas函数，但faas函数必须符合以下两点才能正常运行：
（1）函数名必须命名为func，并作为module.exports对象的属性。
（2）函数参数仅有一个ctx对象，该对象是koa的ctx对象，详情请见：https://koajs.com/#context。

## 三、函数查看
编写完成后，点击“保存函数”按钮，会弹出该函数链接的对话框，请求函数链接，就会执行你编写的函数了。
另外我们也可以在函数列表页查看你所编辑的全部函数。
`

export const document = `
# 接口文档

TINY-NODE-FAAS项目地址是：https://github.com/shadowings-zy/tiny-node-faas。

## 一、添加函数
request:
\`\`\`
METHOD: POST 
PATH: /func/add
BODY: {
  namespace: string, // namespace of the function
  author: string, // author of the function
  func: string, // your function is here
  options?: FunctionOptions, // the options of the function, if you don't add this parameter, we will use default options
}
\`\`\`

response:
\`\`\`
{
  status: number, // status code, 0 is OK, 1 is ERROR
  message: string, // message of the result
  data: {
    id: string, // the id of the function
  }
}
\`\`\`

## 二、修改函数

request:
\`\`\`
METHOD: PUT
PATH: /func/update
BODY: {
  id: string, // the id of the function
  func: string, // your new function
  options?: FunctionOptions, // your new options of the function, if you don't add this parameter, we will use origin options
}
\`\`\`

response:
\`\`\`
{
  status: number, // status code, 0 is OK, 1 is ERROR
  message: string, // message of the result
}
\`\`\`

## 三、查询函数

request:
\`\`\`
METHOD: GET 
PATH: /func
PARAM: {
  namespace?: string, // namespace of the function. You can get all function in target namespace by adding this parameter 
  author?: string, // author of the function. You can get all function in target author by adding this parameter 
  id?: string, // the id of the function. You can get all function in target id by adding this parameter 
}
\`\`\`

response:
\`\`\`
{
  status: number, // status code, 0 is OK, 1 is ERROR
  message: string, // message of the result
  data: {
    funcs: [
      {
        namespace: string, // namespace of the function
        author: string, // author of the function
        id: string, // the id of the function
        content: string, // the content of the function
        options?: FunctionOptions
      }
    ],
  }
}
\`\`\`

## 四、执行函数

NOTE: the ctx of this http request will be the parameter of the faas function

request:
\`\`\`
METHOD: POST 
PATH: /exec/:id 
\`\`\`

response:
\`\`\`
{
  status: number, // status code, 0 is OK, 1 is ERROR.
  message: string, // message of the result.
  data: {
    output: any, // the output of the function 
  }
}
\`\`\`

`

export const tips = `
# 其他说明

## 注意事项
（1）由于服务器性能有限，以及nodejs本身的短板，TINY-NODE-FAAS在计算密集型的任务上表现很差。
（2）由于作者时间精力比较有限，无法持续保证该项目一直维持高可用性，所以有nodejs severless需求的朋友可以直接使用源码自行部署。

## 写在最后
我写TINY-NODE-FAAS目的并不是为了做一个nodejs serverless的项目给大家使用。
而是为大家提供一个编写nodejs serverless的思路。
现在虽然在很多公司都有nodejs serverless的实现方案，但在开源社区基本没有实现nodejs serverless的代码。
所以TINY-NODE-FAAS其实是对现有开源社区类目空缺的一种补足。
`