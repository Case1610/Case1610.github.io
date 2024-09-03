
function initializeChart() {
    const ctx = document.getElementById("myChart").getContext('2d');
    myLineChart = new Chart(ctx, {
        plugins: {
            beforeDraw: function (chart) {
                const ctx = chart.ctx;
                const chartArea = chart.chartArea;
                const midX = (chartArea.left + chartArea.right) / 2;
                const midY = (chartArea.top + chartArea.bottom) / 2;
                ctx.save();
                // 第一象限
                ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
                ctx.fillRect(midX, chartArea.top, chartArea.right - midX, midY - chartArea.top);
                // 第二象限
                ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
                ctx.fillRect(chartArea.left, chartArea.top, midX - chartArea.left, midY - chartArea.top);
                // 第三象限
                ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
                ctx.fillRect(chartArea.left, midY, midX - chartArea.left, chartArea.bottom - midY);
                // 第四象限
                ctx.fillStyle = 'rgba(255, 255, 0, 0.2)';
                ctx.fillRect(midX, midY, chartArea.right - midX, chartArea.bottom - midY);
                ctx.restore();
            }
        },
        type: 'scatter',
        data: {
            datasets: [{
                label: 'あなた',
                data: [{
                    x: 0,
                    y: 0,
                }],
                backgroundColor: 'RGBA(255,100,0, 1)',
                pointRadius: 15,
            }]
        },
        options: {
            title: {
                display: false,
                text: '診断結果'
            },
            legend: {
                display: false
            },
            scales: {
                x: {
                    scaleLabel: {
                        display: false,
                        labelString: 'コミュニケーション'
                    },
                    position: 'top'
                },
                xAxes: [{
                    type: 'linear',
                    zeroLineTick: 0,
                    ticks: {
                        display: false,
                        min: -10,
                        max: 10,
                        stepSize: 3,
                    },
                    gridLines: {
                        drawTicks:false,
                        zeroLineColor: '#aaaaaa',
                        zeroLineWidth:5
                    }
                }],
                y: {
                    scaleLabel: {
                        display: false,
                        labelString: '感情表現'
                    },
                    position: 'left',
                    lineWidth:2
                },
                yAxes: [{
                    zeroLineTick: 0,
                    ticks: {
                        display: false,
                        min: -10,
                        max: 10,
                        stepSize: 3
                    },
                    gridLines: {
                        drawTicks:false,
                        zeroLineColor: '#aaaaaa',
                        zeroLineWidth:5
                    },
                }]
            },
        }
    });
}