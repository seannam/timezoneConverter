document.addEventListener('DOMContentLoaded', function () {
  const DateTime = luxon.DateTime

  const enterKeyCode = 13

  const timestampInput = document.getElementById('timestampField')
  timestampInput.focus()

  // timestampInput.addEventListener("change", convertTimestamp);
  timestampInput.addEventListener('keyup', convertTimestamp)

  function convertTimestamp(event) {
    // Convert on enter key
    if (event.keyCode === enterKeyCode) {

      // Convert the SQL timestamp input to a luxon DateTime object
      let sqlTimestamp = DateTime.fromSQL(timestampInput.value, { zone: 'UTC' });

      // Check if the timestamp is valid
      if (!sqlTimestamp.isValid) {
        console.error(`Error: ${sqlTimestamp.invalidReason}`)
        console.error(`${sqlTimestamp.invalidExplanation}`)
        return false
      }
      
      const timestamp = timestampInput.value;

      // Convert to Pacific time
      let sqlTimestampPacific = sqlTimestamp.setZone('America/Los_Angeles');

      // Convert the timestamp to unix time
      let unixtime = sqlTimestamp.toSeconds();
      let utcIso = sqlTimestamp.toString();
      let utcHuman = sqlTimestamp.toLocaleString(DateTime.DATETIME_FULL);
      let pacificIso = sqlTimestampPacific.toString();
      let pacificHuman = sqlTimestampPacific.toLocaleString(DateTime.DATETIME_FULL);

      addRow('conversionTable', [timestamp, unixtime, utcIso, utcHuman, pacificIso, pacificHuman]);

      // -------------------------------------------------------------------------------------

      // Convert the SQL timestamp input to a luxon DateTime object
      sqlTimestamp = DateTime.fromSQL(timestampInput.value, { zone: 'America/Los_Angeles' });

      // Check if the timestamp is valid
      if (!sqlTimestamp.isValid) {
        console.error(`Error: ${sqlTimestamp.invalidReason}`)
        console.error(`${sqlTimestamp.invalidExplanation}`)
        return false
      }
      
      // Convert to Pacific time
      let sqlTimestampUTC = sqlTimestamp.setZone('UTC')

      unixtime = sqlTimestampUTC.toSeconds();
      utcIso = sqlTimestampUTC.toString();
      utcHuman = sqlTimestampUTC.toLocaleString(DateTime.DATETIME_FULL);
      pacificIso = sqlTimestamp.toString();
      pacificHuman = sqlTimestamp.toLocaleString(DateTime.DATETIME_FULL);
      addRow('conversionTable', [timestamp, unixtime, utcIso, utcHuman, pacificIso, pacificHuman]);
    }
  }

  function addRow(tableID, cellList) {
    document.getElementById('consoleMessage').innerText = ''

    // Get a reference to the table
    const tableRef = document.getElementById(tableID)

    if (tableRef !== null) {
      // Insert a row at the top
      const newRow = tableRef.insertRow(-1)

      // Insert a cell for each type
      cellList.forEach(element => {
        const newCell = newRow.insertCell(-1)
        // Append a text node to the cell
        const newText = document.createTextNode(element)
        newCell.appendChild(newText)
      })
    } else {
      document.getElementById('consoleMessage').innerText = `${tableID} was not found!`
    }
  }


  // function parseSQLTimestamp (timestamp) {
  // }

  function basicFunctions() {
    const fromsql = DateTime.fromSQL("2017-05-15 09:24:15");
    console.log(fromsql)
    console.log(fromsql.minute)
    console.log('-----------------')

    // const dt = DateTime.local(2017, 5, 15, 8, 30)
    // console.log(dt)
    // const now = DateTime.now()
    // console.log(now)
    // console.log(now.year)
    // console.log(now.month)
    // console.log(now.day)
    // console.log(now.second)
    // console.log(now.weekday)
    // console.log(now.zoneName)
    // console.log(now.offset)
    // console.log(now.daysInMonth)

    // console.log('--------------')

    // const pacific = DateTime.fromObject({}, { zone: 'America/Los_Angeles' }) // now, but expressed in LA's local time
    // console.log(pacific)

    // const fromObject = DateTime.fromObject({ day: 22, hour: 12 }, { zone: 'America/Los_Angeles', numberingSystem: 'beng' });
    // console.log(fromObject);
    // const fromIso = DateTime.fromISO('2017-05-15T08:30:00');
    // console.log(fromIso);
  }
})
