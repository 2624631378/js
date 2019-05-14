var personArr = [{
        name: '王港',
        src: './src/img/3.png',
        des: '颈椎不好',
        sex: 'm',
        age: 18
    },
    {
        name: '刘莹',
        src: './src/img/5.png',
        des: '我是谁',
        sex: 'f',
        age: 23
    },
    {
        name: '王秀莹',
        src: './src/img/4.png',
        des: '我很好看',
        sex: 'f',
        age: 25
    },
    {
        name: '刘金雷',
        src: './src/img/1.png',
        des: '你没有见过陌生的脸',
        sex: 'm',
        age: 15
    },
    {
        name: '刘飞翔',
        src: './src/img/2.png',
        des: '瓜皮刘',
        sex: 'm',
        age: 20
    }
];

var oUL = document.getElementsByTagName('ul')[0];
var oInput = document.getElementsByTagName('input')[0];

var state = {
    text:'',
    sex: 'a'

}



function renderPage(data) {
    var htmlStr = '';
    oUL.innerHTML = '';
    data.forEach(function (ele, index, self) {
        htmlStr += '<li><img src="' + ele.src + '"><p class="name">' + ele.name + '</p><p class="des">' + ele.des + '</p></li>';
    })
    oUL.innerHTML = htmlStr;

}

renderPage(personArr);

oInput.oninput = function () {
    // var filterText = this.value;
    // var newArr = filterArrByText(personArr, filterText);
    // renderPage(newArr);
    renderPage(filterArrByText(personArr, this.value));


}

function filterArrByText(data, text) {
    if (!text) {
        return data;
    } else {
        return data.filter(function (ele, index, self) {
            return ele.name.indexOf(text) != -1;
        })
    }
}


var oBtnArr = [].slice.call(document.getElementsByClassName('btn'), 0);
var lastActiveBtn = oBtnArr[2];
oBtnArr.forEach(function (ele, index, self) {
    ele.onclick = function () {
        changeAcctive(this);
        renderPage(filterArrBySex(personArr, this.getAttribute('sex')))
    }

})

function changeAcctive(curActiveBtn) {
    curActiveBtn.className = 'btn active';
    lastActiveBtn.className = 'btn';
    lastActiveBtn = curActiveBtn;
}

function filterArrBySex(data, sex) {
    if (sex == 'a') {
        return data
    } else {
        return data.filter(function (ele) {
            return ele.sex == sex;
        })
    }
}