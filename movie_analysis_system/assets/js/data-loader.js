// ===== DATA LOADER =====
document.addEventListener('DOMContentLoaded', function() {
    // Load data from CSV files
    loadMovieData();
});

// Function to load movie data from CSV files
function loadMovieData() {
    // In a real application, this would load the actual CSV files
    // For this demo, we'll simulate the data loading
    console.log('Loading movie data from "Highest Holywood Grossing Movies.csv"...');
    
    // Simulate successful data loading
    setTimeout(() => {
        console.log('Movie data loaded successfully!');
        
        // Process the data
        processMovieData();
    }, 1000);
}

// Process the loaded movie data
function processMovieData() {
    // In a real application, this would process the actual data
    // For this demo, we'll use the sample data already in the charts
    console.log('Processing movie data...');
    
    // Simulate data processing
    setTimeout(() => {
        console.log('Movie data processed successfully!');
        
        // Update UI with processed data
        updateUIWithProcessedData();
    }, 500);
}

// Update UI with processed data
function updateUIWithProcessedData() {
    // In a real application, this would update the UI with the processed data
    console.log('Updating UI with processed data...');
    
    // For this demo, we'll simulate some data updates
    
    // Update the profit table with sample data
    updateProfitTable();
    
    // Simulate search results for initial page load
    if (document.getElementById('movieSearchButton')) {
        // Trigger a search with empty parameters to show all movies
        searchMovies('', '', '', '', 'revenue');
    }
}

// Update the profit table with sample data from Highest Holywood Grossing Movies.csv
function updateProfitTable() {
    const profitTable = document.getElementById('profitTable');
    if (!profitTable) return;
    
    const topMovies = [
        { movie: 'Avatar', year: 2009, budget: 237, revenue: 2924, profit: 2687, margin: 0.92, roi: 11.34 },
        { movie: 'Avengers: Endgame', year: 2019, budget: 356, revenue: 2799, profit: 2443, margin: 0.87, roi: 6.86 },
        { movie: 'Avatar: The Way of Water', year: 2022, budget: 350, revenue: 2320, profit: 1970, margin: 0.85, roi: 5.63 },
        { movie: 'Titanic', year: 1997, budget: 200, revenue: 2265, profit: 2065, margin: 0.91, roi: 10.33 },
        { movie: 'Star Wars: The Force Awakens', year: 2015, budget: 245, revenue: 2071, profit: 1826, margin: 0.88, roi: 7.45 },
        { movie: 'Avengers: Infinity War', year: 2018, budget: 300, revenue: 2052, profit: 1752, margin: 0.85, roi: 5.84 },
        { movie: 'Spider-Man: No Way Home', year: 2021, budget: 200, revenue: 1922, profit: 1722, margin: 0.90, roi: 8.61 },
        { movie: 'Jurassic World', year: 2015, budget: 150, revenue: 1672, profit: 1522, margin: 0.91, roi: 10.15 },
        { movie: 'The Lion King', year: 2019, budget: 260, revenue: 1663, profit: 1403, margin: 0.84, roi: 5.40 },
        { movie: 'The Avengers', year: 2012, budget: 220, revenue: 1521, profit: 1301, margin: 0.86, roi: 5.91 }
    ];
    
    let tableHTML = '';
    topMovies.forEach(movie => {
        tableHTML += `
            <tr>
                <td>${movie.movie}</td>
                <td>${movie.year}</td>
                <td>${movie.budget}</td>
                <td>${movie.revenue}</td>
                <td>${movie.profit}</td>
                <td>${movie.margin.toFixed(2)}</td>
                <td>${movie.roi.toFixed(2)}</td>
            </tr>
        `;
    });
    
    profitTable.innerHTML = tableHTML;
}

// ===== DATA PROCESSING FUNCTIONS =====

// Function to parse CSV data
function parseCSV(csvData) {
    return Papa.parse(csvData, {
        header: true,
        dynamicTyping: true
    }).data;
}

// Function to calculate average by key
function calculateAverage(data, key) {
    if (!data || data.length === 0) return 0;
    
    const sum = data.reduce((acc, item) => {
        return acc + (parseFloat(item[key]) || 0);
    }, 0);
    
    return sum / data.length;
}

// Function to group data by key
function groupBy(data, key) {
    return data.reduce((acc, item) => {
        const groupKey = item[key];
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(item);
        return acc;
    }, {});
}

// Function to calculate ROI
function calculateROI(budget, revenue) {
    if (!budget || budget === 0) return 0;
    return (revenue - budget) / budget;
}

// Function to calculate profit margin
function calculateProfitMargin(budget, revenue) {
    if (!revenue || revenue === 0) return 0;
    return (revenue - budget) / revenue;
}

// Function to get top N items by key
function getTopN(data, key, n, ascending = false) {
    const sortedData = [...data].sort((a, b) => {
        const valueA = parseFloat(a[key]) || 0;
        const valueB = parseFloat(b[key]) || 0;
        return ascending ? valueA - valueB : valueB - valueA;
    });
    
    return sortedData.slice(0, n);
}

// Function to filter data by criteria
function filterData(data, criteria) {
    return data.filter(item => {
        for (const key in criteria) {
            if (criteria[key] !== undefined && criteria[key] !== null && criteria[key] !== '') {
                if (typeof criteria[key] === 'string') {
                    // String comparison (case insensitive)
                    if (!item[key] || item[key].toString().toLowerCase() !== criteria[key].toLowerCase()) {
                        return false;
                    }
                } else if (typeof criteria[key] === 'number') {
                    // Numeric comparison
                    if (!item[key] || parseFloat(item[key]) !== criteria[key]) {
                        return false;
                    }
                } else if (Array.isArray(criteria[key])) {
                    // Array includes
                    if (!item[key] || !criteria[key].includes(item[key])) {
                        return false;
                    }
                }
            }
        }
        return true;
    });
}

// Function to calculate correlation between two arrays
function calculateCorrelation(x, y) {
    if (x.length !== y.length) {
        throw new Error('Arrays must have the same length');
    }
    
    const n = x.length;
    
    // Calculate means
    const meanX = x.reduce((sum, val) => sum + val, 0) / n;
    const meanY = y.reduce((sum, val) => sum + val, 0) / n;
    
    // Calculate covariance and standard deviations
    let covariance = 0;
    let varX = 0;
    let varY = 0;
    
    for (let i = 0; i < n; i++) {
        const diffX = x[i] - meanX;
        const diffY = y[i] - meanY;
        covariance += diffX * diffY;
        varX += diffX * diffX;
        varY += diffY * diffY;
    }
    
    covariance /= n;
    varX /= n;
    varY /= n;
    
    const stdX = Math.sqrt(varX);
    const stdY = Math.sqrt(varY);
    
    // Calculate correlation
    if (stdX === 0 || stdY === 0) {
        return 0; // No correlation if either has no variation
    }
    
    return covariance / (stdX * stdY);
}