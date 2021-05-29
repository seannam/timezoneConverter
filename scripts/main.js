document.addEventListener('DOMContentLoaded', function () {
    const enterKeyCode = 13;

    const timestampInput = document.getElementById("timestampField");
    timestampInput.focus();

    // timestampInput.addEventListener("change", convertTimestamp);
    timestampInput.addEventListener("keyup", convertTimestamp);

    function convertTimestamp(event) {
        // Convert on enter key
        if (event.keyCode === enterKeyCode) {
            let parsed = parseSQLTimestamp(timestampInput.value);
            // let utcDate = new Date(
            //     Date.UTC(
            //         parsed.year, 
            //         parsed.month, 
            //         parsed.date, 
            //         parsed.hours, 
            //         parsed.mintues, 
            //         parsed.seconds
            //     )
            // );
            let utcDate = new Date(Date.UTC(2021,2,12,16,0,0));
            let localDate = new Date(Date.parse(utcDate));
            console.log(utcDate)
            console.log(utcDate.toUTCString());
            console.log(localDate)

            // var timestamp = new Date();

            let timestamp = "";
            let pacificIso = "";
            let local = "";
            let epoch = "";

            timestamp = utcDate.toUTCString();
            pacificIso = localDate.toISOString();
            local = localDate.toLocaleString()
            epoch = Date.parse(utcDate)

            addRow('conversionTable', [timestamp, epoch, pacificIso, local]);
        }
    }

    function addRow(tableID, cellList) {
        document.getElementById("consoleMessage").innerText = "";

        // Get a reference to the table
        let tableRef = document.getElementById(tableID);

        if (tableRef !== null) {
            // Insert a row at the top
            let newRow = tableRef.insertRow(-1);

            // Insert a cell for each type
            cellList.forEach(element => {
                let newCell = newRow.insertCell(-1);
                // Append a text node to the cell
                let newText = document.createTextNode(element);
                newCell.appendChild(newText);
            });
        } else {
            document.getElementById("consoleMessage").innerText = `${tableID} was not found!`;
        }
    }

    function parseSQLTimestamp(timestamp) {
        // 2021-02-12 08:00:00
        return {
            year: 2021,
            month: 02,
            date: 12,
            hours: 8,
            minutes: 0,
            seconds: 0
        }
    }
});