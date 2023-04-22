type inputType = {
    columnName: string;
    inputValue: string;
    columnType: string;
};

const wrapperRows = document.querySelector("#wrapper-rows");
const addedRows = document.querySelectorAll(".added-rows");
const removeRows = document.querySelectorAll(".remove-rows");
const addBtn = document.querySelector("#addRow");
const getResultBtn = document.querySelector("#btnGetResult");

// 한줄추가 버튼 클릭시
addBtn!.addEventListener("click", () => {
    const addedRow = addedRows[0].cloneNode(true); // true:요소의 하위 요소까지 복사
    const addedRowElem = addedRow as Element;
    addedRowElem
        .querySelector(".remove-rows")!
        .addEventListener("click", deleteRow);
    (addedRowElem.querySelector(".columnname") as HTMLInputElement).value = "";
    (addedRowElem.querySelector(".inputvalue") as HTMLInputElement).value = "";
    (addedRowElem.querySelector("#floatingSelect") as HTMLInputElement).value =
        "string";
    wrapperRows?.appendChild(addedRow);
});

// 한줄삭제 버튼 클릭시
removeRows.forEach((e) => {
    e.addEventListener("click", deleteRow);
});

// 데이터 변환 결과 생성
getResultBtn!.addEventListener("click", () => {
    const rows = document.querySelectorAll(".added-rows");
    const rowsResult: inputType[] = [];
    rows.forEach((e) => {
        const columnName = e.querySelector(".columnname") as HTMLInputElement;
        const inputValue = e.querySelector(".inputvalue") as HTMLInputElement;
        const columnType = e.querySelector(
            "#floatingSelect"
        ) as HTMLInputElement;

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
function deleteRow(e: Event) {
    e.stopPropagation();
    const currentRowCnt = document.querySelectorAll(".added-rows").length;
    if (currentRowCnt > 1) {
        //@ts-ignore EventTarget에 parentNode가 없다고 경고무시
        e.target!.parentNode.parentNode.remove();
    }
}
