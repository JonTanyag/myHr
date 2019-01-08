var request = require('request');
var querySrting = require('querystring');
var moment = require('moment');
var axios = require('axios');

let formData = querySrting.stringify({
    data: JSON.stringify({ acctname: "ghdrohq", username: "717206", password: "" })
});

login();

function login() {
     
   axios({
        "headers": { "content-type": "application/x-www-form-urlencoded" },
        "method": "POST",
        "url": "https://secure.myhr.asia/api/login/authenticate/",
        "data": formData

    }).then((res) => {
        const cookieArr = res.headers['set-cookie'][1].split(';')[0].split('=');
        console.log(res.data);
        formData = querySrting.stringify({
            data: JSON.stringify({
                "pagenumber": 1,
                "employeeList": [],
                "startdate": moment(new Date()).format('MM/DD/YYY'),
                "enddate": moment(new Date()).format('MM/DD/YYY'),
                "starttime": "0000",
                "endtime": "2359",
                "trancount": "ALL",
                "trantype": "ALL",
                "shift": "",
                "deviceid": "",
                "departmentList": [],
                "locationList": [],
                "teamList": [],
                "supervisorList": [],
                "uploadstarttime": "",
                "uploadendtime": "",
                "payperion00id": "72",
                "payfreq": "S1",
                "emplist": 1,
                "person00id": "",
                "department": "",
                "location": "",
                "team": "",
                "supervisor": "",
                "startdatetime": moment(new Date()).format('MM/DD/YYY') + " 00:00",
                "enddatetime": moment(new Date()).format('MM/DD/YYY') + " 23:59",
            })
        });
        timeCheck();
    })
}

function timeCheck() {
    console.log(formData.person)
    axios({
        "url": "https://secure.myhr.asia/api/timeandattendance/TimeAndAttendanceAPI.asp?action=get&request=timecard",        
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": '${cookieArr[0]}=${cookieArr[1]}'
        },
        "data": formData
    }).then((res) => {
        console.log('time in: ', res.data.data.person[0]);
        console.log('time in: ', res.data.data.person[0].rawtime[0].trandatetime);
    })
}
