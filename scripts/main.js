document.addEventListener('DOMContentLoaded', function () {
  const DateTime = luxon.DateTime
  const enterKeyCode = 13
  const sqlFormatString = 'yyyy-MM-dd hh:mm:ss'
  const timestampInput = document.getElementById('timestampField')
  timestampInput.focus()
  timestampInput.addEventListener('keyup', convertTimestamp)

  const unixTimeInput = document.getElementById('unixTimeField')
  unixTimeInput.addEventListener('keyup', convertUnixTime)

  function convertUnixTime(event) {
    // Convert on enter key
    if (event.keyCode === enterKeyCode) {
      // Convert the Unix Time to a Luxon DateTime object
      let dateTime = DateTime.fromSeconds(Number(unixTimeInput.value), { zone: 'UTC'})

      // Convert to Pacific time
      let sqlTimestampPacific = dateTime.setZone('America/Los_Angeles');

      // Convert the timestamp to unix time
      const unixtime = unixTimeInput.value
      let utcIso = dateTime.toString();
      let utcSql = dateTime.toFormat(sqlFormatString);
      let utcHuman = dateTime.toLocaleString(DateTime.DATETIME_FULL);
      let pacificIso = sqlTimestampPacific.toString();
      let pacificSql = sqlTimestampPacific.toFormat(sqlFormatString)
      let pacificHuman = sqlTimestampPacific.toLocaleString(DateTime.DATETIME_FULL);

      addRow('conversionTable', [unixtime, unixtime, utcIso, utcSql, utcHuman, pacificIso, pacificSql, pacificHuman]);
    }
  }

  function convertTimestamp(event) {
    // Convert on enter key
    if (event.keyCode === enterKeyCode) {

      // Convert the SQL timestamp input to a Luxon DateTime object
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
      let utcSql = sqlTimestamp.toFormat(sqlFormatString);
      let utcHuman = sqlTimestamp.toLocaleString(DateTime.DATETIME_FULL);
      let pacificIso = sqlTimestampPacific.toString();
      let pacificSql = sqlTimestampPacific.toFormat(sqlFormatString)
      let pacificHuman = sqlTimestampPacific.toLocaleString(DateTime.DATETIME_FULL);

      addRow('conversionTable', [timestamp, unixtime, utcIso, utcSql, utcHuman, pacificIso, pacificSql, pacificHuman]);

      // -------------------------------------------------------------------------------------

      // Convert the SQL timestamp input to a Luxon DateTime object
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
      utcSql = sqlTimestampUTC.toFormat(sqlFormatString);
      utcHuman = sqlTimestampUTC.toLocaleString(DateTime.DATETIME_FULL);
      pacificIso = sqlTimestamp.toString();
      pacificSql = sqlTimestamp.toFormat(sqlFormatString)
      pacificHuman = sqlTimestamp.toLocaleString(DateTime.DATETIME_FULL);
      addRow('conversionTable', [timestamp, unixtime, utcIso, utcSql, utcHuman, pacificIso, pacificSql, pacificHuman]);
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

})
