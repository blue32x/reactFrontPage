  import React from 'react';
  import { Alert } from 'reactstrap';
/*
SAMPLE
*/
export function setIgnoredYellowBox() {
    console.ignoredYellowBox = [
        'Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).',
    ];
}
/*
 *  value의 값이 비어있는지 체크 , js에서는 "",null,undefined,0,Nan은 false로 반환.
 */
export function isEmpty(value)
{
  if(value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ))
  {
    return true;
  }
    return false;
}
/*
 *  alert 창 관리.
 */
export function alertCustom(value)
{
  window.alert(value);
}

/*  핸드폰 번호를 입력하는 form에는 숫자만 가능
 *
 */
export function validatePhoneNumber(value)
{
  var number = value;
  var regexpattern = /\D+/; //0~9 사이의 숫자이면서 최대 4자리 --> 숫자외의 문자열이 검색되면 오류
  if(regexpattern.exec(number)!==null)
 {
    alertCustom("업체전화번호를 확인해주세요.");
    //
    return;
  }
}
/*
 *  date type을 yyyymmdd 형식으로 변경.
 */
export function dateToYYYYMMDD(date){
   function pad(num) {
       num = num + '';
       return num.length < 2 ? '0' + num : num;
   }
 return date.getFullYear() + pad(date.getMonth()+1) + pad(date.getDate());
}


/*
 Global Variable
*/
//반찬 단가
export var sideDishPrice = 3500;

//공깃밥 단가
export var ricePrice= 1000;

export var companyUrl="http://localhost:8080/MyBlog/company";
export var orderUrl="http://localhost:8080/MyBlog/company/order";
