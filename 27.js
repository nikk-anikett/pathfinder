
var audioElement = document.getElementById("audio");
var playCheckbox = document.getElementById("playCheckbox");
var stopCheckbox = document.getElementById("stopCheckbox");
var checkManual = true;
var currentDatabase = 'database1';

// Load checkbox state from localStorage
var playChecked = localStorage.getItem('playChecked') === 'true';
playCheckbox.checked = playChecked;

function updatePlayStatus() {
    if (playCheckbox.checked && !stopCheckbox.checked) {
        audioElement.play();
    } else {
        audioElement.pause();
    }
}

playCheckbox.addEventListener("change", function() {
    localStorage.setItem('playChecked', playCheckbox.checked); 
    if (playCheckbox.checked) {
        stopCheckbox.checked = false;
    }
    updatePlayStatus(); // Update play status after checkbox change
});

stopCheckbox.addEventListener("change", function() {
    localStorage.setItem('stopChecked', stopCheckbox.checked);
    if (stopCheckbox.checked) {
        playCheckbox.checked = false;
        audioElement.pause();
    }
    updatePlayStatus(); // Update play status after checkbox change
});

// Perform operation in Manual
function btnFunc_for_Manual() {
    toggleDataVisibility(!checkManual); // Toggle visibility immediately

    if (checkManual) {
        document.getElementById('myBtn').innerHTML = 'Manual OFF';
        checkManual = false;
    } else {
        document.getElementById('myBtn').innerHTML = 'Manual ON';
        checkManual = true;
    }
}

// Fetch data from server
function fetchData(database) {
    currentDatabase = database;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            updateTable(data);
        }
    };
    xhr.open('GET', `/${database}`, true);
    xhr.send();
}

// Fetch data initially and refresh every 2 seconds
fetchData(currentDatabase);
setInterval(() => {
    fetchData(currentDatabase);
    updatePlayStatus();
}, 2000); // 2000 milliseconds = 2 seconds

// Helper function to toggle data visibility
function toggleDataVisibility(show) {
    const dataElement = document.getElementById('data');
    if (show) {
        dataElement.classList.remove('hidden');
    } else {
        dataElement.classList.add('hidden');
    }
}

// Helper function to update the table
function updateTable(data) {
    const tableBody = document.getElementById('data');
    let tableHTML = '';

    data.forEach((row, index) => {
        tableHTML += `<tr class="${row.Expirydate !== '0' ? 'hidden' : ''}">
                        <td class="name" data-row-index="${index}">${row.FirstName}</td>
                        <td>${row.Expirydate}</td>
                        <td>${row.Age}</td>
                        <td>${row.Now}</td>
                    </tr>`;
    });

    tableBody.innerHTML = tableHTML;

    const names = document.querySelectorAll('.name');
    names.forEach(name => {
        const index = name.getAttribute('data-row-index');
        name.addEventListener('click', () => {
            toggleNameClickState(index);
            updateRowVisibility(data, index);
        });
    });

    // ... (Rest of the code remains the same)
}

// Function to update row visibility based on name click state
function updateRowVisibility(data, index) {
    const row = document.querySelector(`[data-row-index="${index}"]`).parentNode;
    const nextRows = getNextRows(row);
    const show = isNameClicked(index);

    if (show) {
        nextRows.forEach(row => {
            row.classList.remove('hidden');
        });
    } else {
        nextRows.forEach(row => {
            row.classList.add('hidden');
        });
    }
}

// Get all the rows following the given row
function getNextRows(row) {
    const rows = Array.from(row.parentNode.children);
    const rowIndex = rows.indexOf(row);
    return rows.slice(rowIndex + 1);
}

// Helper function to toggle name click state
const nameClickState = {}; // To keep track of name click states

function toggleNameClickState(index) {
    nameClickState[index] = !nameClickState[index];
}

// Helper function to check name click state
function isNameClicked(index) {
    return nameClickState[index] || false;
}

// Play music automatically if row.Now is greater than 0
document.addEventListener("DOMContentLoaded", function() {
    fetchData(currentDatabase);
    updatePlayStatus();
});
