// ===== DOCUMENT READY =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Preloader
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navbar links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Counter animation
    const counterElements = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent);
                let count = 0;
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                
                const updateCounter = () => {
                    count += increment;
                    if (count < target) {
                        counter.textContent = Math.ceil(count);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                requestAnimationFrame(updateCounter);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Budget range slider in Predictive Analytics
    const budgetSlider = document.getElementById('predictBudget');
    const budgetValue = document.getElementById('budgetValue');
    
    if (budgetSlider && budgetValue) {
        budgetSlider.addEventListener('input', function() {
            budgetValue.textContent = `$${this.value}M`;
        });
    }

    // Predict button click handler
    const predictButton = document.getElementById('predictButton');
    if (predictButton) {
        predictButton.addEventListener('click', function() {
            // Get form values
            const budget = document.getElementById('predictBudget').value;
            const genre = document.getElementById('predictGenre').value;
            const month = document.getElementById('predictMonth').value;
            const isFranchise = document.getElementById('predictFranchise').value === 'yes';
            
            // Simulate prediction calculation (in a real app, this would call an API)
            let roiPrediction = 0;
            let successProbability = 0;
            
            // Simple simulation based on inputs
            if (genre === 'action' || genre === 'adventure' || genre === 'scifi') {
                roiPrediction = (budget > 150) ? 2.5 : 3.2;
                successProbability = (budget > 150) ? 0.75 : 0.65;
            } else if (genre === 'animation' || genre === 'family') {
                roiPrediction = 3.8;
                successProbability = 0.8;
            } else if (genre === 'horror') {
                roiPrediction = 5.2;
                successProbability = 0.6;
            } else {
                roiPrediction = 2.1;
                successProbability = 0.5;
            }
            
            // Adjust for month (summer and holiday seasons are better)
            if (month === '5' || month === '6' || month === '7' || month === '11' || month === '12') {
                roiPrediction *= 1.2;
                successProbability += 0.1;
            }
            
            // Adjust for franchise
            if (isFranchise) {
                roiPrediction *= 1.3;
                successProbability += 0.15;
            }
            
            // Cap probability at 0.95
            successProbability = Math.min(successProbability, 0.95);
            
            // Update the gauge charts
            updatePredictionGauges(roiPrediction, successProbability);
        });
    }

    // Chart filter buttons
    document.querySelectorAll('.chart-filters .btn').forEach(button => {
        button.addEventListener('click', function() {
            const filterButtons = this.parentElement.querySelectorAll('.btn');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            updateChartByFilter(filter);
        });
    });

    // Studio checkboxes for comparison
    document.querySelectorAll('.studio-checkbox-group input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateStudioComparisonChart();
        });
    });

    // Movie search functionality
    const movieSearchButton = document.getElementById('movieSearchButton');
    if (movieSearchButton) {
        movieSearchButton.addEventListener('click', function() {
            const searchQuery = document.getElementById('movieSearchInput').value.trim();
            const yearFilter = document.getElementById('yearFilter').value;
            const genreFilter = document.getElementById('genreFilter').value;
            const ratingFilter = document.getElementById('ratingFilter').value;
            const sortFilter = document.getElementById('sortFilter').value;
            
            if (searchQuery || yearFilter || genreFilter || ratingFilter) {
                searchMovies(searchQuery, yearFilter, genreFilter, ratingFilter, sortFilter);
            }
        });
        
        // Also trigger search on Enter key
        document.getElementById('movieSearchInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                movieSearchButton.click();
            }
        });
    }

    // Initialize all filter dropdowns to trigger search
    ['yearFilter', 'genreFilter', 'ratingFilter', 'sortFilter'].forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', function() {
                if (document.getElementById('movieSearchButton')) {
                    document.getElementById('movieSearchButton').click();
                }
            });
        }
    });

    // Load initial data
    loadInitialData();
});

