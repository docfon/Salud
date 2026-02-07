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

    // Add Markers
    diseasePoints.forEach(point => {
        const color = point.type === 'red' ? '#d93025' :
            point.type === 'orange' ? '#e37400' :
                point.type === 'blue' ? '#1a73e8' : '#fbbc04';

        const circle = L.circleMarker([point.lat, point.lon], {
            color: color,
            fillColor: color,
            fillOpacity: 0.7,
            radius: 8
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

});

