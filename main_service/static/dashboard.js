let temperature_value;
let time_value;
let humidity_value;
let light_value;


$(function () {
    function update() {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: 'get_users/',

            success: function (data) {
                temperature_value = data[0].temperature;
                humidity_value = data[0].humidity;
                light_value = data[0].illumination;
                let t = new Date();
                let time = data[0].date.split('.')[0]
                time_value = time;
                temperature_chart.data.datasets[0].data.push(temperature_value);
                humidity_chart.data.datasets[0].data.push(humidity_value);
                light_chart.data.datasets[0].data.push(light_value);
                temperature_chart.data.labels.push(time_value);
                if (temperature_chart.data.labels.length > 20) {
                    temperature_chart.data.datasets[0].data.shift();
                    temperature_chart.data.labels.shift();
                }
                temperature_chart.update();
                humidity_chart.data.labels.push(time_value);
                if (humidity_chart.data.labels.length > 20) {
                    humidity_chart.data.datasets[0].data.shift();
                    humidity_chart.data.labels.shift();
                }
                humidity_chart.update();
                light_chart.data.labels.push(time_value);
                if (light_chart.data.labels.length > 20) {
                    light_chart.data.datasets[0].data.shift();
                    light_chart.data.labels.shift();
                }
                light_chart.update();
            },
            error: function (e) {
                console.log(e);
            }
        })
    }

    $("#btn_update").click(function () {
        $.ajax({
            type: 'POST',
            url: 'update_data/',
            success: function () {
                update();
            }
        })
    })


    let temp_canvas = document.getElementById("temperature_chart").getContext("2d");
    let temperature_chart = new Chart(temp_canvas, {
            type: "line",
            data: {
                labels: [],
                datasets: [
                    {
                        label: "Temperature values",
                        data: [],
                        backgroundColor: "rgba(255,51,51,.4)",
                        borderColor: "#cc0000",
                        borderWidth: 3
                    }
                ]
            },
            options: {
                responsive: true,
                lineTension: 1,
                animation: {
                    duration: 400
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            }
                        }
                    ]
                }
            }
        }
    )
    let hmd_canvas = document.getElementById("humidity_chart").getContext("2d");
    let humidity_chart = new Chart(hmd_canvas, {
            type: "line",
            data: {
                labels: [],
                datasets: [
                    {
                        label: "Humidity",
                        data: [],
                        backgroundColor: "rgba(0,128,255,.4)",
                        borderColor: "#36495d",
                        borderWidth: 3
                    }
                ]
            },
            options: {
                responsive: true,
                lineTension: 1,
                animation: {
                    duration: 400
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            }
                        }
                    ]
                }
            }
        }
    )
    let lgt_canvas = document.getElementById("light_chart").getContext("2d");
    let light_chart = new Chart(lgt_canvas, {
            type: "line",
            data: {
                labels: [],
                datasets: [
                    {
                        label: "Light",
                        data: [],
                        backgroundColor: "rgba(255,153,51,.5)",
                        borderColor: "#cc6600",
                        borderWidth: 3
                    }
                ]
            },
            options: {
                responsive: true,
                lineTension: 1,
                animation: {
                    duration: 400
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            }
                        }
                    ]
                }
            }
        }
    )
    setInterval(update, 1000);

    const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

    const messageTitle = [
        'info',
        'success',
        'warning',
        'danger',
        'State information!'
    ];

    const notification = document.querySelector('.notification');
    let manual_control = document.getElementById("flexCheckDefault");
    manual_control.addEventListener('change',(event)=> {
        document.getElementById("pump_switch").disabled = !manual_control.checked;
    });

    function dismissMessage() {
        notification.classList.remove('received');
    }

    function showMessage() {
        notification.classList.add('received');


        const button = document.querySelector('.notification__message button');
        button.addEventListener('click', dismissMessage, {once: true});
    }

    function generateMessage(data) {
        const title = "Pot_updated"
        const text = data.message

        const message = document.querySelector('.notification__message');

        message.querySelector('h1').textContent = title;
        message.querySelector('p').textContent = text;
        message.className = `notification__message message--${title}`;

        showMessage();
    }

    let socket = new WebSocket("ws://localhost:8000/ws/notification/")
    socket.onmessage = function (event) {
        console.log("Message");
        generateMessage(JSON.parse(event.data))
    }


})


