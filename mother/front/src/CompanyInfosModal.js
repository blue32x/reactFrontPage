import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import  {InputGroup, InputGroupAddon,Container,Row,Col,Table, InputGroupText, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Form,Button,FormGroup,Modal, ModalHeader, ModalBody, ModalFooter }  from  'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default class CompanyInfosModal extends Component {

  constructor(props) {
     super(props);
     this.toggle = this.toggle.bind(this);
     this.callbackGet = this.callbackGet.bind(this);
     this.getRowValue = this.getRowValue.bind(this);
     this.getDRowValue = this.getDRowValue.bind(this);
     this.state = {
       modal: false,
       rows : [],
       companyNm: "",
       companyTelNbr: "",
       isBtnCalled: false,
       checker: false
     };
   }


  toggle() {
    console.log(123);
    this.setState(prevState => ({
      modal: !prevState.modal
    }));

  }
  //부모 component로부터 prop을 전달 받아을 때 호출 된다.
  //THIS.PROPS.*은 현재 property의 상태를 나타내고 nextProps는 변경될 Props의 상태를 나타낸다.
  componentWillReceiveProps(nextProps)
  {
    console.log("called componentWillReceiveProps");
    var checker = nextProps.pCheck;
    var modal =nextProps.pModal;
    var modalStat = false;
    console.log("child_checker : "+checker);
    console.log("child_modal : "+modal);

    if(checker)
    {
      console.log("checker : "+ checker);
      modal =false;
    }
    else
    {
      console.log("checker : "+ checker);
    }

    /*
    *  선택, 취소 버튼에 의해서 callbackFunc가 호출 될 경우를 위해 상태값 고나ㄹ
    */
    if(this.state.isBtnCalled)
    {
      console.log("btn");
    }
    else
    {
      const URL = 'http://localhost:8080/MyBlog/company';
      request.get(URL)
     // .set('Content-Type','text/html')
      .query({ CompanyNm: '', TelNbr: '' })
      .end(this.callbackGet);
    }
    this.setState(prevState => ({
      modal : modal,
      isBtnCalled:false
    }));


  }

  render() {
    console.log("child1 : "+this.state.modal);
    return (
      <div  className="CompanyInfosModal">
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
      <ModalHeader toggle={this.toggle}>업체목록</ModalHeader>
      <ModalBody style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}>
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>업체 명</th>
              <th>업체 전화번호</th>
            </tr>
          </thead>
          <tbody name="companysTable">
            {this.state.rows.map(row =>

              {
                return <tr key={row.companyId} onDoubleClick={this.getDRowValue}>
                    <td name='tbl_idx'>{row.companyId}</td>
                    <td name='tbl_name'>{row.companyNm}</td>
                    <td name='tbl_telNbr'>{row.companyTelNbr}</td>
               </tr>


              })}
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
      <Button color="secondary" onClick={this.cancelFunc}>취소</Button>
      </ModalFooter>
      </Modal>
      </div>
    );
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
    var contents = res.body.contents;

    this.setState({
      rows:contents
    })
  }
  getDRowValue(e)
  {
    var row = e.currentTarget;
    var compayNm =  row.cells[1].innerText;
    var compayTelNbr =  row.cells[2].innerText;

    var childInfo={
      modal:false,
      companyNm:  row.cells[1].innerText,
      companyTelNbr:row.cells[2].innerText,
      checker:true
    };
    this.props.callbackFromParent(childInfo);

    this.setState(prevState => ({
      compayNm:compayNm,
      compayTelNbr:compayTelNbr,
      isBtnCalled:true,
      modal:false
    }));
 }
//click 시 row의 값을 얻는다.
 getRowValue(e)
 {
   var row = e.currentTarget;
   var compayNm =  row.cells[1].innerText;
   var compayTelNbr =  row.cells[2].innerText;

   console.log(compayNm);
   console.log(compayTelNbr);
   this.setState(prevState => ({
     compayNm: compayNm,
     compayTelNbr:compayTelNbr,
     isBtnCalled:true,
     modal:false
   }));
}


//ㅟ소 버튼 클릭 시 이벤트
cancelFunc = () =>{
  console.log(2);
  var childInfo={
    modal:false,
    companyNm: "",
    companyTelNbr:"",
    checker:true
  };

  this.props.callbackFromParent(childInfo);

this.setState(prevState => ({
  isBtnCalled: true
}));
}

};


CompanyInfosModal.defaultProps = {
  pCheck : false,
  pModal : false
};
