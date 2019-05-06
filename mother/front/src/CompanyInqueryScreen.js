import React, { Component } from 'react';
import  {InputGroup, InputGroupAddon,Container,Row,Col,Table, Input,Button}  from  'reactstrap';
//import PropTypes from 'prop-types'
import request from 'superagent';
import 'bootstrap/dist/css/bootstrap.css';
import {alertCustom,companyUrl} from './Common';
export default class CompanyInqueryScreen extends Component
{
  constructor(props) {
     super(props);
     this.state = {
       rows : [],
       companyNm :"",
       telNbr:""
     };
     this.onSubmit = this.onSubmit.bind(this);
     this.callbackGet = this.callbackGet.bind(this);
   }

   handleValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
   }
   render() {
     return (
       <div className="CompanyInqueryScreen">
       <Container>
       <Row>
        <Col>
          <h1>업체정보조회</h1>
        </Col>
       </Row>
      <Row>
        <Col>
          <form onSubmit={this.onSubmit}>
          <InputGroup>
          <InputGroupAddon addonType="prepend">업체명</InputGroupAddon>
          <Input placeholder="업체 이름을 입력해주세요."
                 name="companyNm"
                 onChange={this.handleValue}
                 value={this.state.companyNm}
                 />
          </InputGroup>
          <InputGroup>
          <InputGroupAddon addonType="prepend">업체전화번호</InputGroupAddon>
          <Input placeholder="업체 전화번호를 입력해주세요."
                 name="telNbr"
                 onChange={this.handleValue}
                 value={this.state.telNbr}
                 />
          <Button type="submit">조회</Button>
          </InputGroup>
          </form>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>업체 명</th>
                <th>업체 전화번호</th>
              </tr>
            </thead>
            <tbody name="companysTable">
              {this.state.rows.map((row,index) =>

                {
                  return  <tr key={index}>
                          <td>{index}</td>
                          <td>{row.companyNm}</td>
                          <td>{row.companyTelNbr}</td>
                        </tr>

                })}
            </tbody>
          </Table>
        </Col>
      </Row>
      </Container>
       </div>
     );
   }

   onSubmit(event)
   {
     event.preventDefault();
     const data = new FormData(event.target);
     var companyNm = this.state.companyNm;
     var telNbr=this.state.telNbr;  //11자리 완성
     this.callHttp(companyNm,telNbr);
   }

   callHttp(companyNm,telNbr)
   {
     const URL = companyUrl;
     request.get(URL)
    // .set('Content-Type','text/html')
     .query({ CompanyNm: companyNm, TelNbr: telNbr })
     .end(this.callbackGet);

   }
   callbackGet(err, res)
   {
     if(err)
     {
       alertCustom("업체정보 조회 중 오류가 발생했습니다.");
       return;
     }
     else {

     }
     //console.log(res.body);
     var contents = res.body.contents;

     this.setState({
       rows:contents,
       companyNm :"",
       telNbr:""
     })

   }
}
