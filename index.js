const previousEntryEl = document.getElementById("previous-entry");
const countEl = document.getElementById("count-el");
const incrementBtn = document.getElementById("increment-btn");
const saveBtn = document.getElementById("save-btn");
const totalEntriesEl = document.getElementById("total-entry"); 
const resetBtn = document.getElementById("reset-btn");

let count = 0;
let total = 0;
let history = []; 

function loadSavedData() {
    const savedHistory = localStorage.getItem("trackHistory");
    const savedTotal = localStorage.getItem("trackTotal");

    if (savedHistory) {
        history = JSON.parse(savedHistory);
        previousEntryEl.textContent = "Previous entries: " + history.join(" - ");
    }
    
    if (savedTotal) {
        total = parseInt(savedTotal, 10);
        totalEntriesEl.textContent = `Total entries: ${total}`;
    }
}

loadSavedData();

incrementBtn.addEventListener("click", () => {
    count++;
    countEl.textContent = count;
});

saveBtn.addEventListener("click", () => {
    if (count > 0) {
        history.push(count);
        total += count;
        
        previousEntryEl.textContent = "Previous entries: " + history.join(" - ");
        totalEntriesEl.textContent = `Total entries: ${total}`;
        
        localStorage.setItem("trackHistory", JSON.stringify(history));
        localStorage.setItem("trackTotal", total.toString());

        count = 0;
        countEl.textContent = 0;
    }
});

resetBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to completely reset all entries?")) {
        count = 0;
        total = 0;
        history = [];
        
        countEl.textContent = 0;
        previousEntryEl.textContent = "Previous entries: ";
        totalEntriesEl.textContent = "Total entries: 0";
        
        localStorage.removeItem("trackHistory");
        localStorage.removeItem("trackTotal");
    }
});