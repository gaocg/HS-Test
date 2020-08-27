import React,{useState,useEffect} from "react";
import { Row, Col } from 'antd';

function ListBody(props){
    const {data,select} = props,
    [list,setList] = useState("");
    useEffect(()=>{
        setList(data)

    },[data])

    return (
        <>     
        {   
            list.length ? 
            list.map( (item,index) => {
                return (
                    <Row className={["list-tr",item.selected ? "selected": ""]}  key={item.id} onClick={() => select(index)}>
                        <Col span={1}>{index}</Col>
                        <Col span={2}>{item.name}</Col>
                        <Col span={1}>{item.code}</Col>
                        <Col span={1} className={item.sum1 > 0 ? "red" : "green"}>{item.sum1}</Col>
                        <Col span={1} className={item.sum2 > 0 ? "red" : "green"}>{item.sum2}</Col>
                        <Col span={1} className={item.sum3 > 0 ? "red" : "green"}>{item.sum3}</Col>
                        <Col span={1} className="gold">{item.sum4}</Col>
                        <Col span={1} className="gold">{item.sum4}</Col>
                        <Col span={1} className={item.sum5 > 0 ? "red" : "green"}>{item.sum5}</Col>
                        <Col span={1}>{item.sum6}</Col>
                        <Col span={1} className={item.sum7 > 0 ? "red" : "green"}>{item.sum7}</Col>
                        <Col span={1} className={item.sum8 > 0 ? "red" : "green"}>{item.sum8}</Col>
                        <Col span={1}>{item.sum9}</Col>
                        <Col span={1}>{item.sum10}</Col>
                        <Col span={1}>{item.sum11}</Col>
                        <Col span={1}>{item.sum12}</Col>
                        <Col span={1}>{item.sum13}</Col>
                        <Col span={1}>{item.sum14}</Col>
                        <Col span={1}>{item.sum15}</Col>
                        <Col span={1}>{item.sum16}</Col>
                    </Row>
                )
            })
            :
            ""
        }
        </>
    )
}

export default ListBody;