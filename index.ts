type inputType = {
    // 인덱스 시그니처 : 키값이 정해지지 않은 경우 사용
    [key: string]: string | number;
};

const wrapperRows = document.querySelector("#wrapper-rows");
const addedRows = document.querySelectorAll(".added-rows");
const removeRows = document.querySelectorAll(".remove-rows");
const addBtn = document.querySelector("#addRow");
const resultTextarea = document.querySelector("#result");
const getResultBtn = document.querySelector("#btnGetResult");
const copyResult = document.querySelector("#btnCopyResult");
const copyResultStringJson = document.querySelector("#btnCopyResultStringJson");

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
    // 컬럼의 갯수
    const rows = document.querySelectorAll(".added-rows");

    // Auto Increment 유무
    const isChecked = (
        document.querySelector("#chkAutoIcrement") as HTMLInputElement
    ).checked;

    // 화면의 데이터 생성횟수 취득
    let repeatCount: number = Number(
        (document.querySelector("#repeatCnt") as HTMLInputElement)?.value
    );
    repeatCount = repeatCount ? repeatCount : 1;

    // 결과값
    const rowsResult: inputType[] = [];

    // 더미데이터 생성용 데이터 추출
    for (let i = 0; i < repeatCount; i++) {
        const rowsData: inputType = {};

        for (let k = 0; k < rows.length; k++) {
            const columnName = rows[k].querySelector(
                ".columnname"
            ) as HTMLInputElement;
            const inputValue = rows[k].querySelector(
                ".inputvalue"
            ) as HTMLInputElement;
            const columnType = rows[k].querySelector(
                "#floatingSelect"
            ) as HTMLInputElement;

            // 키값
            const keyName = columnName.value;

            // 값
            let value = inputValue?.value;
            let keyValue = null;

            // 값의 타입에 따라 값설정
            if (columnType.value === "string") {
                // 문자열일 경우
                keyValue = value ? (isChecked ? `${value}_${i}` : value) : "";
            } else {
                // 숫자인 경우
                //isNaN이 typescript에서 string타입을 매개변수로 못받아서 any처리
                keyValue = isNaN(value as any) ? 0 : Number(value);
            }

            // 컬럼추가
            Object.assign(rowsData, { [keyName]: keyValue });
        }
        // 데이터추가
        rowsResult.push(rowsData);
    }
    // 결과값(JSON String)
    const resultsJson = JSON.stringify(rowsResult);

    // 결과값 텍스트에이리어 추가
    document.querySelector("#result")!.textContent = formatJSON(resultsJson);
    document.querySelector("#resultStringString")!.textContent = resultsJson;

    // 텍스트에이리어의 input이벤트는 자바스크립트로 값을 넣을경우 발생하지 않기때문에 수동으로 발생시킴
    const inputEvent = new Event("input", { bubbles: true }); // input 이벤트 생성
    document.querySelector("#result")!.dispatchEvent(inputEvent); // input 이벤트 발생시키기
});

// 텍스트 결과값의 높이 자동 조절
resultTextarea!.addEventListener("input", (e) => {
    const textAreaTarget = e.target as HTMLTextAreaElement;
    textAreaTarget.style.height = "auto";
    textAreaTarget.style.height = `${textAreaTarget.scrollHeight}px`;
});

// 결과 내용 복사
copyResult?.addEventListener("click", () => {
    copyToClipboard(document.querySelector("#result")?.textContent!);
});

// JSON문자열 결과 내용 복사
copyResultStringJson?.addEventListener("click", () => {
    copyToClipboard(
        document.querySelector("#resultStringString")?.textContent!
    );
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

// JSON 형태의 문자열을 포맷팅
function formatJSON(jsonStr: string) {
    let indent = 0;
    let result = "";
    let lastChar = "";

    for (let i = 0; i < jsonStr.length; i++) {
        const char = jsonStr[i];

        if (char === "{" || char === "[") {
            indent++;
            result += char + "\n" + "  ".repeat(indent);
        } else if (char === "}" || char === "]") {
            indent--;
            result += "\n" + "  ".repeat(indent) + char;
        } else if (char === ",") {
            result += char + "\n" + "  ".repeat(indent);
        } else {
            result += char;
        }

        lastChar = char;
    }

    return result;
}

// 복사하기
function copyToClipboard(val: string = "") {
    const t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand("copy");
    document.body.removeChild(t);
    alert("Copied!");
}