// ===== PREDICTION GAUGES =====
function updatePredictionGauges(roiValue, successProbability) {
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
                    [120, 150, 180, 210, 250, 300, 350, 380, 400], // Action
                    [80, 100, 130, 150, 180, 200, 230, 250, 270],  // Comedy
                    [50, 70, 90, 120, 150, 190, 220, 240, 260],    // Drama
                    [100, 120, 140, 160, 190, 220, 250, 280, 310]  // Sci-Fi
                ];
                label = 'Average Revenue (in millions $)';
                break;
            case 'roi':
                data = [
                    [1.8, 2.0, 2.2, 2.5, 2.7, 3.0, 3.2, 3.4, 3.5], // Action
                    [2.5, 2.7, 3.0, 3.2, 3.5, 3.8, 4.0, 4.2, 4.3], // Comedy
                    [3.0, 3.2, 3.5, 3.8, 4.0, 4.2, 4.5, 4.7, 4.8], // Drama
                    [2.0, 2.2, 2.5, 2.8, 3.0, 3.3, 3.5, 3.7, 3.8]  // Sci-Fi
                ];
                label = 'Average ROI';
                break;
            case 'count':
                data = [
                    [25, 28, 30, 35, 40, 45, 50, 55, 60], // Action
                    [20, 22, 25, 28, 30, 32, 35, 38, 40], // Comedy
                    [30, 32, 35, 38, 40, 42, 45, 48, 50], // Drama
                    [15, 18, 20, 22, 25, 28, 30, 32, 35]  // Sci-Fi
                ];
                label = 'Number of Movies';
                break;
        }
        
        window.genreTimeChart.data.datasets.forEach((dataset, index) => {
            dataset.data = data[index];
            dataset.label = dataset.label.split(':')[0] + ': ' + label;
        });
        
        window.genreTimeChart.options.scales.y.title.text = label;
        window.genreTimeChart.update();
    }
}

// ===== STUDIO COMPARISON CHART UPDATE =====
function updateStudioComparisonChart() {
    // Get selected studios
    const selectedStudios = [];
    document.querySelectorAll('.studio-checkbox-group input[type="checkbox"]:checked').forEach(checkbox => {
        selectedStudios.push(checkbox.value);
    });
    
    // Update chart with selected studios
    if (window.studioComparisonChart) {
        // Filter datasets to only include selected studios
        window.studioComparisonChart.data.datasets.forEach(dataset => {
            dataset.hidden = !selectedStudios.includes(dataset.label);
        });
        
        window.studioComparisonChart.update();
    }
}

