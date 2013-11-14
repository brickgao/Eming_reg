Eming_reg
=========

如你所见，这是Eming杯注册页面的源码。

Get Start
---------

获取Eming_reg

*   下载最近的版本或者克隆库`git@github.com:brickgao/WhoWakeUp.git`

获取Node.js

*   从[http://nodejs.org](http://nodejs.org)获取最新版本的Node.js

获取依赖模块

*   在应用下执行`npm install`

How to use
----------

在`/`输入正确的学号、密码和邮箱，后台的模块就会自动爬取`my.whu.edu.cn`的信息，然后写入数据库报名。

报名成功的姓名在`/list`下可以看到。

管理界面在`/login`，通过输入正确的密码来查看所有人的信息。


TODO
----

*   密码需要手动通过数据库修改，应修改为在web端修改。

Log
---

License
-------

[MIT](http://opensource.org/licenses/MIT)
