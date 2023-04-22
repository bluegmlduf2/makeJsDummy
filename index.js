var wrapperRows = document.querySelector("#wrapper-rows");
var addedRows = document.querySelectorAll(".added-rows");
var removeRows = document.querySelectorAll(".remove-rows");
var addBtn = document.querySelector("#addRow");
var getResultBtn = document.querySelector("#btnGetResult");
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
    var rows = document.querySelectorAll(".added-rows");
    var rowsResult = [];
    rows.forEach(function (e) {
        var columnName = e.querySelector(".columnname");
        var inputValue = e.querySelector(".inputvalue");
        var columnType = e.querySelector("#floatingSelect");
        rowsResult.push({
            columnName: columnName.value,
            inputValue: inputValue.value,
            columnType: columnType.value,
        });
    });
    console.log(rowsResult);
    // [
    //     ...Array.from(Array(5)).map((x, i) => {
    //         return {};
    //     }),
    // ];
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
