const myProject = "artemis"

const exec = require('child_process').exec;

let args = process.argv.splice(2)
let cmdArgs = new Object()
const pushOrigin = ()=>[
  'git pull',
  'git add *',
  `git commit -m "${ cmdArgs.pushRemark||'' }"`,
  'git push'
]
const addTag = ()=>{
  const now = new Date()
  const date =  `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}`
  let tag = `${cmdArgs.env}_${myProject}_v${cmdArgs.ver}_${date}`
  return [
    'git pull',
    'git add *',
    `git commit -m "添加新标签"`,
    'git push',
    `git tag -a ${tag} -m "新版本提交：环境${cmdArgs.env||"无"};版本${cmdArgs.ver||"无"};时间:${date}"`,
    `git push origin ${tag}`
  ]
}
const deltag = ()=>{
  if(!cmdArgs.deltag)return[];
  return [
    `git tag -d ${ cmdArgs.deltag}`,
    `git push origin :refs/tags/${ cmdArgs.deltag}`,
  ]
}

class GitLess {
  constructor(parameters) {
    if(args.length==0){
      this.readInput("选择操作模式:\npush:提交代码; addtag:提交新标签; deltag:删除标签; \n", chunk=>{
        this.switchfun( chunk )
      })
    }else{
      this.switchfun( args[0] )
    }
  }

  switchfun( chunk ) {
    switch (chunk) {
      case 'push':
        this.pushFun()
        break;
      case 'addtag':
        this.addTag()
        break;
      case 'deltag':
        this.deltag()
        break;
      default :
        console.log('不支持命令'+chunk+'！')
        break;
    }
  }
  pushFun(){
    if( args[1] ){
      cmdArgs.pushRemark = args[1]
      this.runCmd( 0, pushOrigin() )
    }else{
      this.readInput("请输入版本备注\n", chunk2=>{
        cmdArgs.pushRemark = chunk2
        this.runCmd( 0, pushOrigin() )
      })
    }
  }

  addTag(){
    let inputVer = ()=>{
      this.showAlltag( tags=>{
        this.readInput("请输入版本号\n", chunk3=>{
          cmdArgs.ver = chunk3
          this.runCmd( 0, addTag() )
        })
      })
    }
    if( args[1] ){
      cmdArgs.env = args[1]
      if( args[2] ){
        cmdArgs.ver = args[2]
        this.runCmd( 0, addTag() )
      }else{
        inputVer()
      }
    }else{
      this.readInput("请输入环境(test / realease)默认test\n", chunk=>{
        if(!chunk)chunk="test"
        cmdArgs.env = chunk
        inputVer()
      })
    }
  }
  deltag(){
    if( args[1] ){
      cmdArgs.deltag = args[1]
      this.runCmd( 0, deltag() )
    }else{
      this.showAlltag( tags=>{
        this.readInput("请输入需删除的标签序号\n", index=>{
          cmdArgs.deltag = tags[index]
          if(!cmdArgs.deltag)return console.log("没有该序号！")
          this.runCmd( 0, deltag() )
        })
      })
    }
  }
  showAlltag(callback){
    exec("git tag", ( err, stdout, stderr ) => {
      if(err){
        return console.log(stderr)
      }
      let tags = stdout.split("\n").map( (item, index)=>{
        let val = item.trim()
        if( val ){
          console.log("序号："+index+"；标签："+val)
        }
        return val
      })
      callback(tags)
    })
  }
  readInput(prompt, callback) {
    process.stdout.write(prompt + ":");
    process.stdin.resume();
    process.stdin.setEncoding("utf-8");
    process.stdin.once("data", function(chunk) {
      process.stdin.pause();
      callback(chunk.trim());
    });
  }

  runCmd(index, cmds){
    let script = cmds[index]
    if(!script)return console.log("-----end------");
    exec(script, ( err, stdout, stderr ) => {
      console.log(">>>>>>>>>>>>>>>>> "+script+" <<<<<<<<<<<<<<<")
      console.log(stdout)
      if (err) {     
        console.log(stderr)
        this.readInput("此条命令执行异常，检查上方日志，是否继续？(n)退出;(任意)继续;\n",(d)=>{
          if(d !="n"){
            this.runCmd(++index, cmds)
          }
        })
      }else{
        this.runCmd(++index, cmds)
      }
    });
  }
}
new GitLess()