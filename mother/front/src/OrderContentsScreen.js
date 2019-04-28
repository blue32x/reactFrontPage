import React, { Component } from 'react';
import  {InputGroup, InputGroupAddon,Container,Row,Col,Table, InputGroupText, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Form,Button,FormGroup }  from  'reactstrap';
//import PropTypes from 'prop-types'
import request from 'superagent';
import 'bootstrap/dist/css/bootstrap.css';
import CompanyInfosModal from './CompanyInfosModal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
     this.onSubmit2 = this.onSubmit2.bind(this);
     this.callbackGet = this.callbackGet.bind(this);
     this.handleChange1 = this.handleChange1.bind(this);
     this.handleChange2 = this.handleChange2.bind(this);
     this.dateToYYYYMMDD = this.dateToYYYYMMDD.bind(this);
     this.selectFunc = this.selectFunc.bind(this);
     this.getChildDatCallback = this.getChildDatCallback.bind(this);
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

  selectFunc(){
         this.setState((prevState) => ({
           modal: true,
           checker: false
         }));
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
              {this.state.rows.map(row =>

                {
                  return  <tr>
                          <td>{row.oderDt}</td>
                          <td>{row.companyNm}</td>
                          <td>{row.orderCount}</td>
                          <td>{row.price}</td>
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
        const data = new FormData(event.target);
        var companyNm = this.state.companyNm;
        var inqueryStartDt=this.dateToYYYYMMDD(this.state.startDate);
        var inqueryEndDt=this.dateToYYYYMMDD(this.state.endDate);
        console.log( inqueryStartDt);
        console.log(inqueryEndDt);
        console.log(companyNm);
        this.callHttp(companyNm,inqueryStartDt,inqueryEndDt);
      }

   callHttp(companyNm,startDt,endDt)
   {
     const URL = 'http://localhost:8080/MyBlog/company/order';
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
         return;
     }
     else {

     }
      var contents = res.body.contents;
      //호출되는 순간에 render를 재호출함.
      console.log(contents);
     this.setState({
       rows:contents
     })
   }

/*
* JavaScript 의 Date Type을  yyymmdd 형태로 변환
*/
   dateToYYYYMMDD(date){
    function pad(num) {
        num = num + '';
        return num.length < 2 ? '0' + num : num;
    }
    return date.getFullYear() + pad(date.getMonth()+1) + pad(date.getDate());
}


   onSubmit2()
   {
     console.log("업체명 조회");
     //팝업에서 업체 선택 가능 하도록 처리
   }


   validatePhoneNumber(target)
   {
     var number = target;
     var regexpattern = /\D+/; //0~9 사이의 숫자이면서 최대 4자리 --> 숫자외의 문자열이 검색되면 오류
     if(regexpattern.exec(number)!==null)
    {
       window.alert("업체 전화번호는 숫자를 입력해주세요.");
       //
     }
   }

   getChildDatCallback(e)
   {
     console.log(e.modal);
     console.log(e.companyNm);


     this.setState(prevState => ({
       companyNm: e.companyNm,
       checker:true
     })
     );
   }
}
