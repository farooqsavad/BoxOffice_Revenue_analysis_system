// ===== CHARTS INITIALIZATION =====
function initializeAllCharts() {
    console.log('Initializing all charts...');
    
    // Initialize all charts with error handling
    try {
        // Define custom chart types if needed
        if (!Chart.controllers || !Chart.controllers.heatmap) {
            console.log('Using bubble chart for heatmap visualization');
        }
        
        console.log('Chart.js version:', Chart.version);
        
        // Initialize individual charts
        initBudgetRevenueChart();
        initRoiDistributionChart();
        initGenreDistributionChart();
        initGenreRoiChart();
        initGenreTimeChart();
        initBoxOfficeTrendChart();
        initSeasonalPerformanceChart();
        initBudgetEvolutionChart();
        initRatingPerformanceChart();
        initPopularityImpactChart();
        initCorrelationMatrixChart();
        initStudioMarketShareChart();
        initStudioRoiChart();
        initStudioComparisonChart();
        initFeatureImportanceChart();
        
        console.log('All charts initialized successfully');
        
        // Initialize prediction gauges with default values
        updatePredictionGauges(2.5, 0.65);
    } catch (error) {
        console.error('Error initializing charts:', error);
    }
}

// Wait for Chart.js to be fully initialized
document.addEventListener('chartjs-ready', initializeAllCharts);

// Also initialize on DOM content loaded as a fallback
document.addEventListener('DOMContentLoaded', function() {
    // If Chart.js is already initialized, run immediately
    if (typeof Chart !== 'undefined' && Chart.defaults) {
        setTimeout(initializeAllCharts, 500); // Small delay to ensure everything is loaded
    }
});

// ===== FINANCIAL ANALYSIS CHARTS =====

// Budget vs. Revenue Chart
function initBudgetRevenueChart() {
    try {
        const ctx = document.getElementById('budgetRevenueChart');
        if (!ctx) {
            console.warn('Canvas element budgetRevenueChart not found');
            return;
        }
        
        // Check if Chart.js is available
        if (typeof Chart === 'undefined') {
            console.error('Chart.js is not available for Budget vs. Revenue Chart');
            return;
        }
        
        console.log('Initializing Budget vs. Revenue Chart');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['1997', '2003', '2009', '2011', '2012', '2013', '2015', '2017', '2019', '2021', '2022', '2023'],
                datasets: [
                    {
                        label: 'Production Budget',
                        data: [200, 94, 237, 250, 220, 200, 245, 317, 260, 200, 350, 145],
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Domestic Gross',
                        data: [674, 379, 785, 242, 624, 409, 937, 620, 543, 814, 685, 630],
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Foreign Gross',
                        data: [1590, 768, 2138, 805, 897, 807, 1135, 714, 1120, 1108, 1636, 797],
                        backgroundColor: 'rgba(255, 159, 64, 0.6)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: false
                    },
                    datalabels: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Amount (in millions $)'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing Budget vs. Revenue Chart:', error);
    }
}

