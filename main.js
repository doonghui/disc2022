// main page 로부터 받은 데이터
const receivedData = location.href.split('?')[1];
data = decodeURI(receivedData);


// 데이터 받아서 최초 목록 표시
Data(`http://openapi.seoul.go.kr:8088/6e716276736c6f7538335658626c64/json/culturalEventInfo/1/999/${data}/`);


// 카테고리 버튼 선택 하기
    var tab_radio = document.getElementsByName('culture');
    var list_btn = document.getElementById('list-btn');
    var searchInput = document.getElementById('search-list');

list_btn.addEventListener('click',function(e) {
    for(i =0; i<tab_radio.length;i++) {
        
        if(tab_radio[i].checked) {
            menuList.innerHTML = '';
            searchInput.value = '';
             Data2(`http://openapi.seoul.go.kr:8088/6e716276736c6f7538335658626c64/json/culturalEventInfo/1/999/${tab_radio[i].value}/`);

        }


    }
    
})






var tab_check = document.getElementsByName('tab_check');

// 데이터받아서 목록 표시 함수
function Data(url) {
fetch(url)
.then(res => res.json())
.then(myJson => {

const cult= myJson.culturalEventInfo;
var menuList =document.getElementById('menuList');
var num_search = document.getElementById('num-search');
var count = 0;
var cnt = [];

// 라이트박스
var lightbox = document.querySelector('#lightbox');
var block = document.querySelector('#block'); // 라이트박스 배경
var btnopn = document.getElementsByClassName('thumb');
var btncls = document.getElementsByClassName('btn-close');
var figure = document.querySelector('figure');
var info = document.getElementById('info');




// menuList 안에 목록 추가하기
for(i =0; i < cult.row.length; i++) {
    if(cult.row[i].STRTDATE < DateMake()){
        if(cult.row[i].END_DATE >= DateMake()){
            PutmenuList();
            cnt.push(i);
    
    
        }
    }
    
}




num_search.innerHTML = "총 "+ count + "건이 검색되었습니다.";



// 라이트 박스 열기
function lightbox_open(num) {
    figure.innerHTML = "<img src=\""+cult.row[num].MAIN_IMG+"\" class=\"active\" alt=\"\" />";
    info.innerHTML = "<h1>"+cult.row[num].TITLE+"</h1><p>기간: "+cult.row[num].DATE+" <br><br>장소: "+cult.row[num].PLACE+
                        "<br><br><a href=\""+cult.row[num].ORG_LINK +"\" target=\"_blank\">홈페이지바로가기</a><br><br></p>"
    lightbox.setAttribute('class', 'active');
    block.setAttribute('class', 'active');
    
    }
    // 라이트 박스 닫기
    function lightbox_close() {
    lightbox.removeAttribute('class');
    block.removeAttribute('class');
    }


// 라이트 박스 표시
 for(i=0;i<cnt.length;i++) {
	btnopn[i].onclick= function() {     
	
        lightbox_open(this.dataset.no);
	}
}

btncls[0].onclick = lightbox_close;


// 검색기능
var searchInput = document.getElementById('search-list');
var searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click',(e) =>{
    e.preventDefault();
    const val = searchInput.value;
    SearchList(val);

})

// 검색으로 보여주는 목록
function SearchList(val) {
    
    menuList.innerHTML = '';
    count = 0;
    for(i =0; i < cult.row.length; i++) {
        if(cult.row[i].TITLE.includes(val)) {
        if(cult.row[i].STRTDATE < DateMake()){
            if(cult.row[i].END_DATE >= DateMake()){
                PutmenuList();

            }
        }
    }
    }
    num_search.innerHTML = "총 "+ count + "건이 검색되었습니다.";
    for(i=0;i<btnopn.length;i++) {
        btnopn[i].onclick= function() {
            lightbox_open(this.dataset.no);
	
        }
    }

}

function PutmenuList() {
    menuList.innerHTML += " <li class=\"show-list\"><div class=\"clt-img\">"+
    "<img class=\"thumb\" src =\""+cult.row[i].MAIN_IMG+"\"  data-no=\""+i+"\" style=\"width:100%;height:100%\" />"+
    "</div><div class=\"clt-title\">"+cult.row[i].TITLE+
   "</div></li>";
   count++;
}


})

}



