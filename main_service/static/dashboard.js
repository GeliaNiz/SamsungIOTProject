let temperature_value;
let time_value;
let humidity_value;
let light_value;

$(function () {
    $('#toggle-button').click(function (){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'control_watering/',
             success: function () {
                pring(1)
            },
            error: function (e) {
                console.log(e);
            }
        })

    });
    function update() {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: 'get_users/',

            success: function (data) {
                temperature_value = data[0].temperature;
                humidity_value = data[0].humidity;
                light_value = data[0].illumination;
                var t = new Date();
                var time = data[0].date.match(/(\d+)(?::(\d\d))?\s*(p?)/);
                t.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
                t.setMinutes(parseInt(time[3], 10) || 0);
                time_value = t.getUTCMinutes();
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

    let a = document.getElementById("temperature_chart").getContext("2d");
    let temperature_chart = new Chart(a, {
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
                    duration: 0
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
    let b = document.getElementById("humidity_chart").getContext("2d");
    let humidity_chart = new Chart(b, {
            type: "line",
            data: {
                labels: [],
                datasets: [
                    {
                        label: "Humidity values",
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
                    duration: 0
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
    let c = document.getElementById("light_chart").getContext("2d");
    let light_chart = new Chart(c, {
            type: "line",
            data: {
                labels: [],
                datasets: [
                    {
                        label: "Light values",
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
                    duration: 0
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
    setInterval(update, 200000);

    const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

    const messageTitle = [
        'info',
        'success',
        'warning',
        'danger',
    ];

    const messageText = [
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, quaerat.',
        'Ab asperiores inventore tempora maiores, est et magni harum maxime?',
        'Laboriosam, vel maxime. Doloremque saepe aut quis mollitia corporis illo?',
        'Cum eum magnam facere commodi quae voluptate suscipit doloribus architecto?',
        'Ipsa veniam tempora necessitatibus corporis voluptate nobis, ut quam magni.',
        'Veritatis obcaecati non dolorum vero? Ipsam aperiam optio sint dicta.',
        'Itaque quod amet a. Voluptate nostrum temporibus ipsa explicabo exercitationem.',
        'Quasi veritatis inventore mollitia ipsum, aut voluptatibus suscipit a labore.',
        'Iusto alias eius quae ducimus quibusdam veniam sint soluta nam!',
        'Corrupti temporibus sequi laboriosam alias magni? Nam consectetur amet odit!'
    ];

    /* logic
    - create a message
    - show the message
    - allow to dismiss the message through the dismiss button

    once the message is dismissed the idea is to go through the loop one more time, with a different title and text values
    */
    const notification = document.querySelector('.notification');

// function called when the button to dismiss the message is clicked
    function dismissMessage() {
        // remove the .received class from the .notification widget
        notification.classList.remove('received');
    }

// function showing the message
    function showMessage() {
        // add a class of .received to the .notification container
        notification.classList.add('received');

        // attach an event listener on the button to dismiss the message
        // include the once flag to have the button register the click only one time
        const button = document.querySelector('.notification__message button');
        button.addEventListener('click', dismissMessage, {once: true});
    }

    function generateMessage(data) {
        function generateMessage() {
            // after an arbitrary and brief delay create the message and call the function to show the element
            const delay = Math.floor(Math.random() * 1000) + 1500;
            const timeoutID = setTimeout(() => {
                // retrieve a random value from the two arrays
                const title = randomItem(messageTitle);
                const text = randomItem(messageText);

                // update the message with the random values and changing the class name to the title's option
                const message = document.querySelector('.notification__message');

                message.querySelector('h1').textContent = title;
                message.querySelector('p').textContent = text;
                message.className = `notification__message message--${title}`;

                // call the function to show the message
                showMessage();
                clearTimeout(timeoutID);
            }, delay);
        }
    }

    // var socket = new WebSocket("wss://localhost:8000/ws/notification/")
    // socket.onmessage = function (event) {
    //     generateMessage(JSON.parse(event.data))
    // }
    console.log('AAAAAAAAAAAAAAAAAAAAA')
    generateMessage({'message':'aaaaa'})

})
