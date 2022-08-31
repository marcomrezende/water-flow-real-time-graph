const socket = io();
let counter = 1;
socket.on('serial:data', function(dataSerial){
    console.log(dataSerial.value + 'L/min');
    myChart.data.labels.push(counter);
    myChart.data.datasets.forEach(dataset => {
        dataset.data.push(dataSerial.value);
    });
    counter=counter+1;
    myChart.update();
});





const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Serial'],
        datasets: [{
            label: 'Serial',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',

            ],
            borderColor: [
                'rgba(0, 0, 0, 0.5)',

            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

 