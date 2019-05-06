import React, { Component } from 'react';
import  {InputGroup, InputGroupAddon,Container,Row,Col,Table,Input,Button }  from  'reactstrap';
//import PropTypes from 'prop-types'
import request from 'superagent';
import 'bootstrap/dist/css/bootstrap.css';
import CompanyInfosModal from './CompanyInfosModal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {alertCustom,orderUrl,dateToYYYYMMDD} from './Common'
export default class OrderContentsScreen extends Component
{
  constructor(props) {
     super(props);
     this.state = {
       rows : [],
       startDate: new Date(),
       endDate: new Date(),
       checker:true,
       modal:false,
       companyNm:""
     };
     this.onSubmit = this.onSubmit.bind(this);
     this.callbackGet = this.callbackGet.bind(this);
     this.handleChange1 = this.handleChange1.bind(this);
     this.handleChange2 = this.handleChange2.bind(this);
     this.selectFunc = this.selectFunc.bind(this);
     this.getChildDatCallback = this.getChildDatCallback.bind(this);
   }


   //조회 시작일자를 셋팅
   handleChange1(date) {
       this.setState({
         startDate: date
       });
     }
  //조회 종료일자를 셋팅
  handleChange2(date) {
         this.setState({
           endDate: date
         });
       }

  selectFunc(){
         this.setState((prevState) => ({
           modal: true,
           checker: false
         }));
  }
  downloadExcel = (e) => {
   this.setState({
     [e.target.name]: e.target.value
   });
 }
   render() {
     return (
       <div className="OrderContentsScreen">
        <form onSubmit={this.onSubmit}>
       <Container>
       <Row>
        <Col>
           <h1>거래내역조회</h1>
        </Col>
       </Row>
      <Row>
        <Col>
          <InputGroup size="sm">
          <InputGroupAddon addonType="prepend">업체명</InputGroupAddon>
          <Input placeholder="업체 이름을 입력해주세요." name="companyNm" disabled={true} value={this.state.companyNm}/>
          <Button size="sm" onClick={this.selectFunc}>업체명조회</Button>
          </InputGroup>
          <CompanyInfosModal pCheck={this.state.checker} pModal={this.state.modal} callbackFromParent={this.getChildDatCallback}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <InputGroup size="sm">
          <InputGroupAddon addonType="prepend">조회시작일자</InputGroupAddon>
            <DatePicker selected={this.state.startDate} onChange={this.handleChange1} dateFormat="yyyy/MM/dd"/>
          <InputGroupAddon addonType="prepend">조회종료일자</InputGroupAddon>
            <DatePicker selected={this.state.endDate} onChange={this.handleChange2} dateFormat="yyyy/MM/dd"/>
            <Button size="sm" type="submit">거래내역조회</Button>
            <Button size="sm" onClick={this.downloadExcel}>Excel다운로드</Button>
        </InputGroup>
        </Col>

      </Row>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>주문일자</th>
                <th>업체명</th>
                <th>주문수량</th>
                <th>가격</th>

              </tr>
            </thead>
            <tbody name="orderTable">
              {this.state.rows.map((row,index) =>
                {
                  return  <tr key={index}>
                          <td>{index}</td>
                          <td>{row.orderDt}</td>
                          <td>{row.companyId}</td>
                          <td>0</td>
                          <td>{row.sumOfPrice}</td>
                         </tr>

                })}
            </tbody>
          </Table>
        </Col>
      </Row>
      </Container>
    </form>
       </div>
     );
   }


    onSubmit(event)
      {
        event.preventDefault();
        var companyNm = this.state.companyNm;
        var inqueryStartDt=dateToYYYYMMDD(this.state.startDate);
        var inqueryEndDt=dateToYYYYMMDD(this.state.endDate);
        this.callHttp(companyNm,inqueryStartDt,inqueryEndDt);
      }

   callHttp(companyNm,startDt,endDt)
   {
     const URL = orderUrl;
     request.get(URL)
     .query({ CompanyNm: companyNm,
              inqueryStartDt: startDt,
              inqueryEndDt: endDt })
     .end(this.callbackGet);

   }
   callbackGet(err, res)
   {
     if(err)
     {
       alertCustom("주문내역 조회 시 오류가 발생했습니다.");
         return;
     }
     else {

     }
      var contents = res.body.contents;
      //호출되는 순간에 render를 재호출함.
     this.setState({
       rows:contents,
       modal:false,
       checker:true,
       startDate: new Date(),
       endDate: new Date(),
       companyNm:""
     })
   }

   getChildDatCallback(e)
   {
     this.setState(prevState => ({
       companyNm: e.companyNm,
       checker:true
     })
     );
   }
}
