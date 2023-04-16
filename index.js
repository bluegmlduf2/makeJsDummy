var wrapperRows = document.querySelector("#wrapper-rows");
var addedRows = document.querySelectorAll(".added-rows");
var removeRows = document.querySelectorAll(".remove-rows");
var addBtn = document.querySelector("#addRow");
// 한줄추가 버튼 클릭시
addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener("click", function () {
    var addedRow = addedRows[0].cloneNode(true); // true:요소의 하위 요소까지 복사
    // TODO 기존 클론한 요소를 기본값으로 변경해야함
    wrapperRows === null || wrapperRows === void 0 ? void 0 : wrapperRows.appendChild(addedRow);
});
// 한줄삭제 버튼 클릭시
removeRows.forEach(function (e) {
    e.addEventListener('click', function () {
        // TODO 최소 한줄은 남아있는지 확인필요
        // FIXME 지금 새롭게 한줄이 추가될 경우 해당 행에는 이벤트 적용이안됨
        debugger;
    });
});
