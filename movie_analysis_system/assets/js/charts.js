// ===== CHARTS INITIALIZATION =====
function initializeAllCharts() {
    console.log('Initializing all charts...');
    
    // Initialize all charts with error handling
    try {
        // Define custom chart types if needed
        if (!Chart.controllers || !Chart.controllers.heatmap) {
            console.log('Using bubble chart for heatmap visualization');
        }
        
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
        initializeAllCharts();
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
}

// ROI Distribution Chart
function initRoiDistributionChart() {
    const ctx = document.getElementById('roiDistributionChart');
    if (!ctx) return;
    
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
}

// ===== GENRE ANALYSIS CHARTS =====

// Genre Distribution Chart
function initGenreDistributionChart() {
    const ctx = document.getElementById('genreDistributionChart');
    if (!ctx) return;
    
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
}

// Average ROI by Genre Chart
function initGenreRoiChart() {
    const ctx = document.getElementById('genreRoiChart');
    if (!ctx) return;
    
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
}

// Genre Performance Over Time Chart
function initGenreTimeChart() {
    const ctx = document.getElementById('genreTimeChart');
    if (!ctx) return;
    
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
                    data: [800, 1100, 1300, 1200, 1500, 1100, 1600, 1300, 1400, 1500],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Sci-Fi/Fantasy: Average Revenue (in millions $)',
                    data: [900, 1000, 2300, 1400, 1900, 1300, 1700, 1500, 2000, 1400], 220, 240, 260],
                    borderColor: 'rgba(255, 206, 86, 1)',
                    backgroundColor: 'rgba(255, 206, 86, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Sci-Fi: Average Revenue (in millions $)',
                    data: [100, 120, 140, 160, 190, 220, 250, 280, 310],
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
                y: {
                    title: {
                        display: true,
                        text: 'Average Revenue (in millions $)'
                    },
                    beginAtZero: true
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            }
        }
    });
}

// ===== TREND ANALYSIS CHARTS =====

// Box Office Trends Chart
function initBoxOfficeTrendChart() {
    const ctx = document.getElementById('boxOfficeTrendChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1997', '2003', '2009', '2012', '2015', '2017', '2019', '2021', '2022', '2023'],
            datasets: [
                {
                    label: 'Domestic Gross',
                    data: [0.67, 0.38, 0.79, 0.62, 0.94, 0.62, 0.54, 0.81, 0.69, 0.63],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'International Gross',
                    data: [1.59, 0.77, 2.14, 0.90, 1.14, 0.71, 1.12, 1.11, 1.64, 0.80],
                    borderColor: 'rgba(255, 159, 64, 1)',
                    backgroundColor: 'rgba(255, 159, 64, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Total Gross',
                    data: [2.26, 1.15, 2.93, 1.52, 2.08, 1.33, 1.66, 1.92, 2.33, 1.43],
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.1)',
                    borderWidth: 3,
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
                y: {
                    title: {
                        display: true,
                        text: 'Box Office (in billions $)'
                    },
                    beginAtZero: false
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            }
        }
    });
}

// Seasonal Performance Chart
function initSeasonalPerformanceChart() {
    const ctx = document.getElementById('seasonalPerformanceChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Average Revenue (in millions $)',
                    data: [950, 1100, 1250, 1400, 1850, 1750, 1900, 1650, 1200, 1350, 1700, 1800],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
                },
                {
                    label: 'Average ROI',
                    data: [4.8, 5.2, 5.5, 6.0, 7.5, 7.2, 8.0, 6.8, 5.0, 5.8, 7.0, 7.8],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
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
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0
                }
            }
        }
    });
}

// Budget Evolution Chart
function initBudgetEvolutionChart() {
    const ctx = document.getElementById('budgetEvolutionChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1997', '2003', '2009', '2012', '2015', '2017', '2019', '2021', '2022', '2023'],
            datasets: [
                {
                    label: 'Average Budget - Blockbusters',
                    data: [200, 94, 237, 220, 245, 317, 308, 200, 350, 145],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Average Budget - Mid-tier',
                    data: [150, 80, 170, 160, 150, 180, 175, 160, 170, 130],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Average Budget - Low Budget',
                    data: [63, 55, 74, 80, 75, 90, 85, 58, 70, 65],
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
                y: {
                    title: {
                        display: true,
                        text: 'Average Budget (in millions $)'
                    },
                    beginAtZero: false
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            }
        }
    });
}

// ===== PERFORMANCE METRICS CHARTS =====

