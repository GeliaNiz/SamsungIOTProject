let graphs = []
let currentId = 1;
const notification = document.querySelector('.notification');
demo = {
    initDocumentationCharts: function () {
        if ($('#dailySalesChart').length != 0 && $('#websiteViewsChart').length != 0) {
            /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

            dataDailySalesChart = {
                labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                series: [
                    [12, 17, 7, 17, 23, 18, 38]
                ]
            };

            optionsDailySalesChart = {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                low: 0,
                high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                chartPadding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
            }

            var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

            var animationHeaderChart = new Chartist.Line('#websiteViewsChart', dataDailySalesChart, optionsDailySalesChart);
        }
    },
//$('#humidity_chart').length != 0 || $('#temperature_chart').length != 0 || $('#light_chart').length != 0
    initDashboardPageCharts: function () {

        /* ----------==========     HUMIDITY    ==========---------- */
        let dataHumidityChart = {
            labels: [],
            series: [[]]
        };

        let optionsHumidityChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
        }

        graphs.push(new Chartist.Line('#humidityChart', dataHumidityChart, optionsHumidityChart));

        md.startAnimationForLineChart(graphs[0]);

        /* ----------==========     LIGHT    ==========---------- */
        let dataLightChart = {
            labels: [],
            series: [[]]
        };

        let optionsLightChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        }


        graphs.push(new Chartist.Line('#lightChart', dataLightChart, optionsLightChart));
        // start animation for the Completed Tasks Chart - Line Chart
        md.startAnimationForLineChart(graphs[1]);


        /* ----------==========     TEMPERATURE    ==========---------- */

        let dataTemperatureChart = {
            labels: [],
            series: [[]]
        };

        let optionsTemperatureChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        }

        graphs.push(new Chartist.Line('#temperatureChart', dataTemperatureChart, optionsTemperatureChart));

        // start animation for the Completed Tasks Chart - Line Chart
        md.startAnimationForLineChart(graphs[2]);


        /* ----------==========     Emails Subscription Chart initialization    ==========---------- */


    },

    update_chart: function (chart, value) {
        let data = chart.data;
        if (data.series[0].length > 9) {
            data.series[0].shift();
            data.labels.shift();
        }
        data.series[0].push(value);
        //data.labels.push(time)
        chart.update(data);
    },

    update_data: function () {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: 'get_users/',
            success: function (data) {
                let values = [data[0].humidity * 100, 100 - data[0].light * 100, data[0].temperature]
                let diff = Date.now() - Date.parse(data[0].date)


                document.querySelectorAll('#humidity-time').forEach((n) => n.innerHTML = Math.floor(diff / 1000))
                document.querySelectorAll('#light-time').forEach((n) => n.innerHTML = Math.floor(diff / 1000))
                document.querySelectorAll('#temperature-time').forEach((n) => n.innerHTML = Math.floor(diff / 1000))

                graphs.forEach(((v, i) => demo.update_chart(v, values[i])))
                document.querySelectorAll(".temperature-value").forEach((n) => n.innerHTML = values[2] + ' <small>°С</small>')
                document.querySelectorAll(".light-value").forEach((n) => n.innerHTML = values[1] + ' <small>%</small>')
                document.querySelectorAll(".humidity-value").forEach((n) => n.innerHTML = values[0] + ' <small>%</small>')

            }
        })
    },

    sendMQTT: function (id, topicName, state) {
        $.ajax({
            type: 'POST',
            url: 'send_mqtt/',
            data: {
                "state": state,
                "topicName": topicName,
                "id": id
            },
            success: function () {

            }
        })
    },


    dismissMessage: function () {
        notification.classList.remove('received');
    },

    showMessage: function () {
        notification.classList.add('received');
        const button = document.querySelector('.notification__message button');
        button.addEventListener('click', demo.dismissMessage, {once: true});
    },

    generateMessage: function (data) {
        const title = "update"
        const text = data.message
        const message = document.querySelector('.notification__message');

        message.querySelector('h1').textContent = title;
        message.querySelector('p').textContent = text;
        message.className = `notification__message message--${title}`;

        demo.showMessage();
        setTimeout(demo.dismissMessage, 5000);
    },

    set_desired: function (){
        let slider = document.querySelector("#customRange1");
        document.querySelector("#desired-humidity").textContent = slider.value;
    }


}