// Sample movie data from Highest Holywood Grossing Movies.csv
const sampleMovies = [
            {
                title: 'Avatar',
                year: 2009,
                poster: 'https://image.tmdb.org/t/p/w500/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg',
                rating: 7.6,
                genres: ['Action', 'Adventure', 'Fantasy', 'Sci-Fi'],
                budget: 237,
                revenue: 2924,
                roi: 11.34,
                vote_count: 18676
            },
            {
                title: 'Avengers: Endgame',
                year: 2019,
                poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
                rating: 8.4,
                genres: ['Action', 'Adventure', 'Sci-Fi'],
                budget: 356,
                revenue: 2799,
                roi: 6.86,
                vote_count: 17056
            },
            {
                title: 'Titanic',
                year: 1997,
                poster: 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
                rating: 7.9,
                genres: ['Drama', 'Romance'],
                budget: 200,
                revenue: 2265,
                roi: 10.33,
                vote_count: 20054
            },
            {
                title: 'Star Wars: The Force Awakens',
                year: 2015,
                poster: 'https://image.tmdb.org/t/p/w500/wqnLdwVXoBjKibFRR5U3y0aDUhs.jpg',
                rating: 7.8,
                genres: ['Action', 'Adventure', 'Sci-Fi'],
                budget: 245,
                revenue: 2071,
                roi: 7.45,
                vote_count: 19673
            },
            {
                title: 'Avengers: Infinity War',
                year: 2018,
                poster: 'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
                rating: 8.4,
                genres: ['Action', 'Adventure', 'Sci-Fi'],
                budget: 300,
                revenue: 2052,
                roi: 5.84,
                vote_count: 13948
            },
            {
                title: 'Spider-Man: No Way Home',
                year: 2021,
                poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
                rating: 8.2,
                genres: ['Action', 'Adventure', 'Fantasy'],
                budget: 200,
                revenue: 1922,
                roi: 8.61,
                vote_count: 12365
            },
            {
                title: 'Avatar: The Way of Water',
                year: 2022,
                poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
                rating: 7.7,
                genres: ['Action', 'Adventure', 'Fantasy', 'Sci-Fi'],
                budget: 350,
                revenue: 2320,
                roi: 5.63,
                vote_count: 9876
            },
            {
                title: 'The Lion King',
                year: 2019,
                poster: 'https://image.tmdb.org/t/p/w500/dzBtMocZuJbjLOXvrl4zGYigDzh.jpg',
                rating: 6.9,
                genres: ['Animation', 'Adventure', 'Drama', 'Family'],
                budget: 260,
                revenue: 1663,
                roi: 5.40,
                vote_count: 8765
            },
            {
                title: 'Jurassic World',
                year: 2015,
                poster: 'https://image.tmdb.org/t/p/w500/rhr4y79GpxQF9IsfJItRXVaoGs4.jpg',
                rating: 7.0,
                genres: ['Action', 'Adventure', 'Sci-Fi', 'Thriller'],
                budget: 150,
                revenue: 1670,
                roi: 10.13,
                vote_count: 17890
            },
            {
                title: 'The Avengers',
                year: 2012,
                poster: 'https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
                rating: 8.0,
                genres: ['Action', 'Adventure', 'Sci-Fi'],
                budget: 220,
                revenue: 1519,
                roi: 5.90,
                vote_count: 26543
            },
            {
                title: 'Furious 7',
                year: 2015,
                poster: 'https://image.tmdb.org/t/p/w500/wurKlC3VKUgcfsn0K51MJYEleS2.jpg',
                rating: 7.3,
                genres: ['Action', 'Crime', 'Thriller'],
                budget: 190,
                revenue: 1516,
                roi: 6.98,
                vote_count: 9876
            },
            {
                title: 'Top Gun: Maverick',
                year: 2022,
                poster: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
                rating: 8.3,
                genres: ['Action', 'Drama'],
                budget: 170,
                revenue: 1488,
                roi: 7.75,
                vote_count: 7654
            },
            {
                title: 'Frozen II',
                year: 2019,
                poster: 'https://image.tmdb.org/t/p/w500/mINJaa34MtknCYl5AjtNJzWj8cD.jpg',
                rating: 7.3,
                genres: ['Animation', 'Adventure', 'Comedy', 'Family', 'Fantasy', 'Musical'],
                budget: 150,
                revenue: 1450,
                roi: 8.67,
                vote_count: 8765
            },
            {
                title: 'Barbie',
                year: 2023,
                poster: 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi8Qzsk3Yd4C.jpg',
                rating: 7.2,
                genres: ['Adventure', 'Comedy', 'Fantasy'],
                budget: 145,
                revenue: 1445,
                roi: 8.97,
                vote_count: 7654
            },
            {
                title: 'Avengers: Age of Ultron',
                year: 2015,
                poster: 'https://image.tmdb.org/t/p/w500/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg',
                rating: 7.3,
                genres: ['Action', 'Adventure', 'Sci-Fi'],
                budget: 250,
                revenue: 1403,
                roi: 4.61,
                vote_count: 19876
            },
            {
                title: 'Black Panther',
                year: 2018,
                poster: 'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
                rating: 7.4,
                genres: ['Action', 'Adventure', 'Sci-Fi'],
                budget: 200,
                revenue: 1347,
                roi: 5.74,
                vote_count: 18765
            },
            {
                title: 'Harry Potter and the Deathly Hallows: Part 2',
                year: 2011,
                poster: 'https://image.tmdb.org/t/p/w500/c54HpQmuwXjHq2C9wmoACjxoom3.jpg',
                rating: 8.1,
                genres: ['Adventure', 'Fantasy'],
                budget: 125,
                revenue: 1342,
                roi: 9.74,
                vote_count: 17654
            },
            {
                title: 'Star Wars: The Last Jedi',
                year: 2017,
                poster: 'https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg',
                rating: 6.9,
                genres: ['Action', 'Adventure', 'Fantasy', 'Sci-Fi'],
                budget: 317,
                revenue: 1333,
                roi: 3.20,
                vote_count: 14567
            },
            {
                title: 'Jurassic World: Fallen Kingdom',
                year: 2018,
                poster: 'https://image.tmdb.org/t/p/w500/c9XxwwhPHdaImA2f1WEfEsbhawd.jpg',
                rating: 6.5,
                genres: ['Action', 'Adventure', 'Sci-Fi'],
                budget: 170,
                revenue: 1310,
                roi: 6.71,
                vote_count: 10987
            },
            {
                title: 'Frozen',
                year: 2013,
                poster: 'https://image.tmdb.org/t/p/w500/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg',
                rating: 7.4,
                genres: ['Animation', 'Adventure', 'Comedy', 'Family', 'Fantasy', 'Musical'],
                budget: 150,
                revenue: 1290,
                roi: 7.60,
                vote_count: 15678
            },
            {
                title: 'Beauty and the Beast',
                year: 2017,
                poster: 'https://image.tmdb.org/t/p/w500/hKegSKIDep2ewJWPUQD7u0KqFIp.jpg',
                rating: 7.1,
                genres: ['Fantasy', 'Romance', 'Family'],
                budget: 160,
                revenue: 1264,
                roi: 6.90,
                vote_count: 12345
            },
            {
                title: 'Incredibles 2',
                year: 2018,
                poster: 'https://image.tmdb.org/t/p/w500/9lFKBtaVIhP7E2Pk0IY1CwTKTMp.jpg',
                rating: 7.6,
                genres: ['Animation', 'Action', 'Adventure', 'Family'],
                budget: 200,
                revenue: 1243,
                roi: 5.22,
                vote_count: 11234
            },
            {
                title: 'The Fate of the Furious',
                year: 2017,
                poster: 'https://image.tmdb.org/t/p/w500/dImWM7GJqryWJO9LHa3XQ8DD5NH.jpg',
                rating: 6.8,
                genres: ['Action', 'Crime', 'Thriller'],
                budget: 250,
                revenue: 1236,
                roi: 3.94,
                vote_count: 9876
            },
            {
                title: 'Iron Man 3',
                year: 2013,
                poster: 'https://image.tmdb.org/t/p/w500/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg',
                rating: 7.0,
                genres: ['Action', 'Adventure', 'Sci-Fi'],
                budget: 200,
                revenue: 1215,
                roi: 5.08,
                vote_count: 19876
            },
            {
                title: 'Minions',
                year: 2015,
                poster: 'https://image.tmdb.org/t/p/w500/vlOgaxUiMOA8sPDG9n3VhQabnEi.jpg',
                rating: 6.4,
                genres: ['Animation', 'Comedy', 'Family', 'Adventure'],
                budget: 74,
                revenue: 1159,
                roi: 14.66,
                vote_count: 9876
            }
        ];
        