// Rating vs. Financial Performance Chart
function initRatingPerformanceChart() {
    const ctx = document.getElementById('ratingPerformanceChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [
                {
                    label: 'Movies',
                    data: [
                        { x: 5.1, y: 0.1, r: 10 },
                        { x: 5.5, y: 1.1, r: 15 },
                        { x: 5.8, y: 1.2, r: 12 },
                        { x: 6.0, y: 1.8, r: 18 },
                        { x: 6.2, y: 1.2, r: 14 },
                        { x: 6.4, y: 2.5, r: 20 },
                        { x: 6.6, y: 3.2, r: 22 },
                        { x: 6.9, y: 5.1, r: 25 },
                        { x: 7.2, y: 4.2, r: 20 },
                        { x: 7.4, y: 5.5, r: 30 },
                        { x: 7.6, y: 5.8, r: 28 },
                        { x: 7.8, y: 4.5, r: 22 },
                        { x: 8.0, y: 6.7, r: 35 },
                        { x: 8.3, y: 5.8, r: 32 }
                    ],
                    backgroundColor: function(context) {
                        const value = context.raw.x;
                        const alpha = 0.7;
                        
                        if (value < 6.0) return `rgba(255, 99, 132, ${alpha})`;
                        if (value < 7.0) return `rgba(255, 159, 64, ${alpha})`;
                        if (value < 8.0) return `rgba(75, 192, 192, ${alpha})`;
                        return `rgba(54, 162, 235, ${alpha})`;
                    }
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
                            return `Rating: ${context.raw.x.toFixed(1)}, ROI: ${context.raw.y.toFixed(1)}x, Revenue: $${context.raw.r * 10}M`;
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
                        text: 'Rating (0-10)'
                    },
                    min: 5,
                    max: 8.5
                },
                y: {
                    title: {
                        display: true,
                        text: 'Return on Investment (ROI)'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Popularity Impact Chart
function initPopularityImpactChart() {
    const ctx = document.getElementById('popularityImpactChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'High Budget (>$200M)',
                    data: [
                        { x: 15000, y: 5.5 },
                        { x: 18000, y: 5.8 },
                        { x: 12000, y: 3.2 },
                        { x: 14000, y: 3.5 },
                        { x: 19000, y: 6.7 },
                        { x: 13000, y: 4.2 },
                        { x: 16000, y: 5.1 }
                    ],
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    pointRadius: 8,
                    pointHoverRadius: 10
                },
                {
                    label: 'Mid Budget ($100M-$200M)',
                    data: [
                        { x: 8000, y: 4.5 },
                        { x: 10000, y: 3.8 },
                        { x: 7000, y: 5.2 },
                        { x: 9000, y: 2.9 },
                        { x: 11000, y: 4.1 },
                        { x: 6500, y: 3.5 },
                        { x: 9500, y: 4.8 }
                    ],
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    pointRadius: 8,
                    pointHoverRadius: 10
                },
                {
                    label: 'Low Budget (<$100M)',
                    data: [
                        { x: 3000, y: 6.5 },
                        { x: 2000, y: 8.2 },
                        { x: 4000, y: 5.5 },
                        { x: 2500, y: 7.1 },
                        { x: 1500, y: 10.3 },
                        { x: 3500, y: 6.8 },
                        { x: 1000, y: 12.5 }
                    ],
                    backgroundColor: 'rgba(75, 192, 192, 0.7)',
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
                            return `Votes: ${context.raw.x.toLocaleString()}, ROI: ${context.raw.y.toFixed(1)}x`;
                        }
                    }
                },
                datalabels: {
                    display: false
                }
            },
            scales: {
                x: {
                    type: 'logarithmic',
                    title: {
                        display: true,
                        text: 'Vote Count (Popularity)'
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
}

// Correlation Matrix Chart
function initCorrelationMatrixChart() {
    const ctx = document.getElementById('correlationMatrixChart');
    if (!ctx) return;
    
    // Create correlation matrix data based on Highest Hollywood Grossing Movies dataset
    const labels = ['Budget', 'Domestic', 'International', 'Worldwide', 'ROI', 'Year'];
    const correlationData = [
        [1.0, 0.65, 0.72, 0.70, -0.45, 0.58],   // Budget
        [0.65, 1.0, 0.85, 0.92, 0.25, 0.42],    // Domestic
        [0.72, 0.85, 1.0, 0.96, 0.18, 0.48],    // International
        [0.70, 0.92, 0.96, 1.0, 0.22, 0.45],    // Worldwide
        [-0.45, 0.25, 0.18, 0.22, 1.0, -0.15],  // ROI
        [0.58, 0.42, 0.48, 0.45, -0.15, 1.0]    // Year
    ];
    
    // Convert to bubble chart data format
    const datasets = [];
    
    for (let i = 0; i < labels.length; i++) {
        const rowData = [];
        for (let j = 0; j < labels.length; j++) {
            rowData.push({
                x: j,
                y: i,
                r: Math.abs(correlationData[i][j]) * 20,
                v: correlationData[i][j]  // Store the actual correlation value
            });
        }
        
        datasets.push({
            label: labels[i],
            data: rowData,
            backgroundColor: function(context) {
                const value = context.raw.v;
                return getCorrelationColor(value);
            }
        });
    }
    
    const chart = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            const i = context[0].raw.y;
                            const j = context[0].raw.x;
                            return `${labels[i]} vs ${labels[j]}`;
                        },
                        label: function(context) {
                            return `Correlation: ${context.raw.v.toFixed(2)}`;
                        }
                    }
                },
                datalabels: {
                    formatter: function(value) {
                        return value.v.toFixed(2);
                    },
                    color: function(context) {
                        const value = context.dataset.data[context.dataIndex].v;
                        return Math.abs(value) > 0.5 ? '#fff' : '#000';
                    },
                    font: {
                        weight: 'bold',
                        size: 10
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    min: -0.5,
                    max: labels.length - 0.5,
                    ticks: {
                        callback: function(value) {
                            return labels[value];
                        },
                        stepSize: 1
                    },
                    grid: {
                        display: true
                    },
                    title: {
                        display: false
                    }
                },
                y: {
                    type: 'linear',
                    min: -0.5,
                    max: labels.length - 0.5,
                    ticks: {
                        callback: function(value) {
                            return labels[value];
                        },
                        stepSize: 1
                    },
                    grid: {
                        display: true
                    },
                    title: {
                        display: false
                    }
                }
            }
        }
    });
}

