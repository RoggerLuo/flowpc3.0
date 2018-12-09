require("babel-register")({ // 配合.babelrc使用, 默认不转node_modules
    ignore: /node_modules\/(?!.*dvax)/ // dvax前面可能有其他字符,cnpm时产生版本数组, .*表示任意个数的任意字符
})