(function ($) {
    "use strict";

    /*--
        Apex Charts
    -----------------------------------*/
    var options = {
        series: [{
            type: 'column',
            data: [7000, 5400, 4600, 2700, 6300, 3600]
        }],
        chart: {
            height: 380,
            type: 'bar',
            toolbar: {
                show: false,
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '30%',
                distributed: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        colors: ['#0a4d3c'],
        xaxis: {
            categories: [
                ['Oct’20'],
                ['Nov’20'],
                ['Dec’20'],
                ['Jan’21'],
                ['Feb’21'],
                ['Mar’21'],
            ],
            labels: {
                style: {
                colors: ['#52565b'],
                fontSize: '14px',
                fontFamily: 'Gordita',
                fontWeight: 400,
                }
            }
        },
        yaxis: {
            tickAmount: 7,
            labels: {
                style: {
                    colors: ['#52565b'],
                    fontSize: '14px',
                    fontFamily: 'Gordita',
                    fontWeight: 400,
                },
            },
        },
        stroke: {
            show: true,
            curve: 'smooth',
            width: [0, 4],
            lineCap: 'square'
        },


        };

        var chart = new ApexCharts(document.querySelector("#uniqueVisits"), options);
        chart.render();

    
})(jQuery);