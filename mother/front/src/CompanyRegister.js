import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import  {InputGroup, InputGroupAddon,Container,Row,Col,Table, InputGroupText, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Form,Button,FormGroup }  from  'reactstrap';
//import PropTypes from 'prop-types'
import request from 'superagent';
import 'bootstrap/dist/css/bootstrap.css';
export default class CompanyRegister extends Component {
  constructor(props) {
     super(props);
     this.toggle = this.toggle.bind(this);
     this.select = this.select.bind(this);
     this.onSubmit = this.onSubmit.bind(this);
     this.callHttp = this.callHttp.bind(this);
     this.callbackGet = this.callbackGet.bind(this);
     this.state = {
       dropdownOpen: false,
       value : "010"
     };
   }

   toggle() {
       this.setState(prevState => ({
         dropdownOpen: !prevState.dropdownOpen
       }));
     }
   select(event) {
     this.setState({
        value: event.currentTarget.getAttribute("id")
     });
     console.log(event.currentTarget.getAttribute("id"));
    }
  render() {
    return (
      <div className="CompanyRegister">
        <form onSubmit={this.onSubmit} acceptCharset="UTF-8">
          <Container>
         <Row>
           <Col><InputGroup>
             <InputGroupAddon addonType="prepend">업체명</InputGroupAddon>
             <Input placeholder="업체 이름을 입력해주세요." name="companyNm"/>
             </InputGroup>
           </Col>
         </Row>

         <Row>
           <Col>
             <InputGroup>
             <InputGroupAddon addonType="prepend">업체전화번호</InputGroupAddon>
               <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                 <DropdownToggle caret>
                {this.state.value}
                 </DropdownToggle>
                 <DropdownMenu>
                   <DropdownItem onClick={this.select} id="010">010</DropdownItem>
                   <DropdownItem onClick={this.select} id="031">031</DropdownItem>
                 </DropdownMenu>
               </Dropdown>
                 <Input placeholder="중간 번호" name="tel2"/>
                 <Input placeholder="끝 번호" name="tel3"/>
             </InputGroup>
          </Col>
         </Row>
         <Row>
           <Col>
             <Table>
               <thead>
               </thead>
             </Table>
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
    event.preventDefault();
    const data = new FormData(event.target);
    var companyNm = data.get('companyNm');
    var tel1 =this.state.value; // 전화번호 앞자리
    var telNbr=tel1+data.get('tel2')+data.get('tel3');  //11자리 완성
    console.log("call onSubmit");

    this.callHttp(companyNm,telNbr);
  }

  callHttp(compNm,telNbr)
  {
    const URL = 'http://localhost:8080/MyBlog/company';
    console.log(compNm);
    console.log(telNbr);
    request.post(URL)
    .set('Content-Type','application/x-www-form-urlencoded')
    .send({ companyNm: compNm,telNumber: telNbr })
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
    console.log(res.body);
    //정상응답을 받았을 경우 화면을 초기화한다.
  }
}
