var wrapperRows = document.querySelector("#wrapper-rows");
var addedRows = document.querySelectorAll(".added-rows");
var removeRows = document.querySelectorAll(".remove-rows");
var addBtn = document.querySelector("#addRow");
var resultTextarea = document.querySelector("#result");
var getResultBtn = document.querySelector("#btnGetResult");
var copyResult = document.querySelector("#btnCopyResult");
var copyResultStringJson = document.querySelector("#btnCopyResultStringJson");
// 한줄추가 버튼 클릭시
addBtn.addEventListener("click", function () {
    var addedRow = addedRows[0].cloneNode(true); // true:요소의 하위 요소까지 복사
    var addedRowElem = addedRow;
    addedRowElem
        .querySelector(".remove-rows")
        .addEventListener("click", deleteRow);
    addedRowElem.querySelector(".columnname").value = "";
    addedRowElem.querySelector(".inputvalue").value = "";
    addedRowElem.querySelector("#floatingSelect").value =
        "string";
    wrapperRows === null || wrapperRows === void 0 ? void 0 : wrapperRows.appendChild(addedRow);
});
// 한줄삭제 버튼 클릭시
removeRows.forEach(function (e) {
    e.addEventListener("click", deleteRow);
});
// 데이터 변환 결과 생성
getResultBtn.addEventListener("click", function () {
    var _a;
    var _b;
    // 컬럼의 갯수
    var rows = document.querySelectorAll(".added-rows");
    // Auto Increment 유무
    var isChecked = document.querySelector("#chkAutoIcrement").checked;
    // 화면의 데이터 생성횟수 취득
    var repeatCount = Number((_b = document.querySelector("#repeatCnt")) === null || _b === void 0 ? void 0 : _b.value);
    repeatCount = repeatCount ? repeatCount : 1;
    // 결과값
    var rowsResult = [];
    // 더미데이터 생성용 데이터 추출
    for (var i = 0; i < repeatCount; i++) {
        var rowsData = {};
        for (var k = 0; k < rows.length; k++) {
            var columnName = rows[k].querySelector(".columnname");
            var inputValue = rows[k].querySelector(".inputvalue");
            var columnType = rows[k].querySelector("#floatingSelect");
            // 키값
            var keyName = columnName.value;
            // 값
            var value = inputValue === null || inputValue === void 0 ? void 0 : inputValue.value;
            var keyValue = null;
            // 값의 타입에 따라 값설정
            if (columnType.value === "string") {
                // 문자열일 경우
                keyValue = value ? (isChecked ? "".concat(value, "_").concat(i) : value) : "";
            }
            else {
                // 숫자인 경우
                //isNaN이 typescript에서 string타입을 매개변수로 못받아서 any처리
                keyValue = isNaN(value) ? 0 : Number(value);
            }
            // 컬럼추가
            Object.assign(rowsData, (_a = {}, _a[keyName] = keyValue, _a));
        }
        // 데이터추가
        rowsResult.push(rowsData);
    }
    // 결과값(JSON String)
    var resultsJson = JSON.stringify(rowsResult);
    // 결과값 텍스트에이리어 추가
    document.querySelector("#result").textContent = formatJSON(resultsJson);
    document.querySelector("#resultStringString").textContent = resultsJson;
    // 텍스트에이리어의 input이벤트는 자바스크립트로 값을 넣을경우 발생하지 않기때문에 수동으로 발생시킴
    var inputEvent = new Event("input", { bubbles: true }); // input 이벤트 생성
    document.querySelector("#result").dispatchEvent(inputEvent); // input 이벤트 발생시키기
});
// 텍스트 결과값의 높이 자동 조절
resultTextarea.addEventListener("input", function (e) {
    var textAreaTarget = e.target;
    textAreaTarget.style.height = "auto";
    textAreaTarget.style.height = "".concat(textAreaTarget.scrollHeight, "px");
});
// 결과 내용 복사
copyResult === null || copyResult === void 0 ? void 0 : copyResult.addEventListener("click", function () {
    var _a;
    copyToClipboard((_a = document.querySelector("#result")) === null || _a === void 0 ? void 0 : _a.textContent);
});
// JSON문자열 결과 내용 복사
copyResultStringJson === null || copyResultStringJson === void 0 ? void 0 : copyResultStringJson.addEventListener("click", function () {
    var _a;
    copyToClipboard((_a = document.querySelector("#resultStringString")) === null || _a === void 0 ? void 0 : _a.textContent);
});
// 행삭제 이벤트
function deleteRow(e) {
    e.stopPropagation();
    var currentRowCnt = document.querySelectorAll(".added-rows").length;
    if (currentRowCnt > 1) {
        //@ts-ignore EventTarget에 parentNode가 없다고 경고무시
        e.target.parentNode.parentNode.remove();
    }
}
// JSON 형태의 문자열을 포맷팅
function formatJSON(jsonStr) {
    var indent = 0;
    var result = "";
    var lastChar = "";
    for (var i = 0; i < jsonStr.length; i++) {
        var char = jsonStr[i];
        if (char === "{" || char === "[") {
            indent++;
            result += char + "\n" + "  ".repeat(indent);
        }
        else if (char === "}" || char === "]") {
            indent--;
            result += "\n" + "  ".repeat(indent) + char;
        }
        else if (char === ",") {
            result += char + "\n" + "  ".repeat(indent);
        }
        else {
            result += char;
        }
        lastChar = char;
    }
    return result;
}
// 복사하기
function copyToClipboard(val) {
    if (val === void 0) { val = ""; }
    var t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand("copy");
    document.body.removeChild(t);
    alert("Copied!");
}
