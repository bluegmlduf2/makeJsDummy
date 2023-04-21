type inputType = {
    columnName: string;
    columnValue: string;
    columnType: string;
};

const wrapperRows = document.querySelector("#wrapper-rows");
const addedRows = document.querySelectorAll(".added-rows");
const removeRows = document.querySelectorAll(".remove-rows");
const addBtn = document.querySelector("#addRow");
const getResultBtn = document.querySelector("#btnGetResult");

// 한줄추가 버튼 클릭시
addBtn?.addEventListener("click", () => {
    const addedRow = addedRows[0].cloneNode(true); // true:요소의 하위 요소까지 복사
    wrapperRows?.appendChild(addedRow);
    wrapperRows?.addEventListener("click", deleteRow);
});

// 한줄삭제 버튼 클릭시
removeRows.forEach((e) => {
    e.addEventListener("click", deleteRow);
});

// 데이터 변환 결과 생성
getResultBtn?.addEventListener("click", () => {
    const rows = document.querySelectorAll(".added-rows");
    const rowsResult: inputType[] = [];
    rows.forEach((e) => {
        rowsResult.push({
            columnName: e.querySelector(".columnname")?.value,
            inputValue: e.querySelector(".inputvalue")?.value,
            columnType: e.querySelector("#floatingSelect")?.value,
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
function deleteRow(e: Event) {
    e.stopPropagation();
    const currentRowCnt = document.querySelectorAll(".added-rows").length;
    if (currentRowCnt > 1) {
        //@ts-ignore EventTarget에 parentNode가 없다고 경고무시
        e.target!.parentNode.parentNode.remove();
    }
}
