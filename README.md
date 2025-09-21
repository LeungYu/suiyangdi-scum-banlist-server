# suiyangdi-scum-banlist-server
髓扬帝SCUM游戏服务器开源商城-联BAN服务插件

SCUM Players Blacklist Plugins for Suiyangdi SCUM Shop. Open source for SCUM game players / server holders

视频教程地址：待完善

更多SCUM等生存游戏相关的工具教程请关注B站账号 [SCUM商城髓扬帝](https://space.bilibili.com/2052979320/channel/seriesdetail?sid=4023505)
## 安装前准备
本插件支持在Windows Server平台或者Linux平台进行部署，不需要高防等额外要求的话平均价格几十CNY一个月即可。为了各位萌新服主也能看懂并部署该插件，以下内容以绝大部分人较为熟悉的Windows Server平台架设本插件为例去介绍。
## 需要在服务器安装的依赖
|名称|版本号|说明|下载地址|
| :------------ | :------------ | :------------ | :------------ |
|**NodeJS**|12.14.1|商城服务架构|[https://nodejs.org/dist/v12.14.1/node-v12.14.1-x64.msi](https://nodejs.org/dist/v12.14.1/node-v12.14.1-x64.msi)|
|**MySQL**|5.7.32|数据库相关|[https://downloads.mysql.com/archives/get/p/25/file/mysql-installer-community-5.7.32.0.msi](https://downloads.mysql.com/archives/get/p/25/file/mysql-installer-community-5.7.32.0.msi)|
|**Redis**|3.2.100|数据库相关|[https://github.com/microsoftarchive/redis/releases/download/win-3.2.100/Redis-x64-3.2.100.msi](https://github.com/microsoftarchive/redis/releases/download/win-3.2.100/Redis-x64-3.2.100.msi)|
|**.NET Framework**|4.5.2|运行MySQL所需依赖|[https://www.microsoft.com/en-us/download/details.aspx?id=42642](https://www.microsoft.com/en-us/download/details.aspx?id=42642)|
|**Navicat**|16.3.8|管理数据库的图形化界面|[http://www.wodown.com/soft/22453.html](http://www.wodown.com/soft/22453.html)|

## 基本部署步骤
1. 按顺序安装以上依赖
2. 设置MySQL端口，密码（安装时设置）和Redis端口，密码（在配置文件中设置）
3. 替换Mysql和Redis配置文件，并重启Mysql和Redis服务
4. 使用Navicat创建字符集为`utf8mb4/utf8mb4_bin`的MySQL数据库，并使用其中的还原数据库功能导入模板数据库
5. 修改和填入`.env`中的`production.env`文件中的配置(MySQL和Redis数据库端口，密码，数据库名，插件访问端口，管理员账号信息等)
7. 以管理员身份运行命令提示符，定位到插件解压目录中带有`package.json`的目录，运行`npm i`安装服务依赖
8. 运行`npm run start:prod-multi`或运行根目录的`start-normal.bat`启动插件，此时商城本体即可使用联办功能

**建议同一个联盟下的服务器使用同一个联办插件提供的服务即可**

## 法律声明
髓扬帝系列开源工具已申请中国/日本的计算机软件著作权，本工具供各位SCUM服主免费使用，禁止其他友商未经授权利用免费工具来盈利，实施以上行为将违反法律并可能触犯中国和日本国的刑法。其他服主发现有人进行类似的行为可以直接联系髓扬帝本人(QQ 1065617282)或者浙江之星律师事务所进行举报

**声援 [996.ICU](https://github.com/996icu/996.ICU) 项目**
