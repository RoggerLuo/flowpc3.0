# scaffold
## babel
以webpack.config中的为准，不设置`.babelrc`
### babel-presets-env
如果设置"targets": {"browsers": "> 5%"} 就不会转let和const，  
部分浏览器就会报错，目前不加配置项  
### babel-plugin-transform-regenerator
使用这个插件，需要引入`regenerator runtime`或者`babel polyfill`

``` javascript
import "regenerator-runtime/runtime"
```
### babel-presets-stage-3
为了正常使用拓展运算符

## package.json
### browserslist
为了autoprefixer能够转换flex等样式，兼容老机型  

```
"browserslist": [
    "iOS >= 8",
    "Android > 4"
]
```
