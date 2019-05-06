import React, { Component } from 'react';
import  {InputGroup, InputGroupAddon,Container,Row,Col,Table, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Button }  from  'reactstrap';
import request from 'superagent';
import {isEmpty,alertCustom,validatePhoneNumber,companyUrl} from './Common'
import 'bootstrap/dist/css/bootstrap.css';
export default class CompanyRegister extends Component {
  constructor(props) {
     super(props);
     this.toggle = this.toggle.bind(this);
     this.select = this.select.bind(this);
     this.onSubmit = this.onSubmit.bind(this);
     this.callHttp = this.callHttp.bind(this);
     this.callbackPost = this.callbackPost.bind(this);
     this.state = {
       dropdownOpen: false,
       value : "010",
       companyNm :"",
       telNbr1 : "",
       telNbr2 : ""
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

   handleValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
      <div className="CompanyRegister">
        <form onSubmit={this.onSubmit} acceptCharset="UTF-8">
          <Container>
         <Row>
           <Col><InputGroup>
             <InputGroupAddon addonType="prepend">업체명</InputGroupAddon>
             <Input placeholder="업체 이름을 입력해주세요."
                    name="companyNm"
                    onChange={this.handleValue}
                    value={this.state.companyNm}
                    />
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
                 <Input placeholder="중간 번호"
                        name="telNbr1"
                        onChange={this.handleValue}
                        value={this.state.telNbr1}/>
                 <Input placeholder="끝 번호"
                        name="telNbr2"
                        onChange={this.handleValue}
                        value={this.state.telNbr2}/>
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
  /*
   * 2019.05.06
   * subMit 이벤트를 제어하기 위해  모든 상태값을 state를 통해서 관리
   * react는 이런 식으로 처리하는 거였음...
   */
  onSubmit(event)
  {
    event.preventDefault();
    var companyNm = this.state.companyNm;
    console.log(companyNm);
    if(isEmpty(companyNm))
    {
      alertCustom("업체명을 입력해주세요");
      return;
    }

    var tel1 =this.state.value; // 전화번호 앞자리
    var tel2 =this.state.telNbr1;
    var tel3 =this.state.telNbr2;
    var telNbr=tel1+tel2+tel3;  //11자리 완성
    if(isEmpty(tel2) || isEmpty(tel3))
    {
      alertCustom("업체전화번호를 입력해주세요");
      return;
    }
    validatePhoneNumber(telNbr);
    console.log("call onSubmit");

    this.callHttp(companyNm,telNbr);
  }

  callHttp(compNm,telNbr)
  {
    const URL = companyUrl;
    request.post(URL)
    .set('Content-Type','application/x-www-form-urlencoded')
    .send({ companyNm: compNm,telNumber: telNbr })
    .end(this.callbackPost);

  }
  callbackPost(err, res)
  {
    if(err)
    {
      alertCustom("업체등록 시 오류가 발생했습니다.");
        return;
    }
    else {

      // 처리 현황을 alert으로 표시한다.

    }
    //화면을 초기화한다.
    this.setState({
      dropdownOpen: false,
      value : "010",
      companyNm :"",
      telNbr1 : "",
      telNbr2 : ""
    });
  }
}
