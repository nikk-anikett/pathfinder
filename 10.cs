<!DOCTYPE html>
<html>
<head>
  <title>Data Viewer</title>
</head>
<body>
  <h1>Data Viewer</h1>
  <button onclick="fetchData('database1')">Fetch Data from Database 1</button>
  <button onclick="fetchData('database2')">Fetch Data from Database 2</button>
  
  <table>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody id="data">
      <!-- Data will be displayed here dynamically -->
    </tbody>
  </table>

  <script>
    function fetchData(database) {
      const dataContainer = document.getElementById('data');
      dataContainer.innerHTML = ''; // Clear previous data

      fetch(`/${database}`)
        .then(response => response.json())
        .then(data => {
          data.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${user.FirstName}</td>
              <td>${user.LastName}</td>
              <td>${user.Email}</td>
            `;
            dataContainer.appendChild(row);
          });
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  </script>
</body>
</html>



server.on('message', (msg, rinfo) => {
  const jsonData = JSON.parse(msg.toString('utf8'));
  const targetDatabase = jsonData.database;

  if (targetDatabase === 'database1') {
    receivedDataDatabase1.push(...jsonData.data);
  } else if (targetDatabase === 'database2') {
    receivedDataDatabase2.push(...jsonData.data);
  }
});



string aa = JsonConvert.SerializeObject(new { database = "database1", data = dt_1 });
string ab = JsonConvert.SerializeObject(new { database = "database2", data = dt_2 });

// ...

byte[] sendBytes1 = Encoding.UTF8.GetBytes(aa);
udpClient.Send(sendBytes1, sendBytes1.Length, udpHost, udpPort);

byte[] sendBytes2 = Encoding.UTF8.GetBytes(ab);
udpClient.Send(sendBytes2, sendBytes2.Length, udpHost, udpPort);




const express = require('express');
const dgram = require('dgram');
const app = express();
const server = dgram.createSocket('udp4');

app.set('view engine', 'ejs');
app.use(express.static('public'));

let receivedDataDatabase1 = [];
let receivedDataDatabase2 = [];

server.on('message', (msg, rinfo) => {
  const jsonData = JSON.parse(msg.toString('utf8'));
  const targetDatabase = jsonData.database;

  if (targetDatabase === 'database1') {
    receivedDataDatabase1.push(jsonData.data);
  } else if (targetDatabase === 'database2') {
    receivedDataDatabase2.push(jsonData.data);
  }
});

server.on('listening', () => {
  const address = server.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

const PORT = 15000;
server.bind(PORT);

app.get('/database1', (req, res) => {
  res.json(receivedDataDatabase1);
});

app.get('/database2', (req, res) => {
  res.json(receivedDataDatabase2);
});

app.listen(3000, () => {
  console.log('Web server listening on port 3000');
});
