// Chart.js Initialization Helper
(function() {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded! Loading fallback...');
        
        // Create script element for Chart.js
        const chartScript = document.createElement('script');
        chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js';
        chartScript.async = false;
        document.head.appendChild(chartScript);
        
        // Create script element for ChartDataLabels plugin
        const dataLabelsScript = document.createElement('script');
        dataLabelsScript.src = 'https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0';
        dataLabelsScript.async = false;
        document.head.appendChild(dataLabelsScript);
        
        // Wait for scripts to load
        chartScript.onload = function() {
            console.log('Chart.js loaded dynamically');
            if (typeof ChartDataLabels !== 'undefined') {
                initializeChartJs();
            } else {
                dataLabelsScript.onload = initializeChartJs;
            }
        };
    } else {
        console.log('Chart.js already loaded');
        initializeChartJs();
    }
    
    function initializeChartJs() {
        console.log('Initializing Chart.js with plugins');
        
        try {
            // Register plugins
            if (typeof ChartDataLabels !== 'undefined') {
                Chart.register(ChartDataLabels);
                console.log('ChartDataLabels plugin registered');
            } else if (window.chartjs && window.chartjs.ChartDataLabels) {
                Chart.register(window.chartjs.ChartDataLabels);
                console.log('ChartDataLabels plugin registered from window.chartjs');
            } else {
                console.warn('ChartDataLabels plugin not available, attempting to load it');
                // Try to load it dynamically
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0/dist/chartjs-plugin-datalabels.min.js';
                script.onload = function() {
                    if (typeof ChartDataLabels !== 'undefined') {
                        Chart.register(ChartDataLabels);
                        console.log('ChartDataLabels plugin loaded and registered dynamically');
                    }
                };
                document.head.appendChild(script);
            }
            
            // Set global defaults
            Chart.defaults.font.family = "'Poppins', sans-serif";
            Chart.defaults.color = '#666';
            Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            Chart.defaults.plugins.tooltip.padding = 10;
            Chart.defaults.plugins.tooltip.cornerRadius = 5;
            Chart.defaults.plugins.tooltip.titleFont = { weight: 'bold' };
            Chart.defaults.plugins.legend.position = 'top';
            
            if (Chart.defaults.plugins.datalabels) {
                Chart.defaults.plugins.datalabels.color = '#fff';
                Chart.defaults.plugins.datalabels.font = { weight: 'bold' };
            }
            
            // Dispatch event that Chart.js is ready
            console.log('Chart.js initialization complete, dispatching chartjs-ready event');
            document.dispatchEvent(new Event('chartjs-ready'));
            
        } catch (error) {
            console.error('Error initializing Chart.js:', error);
        }
    }
})();