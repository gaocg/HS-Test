import  React from "react";


/**
 * K线图:粗线条表示开盘和收盘,细线表示 最低和最高
 */
class CanvasIndex extends React.Component{
    constructor(){
        super();
        this.state = {
            K_Line : [
                ["1","2","3","4","5" ],//第一项:时间,横坐标展开,第二项:开盘,第三项:收盘,第四项:最低,第五项:最高
            ],
            K_length:20,//数据量
        }

    }
    createData = (num) => {
        const list = [];
        for( let i = 0 ; i < num ; i++ ){
            const d_start = Math.random().toFixed(2)*50;//开市
            const d_end = Math.random().toFixed(2)*50;//闭市
            const min = Math.min(d_start,d_end) - Math.random()*Math.round(Math.random());
            const max = Math.max(d_start,d_end) + Math.random()*Math.round(Math.random());
            
            const arr = [i,d_start,d_end,min,max];
            list.push(arr);
        }
        this.setState({
            K_Line:list
        })
    }
    //创建K线图
    createCanvas = ()=>{
        this.state.K_Line.map((item,index) => this.createKline(item,index,this.state.K_Line.length))
    }
    //创建背景
    createBackground = () => {
        const ctx = this.refs.k_bg.getContext("2d");
        ctx.beginPath(); //开始绘制路径
        const arr = [
            [0,100,599,100],
            [0,200,599,200],
            [100,0,100,299],
            [200,0,200,299],
            [300,0,300,299],
            [400,0,400,299],
            [500,0,500,299],
        ];
        arr.map(item => {
            ctx.moveTo(item[0],item[1]);
            ctx.lineTo(item[2],item[3]);
        })
        ctx.lineWidth = 0.1; //设置线宽
        ctx.stroke();
    }
    //鼠标移动定位虚线
    createMoveLine = (e,w) => { 
        const event = window.event;
        const X =  w|| event.layerX, Y = event.layerY || sessionStorage.getItem("Y") ;//鼠标悬浮点相对于canvas左上角的坐标
        const ctx = this.refs.moveLine.getContext("2d");
        ctx.clearRect(0,0,600,300);
        ctx.setLineDash([5,5]);
        ctx.beginPath(); //开始绘制路径
        ctx.moveTo(0,Y);
        ctx.lineTo(599,Y);
        ctx.moveTo(X,0);
        ctx.lineTo(X,299);
        ctx.lineWidth = 1; //设置线宽
        ctx.stroke();
        sessionStorage.setItem("X",X);//保存X
        sessionStorage.setItem("Y",Y);//保存Y
    }
    //创建K线段
    createKline = (item,index,l) => {
        const w = 10;//设置开闭市数据宽度
        const block = item[2] - item[1];//闭市减开市
        const area = this.refs.k_pic.width / l ;//分割成几个区域 每个区域的宽度
        const x = area/2 + area*index ;//第一个数据的x坐标
        const y = Math.max(item[1],item[2]);//从两个数据中高的定义y轴(放大100倍)

        const color = block > 0 ? "red" : "green";
        
        const ctx = this.refs.k_pic.getContext("2d");
        ctx.beginPath(); //开始绘制路径
        ctx.fillStyle = color;
        ctx.strokeStyle  = color;
        ctx.fillRect(
            x-(w/2),
            y,//从两个数据中高的那个开始往下绘制
            w,Math.abs(block)
            );//绘制矩形
        ctx.moveTo(x,item[3]);
        ctx.lineTo(x,item[4]);
        ctx.stroke();
    }

    //组件渲染完成（可以调用ajax，setState后组件会重新渲染）
    componentDidMount(){
        this.createData(this.state.K_length);//动态创造数据
        this.createBackground();
    }

    componentDidUpdate(prevProps,prevState){
        this.createCanvas();//state更新后绘制k线
        //键盘选中
        window.onkeyup = (e) => {
            const X = sessionStorage.getItem("X") - 0.1 ;
            const w = this.refs.k_pic.width / this.state.K_Line.length;
            const keyCode = e.keyCode;
            let i = Math.round(X/w);

            if(keyCode === 37){//左移
                i = i > 0 ? i - 1 : 0 ;
            }else if(keyCode === 39){//右移
                i = i < this.state.K_Line.length -1 ? i + 1 : this.state.K_Line.length -1;
            }else{
                return ;
            }

            this.createMoveLine(null,i*w + w/2);
        }
    }
    render(){
        
        return (
            <div id="canvas">
                <canvas className="canvas" width="600" height="300" ref="moveLine" onMouseMove={this.createMoveLine}>
                </canvas>
                <canvas className="canvas" width="600" height="300" ref="k_pic" >
                </canvas>
                <canvas className="canvas" width="600" height="300" ref="k_bg" >
                </canvas>
            </div>
        )
    }
}

export default CanvasIndex;