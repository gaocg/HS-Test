import React,{useState,useEffect} from "react";
import { Row, Col,Spin } from 'antd';
import ListBody from "./ListBody";


function Index(){
    const  nameList = ["恒生电子","海康威视","阿里巴巴","招商银行","中兴通讯","中国银行","中国高铁","浙江大华","光线传媒","茅台酒业"];
    const [list,setList] = useState([]),
    [selectedIndex,setSelectIndex] = useState(''),//保存选中的数据下标
    [loading,setLoading] = useState(true);
    //创建名字
    const createName = () => nameList[Math.floor(Math.random()*10)];

    useEffect(()=>{   
        sessionStorage.setItem("selectIndex",'')
        insertData();  
        //事件代理 
        document.getElementsByClassName("main")[0].addEventListener("click",function(e){
            const classList = "ant-row list-tr";
            if(e.target.parentNode.className.indexOf("list-tr") > 0 ){
                if(document.getElementsByClassName("selected").length){
                    document.getElementsByClassName("selected")[0].className = classList;
                }
                e.target.parentNode.className += " selected";
                
                // SetSelectIndex(SetSelectIndex => {
                //     document.getElementsByClassName("list-tr").indexOf(e)
                // })
            }
                       
        })
        //滚动加载数据
        window.addEventListener("scroll",()=>{
            
            let top = document.documentElement.scrollTop;
            let viewh =document.documentElement.clientHeight;
            let h = document.documentElement.offsetHeight;
            
            if(top + viewh === h ){
                setLoading(true);
                insertData();
            }
        })
        //键盘事件
        document.onkeydown = e => {
            
            const keyCode = e.keyCode;
            const l = document.getElementsByClassName("list-tr").length;
            let selectIndex = sessionStorage.getItem("selectIndex");
            //up
            if(keyCode === 38){
                selectIndex > 0 ? selectIndex-- : selectIndex = 0;
                e.preventDefault();
            }
            //down
            if(keyCode === 40){
                e.preventDefault();
                selectIndex < l ? selectIndex++ : selectIndex = l;
            }
            sessionStorage.setItem("selectIndex",selectIndex);//更新下标
            
            document.getElementsByClassName("list-tr")[selectIndex].getElementsByClassName("ant-col")[0].click();

            scrollMoive(keyCode);
        }
    },[])
    useEffect(()=>{   
        if(list.length > 300){ setLoading(false); return }
        insertData();
    },[list])

    //键盘选中事件导致选中项不在可视区域时，手动实现滚动条滑动
    const scrollMoive = (keyCode) => {
        const move = (keyCode)=> {
            const selectDomTop = document.getElementsByClassName("selected")[0].offsetTop;//选中元素距离文档最上方高度
            const scrollHeight = document.documentElement.scrollTop;//文档卷起的高度
            const clientHeight = document.documentElement.clientHeight;//页面可视区高度
            if(keyCode === 38){
                if( selectDomTop -  scrollHeight < 10 ){
                    window.scrollBy(0,-30);
                }else if(selectDomTop -  scrollHeight > clientHeight -50){
                    return ;
                }
               
            }
            if(keyCode === 40 ){
                if(selectDomTop -  scrollHeight < 10 ){
                    return ;
                }else if(selectDomTop -  scrollHeight > clientHeight -50 ){
                    window.scrollBy(0,30);
                }
            }
        }
        move(keyCode);
    }

    //获得子组件点击元素的下标
    const select = (i)=>{ 
        sessionStorage.setItem("selectIndex",i)
    }

    //创建数据
    const addList = () => {
        const math = Math.random() - Math.random();
        const v = Math.floor(math*100000);
        const name = createName();
        const arr = []
            arr.push({
                "id":Math.random()*100000,
                "name":name,
                "code":Math.abs(v),
                "sum1":v,
                "sum2":v,
                "sum3":v,
                "sum4":v,
                "sum5":v,
                "sum6":v,
                "sum7":v,
                "sum8":v,
                "sum9":v,
                "sum10":v,
                "sum11":v,
                "sum12":v,
                "sum13":v,
                "sum14":v,
                "sum15":v,
                "selected":false
            });
        return arr;
        }
        //插入数据
        const insertData = () => {
            var arr = [];
            for(let i = 0 ; i < 100 ; i++ ){
                arr = arr.concat(addList())
            }
            setList(list => {
               return list.concat(arr)
            })
        }
        
        return (
            <main className="main" >
                <Row className="list-th">
                    <Col span={1}>序号</Col>
                    <Col span={2} onClick={insertData}>名称</Col>
                    <Col span={1}>代码</Col>
                    <Col span={1}>涨幅</Col>
                    <Col span={1}>现价</Col>
                    <Col span={1}>涨跌</Col>
                    <Col span={1}>成交量</Col>
                    <Col span={1}>成交额</Col>
                    <Col span={1}>涨速</Col>
                    <Col span={1}>换手</Col>
                    <Col span={1}>量比</Col>
                    <Col span={1}>今开</Col>
                    <Col span={1}>最高</Col>
                    <Col span={1}>最低</Col>
                    <Col span={1}>昨收</Col>
                    <Col span={1}>市盈率</Col>
                    <Col span={1}>振幅</Col>
                    <Col span={1}>委差</Col>
                    <Col span={1}>委比</Col>
                </Row>
                <Spin className="loading-mask" tip="Loading..." style={{"display":loading ? "":"none"}} spinning={true}></Spin>
        
                <ListBody select={select} data={list}/>
            </main>
        )
}

export default Index;