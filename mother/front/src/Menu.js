/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import  {Table,Button}  from  'reactstrap';
//import PropTypes from 'prop-types'
import App from './App';
import OrderManage from './OrderManage';
import CompanyRegister from './CompanyRegister';
import 'bootstrap/dist/css/bootstrap.css';

export default class Menu extends Component {
  render() {
    return (
      <div >
      <Table>
        <thead>
          <tr>
            <th><Button color="secondary" size="lg" onClick={this.returnHome}>홈</Button></th>
            <th><Button color="secondary" size="lg" onClick={this.addCompany}>업체 등록</Button></th>
            <th><Button color="secondary" size="lg" onClick={this.manageOrder}>주문 관리</Button></th>
          </tr>
        </thead>
      </Table>
      </div>

    );
  }
returnHome()
{
  console.log("return Home ");
  ReactDOM.render(<App />, document.getElementById('main'));
}

addCompany()
{
  console.log("change main frame to adding Company ");
  ReactDOM.render(<CompanyRegister />, document.getElementById('main'));
}

manageOrder()
{
  console.log("change main frame to manage Order");
  ReactDOM.render(<OrderManage />, document.getElementById('main'));
}

}