// ROI Distribution Chart
function initRoiDistributionChart() {
    try {
        const ctx = document.getElementById('roiDistributionChart');
        if (!ctx) {
            console.warn('Canvas element roiDistributionChart not found');
            return;
        }
        
        const chart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'High Budget (>$200M)',
                        data: [
                            { x: 237, y: 11.3 },  // Avatar
                            { x: 356, y: 6.9 },   // Avengers: Endgame
                            { x: 350, y: 5.6 },   // Avatar: The Way of Water
                            { x: 245, y: 7.5 },   // Star Wars: The Force Awakens
                            { x: 300, y: 5.8 },   // Avengers: Infinity War
                            { x: 260, y: 5.4 },   // The Lion King
                            { x: 220, y: 5.9 },   // The Avengers
                            { x: 250, y: 4.6 },   // Captain America: Civil War
                            { x: 275, y: 3.9 },   // Star Wars: The Rise of Skywalker
                            { x: 200, y: 10.3 }   // Titanic
                        ],
                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        pointRadius: 8,
                        pointHoverRadius: 10
                    },
                    {
                        label: 'Mid Budget ($100M-$200M)',
                        data: [
                            { x: 200, y: 8.6 },   // Spider-Man: No Way Home
                            { x: 150, y: 10.2 },  // Jurassic World
                            { x: 190, y: 7.0 },   // Furious 7
                            { x: 160, y: 6.1 },   // Captain Marvel
                            { x: 183, y: 4.8 },   // Aladdin
                            { x: 170, y: 6.7 },   // Jurassic World: Fallen Kingdom
                            { x: 150, y: 7.6 },   // Frozen
                            { x: 160, y: 6.9 },   // Beauty and the Beast
                            { x: 150, y: 8.7 },   // Frozen II
                            { x: 175, y: 5.5 }    // Minions
                        ],
                        backgroundColor: 'rgba(54, 162, 235, 0.8)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        pointRadius: 8,
                        pointHoverRadius: 10
                    },
                    {
                        label: 'Low Budget (<$100M)',
                        data: [
                            { x: 94, y: 11.2 },   // The Lord of the Rings: The Return of the King
                            { x: 63, y: 16.7 },   // Jurassic Park
                            { x: 74, y: 14.7 },   // Minions
                            { x: 55, y: 18.5 },   // Joker
                            { x: 93, y: 9.8 },    // Despicable Me 2
                            { x: 80, y: 12.1 },   // Despicable Me 3
                            { x: 75, y: 13.2 },   // The Secret Life of Pets
                            { x: 90, y: 8.9 },    // Finding Nemo
                            { x: 95, y: 7.8 },    // Shrek 2
                            { x: 58, y: 15.2 }    // Bohemian Rhapsody
                        ],
                        backgroundColor: 'rgba(75, 192, 192, 0.8)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        pointRadius: 8,
                        pointHoverRadius: 10
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Budget: $${context.raw.x}M, ROI: ${context.raw.y.toFixed(1)}x`;
                            }
                        }
                    },
                    datalabels: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Production Budget (in millions $)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Return on Investment (ROI)'
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing ROI Distribution Chart:', error);
    }
}

// ===== GENRE ANALYSIS CHARTS =====

// Genre Distribution Chart
function initGenreDistributionChart() {
    try {
        const ctx = document.getElementById('genreDistributionChart');
        if (!ctx) {
            console.warn('Canvas element genreDistributionChart not found');
            return;
        }
        
        const chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Action', 'Adventure', 'Animation', 'Comedy', 'Drama', 'Fantasy', 'Family', 'Sci-Fi', 'Thriller', 'Crime'],
                datasets: [
                    {
                        data: [30, 22, 12, 10, 8, 6, 5, 15, 4, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(153, 102, 255, 0.7)',
                            'rgba(255, 159, 64, 0.7)',
                            'rgba(199, 199, 199, 0.7)',
                            'rgba(83, 102, 255, 0.7)',
                            'rgba(40, 167, 69, 0.7)',
                            'rgba(220, 53, 69, 0.7)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(199, 199, 199, 1)',
                            'rgba(83, 102, 255, 1)',
                            'rgba(40, 167, 69, 1)',
                            'rgba(220, 53, 69, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        formatter: (value, ctx) => {
                            let sum = 0;
                            let dataArr = ctx.chart.data.datasets[0].data;
                            dataArr.map(data => {
                                sum += data;
                            });
                            let percentage = (value*100 / sum).toFixed(1)+"%";
                            return percentage;
                        },
                        color: '#fff',
                        font: {
                            weight: 'bold',
                            size: 12
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing Genre Distribution Chart:', error);
    }
}

// Average ROI by Genre Chart
function initGenreRoiChart() {
    try {
        const ctx = document.getElementById('genreRoiChart');
        if (!ctx) {
            console.warn('Canvas element genreRoiChart not found');
            return;
        }
        
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Animation', 'Family', 'Sci-Fi', 'Adventure', 'Action', 'Comedy', 'Fantasy', 'Drama', 'Thriller', 'Crime'],
                datasets: [
                    {
                        label: 'Average ROI',
                        data: [9.8, 8.5, 7.2, 6.8, 6.5, 5.9, 5.2, 4.8, 4.2, 3.9],
                        backgroundColor: [
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(199, 199, 199, 0.7)',
                            'rgba(83, 102, 255, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(255, 159, 64, 0.7)',
                            'rgba(153, 102, 255, 0.7)',
                            'rgba(40, 167, 69, 0.7)',
                            'rgba(220, 53, 69, 0.7)'
                        ],
                        borderColor: [
                            'rgba(220, 53, 69, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(83, 102, 255, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(40, 167, 69, 1)',
                            'rgba(199, 199, 199, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                        formatter: function(value) {
                            return value.toFixed(1) + 'x';
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Return on Investment (ROI)'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing Genre ROI Chart:', error);
    }
}

// Genre Performance Over Time Chart
function initGenreTimeChart() {
    try {
        const ctx = document.getElementById('genreTimeChart');
        if (!ctx) {
            console.warn('Canvas element genreTimeChart not found');
            return;
        }
        
        window.genreTimeChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1997', '2003', '2009', '2012', '2015', '2017', '2019', '2021', '2022', '2023'],
                datasets: [
                    {
                        label: 'Action/Adventure: Average Revenue (in millions $)',
                        data: [1200, 950, 2200, 1500, 1800, 1400, 1900, 1700, 2100, 1600],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Animation/Family: Average Revenue (in millions $)',
                        data: [800, 1100, 1500, 1300, 1700, 1600, 1800, 1500, 1900, 1400],
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Drama/Thriller: Average Revenue (in millions $)',
                        data: [600, 700, 900, 800, 1000, 950, 1100, 1200, 1300, 1100],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Average Revenue (in millions $)'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing Genre Time Chart:', error);
    }
}

// ===== TREND ANALYSIS CHARTS =====

// Box Office Trends Chart
function initBoxOfficeTrendChart() {
    try {
        const ctx = document.getElementById('boxOfficeTrendChart');
        if (!ctx) {
            console.warn('Canvas element boxOfficeTrendChart not found');
            return;
        }
        
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1997', '2000', '2003', '2006', '2009', '2012', '2015', '2018', '2021', '2023'],
                datasets: [
                    {
                        label: 'Average Domestic Gross (in millions $)',
                        data: [350, 380, 420, 450, 480, 520, 550, 580, 520, 540],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Average Foreign Gross (in millions $)',
                        data: [400, 450, 520, 600, 750, 900, 1050, 1200, 1100, 1150],
                        borderColor: 'rgba(255, 159, 64, 1)',
                        backgroundColor: 'rgba(255, 159, 64, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Average Budget (in millions $)',
                        data: [120, 140, 160, 180, 200, 220, 240, 260, 280, 290],
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Amount (in millions $)'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing Box Office Trend Chart:', error);
    }
}

// Seasonal Performance Chart
function initSeasonalPerformanceChart() {
    try {
        const ctx = document.getElementById('seasonalPerformanceChart');
        if (!ctx) {
            console.warn('Canvas element seasonalPerformanceChart not found');
            return;
        }
        
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Winter (Jan-Mar)', 'Spring (Apr-Jun)', 'Summer (Jul-Sep)', 'Fall (Oct-Dec)'],
                datasets: [
                    {
                        label: 'Average Revenue (in millions $)',
                        data: [850, 1050, 1450, 1250],
                        backgroundColor: 'rgba(54, 162, 235, 0.7)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Average ROI',
                        data: [5.2, 6.1, 7.8, 6.5],
                        backgroundColor: 'rgba(255, 99, 132, 0.7)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.raw;
                                if (context.datasetIndex === 0) {
                                    return `${label}: $${value}M`;
                                } else {
                                    return `${label}: ${value.toFixed(1)}x`;
                                }
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Value'
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing Seasonal Performance Chart:', error);
    }
}

// Budget Evolution Chart
function initBudgetEvolutionChart() {
    try {
        const ctx = document.getElementById('budgetEvolutionChart');
        if (!ctx) {
            console.warn('Canvas element budgetEvolutionChart not found');
            return;
        }
        
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1997', '2000', '2003', '2006', '2009', '2012', '2015', '2018', '2021', '2023'],
                datasets: [
                    {
                        label: 'Average Budget (in millions $)',
                        data: [120, 140, 160, 180, 200, 220, 240, 260, 280, 290],
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Highest Budget (in millions $)',
                        data: [200, 220, 250, 270, 300, 320, 350, 380, 400, 420],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Lowest Budget (in millions $)',
                        data: [60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Budget (in millions $)'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing Budget Evolution Chart:', error);
    }
}

// Rating vs. Financial Performance Chart
function initRatingPerformanceChart() {
    try {
        const ctx = document.getElementById('ratingPerformanceChart');
        if (!ctx) {
            console.warn('Canvas element ratingPerformanceChart not found');
            return;
        }
        
        const chart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Movies',
                        data: [
                            { x: 9.2, y: 11.3 },  // Avatar
                            { x: 8.4, y: 6.9 },   // Avengers: Endgame
                            { x: 7.8, y: 5.6 },   // Avatar: The Way of Water
                            { x: 7.9, y: 10.3 },  // Titanic
                            { x: 8.0, y: 7.5 },   // Star Wars: The Force Awakens
                            { x: 8.5, y: 5.8 },   // Avengers: Infinity War
                            { x: 8.7, y: 8.6 },   // Spider-Man: No Way Home
                            { x: 7.1, y: 10.2 },  // Jurassic World
                            { x: 6.9, y: 5.4 },   // The Lion King
                            { x: 8.0, y: 5.9 },   // The Avengers
                            { x: 7.5, y: 4.6 },   // Captain America: Civil War
                            { x: 6.5, y: 3.9 },   // Star Wars: The Rise of Skywalker
                            { x: 8.9, y: 11.2 },  // The Lord of the Rings: The Return of the King
                            { x: 8.2, y: 16.7 },  // Jurassic Park
                            { x: 6.4, y: 14.7 },  // Minions
                            { x: 8.4, y: 18.5 },  // Joker
                            { x: 7.4, y: 9.8 },   // Despicable Me 2
                            { x: 6.3, y: 12.1 },  // Despicable Me 3
                            { x: 6.5, y: 13.2 },  // The Secret Life of Pets
                            { x: 8.2, y: 8.9 },   // Finding Nemo
                            { x: 7.3, y: 7.8 },   // Shrek 2
                            { x: 8.0, y: 15.2 }   // Bohemian Rhapsody
                        ],
                        backgroundColor: function(context) {
                            const value = context.raw.y;
                            if (value < 5) return 'rgba(255, 99, 132, 0.7)';
                            if (value < 10) return 'rgba(54, 162, 235, 0.7)';
                            return 'rgba(75, 192, 192, 0.7)';
                        },
                        borderColor: function(context) {
                            const value = context.raw.y;
                            if (value < 5) return 'rgba(255, 99, 132, 1)';
                            if (value < 10) return 'rgba(54, 162, 235, 1)';
                            return 'rgba(75, 192, 192, 1)';
                        },
                        borderWidth: 1,
                        pointRadius: 8,
                        pointHoverRadius: 10
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Rating: ${context.raw.x.toFixed(1)}, ROI: ${context.raw.y.toFixed(1)}x`;
                            }
                        }
                    },
                    datalabels: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Critic Rating (0-10)'
                        },
                        min: 6,
                        max: 10
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Return on Investment (ROI)'
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing Rating Performance Chart:', error);
    }
}

