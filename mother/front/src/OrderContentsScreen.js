import React, { Component } from 'react';
import  {InputGroup, InputGroupAddon,Container,Row,Col,Table, InputGroupText, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Form,Button,FormGroup }  from  'reactstrap';
//import PropTypes from 'prop-types'
import request from 'superagent';
import 'bootstrap/dist/css/bootstrap.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default class OrderContentsScreen extends Component
{
  constructor(props) {
     super(props);
     this.state = {
       rows : [],
       startDate: new Date(),
       endDate: new Date()
     };
     this.onSubmit = this.onSubmit.bind(this);
     this.callbackGet = this.callbackGet.bind(this);
     this.handleChange1 = this.handleChange1.bind(this);
     this.handleChange2 = this.handleChange2.bind(this);
   }


   handleChange1(date) {
       this.setState({
         startDate: date
       });
     }
  handleChange2(date) {
         this.setState({
           endDate: date
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
          <InputGroup>
          <InputGroupAddon addonType="prepend">업체명</InputGroupAddon>
          <Input placeholder="업체 이름을 입력해주세요." name="companyNm"/>
          <Button type="submit">조회</Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <InputGroup>
          <InputGroupAddon addonType="prepend">조회시작일자</InputGroupAddon>
            <DatePicker selected={this.state.startDate} onChange={this.handleChange1}/>
          <InputGroupAddon addonType="prepend">조회종료일자</InputGroupAddon>
            <DatePicker selected={this.state.endDate} onChange={this.handleChange2}/>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
        <h2>여기에 데이터 뿌림2</h2>
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
        const data = new FormData(event.target);
        var companyNm = data.get('companyNm');
        var inqueryStartDt=this.state.startDate;  //11자리 완성
        var inqueryEndDt=this.state.endDate;  //11자리 완성

        console.log("inquery Oder Infos");

        this.callHttp(companyNm,inqueryStartDt,inqueryEndDt);
      }

   callHttp(companyNm,inqueryStatDt,inqueryEndDt)
   {
     const URL = 'http://localhost:8080/MyBlog/company';
     request.get(URL)
     .query({ CompanyNm: companyNm, TelNbr: telNbr })
     .end(this.callbackGet);

   }
   callbackGet(err, res)
   {
     if(err)
     {
         return;
     }
     else {

     }
      var contents = res.body.contents;

     this.setState({
       rows:contents
     })
   }
}
