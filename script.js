document.addEventListener('DOMContentLoaded', () => {

    // Global Chart Defaults (Light Theme)
    Chart.defaults.color = '#5f6368'; // Darker gray for text
    Chart.defaults.borderColor = '#e0e0e0'; // Light gray for grid lines
    Chart.defaults.font.family = "'Inter', sans-serif";

    // --- NEW: TREND CHART LOGIC ---
    const trendCtx = document.getElementById('trendChart').getContext('2d');
    const diseaseSelect = document.getElementById('diseaseSelect');
    const trendInsight = document.getElementById('trendInsight');

    const trendData = {
        dengue: {
            datasets: [
                {
                    label: '2024 (Epidémico)',
                    data: [80, 120, 200, 320, 450, 500, 480, 400, 300, 200, 150, 100], // Historic high
                    borderColor: '#d93025', // Red
                    tension: 0.4,
                    fill: false
                },
                {
                    label: '2025 (Transición)',
                    data: [90, 80, 70, 60, 50, 45, 40, 50, 60, 80, 100, 120], // Drop then slight rise
                    borderColor: '#fbbc04', // Yellow
                    tension: 0.4,
                    fill: false
                },
                {
                    label: '2026 (Proyección)',
                    data: [130, 180, 250, null, null, null, null, null, null, null, null, null], // Early spike
                    borderColor: '#1a73e8', // Blue
                    borderDash: [5, 5],
                    tension: 0.4,
                    fill: false
                }
            ],
            insight: "<strong>Insight:</strong> 2024 marcó un récord histórico (El Niño). 2026 muestra un repunte temprano preocupante en la costa Caribe, superando el inicio de 2025."
        },
        malaria: {
            datasets: [
                {
                    label: '2024',
                    data: [40, 42, 45, 48, 50, 55, 60, 65, 70, 68, 65, 60],
                    borderColor: '#34a853', // Green
                    tension: 0.4,
                    fill: false
                },
                {
                    label: '2026 (Inundaciones)',
                    data: [70, 85, 95, null, null, null, null, null, null, null, null, null], // Sharp increase
                    borderColor: '#d93025', // Red
                    borderDash: [5, 5],
                    tension: 0.4,
                    fill: false
                }
            ],
            insight: "<strong>Insight:</strong> Aumento del 81% en casos de Malaria a principios de 2026 comparado con periodos anteriores, impulsado por inundaciones en cuencas de ríos."
        },
        ira: {
            datasets: [
                {
                    label: 'Promedio Histórico',
                    data: [50, 60, 80, 90, 85, 70, 50, 60, 80, 95, 80, 60],
                    borderColor: '#9aa0a6',
                    borderDash: [2, 2],
                    tension: 0.4,
                    fill: false
                },
                {
                    label: '2026 ("Supergripa")',
                    data: [65, 80, 95, null, null, null, null, null, null, null, null, null], // Higher start
                    borderColor: '#1a73e8', // Blue
                    tension: 0.4,
                    fill: false
                }
            ],
            insight: "<strong>Insight:</strong> El primer pico respiratorio de 2026 (Mar-Jun) se proyecta más intenso debido a la interacción de frentes fríos y humedad."
        }
    };

    let trendChartInstance = new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: trendData.dengue.datasets
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: { position: 'top' },
                tooltip: { enabled: true }
            }
        }
    });

    diseaseSelect.addEventListener('change', (e) => {
        const selected = e.target.value;
        trendChartInstance.data.datasets = trendData[selected].datasets;
        trendChartInstance.update();
        trendInsight.innerHTML = trendData[selected].insight;
    });

    // --- GOOGLE TRENDS CHART ---
    const gtCtx = document.getElementById('googleTrendsChart').getContext('2d');
    new Chart(gtCtx, {
        type: 'line',
        data: {
            labels: ['Ene 2024', 'Feb 2024', 'Mar 2024', 'Abr 2024', 'May 2024', 'Jun 2024',
                'Jul 2024', 'Ago 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024', 'Dic 2024', 'Ene 2025'],
            datasets: [
                {
                    label: '"Dengue" — Búsquedas',
                    data: [58, 81, 91, 67, 49, 44, 51, 41, 39, 34, 29, 32, 31],
                    borderColor: '#d93025',
                    backgroundColor: 'rgba(217, 48, 37, 0.08)',
                    fill: true,
                    tension: 0.35,
                    pointRadius: 4,
                    pointBackgroundColor: '#d93025',
                    pointHoverRadius: 7,
                    borderWidth: 2.5
                },
                {
                    label: '"Gripa" — Búsquedas',
                    data: [51, 45, 70, 60, 48, 59, 61, 63, 65, 64, 57, 68, 92],
                    borderColor: '#1a73e8',
                    backgroundColor: 'rgba(26, 115, 232, 0.08)',
                    fill: true,
                    tension: 0.35,
                    pointRadius: 4,
                    pointBackgroundColor: '#1a73e8',
                    pointHoverRadius: 7,
                    borderWidth: 2.5
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.dataset.label + ': ' + context.parsed.y + '/100';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Interés relativo (0-100)',
                        font: { size: 12 }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            }
        }
    });

    // --- EXISTING CHARTS (TRANSLATED) ---

    // 1. IRA (Respiratory) Chart
    const iraCtx = document.getElementById('iraChart').getContext('2d');
    new Chart(iraCtx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [{
                label: 'Incidencia Proyectada (2025-2026)',
                data: [30, 45, 75, 90, 85, 60, 40, 35, 65, 80, 75, 50],
                borderColor: '#1a73e8', // Blue
                backgroundColor: 'rgba(26, 115, 232, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 0
            },
            {
                label: 'Intensidad Lluvias',
                data: [20, 25, 60, 80, 70, 50, 30, 40, 70, 90, 80, 60],
                borderColor: '#34a853', // Green
                borderDash: [5, 5],
                tension: 0.4,
                pointRadius: 0,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: {
                y: { beginAtZero: true, display: false },
                x: { grid: { display: false } }
            }
        }
    });

    // 2. Malaria Distribution Chart
    const malariaCtx = document.getElementById('malariaChart').getContext('2d');
    new Chart(malariaCtx, {
        type: 'doughnut',
        data: {
            labels: ['P. vivax', 'P. falciparum', 'Mixto/Otros'],
            datasets: [{
                data: [65.3, 33.7, 1],
                backgroundColor: [
                    '#34a853', // Green
                    '#d93025', // Red
                    '#1a73e8'  // Blue
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            cutout: '70%',
            plugins: { legend: { position: 'right' } }
        }
    });

    // 3. Glacial Extinction Timeline
    const glacierCtx = document.getElementById('glacierChart').getContext('2d');
    new Chart(glacierCtx, {
        type: 'line',
        data: {
            labels: ['1850', '1980', '2000', '2022', '2024', '2030 (Est)', '2050 (Est)'],
            datasets: [{
                label: 'Área Glacial Restante (km²)',
                data: [347, 110, 60, 33.09, 30.83, 25, 0],
                borderColor: '#5f6368', // Dark Gray
                backgroundColor: 'rgba(95, 99, 104, 0.1)',
                fill: true,
                stepped: false,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            yMin: 0,
                            yMax: 0,
                            borderColor: '#d93025',
                            borderWidth: 2,
                            label: { content: 'Extinción' }
                        }
                    }
                }
            }
        }
    });

    // 4. Temperature Anomalies
    const tempCtx = document.getElementById('tempChart').getContext('2d');
    new Chart(tempCtx, {
        type: 'bar',
        data: {
            labels: ['Promedio Histórico', 'Récord 2024', 'Proyección 2050', 'Proyección 2100 (Alta)'],
            datasets: [{
                label: 'Temperatura (°C)',
                data: [24.66, 43.8, 26.6, 29.6],
                backgroundColor: [
                    'rgba(95, 99, 104, 0.2)', // Gray
                    'rgba(227, 116, 0, 0.8)', // Orange
                    'rgba(217, 48, 37, 0.6)', // Red
                    'rgba(217, 48, 37, 1)'    // Dark Red
                ],
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: false, min: 20 }
            }
        }
    });

    // Scrolling logic
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // --- MODAL GRAPH LOGIC ---
    const modal = document.getElementById('graphModal');
    const modalCtx = document.getElementById('modalChart').getContext('2d');
    const closeBtn = document.querySelector('.close-modal');
    let modalChartInstance = null;

    // Add click listeners to all chart canvases
    const allCanvases = document.querySelectorAll('canvas:not(#modalChart)');

    allCanvases.forEach(canvas => {
        canvas.addEventListener('click', () => {
            const originalChart = Chart.getChart(canvas);
            if (!originalChart) return;

            // Destroy previous instance if exists
            if (modalChartInstance) {
                modalChartInstance.destroy();
            }

            // Clone config
            const config = {
                type: originalChart.config.type,
                data: JSON.parse(JSON.stringify(originalChart.config.data)), // Deep copy data
                options: JSON.parse(JSON.stringify(originalChart.config.options)) // Deep copy options
            };

            // Adjust options for modal (e.g. maintain aspect ratio but bigger)
            config.options.maintainAspectRatio = false;
            config.options.responsive = true;
            // Ensure plugins like title/legend are visible/adjusted if needed
            // For now, exact copy is fine, maybe increase font size? 
            // Let's keep it simple first.

            modal.classList.add('show');

            // Allow time for modal to display before rendering (optional but safer for dimensions)
            requestAnimationFrame(() => {
                modalChartInstance = new Chart(modalCtx, config);
            });
        });
    });

    // Close Modal Logic
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
    // --- LEAFLET MAP LOGIC ---
    // Initialize map
    const map = L.map('colombiaMap').setView([4.5709, -74.2973], 5);

    // Add tiles (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        zoomControl: false // Cleaner look
    }).addTo(map);

    // --- REGION HELPERS ---
    // (Kept for table lookups, map overlay removed per request)

    const deptToRegion = {
        'Antioquia': 'Andina', 'Boyacá': 'Andina', 'Caldas': 'Andina', 'Cundinamarca': 'Andina',
        'Huila': 'Andina', 'Norte de Santander': 'Andina', 'Quindío': 'Andina', 'Risaralda': 'Andina',
        'Santander': 'Andina', 'Tolima': 'Andina', 'Bogotá': 'Andina',

        'Atlántico': 'Caribe', 'Bolívar': 'Caribe', 'Cesar': 'Caribe', 'Córdoba': 'Caribe',
        'La Guajira': 'Caribe', 'Magdalena': 'Caribe', 'Sucre': 'Caribe', 'San Andrés y Providencia': 'Insular',

        'Chocó': 'Pacífica', 'Valle del Cauca': 'Pacífica', 'Cauca': 'Pacífica', 'Nariño': 'Pacífica',

        'Arauca': 'Orinoquía', 'Casanare': 'Orinoquía', 'Meta': 'Orinoquía', 'Vichada': 'Orinoquía',

        'Amazonas': 'Amazonía', 'Caquetá': 'Amazonía', 'Guainía': 'Amazonía',
        'Guaviare': 'Amazonía', 'Putumayo': 'Amazonía', 'Vaupés': 'Amazonía'
    };

    // Helper to normalize strings for matching (remove accents, etc if needed, but simple map first)
    function getRegion(deptName) {
        // Simple normalization/lookup
        if (deptToRegion[deptName]) return deptToRegion[deptName];

        // fuzzy match or partial check if needed
        for (const [key, val] of Object.entries(deptToRegion)) {
            if (deptName.includes(key)) return val;
        }
        return 'Andina'; // Default
    }





    // Disease Data Points (2026 Forecast)
    const diseasePoints = [
        { name: "Santa Marta", lat: 11.2404, lon: -74.1990, disease: "Dengue", type: "red", stat: "+675%", desc: "Aumento crítico vs. 2025. Alerta Roja." },
        { name: "Cali", lat: 3.4516, lon: -76.5320, disease: "Dengue", type: "red", stat: "Alto", desc: "Focos persistentes en zona urbana." },
        { name: "Medellín", lat: 6.2442, lon: -75.5812, disease: "Dengue", type: "red", stat: "Alto", desc: "Aumento en Bello e Itagüí." },
        { name: "Ibagué", lat: 4.4389, lon: -75.2322, disease: "Dengue", type: "red", stat: "Alerta", desc: "Brote asociado a almacenamiento de agua." },
        { name: "Villavicencio", lat: 4.1420, lon: -73.6266, disease: "Dengue", type: "red", stat: "Severo", desc: "Alta transmisión en Llanos Orientales." },
        { name: "Tierralta", lat: 8.1710, lon: -76.0590, disease: "Malaria", type: "orange", stat: "Crítico", desc: "Inundaciones en cuenca Sinú/San Jorge." },
        { name: "Quibdó", lat: 5.6947, lon: -76.6611, disease: "Malaria", type: "orange", stat: "Endémico", desc: "Transmisión sostenida P. falciparum." },
        { name: "Buenaventura", lat: 3.8801, lon: -77.0312, disease: "Malaria", type: "orange", stat: "Riesgo", desc: "Aumento de vectores por lluvias." },
        { name: "Leticia", lat: -4.2153, lon: -69.9406, disease: "Oropouche", type: "orange", stat: "Brote", desc: "Coinfección con Malaria reportada." },
        { name: "Bogotá", lat: 4.7110, lon: -74.0721, disease: "IRA", type: "blue", stat: "Pico", desc: "Choque térmico y alta humedad." },
        { name: "Riohacha", lat: 11.5444, lon: -72.9072, disease: "IRA", type: "blue", stat: "Mortalidad", desc: "Riesgo alto en menores de 5 años." },
        { name: "Tolima (Zona Rural)", lat: 3.9, lon: -75.0, disease: "F. Amarilla", type: "yellow", stat: "Brote", desc: "Emergencia en Cunday y Prado." }
    ];

    // --- MARKER LOGIC ---

    // Create a custom pane to ensure markers are always on top
    map.createPane('diseaseMarkers');
    map.getPane('diseaseMarkers').style.zIndex = 650;
    map.getPane('diseaseMarkers').style.pointerEvents = 'none';

    // Helper for dynamic radius
    function getSeverityRadius(type) {
        switch (type) {
            case 'red': return 12;    // Critical
            case 'orange': return 9; // High
            default: return 6;        // Standard
        }
    }

    // Add Markers
    diseasePoints.forEach(point => {
        const color = point.type === 'red' ? '#d93025' :
            point.type === 'orange' ? '#e37400' :
                point.type === 'blue' ? '#1a73e8' : '#fbbc04';

        const radius = getSeverityRadius(point.type);

        const circle = L.circleMarker([point.lat, point.lon], {
            color: color,
            fillColor: color,
            fillOpacity: 0.9,
            radius: radius,
            weight: 2,
            className: 'pulsing-marker',
            pane: 'diseaseMarkers'
        }).addTo(map);

        // Custom Popup
        const popupContent = `
            <div class="popup-title">
                ${point.name}
                <span class="popup-disease bg-${point.type}">${point.disease}</span>
            </div>
            <div class="popup-stat">${point.stat}</div>
            <div class="popup-detail">${point.desc}</div>
        `;

        circle.bindPopup(popupContent);
    });

    // --- NEW: DEPARTMENTAL DATA TABLES LOGIC ---

    const healthDataRaw = {
        'Amazonas': { dengue25: 43, dengue26: 'Tendencia al incremento', malaria26: 'Aumento', ira25: 'Disminución', ira26: 'Estable' },
        'Antioquia': { dengue25: '1,702', dengue26: 'Aumento', malaria26: 'Aumento', ira25: 'Aumento', ira26: 'Aumento' },
        'Arauca': { dengue25: 290, dengue26: 'Aumento', malaria26: 'Tendencia al incremento', ira25: 'Aumento', ira26: 'Estable' },
        'San Andrés y Providencia': { dengue25: 40, dengue26: 'N/A', malaria26: 'Tendencia al incremento', ira25: 'Disminución', ira26: 'Estable' },
        'Atlántico': { dengue25: '1,125', dengue26: 'Aumento', malaria26: 'N/A', ira25: 'Aumento', ira26: 'Estable' },
        'Barranquilla': { dengue25: '1,385', dengue26: 'N/A', malaria26: 'N/A', ira25: 'Aumento', ira26: 'Estable' },
        'Bogotá': { dengue25: 0, dengue26: 'N/A', malaria26: 'N/A', ira25: 'Estable', ira26: 'Aumento (Positividad 48%)', viralCirculation: 'Parainfluenza / H1N1' },
        'Bolívar': { dengue25: 653, dengue26: 'Aumento', malaria26: 'Tendencia al incremento', ira25: 'Aumento', ira26: 'Estable' },
        'Boyacá': { dengue25: 140, dengue26: 'Aumento', malaria26: 'Tendencia al incremento', ira25: 'Aumento', ira26: 'Estable' },
        'Buenaventura': { dengue25: 25, dengue26: 'N/A', malaria26: 'N/A', ira25: 'Mixto', ira26: 'Estable' },
        'Caldas': { dengue25: 144, dengue26: 'Tendencia al incremento', malaria26: 'Tendencia al incremento', ira25: 'Aumento', ira26: 'Estable' },
        'Caquetá': { dengue25: 464, dengue26: 'Tendencia al incremento', malaria26: 'Tendencia al incremento', ira25: 'Aumento', ira26: 'Estable' },
        'Cali': { dengue25: 872, dengue26: 'N/A', malaria26: 'N/A', ira25: 'Mixto', ira26: 'Estable' },
        'Cartagena de Indias': { dengue25: '2,317', dengue26: 'N/A', malaria26: 'N/A', ira25: 'Aumento', ira26: 'Estable' },
        'Casanare': { dengue25: 114, dengue26: 'Tendencia al incremento', malaria26: 'Tendencia al incremento', ira25: 'Aumento', ira26: 'Estable' },
        'Cauca': { dengue25: 267, dengue26: 'Aumento', malaria26: 'N/A', ira25: 'Aumento', ira26: 'Estable' },
        'Cesar': { dengue25: 410, dengue26: 'Tendencia al incremento', malaria26: 'Tendencia al incremento', ira25: 'Aumento', ira26: 'Estable' },
        'Chocó': { dengue25: 109, dengue26: 'Tendencia al incremento', malaria26: 'Tendencia al incremento', ira25: 'Aumento', ira26: 'Aumento' },
        'Córdoba': { dengue25: '1,277', dengue26: 'Aumento', malaria26: 'Tendencia al incremento', ira25: 'Aumento', ira26: 'Estable' },
        'Cundinamarca': { dengue25: '1,368', dengue26: 'Aumento', malaria26: 'Tendencia al incremento', ira25: 'Aumento', ira26: 'Aumento' },
        'Guainía': { dengue25: 19, dengue26: 'Tendencia al incremento', malaria26: 'Aumento', ira25: 'Disminución', ira26: 'Estable' },
        'Guaviare': { dengue25: 182, dengue26: 'Aumento', malaria26: 'Tendencia al incremento', ira25: 'Disminución', ira26: 'Estable' },
        'Huila': { dengue25: '1,008', dengue26: 'Aumento', malaria26: 'Tendencia al incremento', ira25: 'Aumento', ira26: 'Estable' },
        'La Guajira': { dengue25: 667, dengue26: 'Aumento', malaria26: 'Tendencia al incremento', ira25: 'Mixto', ira26: 'Aumento' },
        'Magdalena': { dengue25: 110, dengue26: 'Aumento', malaria26: 'Tendencia al incremento', ira25: 'Aumento', ira26: 'Aumento' },
        'Meta': { dengue25: '1,066', dengue26: 'Aumento', malaria26: 'Aumento', ira25: 'Aumento', ira26: 'Estable' },
        'Nariño': { dengue25: 123, dengue26: 'Tendencia al incremento', malaria26: 'Tendencia al incremento', ira25: 'Aumento', ira26: 'Estable' },
        'Norte de Santander': { dengue25: '1,152', dengue26: 'Aumento', malaria26: 'Tendencia al incremento', ira25: 'Disminución', ira26: 'Estable' },
        'Putumayo': { dengue25: 800, dengue26: 'Aumento', malaria26: 'Tendencia al incremento', ira25: 'Aumento', ira26: 'Estable' },
        'Quindío': { dengue25: 332, dengue26: 'Tendencia al incremento', malaria26: 'N/A', ira25: 'Aumento', ira26: 'Estable' },
        'Risaralda': { dengue25: 344, dengue26: 'Tendencia al incremento', malaria26: 'Aumento', ira25: 'Aumento', ira26: 'Estable' },
        'Santa Marta': { dengue25: 91, dengue26: 'N/A', malaria26: 'N/A', ira25: 'Aumento', ira26: 'Aumento' },
        'Santander': { dengue25: '1,298', dengue26: 'Aumento', malaria26: 'Tendencia al incremento', ira25: 'Mixto', ira26: 'Estable' },
        'Sucre': { dengue25: 803, dengue26: 'Tendencia al incremento', malaria26: 'Tendencia al incremento', ira25: 'Aumento', ira26: 'Estable' },
        'Tolima': { dengue25: '1,692', dengue26: 'Aumento', malaria26: 'Tendencia al incremento', ira25: 'Aumento', ira26: 'Estable' },
        'Valle del Cauca': { dengue25: '1,306', dengue26: 'Aumento', malaria26: 'Aumento', ira25: 'Mixto', ira26: 'Estable' },
        'Vaupés': { dengue25: 6, dengue26: 'Tendencia al incremento', malaria26: 'Tendencia al incremento', ira25: 'Disminución', ira26: 'Aumento' },
        'Vichada': { dengue25: 99, dengue26: 'Tendencia al incremento', malaria26: 'Aumento', ira25: 'Mixto', ira26: 'Estable' }
    };

    const weatherForecastRaw = {
        'Insular': [
            { mont: 'Ene', prec: 'Exceso +10-20%', temp: '+1.5 °C' },
            { mont: 'Feb', prec: 'Normal / Déficit', temp: 'Normal' },
            { mont: 'Mar', prec: 'Exceso +10-20%', temp: 'Normal' },
            { mont: 'Abr', prec: 'Déficit -20-40%', temp: 'Normal' },
            { mont: 'May', prec: 'Déficit -10-20%', temp: '+0.5-2.0 °C' },
            { mont: 'Jun', prec: 'Normal', temp: '+0.5-2.0 °C' },
            { mont: 'Jul', prec: 'Déficit -20%', temp: '+0.5-2.0 °C' }
        ],
        'Caribe': [
            { mont: 'Ene', prec: 'Exceso (Sur) / Déficit (Norte)', temp: '+1.5 °C' },
            { mont: 'Feb', prec: 'Déficit -10-60%', temp: 'Normal' },
            { mont: 'Mar', prec: 'Exceso +80% (Sur)', temp: '+0.5-1.0 °C' },
            { mont: 'Abr', prec: 'Déficit -20-60%', temp: 'Normal' },
            { mont: 'May', prec: 'Mixto', temp: '+0.5-2.0 °C' },
            { mont: 'Jun', prec: 'Normal / Déficit', temp: '+0.5-2.0 °C' },
            { mont: 'Jul', prec: 'Déficit -20-40%', temp: '+0.5-2.0 °C' }
        ],
        'Andina': [
            { mont: 'Ene', prec: 'Exceso +10-30%', temp: '+1.5 °C' },
            { mont: 'Feb', prec: 'Normal / Déficit', temp: 'Normal' },
            { mont: 'Mar', prec: 'Exceso +20-50%', temp: 'Normal' },
            { mont: 'Abr', prec: 'Mixto / Exceso', temp: 'Normal' },
            { mont: 'May', prec: 'Exceso (Sur) / Normal', temp: '+0.5-2.0 °C' },
            { mont: 'Jun', prec: 'Exceso / Déficit (Norte)', temp: '+0.5-2.0 °C' },
            { mont: 'Jul', prec: 'Exceso (Sur) / Déficit', temp: '+0.5-2.0 °C' }
        ],
        'Pacífica': [
            { mont: 'Ene', prec: 'Exceso +10-30%', temp: '+1.5 °C' },
            { mont: 'Feb', prec: 'Normal / Déficit', temp: 'Normal' },
            { mont: 'Mar', prec: 'Exceso +10-20%', temp: 'Normal' },
            { mont: 'Abr', prec: 'Déficit -10-40%', temp: 'Normal' },
            { mont: 'May', prec: 'Exceso +20%', temp: '+0.5-2.0 °C' },
            { mont: 'Jun', prec: 'Exceso +10-20%', temp: '+0.5-2.0 °C' },
            { mont: 'Jul', prec: 'Déficit -30-50%', temp: '+0.5-2.0 °C' }
        ],
        'Orinoquía': [
            { mont: 'Ene', prec: 'Exceso +10-30%', temp: '+1.5 °C' },
            { mont: 'Feb', prec: 'Déficit -50-70%', temp: 'Normal' },
            { mont: 'Mar', prec: 'Exceso +10-20%', temp: '+0.5-1.0 °C' },
            { mont: 'Abr', prec: 'Mixto', temp: 'Normal' },
            { mont: 'May', prec: 'Normal', temp: '+0.5-2.0 °C' },
            { mont: 'Jun', prec: 'Normal', temp: '+0.5-2.0 °C' },
            { mont: 'Jul', prec: 'Normal', temp: '+0.5-2.0 °C' }
        ],
        'Amazonía': [
            { mont: 'Ene', prec: 'Exceso +10-30%', temp: '+1.5 °C' },
            { mont: 'Feb', prec: 'Déficit / Exceso (Sur)', temp: 'Normal' },
            { mont: 'Mar', prec: 'Exceso +10-50%', temp: '+0.5-1.0 °C' },
            { mont: 'Abr', prec: 'Déficit -10-30%', temp: 'Normal' },
            { mont: 'May', prec: 'Exceso', temp: '+0.5-2.0 °C' },
            { mont: 'Jun', prec: 'Déficit -20-30%', temp: '+0.5-2.0 °C' },
            { mont: 'Jul', prec: 'Déficit / Exceso', temp: '+0.5-2.0 °C' }
        ]
    };

    const deptSelect = document.getElementById('departmentSelect');
    const healthContainer = document.getElementById('healthTableContainer');
    const weatherContainer = document.getElementById('weatherTableContainer');

    // Populate Select
    const sortedDepts = Object.keys(deptToRegion).sort();
    sortedDepts.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept;
        option.textContent = dept;
        deptSelect.appendChild(option);
    });

    function renderHealthTable(dept) {
        const data = healthDataRaw[dept] || { dengue25: 'Sin datos', dengue26: 'N/A', malaria26: 'N/A', ira25: 'N/A', ira26: 'N/A' };

        let html = `
            <table>
                <thead>
                    <tr>
                        <th>Indicador</th>
                        <th>Dato / Pronóstico</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Dengue - Casos 2025 (Sem 1-5)</strong></td>
                        <td>${data.dengue25}</td>
                    </tr>
                    <tr>
                        <td><strong>Dengue - Tendencia Ene 2026</strong></td>
                        <td><span class="${getTrendClass(data.dengue26)}">${data.dengue26}</span></td>
                    </tr>
                    <tr>
                        <td><strong>Malaria - Tendencia Ene 2026</strong></td>
                        <td><span class="${getTrendClass(data.malaria26)}">${data.malaria26}</span></td>
                    </tr>
                    <tr>
                        <td><strong>IRA - Tendencia Ene 2025</strong></td>
                        <td><span class="${getTrendClass(data.ira25)}">${data.ira25}</span></td>
                    </tr>
                    <tr>
                        <td><strong>IRA - Tendencia Ene 2026</strong></td>
                        <td><span class="${getTrendClass(data.ira26)}">${data.ira26}</span></td>
                    </tr>
        `;

        if (data.viralCirculation) {
            html += `
                    <tr>
                        <td><strong>Circulación Viral Predominante</strong></td>
                        <td><span class="trend-up">${data.viralCirculation}</span></td>
                    </tr>
            `;
        }

        html += `
                </tbody>
            </table>
        `;
        healthContainer.innerHTML = html;
    }

    function getTrendClass(text) {
        if (!text) return '';
        const lowerText = text.toString().toLowerCase();
        if (lowerText.includes('aumento') || lowerText.includes('incremento') || lowerText.includes('exceso') || lowerText.startsWith('+')) return 'trend-up';
        if (lowerText.includes('déficit') || lowerText.startsWith('-')) return 'trend-down';
        return 'trend-stable';
    }

    function renderWeatherTable(dept) {
        const region = getRegion(dept);
        const data = weatherForecastRaw[region] || [];

        let html = `
            <table>
                <thead>
                    <tr>
                        <th>Mes</th>
                        <th>Precipitación (Anomalía)</th>
                        <th>Temperatura (Anomalía)</th>
                    </tr>
                </thead>
                <tbody>
        `;

        data.forEach(row => {
            html += `
                <tr>
                    <td>${row.mont}</td>
                    <td><span class="${getTrendClass(row.prec)}">${row.prec}</span></td>
                    <td><span class="${getTrendClass(row.temp)}">${row.temp}</span></td>
                </tr>
            `;
        });

        html += `</tbody></table>`;
        weatherContainer.innerHTML = html;
    }

    // Init
    deptSelect.addEventListener('change', (e) => {
        const dept = e.target.value;
        renderHealthTable(dept);
        renderWeatherTable(dept);
    });

    // Default Render
    if (sortedDepts.length > 0) {
        renderHealthTable(sortedDepts[0]);
        renderWeatherTable(sortedDepts[0]);
    }

});


