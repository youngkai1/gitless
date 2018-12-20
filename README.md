## Gitless
更高效的git命令行工具
### 安装
npm install gitless -g

命令 gls

:    
#### 向远程仓库提交代码
gls push <备注>

#### 向远程仓库提交代码
gls addtag <备注> <版本号>

远程仓库会生成一个新tag标签，自动命名规则为 <备注>_项目名_v<版本号>_日期

#### 向远程仓库提交代码
gls deltag  < tag名称 >
删除一个tag，会同时删除本地和远程仓库指定的tag