function Data2(url) {
    fetch(url)
    .then(res => res.json())
    .then(myJson => {
     
    const cult= myJson.culturalEventInfo;
    var menuList =document.getElementById('menuList');
    var num_search = document.getElementById('num-search');
    var count = 0;

    // 라이트박스
var lightbox = document.querySelector('#lightbox');
var block = document.querySelector('#block'); // 라이트박스 배경
var btnopn = document.getElementsByClassName('thumb');
var btncls = document.getElementsByClassName('btn-close');
var figure = document.querySelector('figure');
var info = document.getElementById('info');



// 라이트 박스 열기
function lightbox_open(num){
    figure.innerHTML = "<img src=\""+cult.row[num].MAIN_IMG+"\" class=\"active\" alt=\"\" />";
    info.innerHTML = "<h1>"+cult.row[num].TITLE+"</h1><p>기간: "+cult.row[num].DATE+" <br><br>장소: "+cult.row[num].PLACE+
    "<br><br><a href=\""+cult.row[num].ORG_LINK +"\" target=\"_blank\" >홈페이지 바로가기</a><br><br></p>"
    lightbox.setAttribute('class', 'active');
    block.setAttribute('class', 'active');
    
    }
    // 라이트 박스 닫기
    function lightbox_close(){
    lightbox.removeAttribute('class');
    block.removeAttribute('class');
    }
// 라이트 박스 표시

 for(i=0;i<btnopn.length;i++) {
	btnopn[i].onclick= function() {
        lightbox_open(this.dataset.no);
	
	}
}

btncls[0].onclick = lightbox_close;


    
    // 현재 / 예정 선택 함수
    list_btn.addEventListener('click',function(e) {
        menuList.innerHTML = '';
        count = 0;
        for(i =0; i<cult.row.length;i++) {
            
            if(tab_check[1].checked) {
                if(cult.row[i].STRTDATE >= DateMake()){
                    PutmenuList();
                }
            } else {
                if(cult.row[i].STRTDATE < DateMake()){
                    if(cult.row[i].END_DATE >= DateMake()){
                        PutmenuList();
        
                    }
                }
            }
        }
        num_search.innerHTML = "총 "+ count + "건이 검색되었습니다.";
    
    })
    
    
    // 검색기능
    var searchInput = document.getElementById('search-list');
    var searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click',(e) =>{
        e.preventDefault();
        const val = searchInput.value;
        SearchList(val);
    
    })
    
    // 검색으로 보여주는 목록
    function SearchList(val) {
        menuList.innerHTML = '';
        count = 0;
        for(i =0; i < cult.row.length; i++) {
            if(cult.row[i].TITLE.includes(val)) {
                if(tab_check[1].checked) {
                    if(cult.row[i].STRTDATE >= DateMake()){
                        PutmenuList();
                    }
                } else {
                    if(cult.row[i].STRTDATE < DateMake()){
                        if(cult.row[i].END_DATE >= DateMake()){
                            PutmenuList();
            
                        }
                    }
                }
        }
        }
        num_search.innerHTML = "총 "+ count + "건이 검색되었습니다.";
        for(i=0;i<btnopn.length;i++) {
            btnopn[i].onclick= function() {
                lightbox_open(this.dataset.no);
	
            }
        }
    
    }

    function PutmenuList() {
        menuList.innerHTML += " <li class=\"show-list\"><div class=\"clt-img\">"+
       "<img class=\"thumb\" src =\""+cult.row[i].MAIN_IMG+"\" data-no=\""+i+"\" style=\"width:100%;height:100%\" />"+
       "</div><div class=\"clt-title\">"+cult.row[i].TITLE+
       "</div></li>";
       count++;
    }

})
    
}

    // 오늘 날짜 yyyy - mm - dd 형식으로 가져오는 함수
    function DateMake() {
        let today = new Date();
        let now = today.getFullYear() +
    '-' + ( (today.getMonth()+1) < 9 ? "0" + (today.getMonth()+1) : (today.getMonth()+1) )+
    '-' + ( (today.getDate()) < 9 ? "0" + (today.getDate()) : (today.getDate()) );
        return now;
    }
   