// ===== MOVIE SEARCH =====
function searchMovies(query, year, genre, minRating, sortBy) {
    const resultsContainer = document.getElementById('movieResultsContainer');
    if (!resultsContainer) return;
    
    // Show loading state
    resultsContainer.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>';
    
    // In a real application, this would make an API call to search the database
    // For this demo, we'll simulate a search with sample data
    setTimeout(() => {
        // Filter movies based on search criteria
        let filteredMovies = sampleMovies;
        
        if (query) {
            const lowerQuery = query.toLowerCase();
            filteredMovies = filteredMovies.filter(movie => 
                movie.title.toLowerCase().includes(lowerQuery)
            );
        }
        
        if (year) {
            filteredMovies = filteredMovies.filter(movie => 
                movie.year.toString() === year
            );
        }
        
        if (genre) {
            filteredMovies = filteredMovies.filter(movie => 
                movie.genres.includes(genre)
            );
        }
        
        if (minRating) {
            filteredMovies = filteredMovies.filter(movie => 
                movie.rating >= parseFloat(minRating)
            );
        }
        
        // Sort movies
        switch (sortBy) {
            case 'revenue':
                filteredMovies.sort((a, b) => b.revenue - a.revenue);
                break;
            case 'roi':
                filteredMovies.sort((a, b) => b.roi - a.roi);
                break;
            case 'rating':
                filteredMovies.sort((a, b) => b.rating - a.rating);
                break;
            case 'year':
                filteredMovies.sort((a, b) => b.year - a.year);
                break;
        }
        
        // Display results
        if (filteredMovies.length === 0) {
            resultsContainer.innerHTML = '<div class="col-12"><div class="alert alert-info">No movies found matching your criteria. Try adjusting your search filters.</div></div>';
        } else {
            resultsContainer.innerHTML = '';
            
            filteredMovies.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.className = 'col-md-4 col-sm-6';
                movieCard.innerHTML = `
                    <div class="movie-card" data-movie-id="${movie.title.replace(/\s+/g, '-').toLowerCase()}">
                        <div class="movie-poster" style="background-image: url('${movie.poster}')">
                            <div class="movie-rating">
                                <i class="fas fa-star"></i> ${movie.rating.toFixed(1)}
                            </div>
                        </div>
                        <div class="movie-info">
                            <h3 class="movie-title">${movie.title}</h3>
                            <div class="movie-meta">
                                <span><i class="fas fa-calendar"></i> ${movie.year}</span>
                                <span><i class="fas fa-users"></i> ${movie.vote_count.toLocaleString()} votes</span>
                            </div>
                            <div class="movie-genres">
                                ${movie.genres.map(genre => `<span class="movie-genre">${genre}</span>`).join('')}
                            </div>
                            <div class="movie-stats">
                                <div class="movie-stat">
                                    <div class="movie-stat-value">$${movie.budget}M</div>
                                    <div class="movie-stat-label">Budget</div>
                                </div>
                                <div class="movie-stat">
                                    <div class="movie-stat-value">$${movie.revenue}M</div>
                                    <div class="movie-stat-label">Revenue</div>
                                </div>
                                <div class="movie-stat">
                                    <div class="movie-stat-value">${movie.roi.toFixed(1)}x</div>
                                    <div class="movie-stat-label">ROI</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                resultsContainer.appendChild(movieCard);
                
                // Add click event to show movie details
                movieCard.querySelector('.movie-card').addEventListener('click', function() {
                    showMovieDetails(movie);
                });
            });
        }
    }, 1000); // Simulate network delay
}

// ===== MOVIE DETAILS MODAL =====
function showMovieDetails(movie) {
    const modal = new bootstrap.Modal(document.getElementById('movieDetailModal'));
    const modalTitle = document.getElementById('movieDetailModalLabel');
    const modalContent = document.getElementById('movieDetailContent');
    
    modalTitle.textContent = `${movie.title} (${movie.year})`;
    
    modalContent.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <img src="${movie.poster}" alt="${movie.title}" class="img-fluid rounded">
                <div class="mt-3">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="badge bg-primary"><i class="fas fa-star"></i> ${movie.rating.toFixed(1)}</span>
                        <span class="text-muted">${movie.vote_count.toLocaleString()} votes</span>
                    </div>
                    <div class="movie-genres mb-3">
                        ${movie.genres.map(genre => `<span class="movie-genre">${genre}</span>`).join('')}
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <h4>Financial Performance</h4>
                <div class="row mb-4">
                    <div class="col-md-4">
                        <div class="card text-center p-3">
                            <h5>Budget</h5>
                            <p class="display-6">$${movie.budget}M</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card text-center p-3">
                            <h5>Revenue</h5>
                            <p class="display-6">$${movie.revenue}M</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card text-center p-3">
                            <h5>ROI</h5>
                            <p class="display-6">${movie.roi.toFixed(1)}x</p>
                        </div>
                    </div>
                </div>
                
                <h4>Performance Analysis</h4>
                <div class="chart-container">
                    <canvas id="movieDetailChart"></canvas>
                </div>
                
                <h4 class="mt-4">Similar Movies</h4>
                <div class="row">
                    ${getSimilarMovies(movie).map(similarMovie => `
                    <div class="col-md-4">
                        <div class="card">
                            <img src="${similarMovie.poster}" class="card-img-top" alt="${similarMovie.title}">
                            <div class="card-body">
                                <h5 class="card-title">${similarMovie.title}</h5>
                                <p class="card-text">ROI: ${similarMovie.roi.toFixed(1)}x</p>
                            </div>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    modal.show();
    
    // Create movie detail chart
    setTimeout(() => {
        const ctx = document.getElementById('movieDetailChart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Box Office', 'ROI', 'Rating', 'Popularity', 'Budget Efficiency'],
                datasets: [{
                    label: movie.title,
                    data: [
                        Math.min(movie.revenue / 1000, 1) * 100, // Scale revenue to 0-100
                        Math.min(movie.roi / 10, 1) * 100,       // Scale ROI to 0-100
                        movie.rating * 10,                       // Scale rating to 0-100
                        Math.min(movie.vote_count / 20000, 1) * 100, // Scale popularity to 0-100
                        Math.min(movie.revenue / movie.budget / 10, 1) * 100 // Scale budget efficiency to 0-100
                    ],
                    fill: true,
                    backgroundColor: 'rgba(63, 81, 181, 0.2)',
                    borderColor: 'rgb(63, 81, 181)',
                    pointBackgroundColor: 'rgb(63, 81, 181)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(63, 81, 181)'
                }]
            },
            options: {
                elements: {
                    line: {
                        borderWidth: 3
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
    }, 500);
}

// Function to get similar movies based on genres and year
function getSimilarMovies(movie) {
    // Get all movies from the sample data
    const allMovies = sampleMovies || [];
    
    // Filter out the current movie
    const otherMovies = allMovies.filter(m => m.title !== movie.title);
    
    // Calculate similarity score based on genres and year
    const moviesWithScore = otherMovies.map(m => {
        // Calculate genre overlap
        const genreOverlap = m.genres.filter(genre => movie.genres.includes(genre)).length;
        const genreScore = genreOverlap / Math.max(movie.genres.length, m.genres.length);
        
        // Calculate year proximity (movies within 5 years get higher scores)
        const yearDiff = Math.abs(m.year - movie.year);
        const yearScore = yearDiff <= 5 ? 1 - (yearDiff / 10) : 0.5 - (yearDiff / 100);
        
        // Calculate budget similarity
        const budgetRatio = Math.min(m.budget, movie.budget) / Math.max(m.budget, movie.budget);
        
        // Calculate overall similarity score
        const similarityScore = (genreScore * 0.5) + (yearScore * 0.3) + (budgetRatio * 0.2);
        
        return {
            ...m,
            similarityScore
        };
    });
    
    // Sort by similarity score and take top 3
    return moviesWithScore
        .sort((a, b) => b.similarityScore - a.similarityScore)
        .slice(0, 3);
}

// ===== LOAD INITIAL DATA =====
function loadInitialData() {
    // Load top performing movies table
    const profitTable = document.getElementById('profitTable');
    if (profitTable) {
        const topMovies = [
            { movie: 'Avatar', year: 2009, budget: 425, revenue: 2776, profit: 2351, margin: 0.85, roi: 5.53 },
            { movie: 'Avengers: Infinity War', year: 2018, budget: 300, revenue: 2048, profit: 1748, margin: 0.85, roi: 5.83 },
            { movie: 'The Avengers', year: 2012, budget: 225, revenue: 1518, profit: 1293, margin: 0.85, roi: 5.75 },
            { movie: 'Jurassic World', year: 2015, budget: 215, revenue: 1649, profit: 1434, margin: 0.87, roi: 6.67 },
            { movie: 'Furious 7', year: 2015, budget: 190, revenue: 1519, profit: 1329, margin: 0.87, roi: 6.99 },
            { movie: 'Black Panther', year: 2018, budget: 200, revenue: 1348, profit: 1148, margin: 0.85, roi: 5.74 },
            { movie: 'Avengers: Age of Ultron', year: 2015, budget: 331, revenue: 1403, profit: 1072, margin: 0.76, roi: 3.24 },
            { movie: 'Incredibles 2', year: 2018, budget: 200, revenue: 1243, profit: 1043, margin: 0.84, roi: 5.21 },
            { movie: 'Iron Man 3', year: 2013, budget: 200, revenue: 1215, profit: 1015, margin: 0.84, roi: 5.08 },
            { movie: 'Captain America: Civil War', year: 2016, budget: 250, revenue: 1140, profit: 890, margin: 0.78, roi: 3.56 }
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
}