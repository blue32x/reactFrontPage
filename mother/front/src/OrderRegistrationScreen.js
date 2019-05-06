import React, { Component } from 'react';
import  {InputGroup, InputGroupAddon,Container,Row,Col, InputGroupText, Input,Button}  from  'reactstrap';
//import PropTypes from 'prop-types'
import DatePicker from "react-datepicker";
import request from 'superagent';
import CompanyInfosModal from './CompanyInfosModal'
import {sideDishPrice, ricePrice,orderUrl,alertCustom,dateToYYYYMMDD} from './Common';
import 'bootstrap/dist/css/bootstrap.css';


export default class OrderRegistrationScreen extends Component {
  constructor(props) {
     super(props);
     this.toggle = this.toggle.bind(this);
     this.select = this.select.bind(this);
     this.onSubmit = this.onSubmit.bind(this);
     this.callHttp = this.callHttp.bind(this);
     this.callbackGet = this.callbackGet.bind(this);
     this.callbackPost = this.callbackPost.bind(this);
     this.handleChange1 = this.handleChange1.bind(this);
     this.sideDish = this.sideDish.bind(this);
     this.rice = this.rice.bind(this);
     this.getChildDatCallback = this.getChildDatCallback.bind(this);
     this.selectFunc = this.selectFunc.bind(this);
     this.state = {
       value : "010",
       startDate: new Date(),
       numOfDish: 0,
       numOfRice: 0,
       sumOfprice: 0,
       modal: false,
       rows : [],
       companyNm: "",
       companyTelNbr: "",
       checker:true
     };

   }
   handleChange1(date) {
       this.setState({
         startDate: date
       });
     }
   toggle() {
     console.log("toggle");

  }

     callbackGet(err, res)
     {
       if(err)
       {
           return;
       }
       else {

       }
       //console.log(res.body);
       var contents = res.body.contents;

       this.setState({
         rows:contents
       })

     }
   select(event) {
     this.setState({
        value: event.currentTarget.getAttribute("id")
     });
     console.log(event.currentTarget.getAttribute("id"))
    }

    selectFunc(){
      this.setState((prevState) => ({
        modal: true,
        checker: false
      }));

    }
  render() {
    return (

      <div className="OrderRegistrationScreen">
        <form onSubmit={this.onSubmit} acceptCharset="UTF-8">
          <Container>
         <Row>
           <Col>
             <InputGroup size="sm">
             <InputGroupAddon addonType="prepend">업체명</InputGroupAddon>
             <Input placeholder="업체 이름을 입력해주세요." disabled={true} value={this.state.companyNm} />
             <Button size="sm" onClick={this.selectFunc}>업체명조회</Button>
             </InputGroup>
             <CompanyInfosModal pCheck={this.state.checker} pModal={this.state.modal} callbackFromParent={this.getChildDatCallback}/>
           </Col>
         </Row>
         <Row>
           <Col>
             <InputGroup size="sm">
             <InputGroupAddon addonType="prepend">업체전화번호</InputGroupAddon>
             <Input placeholder="업체 전화번호를 입력해주세요." name="companyTelNbr" disabled={true} value={this.state.companyTelNbr}/>
             </InputGroup>
           </Col>
         </Row>

         <Row>

           <Col>
             <InputGroup size="sm">
             <InputGroupAddon addonType="prepend">주문일자</InputGroupAddon>
                <DatePicker selected={this.state.startDate} onChange={this.handleChange1} />
             </InputGroup>
          </Col>
         </Row>
         <Row>
           <Col>
             <InputGroup size="sm">
                 <InputGroupAddon addonType="prepend">반찬수량</InputGroupAddon>
                 <Input placeholder="반찬수량" min={0} max={1000} type="number" step="1"
                        onChange={this.sideDish}
                        name="numOfDish"
                        value={this.state.numOfDish}
                        />
                 <InputGroupAddon addonType="append">단가: 3500원</InputGroupAddon>
             </InputGroup>
           </Col>

         </Row>

         <Row>
           <Col>
             <InputGroup size="sm">
                 <InputGroupAddon addonType="prepend">공깃밥수량</InputGroupAddon>
                 <Input  placeholder="공깃밥수량" min={0} max={1000} type="number" step="1"
                         onChange={this.rice}
                         name="numOfRice"
                         value={this.state.numOfRice}
                         />
                 <InputGroupAddon addonType="append">단가: 1000원</InputGroupAddon>
             </InputGroup>
           </Col>

         </Row>
         <Row>
           <Col></Col>
         </Row>
         <Row>
           <Col xs="6">
           </Col>

           <Col xs="6">
             <InputGroup size="sm">
                <InputGroupAddon addonType="prepend">
                <InputGroupText> 총 액 </InputGroupText>
                </InputGroupAddon>
                <Input  placeholder="주문총액" name="totAmount" disabled={true} value={this.state.sumOfprice} />
                <InputGroupAddon addonType="append">원</InputGroupAddon>
              </InputGroup>

           </Col>


         </Row>
         <Row>
             <Col sm="12" md={{ size: 10, offset: 5 }}><Button type="submit">등 록</Button></Col>
         </Row>
         </Container>
        </form>
      </div>

    );

  }
  onSubmit(event)
  {
    console.log("subMit");
    event.preventDefault();  //
    const data = new FormData(event.target);
    var companyNm = this.state.companyNm; //업체명
    var companyTelNbr = this.state.companyTelNbr;  //업체 전화번호
    var totAmount = this.state.sumOfprice; //계산 총액
    var inqueryStartDt=dateToYYYYMMDD(this.state.startDate);
    this.callHttp(companyNm,companyTelNbr,totAmount,inqueryStartDt);
  }

  callHttp(compNm,telNbr,amt,prcsDt)
  {
    const URL = orderUrl;
    request.post(URL)
    .set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
    .send({ companyNm: compNm,
            telNumber: telNbr,
            totAmount: amt,
            orderDt: prcsDt
           })
    .end(this.callbackPost);

  }

  /*
  *  반찬 수량 변경 시 동적 반영
  */
  sideDish(event)
  {
    var number = event.target.value;
    this.setState(
      {
        modal:false,
        checker:true,
        [event.target.name]:event.target.value,
        sumOfprice : (parseInt(this.state.numOfRice))*parseInt(ricePrice)+parseInt(number)*parseInt(sideDishPrice)
      }
    );


  }
  /*
  *  공깃밥 수량 변경 시 동적 반영
  */
  rice(event)
  {
    var number = event.target.value;
    this.setState(
      {
        modal: false,
        checker:true,
        [event.target.name]:event.target.value,
        sumOfprice : parseInt(this.state.numOfDish)*parseInt(sideDishPrice)+parseInt(number)*parseInt(ricePrice)
      }
    );
  }

  callbackPost(err, res)
  {
    if(err)
    {
      alertCustom("주문등록 시 오류가 발생했습니다.");
        return;
    }
    else {

    }
//    console.log(res.body);
    //화면을 초기화한다.
    this.setState(
      {
        value : "010",
        startDate: new Date(),
        numOfDish: 0,
        numOfRice: 0,
        sumOfprice: 0,
        modal: false,
        rows : [],
        companyNm: "",
        companyTelNbr: "",
        checker:true
      }
    );
  }

  getChildDatCallback(e)
  {
    this.setState(prevState => ({
      companyNm: e.companyNm,
      companyTelNbr: e.companyTelNbr,
      checker:true
    })
    );
  }

}
