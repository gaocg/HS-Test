import React from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import "./App.css";
import Index from "./component/List/Index";
import CanvasIndex from "./component/canvas/CanvasIndex";

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  //组件经历constructor初始化数据后，还没渲染dom
  componentWillMount(){}
  //组件渲染完成（可以调用ajax，setState后组件会重新渲染）
  componentDidMount(){}
  //组件卸载数据销毁阶段
  componentWillUnmount (){}
  //接受父组件改变后的props需要重新渲染组件时
  componentWillReceiveProps(nextprops){}
  /*主要用于性能优化(部分更新)在react中，setState以后，
  state发生变化，组件会进入重新渲染的流程，在这里return false可以阻止组件的更新*/
  shouldComponentUpdate(nextProps,nextState){}
  /*shouldComponentUpdate返回true以后，组件进入重新渲染的流程，
  进入componentWillUpdate,这里同样可以拿到nextProps和nextState*/
  componentWillUpdate (nextProps,nextState){}
  /*组件更新完毕后，react只会在第一次初始化成功会进入componentDidmount,
  之后每次重新渲染后都会进入这个生命周期，这里可以拿到prevProps和prevState，即更新前的props和state*/
  componentDidUpdate(prevProps,prevState){}
  /*render函数会插入jsx生成的dom结构，react会生成一份虚拟dom树，在每一次组件更新时，
  在此react会通过其diff算法比较更新前后的新旧DOM树，比较以后，找到最小的有差异的DOM节点，并重新渲染。*/
  render(){
    return(
    <BrowserRouter>
      <Switch>
      <Route path="/" exact>
          <div className="home">
            <a href="/list">列表页</a>
            <a href="/canvas">K线图</a>
          </div>
        </Route>
        <Route path="/list">
          <Index />
        </Route>
        <Route path="/canvas">
          <CanvasIndex />
        </Route>
      </Switch>
    </BrowserRouter>
    )
  }
}
