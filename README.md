## Gitless
更高效的git命令行工具
### 安装
npm install gitless -g

### 命令 gls

#### 提供渐进式体验操作git，更快捷的使用命令行管理代码！
#### 示例：
```  
    PS C:\Artemis\gitless> gls
    选择操作模式(push:提交代码;addtag:提交新标签;deltag:删除标签;)
    :push
    请输入版本备注
    :提交啦
    >>>>>>>>>>>>>>>>> git pull <<<<<<<<<<<<<<<
    Already up to date.

    >>>>>>>>>>>>>>>>> git add * <<<<<<<<<<<<<<<

    >>>>>>>>>>>>>>>>> git commit -m "提交啦" <<<<<<<<<<<<<<<
    [master 2e9f769] 提交啦
    1 file changed, 16 insertions(+), 1 deletion(-)

    >>>>>>>>>>>>>>>>> git push <<<<<<<<<<<<<<<

    -----end------
```
### 具体命令
#### 向远程仓库提交代码
gls push <备注>

#### 向远程仓库提交代码
gls addtag <备注> <版本号>

远程仓库会生成一个新tag标签，自动命名规则为 <备注>_项目名_v<版本号>_日期

#### 向远程仓库提交代码
gls deltag  < tag名称 >
删除一个tag，会同时删除本地和远程仓库指定的tag

#### 其他
努力更新中