// Helper function for correlation color
function getCorrelationColor(value) {
    if (value >= 0.8) return 'rgba(0, 0, 255, 0.7)';
    if (value >= 0.5) return 'rgba(0, 191, 255, 0.7)';
    if (value >= 0.2) return 'rgba(173, 216, 230, 0.7)';
    if (value >= -0.2) return 'rgba(255, 255, 255, 0.7)';
    if (value >= -0.5) return 'rgba(255, 192, 203, 0.7)';
    if (value >= -0.8) return 'rgba(255, 105, 180, 0.7)';
    return 'rgba(255, 0, 0, 0.7)';
}

// ===== STUDIO COMPARISON CHARTS =====

// Studio Market Share Chart
function initStudioMarketShareChart() {
    const ctx = document.getElementById('studioMarketShareChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Disney', 'Twentieth Century Fox', 'Warner Bros', 'Universal', 'Sony', 'Paramount', 'Other'],
            datasets: [
                {
                    data: [30, 22, 16, 14, 8, 6, 4],
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
                    formatter: (value) => {
                        return value + '%';
                    },
                    color: '#fff',
                    font: {
                        weight: 'bold'
                    }
                }
            }
        }
    });
}

// Average ROI by Studio Chart
function initStudioRoiChart() {
    const ctx = document.getElementById('studioRoiChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Disney', 'Twentieth Century Fox', 'Universal', 'Warner Bros', 'Sony', 'Paramount', 'Other'],
            datasets: [
                {
                    label: 'Average ROI',
                    data: [7.8, 6.9, 6.2, 5.5, 4.8, 4.3, 3.9],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(255, 159, 64, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(199, 199, 199, 0.7)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
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
                    formatter: (value) => {
                        return value.toFixed(1) + 'x';
                    },
                    anchor: 'end',
                    align: 'top'
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Return on Investment (ROI)'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Studio Performance Comparison Chart
function initStudioComparisonChart() {
    const ctx = document.getElementById('studioComparisonChart');
    if (!ctx) return;
    
    window.studioComparisonChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Box Office', 'ROI', 'Rating', 'Budget Efficiency', 'International Appeal', 'Franchise Success'],
            datasets: [
                {
                    label: 'Disney',
                    data: [95, 90, 85, 80, 95, 95],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
                },
                {
                    label: 'Twentieth Century Fox',
                    data: [85, 85, 80, 75, 90, 80],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
                },
                {
                    label: 'Warner Bros',
                    data: [80, 75, 75, 70, 80, 85],
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(255, 206, 86, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255, 206, 86, 1)'
                },
                {
                    label: 'Universal',
                    data: [75, 80, 70, 85, 75, 70],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
                    hidden: true
                },
                {
                    label: 'Paramount',
                    data: [60, 55, 60, 65, 65, 55],
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(153, 102, 255, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(153, 102, 255, 1)',
                    hidden: true
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
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });
}

// ===== PREDICTIVE ANALYTICS CHARTS =====

// Feature Importance Chart
function initFeatureImportanceChart() {
    const ctx = document.getElementById('featureImportanceChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Release Timing', 'Franchise Association', 'Genre', 'Budget', 'Star Power', 'Director', 'International Appeal', 'Marketing'],
            datasets: [
                {
                    label: 'Feature Importance (%)',
                    data: [24, 18, 15, 12, 10, 8, 7, 6],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)',
                        'rgba(199, 199, 199, 0.7)',
                        'rgba(83, 102, 255, 0.7)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(199, 199, 199, 1)',
                        'rgba(83, 102, 255, 1)'
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
                    formatter: (value) => {
                        return value + '%';
                    },
                    anchor: 'end',
                    align: 'end'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Importance (%)'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}