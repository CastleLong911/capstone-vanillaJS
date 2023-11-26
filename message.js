function createOtherMSG(data) {
    return `
        <div class="flex">
            <div class="bg-gray-300 text-black p-2 rounded-lg max-w-xs">
                <div class="text-sm align-text-bottom text-left">
                    ${data.sender}
                </div>
                    ${data.msg}
                <div class="text-sm w-full align-text-bottom text-right">
                    ${data.date}
                </div>
            </div>
        </div>
    `;
}

function createMyMSG(data) {
    return `
        <div class="flex justify-end">
            <div class="bg-blue-200 text-black p-2 rounded-lg max-w-xs">
                <div class="text-sm align-text-bottom text-right">
                    ${data.sender}
                </div>
                    ${data.msg}
                <div class="text-sm w-full align-text-bottom text-right">
                    ${data.date}
                </div>
            </div>
        </div>
    `;
}

function setMsg(data) {
    const msg = data.kakaoId == kakaoId ? createMyMSG(data) : createOtherMSG(data);
    if(data.isPro == 1){
        const flag = checkProScroll();
        msgProContainer.innerHTML += msg;
        if(flag || data.kakaoId == kakaoId){
            proScrollDown();
        }
    }
    else{
        const flag = checkConScroll();
        msgConContainer.innerHTML += msg;
        if(flag || data.kakaoId == kakaoId){
            conScrollDown();
        }
    }
}

function prependMsg(data){
    const msg = data.kakaoId == kakaoId ? createMyMSG(data) : createOtherMSG(data);
    if(data.isPro == 1){
        const flag = checkProScroll();
        msgProContainer.innerHTML = msg + msgProContainer.innerHTML;
        if(flag){
            proScrollDown();
        }
    }
    else{
        const flag = checkConScroll();
        msgConContainer.innerHTML = msg + msgConContainer.innerHTML;
        if(flag){
            conScrollDown();
        }
    }
}

function msgInitXhr(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/msgInitXhr/'+roomId, true);
    xhr.send();
        xhr.onload = () => {
            if (xhr.status == 200) {
            console.log("success ! !");
            const data = JSON.parse(xhr.response);
            for (item in data) {
                setMsg(data[item]);
            }
            scrollDown();
        } else {
            console.log("fail ! !");
        }
    }
}

function msgScrollXhr(isPro, count){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/msgScrollXhr/'+roomId+'/'+isPro+'/'+count, true);
    xhr.send();
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log("success ! !");
            const data = JSON.parse(xhr.response);
            for (item in data) {
                setMsg(data[item]);
            }
        } else {
            console.log("fail ! !");
        }
    }
}
function proScrollDown(){
    const element = document.querySelector('#sectionA');
    element.scrollTop = element.scrollHeight;;
}

function checkProScroll() {
    const container = document.getElementById("#sectionA");
    const isAtBottom = container.scrollHeight - container.clientHeight <= container.scrollTop + 1;

    return isAtBottom;
}

function conScrollDown(){
    const element = document.querySelector('#sectionB');
    element.scrollTop = element.scrollHeight;;
}

function checkConScroll() {
    const container = document.getElementById("#sectionB");
    const isAtBottom = container.scrollHeight - container.clientHeight <= container.scrollTop + 1;

    return isAtBottom;
}