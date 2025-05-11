const container = document.getElementById("array-container");
const generateBtn = document.getElementById("generate-btn");
const bubbleSortBtn = document.getElementById("bubble-sort-btn");

let array = [];

function generateArray() {
  array = [];
  container.innerHTML = "";
  for (let i = 0; i < 50; i++) {
    let value = Math.floor(Math.random() * 100) + 1;
    array.push(value);
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value * 3}px`;
    container.appendChild(bar);
  }
}

generateBtn.addEventListener("click", generateArray);
generateArray();

async function bubbleSort() {
  let bars = document.querySelectorAll(".bar");
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";
      await new Promise(resolve => setTimeout(resolve, 50));

      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        bars[j].style.height = `${array[j] * 3}px`;
        bars[j + 1].style.height = `${array[j + 1] * 3}px`;
      }

      bars[j].style.backgroundColor = "teal";
      bars[j + 1].style.backgroundColor = "teal";
    }
  }
}

bubbleSortBtn.addEventListener("click", bubbleSort);

async function selectionSort() {
    let bars = document.querySelectorAll(".bar");
  
    for (let i = 0; i < bars.length; i++) {
      let minIndex = i;
      bars[minIndex].style.backgroundColor = "blue";
  
      for (let j = i + 1; j < bars.length; j++) {
        bars[j].style.backgroundColor = "red";
  
        await new Promise(resolve => setTimeout(resolve, 50));
  
        if (array[j] < array[minIndex]) {
          bars[minIndex].style.backgroundColor = "teal";
          minIndex = j;
          bars[minIndex].style.backgroundColor = "blue";
        } else {
          bars[j].style.backgroundColor = "teal";
        }
      }
  
      if (minIndex !== i) {
        let temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
  
        bars[i].style.height = `${array[i] * 3}px`;
        bars[minIndex].style.height = `${array[minIndex] * 3}px`;
      }
  
      bars[minIndex].style.backgroundColor = "teal";
      bars[i].style.backgroundColor = "green"; // mark as sorted
    }
  }
  
  const selectionSortBtn = document.getElementById("selection-sort-btn");
  selectionSortBtn.addEventListener("click", selectionSort);
  
  async function insertionSort() {
    let bars = document.querySelectorAll(".bar");
  
    for (let i = 1; i < bars.length; i++) {
      let key = array[i];
      let j = i - 1;
  
      bars[i].style.backgroundColor = "blue";
  
      await new Promise(resolve => setTimeout(resolve, 50));
  
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        bars[j + 1].style.height = `${array[j] * 3}px`;
        bars[j + 1].style.backgroundColor = "red";
  
        j--;
  
        await new Promise(resolve => setTimeout(resolve, 50));
      }
  
      array[j + 1] = key;
      bars[j + 1].style.height = `${key * 3}px`;
      bars[j + 1].style.backgroundColor = "green";
  
      // Reset colors for remaining bars
      for (let k = i + 1; k < bars.length; k++) {
        bars[k].style.backgroundColor = "teal";
      }
    }
  
    // Final pass to mark all sorted
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "green";
    }
  }
  
  const insertionSortBtn = document.getElementById("insertion-sort-btn");
  insertionSortBtn.addEventListener("click", insertionSort);
  
  async function mergeSort(start, end) {
    if (start >= end) return;
  
    const mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
  }
  
  async function merge(start, mid, end) {
    const bars = document.querySelectorAll(".bar");
    const left = array.slice(start, mid + 1);
    const right = array.slice(mid + 1, end + 1);
  
    let i = 0, j = 0, k = start;
  
    while (i < left.length && j < right.length) {
      bars[k].style.backgroundColor = "red";
      await new Promise(resolve => setTimeout(resolve, 50));
  
      if (left[i] <= right[j]) {
        array[k] = left[i];
        bars[k].style.height = `${left[i] * 3}px`;
        i++;
      } else {
        array[k] = right[j];
        bars[k].style.height = `${right[j] * 3}px`;
        j++;
      }
  
      bars[k].style.backgroundColor = "teal";
      k++;
    }
  
    while (i < left.length) {
      array[k] = left[i];
      bars[k].style.height = `${left[i] * 3}px`;
      bars[k].style.backgroundColor = "teal";
      i++;
      k++;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  
    while (j < right.length) {
      array[k] = right[j];
      bars[k].style.height = `${right[j] * 3}px`;
      bars[k].style.backgroundColor = "teal";
      j++;
      k++;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
  
  const mergeSortBtn = document.getElementById("merge-sort-btn");
  mergeSortBtn.addEventListener("click", async () => {
    await mergeSort(0, array.length - 1);
  
    // Optional: color all sorted bars
    let bars = document.querySelectorAll(".bar");
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "green";
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  });



  // Utility function to update bar height visually
  function updateBar(i) {
    const bars = document.querySelectorAll(".bar");
    bars[i].style.height = `${array[i] * 3}px`;
  }
  
  // Optional utility to regenerate bar visuals after sorting
  function renderArray() {
    const bars = document.querySelectorAll(".bar");
    for (let i = 0; i < array.length; i++) {
      bars[i].style.height = `${array[i] * 3}px`;
    }
  }
  
  // Quick Sort
  async function quickSort(start, end) {
    if (start >= end) return;
  
    let pivotIndex = await partition(start, end);
    await quickSort(start, pivotIndex - 1);
    await quickSort(pivotIndex + 1, end);
  }
  
  // Partition function
  async function partition(start, end) {
    const bars = document.querySelectorAll(".bar");
    let pivot = array[end];
    bars[end].style.backgroundColor = "blue";
  
    let i = start - 1;
    for (let j = start; j < end; j++) {
      bars[j].style.backgroundColor = "red";
      await new Promise(resolve => setTimeout(resolve, 50));
  
      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        updateBar(i);
        updateBar(j);
      }
  
      bars[j].style.backgroundColor = "teal";
    }
  
    [array[i + 1], array[end]] = [array[end], array[i + 1]];
    updateBar(i + 1);
    updateBar(end);
    bars[end].style.backgroundColor = "teal";
  
    return i + 1;
  }
  
  // Button event listener
  const quickSortBtn = document.getElementById("quick-sort-btn");
  quickSortBtn.addEventListener("click", async () => {
    await quickSort(0, array.length - 1);
  
    // Optional: mark all as sorted
    const bars = document.querySelectorAll(".bar");
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "green";
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  });
  