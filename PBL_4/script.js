const data = new Array(9).fill("").map(() => new Array(9).fill(""));

const exportBtn = document.querySelector(".export-btn");
const cellNum = document.querySelector(".cell-num");
const table = document.querySelector(".table");

let selectedCol = undefined;
let selectedRow = undefined;

const rowIdxData = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
  6: "G",
  7: "H",
  8: "I",
};

/* 엑셀 파일 다운로드 */
const exportHandler = (data) => {
  const workSheet = XLSX.utils.aoa_to_sheet(data);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "sheet title");
  XLSX.writeFile(workBook, "엑셀_파일_명.xlsx");
};

exportBtn.addEventListener("click", () => {
  exportHandler(data);
});

/* 셀 정보 업데이트 */
const updateCellInfo = (e) => {
  const { target } = e;
  const { value, id } = target;
  const [col, row] = id.split("-");
  data[col][row] = value;
};

/* 셀 포커스 업데이트 */
const updateCellFocus = (e) => {
  const { target } = e;
  const { id } = target;
  const [col, row] = id.split("-");
  cellNum.textContent = `${rowIdxData[row]}${Number(col) + 1}`;
  updateFocusBackground(col, row);
};

/* 셀 포커스 색상 업데이트 */
const updateFocusBackground = (col, row) => {
  /* 기존 포커스 제거 */
  if (selectedCol !== undefined && selectedRow !== undefined) {
    const prevCol = document.getElementById(`col-${selectedCol}`);
    const prevRow = document.getElementById(`row-${selectedRow}`);
    prevCol.classList.remove("selected");
    prevRow.classList.remove("selected");
  }

  /* 포커스 추가 */
  const currentCol = document.getElementById(`col-${col}`);
  const currentRow = document.getElementById(`row-${row}`);
  currentCol.classList.add("selected");
  currentRow.classList.add("selected");

  selectedCol = col;
  selectedRow = row;
};

/* 셀 정보 출력 */
const render = (data) => {
  /* row IDX render */
  const row = document.createElement("div");
  row.classList.add("row");

  const blank = document.createElement("span");
  blank.classList.add("idx-info");
  row.appendChild(blank);

  Object.keys(rowIdxData).forEach((key) => {
    const rowItem = document.createElement("span");
    rowItem.textContent = rowIdxData[key];
    rowItem.classList.add("idx-info");
    rowItem.id = `row-${key}`;
    row.appendChild(rowItem);
  });
  table.appendChild(row);

  /* col IDX and Cell render */
  data.forEach((element, colIdx) => {
    const row = document.createElement("div");
    row.classList.add("row");

    const colNum = document.createElement("span");
    colNum.textContent = colIdx + 1;
    colNum.id = `col-${colIdx}`;
    colNum.classList.add("idx-info");
    row.appendChild(colNum);
    element.forEach((el, rowIdx) => {
      const input = document.createElement("input");
      input.value = el;
      input.id = `${colIdx}-${rowIdx}`;
      input.addEventListener("keyup", updateCellInfo);
      input.addEventListener("focus", updateCellFocus);
      row.appendChild(input);
    });
    table.appendChild(row);
  });
};

render(data);
