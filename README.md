# grunt-from-zero-2-hero

grunt in action

## how to use

使用`grunt`命令之前需要`nodejs`、`npm`和`grunt-cli`
有了以上环境之后，克隆该项目，然后安装`package.json`里的依赖包：

`npm install`

安装成功后运行`grunt serve`就可以在本地开启一个`server`,同时`watch`任务会监听本地文件change并且马上reload.

## add a task

添加一个`task`非常简单，以`grunt-contrib-jshint`为例，阅读官方[说明文档](https://www.npmjs.com/package/grunt-contrib-jshint),在 terminal 执行：

`npm install grunt-contrib-jshint --save-dev`

`npm`会下载`grunt-contrib-jshint`到本地的`node_modules`目录并且把它加到`package.json`中。



