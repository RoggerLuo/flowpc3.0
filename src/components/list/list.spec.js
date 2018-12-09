// 注入了 dva 和 test
import model from './model.js'
import _test from 'tape'
import sagas from './sagas.js'
dva.constant({ api: `http://47.75.9.249:5555` })
dva.saga(sagas)
dva.model(model)
dva.test('list', (t) => {
    t('list model创建成功', () => {
        return !!dva._store.getState().list
    })
})

dva.test('model fetch test',(t) => {
    dva._store.dispatch({type:'list/fetch',notes:[{abc:'123'}]})
    t('应该成功修改store的值',()=>{
        return dva._store.getState().list.notes[0].abc === '123'
    })
})

_test('list model dispatch saga', (t) => {
    setTimeout(function() {
        console.log(dva._store.getState().list.notes)
        t.equal(
            dva._store.getState().list.notes.length > 0,
            true,
            '成功拉取到数据'
        )
        t.end()
    }, 1500)
})
/*
app._store.dispatch({ type: 'testSaga', content: 'yuanyuan' })


t.equal(
    app._store.getState().server.content,
    'roger',
    'saga触发了，但是没有立即修改reduce state'
)

setTimeout(function() {
    t.equal(
        app._store.getState().server.content,
        'roger',
        'saga触发的0.5秒之后，没有修改reduce state'
    )
}, 500)

setTimeout(function() {
    t.equal(
        app._store.getState().server.content,
        'yuanyuan',
        'saga触发的2秒之后，修改了reduce state'
    )
    t.end()
}, 2000)
*/

// test('notes概念 组件,只提供跟后端服务器交互的sagas',(t)=>{
//     t('sagas: get notes列表, del note, post note',()=>{

//     })
//     t('saga的输入note对象规范：{id,content,modifiedTime}')
//     t('saga的输出list中note对象规范：[{id,content,modifiedTime,wordList}]')
//     // 用mock或者什么的
// })
/*
test('list组件',(t)=>{
    t('model属性：notes列表,index指针')
    t('model onReady: 请求notes列表')

    t('note组件 必须传入index')
    t('点击note 改变传入index,切换editor,')
})

test('editor组件',(t)=>{
    t('model里有 note对象:{content, id}')
    t('model里有 status状态，有unsaved和saved两个值')
    t('接受两个参数：(一个note对象,一个onChange方法),onChange方法被调用的时候提供一个值，其为当前的编辑器中的内容')
    // -----
    t('未编辑无法保存')
    t('内容没修改 无法再次保存')
})

test('searchPanel组件',(t)=>{
    t('api:接收一个boolean:show变量')
    t('拥有自己的model')
})

*/