// Popularity Impact Chart
function initPopularityImpactChart() {
    try {
        const ctx = document.getElementById('popularityImpactChart');
        if (!ctx) {
            console.warn('Canvas element popularityImpactChart not found');
            return;
        }
        
        const chart = new Chart(ctx, {
            type: 'bubble',
            data: {
                datasets: [
                    {
                        label: 'Action/Adventure',
                        data: [
                            { x: 85, y: 2200, r: 15 },
                            { x: 78, y: 1800, r: 12 },
                            { x: 92, y: 2500, r: 18 },
                            { x: 65, y: 1500, r: 10 },
                            { x: 88, y: 2100, r: 14 }
                        ],
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Animation/Family',
                        data: [
                            { x: 90, y: 1900, r: 14 },
                            { x: 82, y: 1700, r: 12 },
                            { x: 95, y: 2200, r: 16 },
                            { x: 75, y: 1400, r: 10 },
                            { x: 87, y: 1800, r: 13 }
                        ],
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Drama/Thriller',
                        data: [
                            { x: 72, y: 1200, r: 10 },
                            { x: 68, y: 1000, r: 8 },
                            { x: 80, y: 1500, r: 12 },
                            { x: 60, y: 800, r: 7 },
                            { x: 75, y: 1300, r: 11 }
                        ],
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: Popularity ${context.raw.x}%, Revenue $${context.raw.y}M, Budget $${context.raw.r * 10}M`;
                            }
                        }
                    },
                    datalabels: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Audience Popularity Score (%)'
                        },
                        min: 50,
                        max: 100
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Revenue (in millions $)'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing Popularity Impact Chart:', error);
    }
}

// Performance Correlation Matrix Chart
function initCorrelationMatrixChart() {
    try {
        const ctx = document.getElementById('correlationMatrixChart');
        if (!ctx) {
            console.warn('Canvas element correlationMatrixChart not found');
            return;
        }
        
        // Set canvas parent to have proper padding
        ctx.parentElement.style.padding = '20px';
        
        // Create a custom heatmap visualization using HTML
        const container = document.createElement('div');
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
        container.style.padding = '20px';
        container.style.boxSizing = 'border-box';
        
        // Replace canvas with our custom container
        ctx.parentElement.appendChild(container);
        ctx.style.display = 'none';
        
        // Data for the correlation matrix
        const labels = ['Budget', 'Runtime', 'Rating', 'Popularity', 'Release Month'];
        const correlationData = [
            [1.00, 0.65, 0.35, 0.55, 0.15],  // Budget
            [0.65, 1.00, 0.45, 0.30, 0.10],  // Runtime
            [0.35, 0.45, 1.00, 0.70, 0.25],  // Rating
            [0.55, 0.30, 0.70, 1.00, 0.40],  // Popularity
            [0.15, 0.10, 0.25, 0.40, 1.00]   // Release Month
        ];
        
        // Create the matrix table
        const table = document.createElement('table');
        table.style.borderCollapse = 'separate';
        table.style.borderSpacing = '3px';
        table.style.width = '100%';
        table.style.maxWidth = '500px';
        table.style.height = 'auto';
        table.style.margin = '0 auto';
        table.style.fontFamily = "'Poppins', sans-serif";
        
        // Create header row
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        // Empty cell for top-left corner
        const cornerCell = document.createElement('th');
        cornerCell.style.width = '80px';
        cornerCell.style.height = '40px';
        cornerCell.style.padding = '8px';
        cornerCell.style.textAlign = 'center';
        cornerCell.style.fontWeight = 'bold';
        headerRow.appendChild(cornerCell);
        
        // Add column headers
        labels.forEach(label => {
            const th = document.createElement('th');
            th.textContent = label;
            th.style.width = '80px';
            th.style.padding = '8px';
            th.style.textAlign = 'center';
            th.style.fontWeight = 'bold';
            th.style.color = '#333';
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Create table body
        const tbody = document.createElement('tbody');
        
        // Add data rows
        labels.forEach((rowLabel, i) => {
            const row = document.createElement('tr');
            
            // Add row header
            const rowHeader = document.createElement('th');
            rowHeader.textContent = rowLabel;
            rowHeader.style.padding = '8px';
            rowHeader.style.textAlign = 'right';
            rowHeader.style.fontWeight = 'bold';
            rowHeader.style.color = '#333';
            row.appendChild(rowHeader);
            
            // Add data cells
            correlationData[i].forEach((value, j) => {
                const td = document.createElement('td');
                td.textContent = value.toFixed(2);
                td.style.width = '80px';
                td.style.height = '40px';
                td.style.padding = '0';
                td.style.textAlign = 'center';
                td.style.fontWeight = 'bold';
                
                // Set background color based on correlation value
                const backgroundColor = getHeatmapColor(value);
                td.style.backgroundColor = backgroundColor;
                
                // Set text color based on background darkness
                td.style.color = value > 0.5 ? 'white' : '#333';
                
                // Add border radius for a more modern look
                td.style.borderRadius = '4px';
                
                // Add tooltip
                td.title = `${rowLabel} to ${labels[j]}: ${value.toFixed(2)}`;
                
                // Add hover effect
                td.style.transition = 'transform 0.2s ease';
                td.onmouseover = function() {
                    this.style.transform = 'scale(1.05)';
                    this.style.boxShadow = '0 0 5px rgba(0,0,0,0.2)';
                    this.style.zIndex = '1';
                };
                td.onmouseout = function() {
                    this.style.transform = 'scale(1)';
                    this.style.boxShadow = 'none';
                    this.style.zIndex = '0';
                };
                
                row.appendChild(td);
            });
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        container.appendChild(table);
        
        // Add a title
        const title = document.createElement('h4');
        title.textContent = 'Feature Correlation Matrix';
        title.style.marginBottom = '15px';
        title.style.marginTop = '0';
        title.style.color = '#333';
        title.style.fontWeight = 'bold';
        container.insertBefore(title, table);
        
        // Add a legend
        const legend = document.createElement('div');
        legend.style.display = 'flex';
        legend.style.alignItems = 'center';
        legend.style.justifyContent = 'center';
        legend.style.marginTop = '15px';
        legend.style.gap = '10px';
        
        const legendValues = [0.0, 0.25, 0.5, 0.75, 1.0];
        legendValues.forEach(value => {
            const item = document.createElement('div');
            item.style.display = 'flex';
            item.style.alignItems = 'center';
            
            const colorBox = document.createElement('div');
            colorBox.style.width = '15px';
            colorBox.style.height = '15px';
            colorBox.style.backgroundColor = getHeatmapColor(value);
            colorBox.style.marginRight = '5px';
            colorBox.style.borderRadius = '2px';
            
            const label = document.createElement('span');
            label.textContent = value.toFixed(2);
            label.style.fontSize = '12px';
            label.style.color = '#666';
            
            item.appendChild(colorBox);
            item.appendChild(label);
            legend.appendChild(item);
        });
        
        container.appendChild(legend);
        
        // Helper function to get heatmap color
        function getHeatmapColor(value) {
            // Use a color scheme that matches the site's theme (red tones)
            if (value < 0.2) return 'rgba(255, 99, 132, 0.2)';  // Light red
            if (value < 0.4) return 'rgba(255, 99, 132, 0.4)';  // Medium red
            if (value < 0.6) return 'rgba(255, 99, 132, 0.6)';  // Darker red
            if (value < 0.8) return 'rgba(255, 99, 132, 0.8)';  // Even darker red
            return 'rgba(255, 99, 132, 1.0)';                   // Full red
        }
    } catch (error) {
        console.error('Error initializing Correlation Matrix Chart:', error);
    }
}

// Studio Market Share Chart
function initStudioMarketShareChart() {
    try {
        const ctx = document.getElementById('studioMarketShareChart');
        if (!ctx) {
            console.warn('Canvas element studioMarketShareChart not found');
            return;
        }
        
        const chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Disney', 'Warner Bros.', 'Universal', 'Sony/Columbia', '20th Century Fox', 'Paramount', 'Other'],
                datasets: [
                    {
                        data: [28, 18, 15, 12, 10, 8, 9],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(153, 102, 255, 0.7)',
                            'rgba(255, 159, 64, 0.7)',
                            'rgba(199, 199, 199, 0.7)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(199, 199, 199, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        formatter: (value, ctx) => {
                            let sum = 0;
                            let dataArr = ctx.chart.data.datasets[0].data;
                            dataArr.map(data => {
                                sum += data;
                            });
                            let percentage = (value*100 / sum).toFixed(1)+"%";
                            return percentage;
                        },
                        color: '#fff',
                        font: {
                            weight: 'bold',
                            size: 12
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing Studio Market Share Chart:', error);
    }
}

// Average ROI by Studio Chart
function initStudioRoiChart() {
    try {
        const ctx = document.getElementById('studioRoiChart');
        if (!ctx) {
            console.warn('Canvas element studioRoiChart not found');
            return;
        }
        
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Disney', 'Warner Bros.', 'Universal', 'Sony/Columbia', '20th Century Fox', 'Paramount', 'Lionsgate'],
                datasets: [
                    {
                        label: 'Average ROI',
                        data: [7.2, 5.8, 6.5, 4.9, 5.2, 4.5, 8.1],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(153, 102, 255, 0.7)',
                            'rgba(255, 159, 64, 0.7)',
                            'rgba(40, 167, 69, 0.7)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(40, 167, 69, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                        formatter: function(value) {
                            return value.toFixed(1) + 'x';
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Return on Investment (ROI)'
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing Studio ROI Chart:', error);
    }
}

// Studio Performance Comparison Chart
function initStudioComparisonChart() {
    try {
        const ctx = document.getElementById('studioComparisonChart');
        if (!ctx) {
            console.warn('Canvas element studioComparisonChart not found');
            return;
        }
        
        const chart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Box Office', 'ROI', 'Critical Reception', 'Budget Efficiency', 'Franchise Success', 'International Appeal'],
                datasets: [
                    {
                        label: 'Disney',
                        data: [9.5, 7.2, 8.0, 7.5, 9.0, 9.2],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
                    },
                    {
                        label: 'Warner Bros.',
                        data: [8.0, 5.8, 7.5, 6.8, 7.5, 7.8],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
                    },
                    {
                        label: 'Universal',
                        data: [7.8, 6.5, 7.0, 8.0, 7.2, 8.5],
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(255, 206, 86, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(255, 206, 86, 1)'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 10
                    }
                },
                plugins: {
                    datalabels: {
                        display: false
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing Studio Comparison Chart:', error);
    }
}

// Feature Importance Chart
function initFeatureImportanceChart() {
    try {
        const ctx = document.getElementById('featureImportanceChart');
        if (!ctx) {
            console.warn('Canvas element featureImportanceChart not found');
            return;
        }
        
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Franchise Status', 'Budget', 'Star Power', 'Release Season', 'Genre', 'Studio', 'Runtime', 'Rating', 'Director'],
                datasets: [
                    {
                        label: 'Feature Importance',
                        data: [0.85, 0.78, 0.72, 0.65, 0.58, 0.52, 0.45, 0.38, 0.32],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(153, 102, 255, 0.7)',
                            'rgba(255, 159, 64, 0.7)',
                            'rgba(199, 199, 199, 0.7)',
                            'rgba(83, 102, 255, 0.7)',
                            'rgba(40, 167, 69, 0.7)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(199, 199, 199, 1)',
                            'rgba(83, 102, 255, 1)',
                            'rgba(40, 167, 69, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                        formatter: function(value) {
                            return value.toFixed(2);
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Importance Score (0-1)'
                        },
                        beginAtZero: true,
                        max: 1
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing Feature Importance Chart:', error);
    }
}

// ===== PREDICTION GAUGES =====
function updatePredictionGauges(roiValue, successProbability) {
    try {
        // ROI Gauge
        const roiCanvas = document.getElementById('roiPredictionGauge');
        if (roiCanvas) {
            const roiCtx = roiCanvas.getContext('2d');
            if (window.roiGaugeChart) {
                window.roiGaugeChart.destroy();
            }
            
            window.roiGaugeChart = new Chart(roiCtx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [roiValue, 6 - roiValue],
                        backgroundColor: [
                            getROIColor(roiValue),
                            '#f1f1f1'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    cutout: '80%',
                    circumference: 180,
                    rotation: 270,
                    plugins: {
                        tooltip: {
                            enabled: false
                        },
                        legend: {
                            display: false
                        },
                        datalabels: {
                            formatter: () => '',
                            display: false
                        }
                    },
                    animation: {
                        animateRotate: true,
                        animateScale: true
                    }
                }
            });
            
            // Add text in center
            const fontSize = roiCanvas.width / 10;
            roiCtx.font = `${fontSize}px Montserrat`;
            roiCtx.textAlign = 'center';
            roiCtx.textBaseline = 'middle';
            roiCtx.fillStyle = '#333';
            roiCtx.fillText(`${roiValue.toFixed(1)}x`, roiCanvas.width / 2, roiCanvas.height / 2 + fontSize / 2);
        }
        
        // Success Probability Gauge
        const successCanvas = document.getElementById('successPredictionGauge');
        if (successCanvas) {
            const successCtx = successCanvas.getContext('2d');
            if (window.successGaugeChart) {
                window.successGaugeChart.destroy();
            }
            
            window.successGaugeChart = new Chart(successCtx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [successProbability, 1 - successProbability],
                        backgroundColor: [
                            getSuccessProbabilityColor(successProbability),
                            '#f1f1f1'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    cutout: '80%',
                    circumference: 180,
                    rotation: 270,
                    plugins: {
                        tooltip: {
                            enabled: false
                        },
                        legend: {
                            display: false
                        },
                        datalabels: {
                            formatter: () => '',
                            display: false
                        }
                    },
                    animation: {
                        animateRotate: true,
                        animateScale: true
                    }
                }
            });
            
            // Add text in center
            const fontSize = successCanvas.width / 10;
            successCtx.font = `${fontSize}px Montserrat`;
            successCtx.textAlign = 'center';
            successCtx.textBaseline = 'middle';
            successCtx.fillStyle = '#333';
            successCtx.fillText(`${Math.round(successProbability * 100)}%`, successCanvas.width / 2, successCanvas.height / 2 + fontSize / 2);
        }
    } catch (error) {
        console.error('Error updating prediction gauges:', error);
    }
}

// Get color based on ROI value
function getROIColor(roi) {
    if (roi < 1) return '#f44336'; // Red
    if (roi < 2) return '#ff9800'; // Orange
    if (roi < 3) return '#ffc107'; // Amber
    if (roi < 4) return '#8bc34a'; // Light Green
    return '#4caf50'; // Green
}

// Get color based on success probability
function getSuccessProbabilityColor(probability) {
    if (probability < 0.3) return '#f44336'; // Red
    if (probability < 0.5) return '#ff9800'; // Orange
    if (probability < 0.7) return '#ffc107'; // Amber
    if (probability < 0.85) return '#8bc34a'; // Light Green
    return '#4caf50'; // Green
}

// ===== CHART FILTER UPDATES =====
function updateChartByFilter(filter) {
    try {
        // This would update the chart based on the selected filter
        // In a real application, this would fetch new data or reconfigure the chart
        console.log(`Chart filter changed to: ${filter}`);
        
        // Example implementation for genre performance over time chart
        if (window.genreTimeChart) {
            let data;
            let label;
            
            switch (filter) {
                case 'revenue':
                    data = [
                        [1200, 950, 2200, 1500, 1800, 1400, 1900, 1700, 2100, 1600],
                        [800, 1100, 1500, 1300, 1700, 1600, 1800, 1500, 1900, 1400],
                        [600, 700, 900, 800, 1000, 950, 1100, 1200, 1300, 1100]
                    ];
                    label = 'Average Revenue (in millions $)';
                    break;
                case 'roi':
                    data = [
                        [5.2, 4.8, 6.5, 5.9, 6.2, 5.5, 6.8, 6.1, 5.8, 5.4],
                        [7.5, 8.2, 9.1, 8.5, 9.8, 9.2, 10.5, 9.5, 10.2, 8.8],
                        [4.2, 4.5, 5.1, 4.8, 5.5, 5.2, 5.8, 6.2, 6.5, 5.9]
                    ];
                    label = 'Average ROI';
                    break;
                case 'count':
                    data = [
                        [12, 15, 18, 22, 25, 28, 32, 35, 38, 42],
                        [8, 10, 12, 15, 18, 20, 22, 25, 28, 30],
                        [15, 18, 20, 22, 25, 28, 30, 32, 35, 38]
                    ];
                    label = 'Movie Count';
                    break;
                default:
                    return;
            }
            
            // Update datasets
            window.genreTimeChart.data.datasets.forEach((dataset, i) => {
                dataset.data = data[i];
                dataset.label = dataset.label.split(':')[0] + ': ' + label;
            });
            
            // Update y-axis label
            window.genreTimeChart.options.scales.y.title.text = label;
            
            // Update chart
            window.genreTimeChart.update();
        }
    } catch (error) {
        console.error('Error updating chart by filter:', error);
    }
}