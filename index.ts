const wrapperRows = document.querySelector("#wrapper-rows");
const addedRows = document.querySelectorAll(".added-rows");
const removeRows = document.querySelectorAll(".remove-rows");
const addBtn = document.querySelector("#addRow");

// 한줄추가 버튼 클릭시
addBtn?.addEventListener("click", () => {
    const addedRow = addedRows[0].cloneNode(true); // true:요소의 하위 요소까지 복사
    // TODO 기존 클론한 요소를 기본값으로 변경해야함
    wrapperRows?.appendChild(addedRow);
});

// 한줄삭제 버튼 클릭시
removeRows.forEach(e => {
  e.addEventListener('click', () => {
    // TODO 최소 한줄은 남아있는지 확인필요
    // FIXME 지금 새롭게 한줄이 추가될 경우 해당 행에는 이벤트 적용이안됨
    debugger;
  });
});