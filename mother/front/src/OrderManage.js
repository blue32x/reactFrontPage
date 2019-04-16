import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import 'bootstrap/dist/css/bootstrap.css';
import OrderContentsScreen from './OrderContentsScreen';
import CompanyInqueryScreen from './CompanyInqueryScreen';
export default class OrderManage extends Component {
  constructor(props) {
     super(props);

     this.toggle = this.toggle.bind(this);
     this.state = {
       activeTab: '1'
     };
   }

   toggle(tab) {
     if (this.state.activeTab !== tab) {
       this.setState({
         activeTab: tab
       });
     }
   }
   render() {
     return (
       <div>
         <Nav tabs>
           <NavItem>
             <NavLink
               className={classnames({ active: this.state.activeTab === '1' })}
               onClick={() => { this.toggle('1');
                 ReactDOM.render(<CompanyInqueryScreen />, document.getElementById('tab1'));
               }}
             >
              업체정보
             </NavLink>
           </NavItem>

           <NavItem>
             <NavLink
               className={classnames({ active: this.state.activeTab === '2' })}
               onClick={() => { this.toggle('2');
                 ReactDOM.render(<OrderContentsScreen />, document.getElementById('tab2'));
               }}
             >
              주문등록
             </NavLink>
           </NavItem>

           <NavItem>
             <NavLink
               className={classnames({ active: this.state.activeTab === '3' })}
               onClick={() => { this.toggle('3');
                 ReactDOM.render(<OrderContentsScreen />, document.getElementById('tab3'));
               }}
             >
              거래내역
             </NavLink>
           </NavItem>


         </Nav>
         <TabContent activeTab={this.state.activeTab}>
           <TabPane tabId="1">
             <div id="tab1">

             </div>
           </TabPane>
           <TabPane tabId="2">
             <div id="tab2">

             </div>
           </TabPane>
           <TabPane tabId="3">
             <div id="tab3">

             </div>
           </TabPane>
           </TabContent>
       </div>
     );
   }
}
