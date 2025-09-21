// European Growth Markets App - JavaScript with Enhanced Animations (Fixed)
document.addEventListener('DOMContentLoaded', function() {
    // Updated data from the application requirements
    const data = {
        dubrovnik_prices: {
            "2013": 1800, "2014": 1950, "2015": 2150, "2016": 2400, "2017": 2700,
            "2018": 3000, "2019": 3400, "2020": 3600, "2021": 4000, "2022": 4400,
            "2023": 4800, "2024": 5200
        },
        investment_projects: [
            {
                "project_name": "Dubrovnik Pearl Resort",
                "location": "Dubrovnik, Kroatien",
                "year": "2013",
                "unit_price_then": 250000,
                "unit_price_now": 680000,
                "return_percentage": 172,
                "property_type": "Luxury resort units"
            },
            {
                "project_name": "Makarska Marina Village",
                "location": "Makarska, Kroatien",
                "year": "2015",
                "unit_price_then": 160000,
                "unit_price_now": 380000,
                "return_percentage": 138,
                "property_type": "Marina apartments"
            },
            {
                "project_name": "Porto Montenegro Phase 2",
                "location": "Budva, Montenegro",
                "year": "2021",
                "unit_price_then": 180000,
                "unit_price_now": 280000,
                "return_percentage": 56,
                "property_type": "Marina residences"
            }
        ],
        eu_expansion_countries: [
            {"country": "Montenegro", "readiness_score": 85, "expected_membership": "2028", "key_sectors": ["Turisme", "Infrastruktur", "Energi"]},
            {"country": "Nordmakedonien", "readiness_score": 72, "expected_membership": "2030", "key_sectors": ["Landbrug", "Teknologi", "Infrastruktur"]},
            {"country": "Serbien", "readiness_score": 68, "expected_membership": "2032", "key_sectors": ["Produktion", "IT", "Infrastruktur"]}
        ],
        eu_comparison_updated: {
            "Montenegro": 18,
            "Kroatien": 12,
            "Danmark": 8,
            "Tyskland": 6,
            "Frankrig": 5,
            "Spanien": 7
        },
        expansion_readiness: {
            "Montenegro": 85,
            "Nordmakedonien": 72,
            "Serbien": 68
        },
        fdi_line_data: {
            "2021": 85,
            "2022": 120,
            "2023": 165,
            "2024": 210
        },
        bar_infrastructure: [
            {"project": "Havneudvidelse", "investment": "€180M", "completion": "2025", "impact": "50% øget kapacitet"},
            {"project": "Motorvej A1 Forlængelse", "investment": "€240M", "completion": "2026", "impact": "Direkte forbindelse til EU"},
            {"project": "Jernbane Modernisering", "investment": "€85M", "completion": "2024", "impact": "Forbedret logistik"},
            {"project": "EU Tiltrædelsesmidler", "investment": "€320M", "completion": "2025-2028", "impact": "Total transformation"}
        ]
    };

    let currentSection = 0;
    const totalSections = 6;
    let activeCharts = {};

    // Wait for DOM to be fully ready
    setTimeout(() => {
        setupNavigation();
        showSection(0);
    }, 100);

    function setupNavigation() {
        console.log('Setting up navigation...');
        
        // Breadcrumb clicks
        const breadcrumbs = document.querySelectorAll('.breadcrumb');
        breadcrumbs.forEach((breadcrumb, index) => {
            breadcrumb.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Breadcrumb ${index} clicked`);
                showSection(index);
            });
        });

        // Next button clicks
        const nextButtons = document.querySelectorAll('.next-btn');
        nextButtons.forEach((button) => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Next button clicked, current section: ${currentSection}`);
                if (currentSection < totalSections - 1) {
                    showSection(currentSection + 1);
                }
            });
        });

        console.log('Navigation setup complete');
    }

    function showSection(index) {
        console.log(`Showing section ${index}`);
        
        if (index < 0 || index >= totalSections) {
            console.log(`Invalid section index: ${index}`);
            return;
        }

        // Clear existing charts
        Object.values(activeCharts).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
        activeCharts = {};

        // Hide all sections with explicit style changes
        const allSections = document.querySelectorAll('.section');
        allSections.forEach((section, i) => {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        // Show target section with explicit style changes
        const targetSection = document.getElementById(`section-${index}`);
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.classList.add('active');
            console.log(`Showing section-${index}`);
        } else {
            console.log(`Section section-${index} not found!`);
            return;
        }

        // Update breadcrumbs
        const breadcrumbs = document.querySelectorAll('.breadcrumb');
        breadcrumbs.forEach((crumb, i) => {
            crumb.classList.remove('active', 'completed');
            if (i === index) {
                crumb.classList.add('active');
            } else if (i < index) {
                crumb.classList.add('completed');
            }
        });

        currentSection = index;

        // Initialize section content with delay for DOM updates
        setTimeout(() => {
            initializeSection(index);
        }, 300);

        window.scrollTo(0, 0);
    }

    function initializeSection(index) {
        console.log(`Initializing section ${index}`);
        
        // Reset all animated elements
        const animatedElements = document.querySelectorAll('.animated');
        animatedElements.forEach(el => el.classList.remove('animated'));
        
        switch (index) {
            case 1: // Investment cases section
                setTimeout(() => animateReturnValues(), 500);
                break;
            case 2: // Prisvækst section
                setTimeout(() => {
                    createDubrovnikChart();
                    animateCounter();
                }, 500);
                break;
            case 3: // EU-udvidelsen section
                setTimeout(() => {
                    createExpansionReadinessChart();
                    animateMilestones();
                }, 500);
                break;
            case 4: // EU Sammenligning section
                setTimeout(() => {
                    createComparisonChart();
                    animateHighlightNumbers();
                }, 500);
                break;
            case 5: // Markedstiming section
                setTimeout(() => {
                    createFDILineChart();
                    animateImpactPercentages();
                }, 500);
                break;
        }
    }

    // Enhanced Counter Animation Function
    function animateNumber(element, target, duration = 2000, suffix = '', prefix = '') {
        if (!element || element.classList.contains('animated')) return;
        element.classList.add('animated');
        
        let start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = prefix + Math.floor(current) + suffix;
        }, 16);
    }

    // Animate Return Values in Investment Cases
    function animateReturnValues() {
        const returnElements = document.querySelectorAll('.return-value');
        console.log(`Found ${returnElements.length} return value elements`);
        returnElements.forEach((element, index) => {
            const target = parseInt(element.getAttribute('data-target'));
            console.log(`Animating return value ${index}: target ${target}`);
            setTimeout(() => {
                animateNumber(element, target, 2500, '%', '+');
            }, index * 300);
        });
    }

    // Animate Counter for Main Value
    function animateCounter() {
        const counter = document.querySelector('#section-2 .value-number');
        if (counter && !counter.classList.contains('animated')) {
            const target = parseInt(counter.getAttribute('data-target')) || 189;
            console.log(`Animating counter: target ${target}`);
            animateNumber(counter, target, 3000);
        }
    }

    // Animate Highlight Numbers in Comparison Section
    function animateHighlightNumbers() {
        const highlightElements = document.querySelectorAll('#section-4 .highlight-number');
        console.log(`Found ${highlightElements.length} highlight number elements`);
        highlightElements.forEach((element, index) => {
            const target = parseInt(element.getAttribute('data-target'));
            setTimeout(() => {
                animateNumber(element, target, 2000);
            }, index * 500);
        });
    }

    // Animate Impact Percentages in Timing Section
    function animateImpactPercentages() {
        const impactElements = document.querySelectorAll('#section-5 .impact-percentage');
        console.log(`Found ${impactElements.length} impact percentage elements`);
        impactElements.forEach((element, index) => {
            const target = parseInt(element.getAttribute('data-target'));
            setTimeout(() => {
                animateNumber(element, target, 2500, '%');
            }, index * 400);
        });
    }

    // Animate Milestones with Staggered 3D Effects
    function animateMilestones() {
        const milestoneCards = document.querySelectorAll('#section-3 .milestone-card');
        console.log(`Found ${milestoneCards.length} milestone cards`);
        milestoneCards.forEach((card, index) => {
            const delay = parseInt(card.getAttribute('data-delay')) || (index * 200);
            
            // Reset animation
            card.style.opacity = '0';
            card.style.transform = 'perspective(1000px) rotateX(20deg) rotateY(20deg) translateY(50px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            }, delay);
        });
    }

    // Enhanced Chart Creation with Animation
    function createDubrovnikChart() {
        const canvas = document.getElementById('dubrovnik-chart');
        if (!canvas) {
            console.log('Dubrovnik chart canvas not found');
            return;
        }

        console.log('Creating animated Dubrovnik chart');
        
        // Clear any existing chart
        if (activeCharts.dubrovnik) {
            activeCharts.dubrovnik.destroy();
        }

        activeCharts.dubrovnik = new Chart(canvas, {
            type: 'line',
            data: {
                labels: Object.keys(data.dubrovnik_prices),
                datasets: [{
                    data: Object.values(data.dubrovnik_prices),
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#1FB8CD',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                    legend: { display: false },
                },
                scales: {
                    x: { 
                        ticks: { color: '#ffffff' }, 
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    },
                    y: { 
                        ticks: { 
                            color: '#ffffff',
                            callback: value => '€' + value.toLocaleString()
                        }, 
                        grid: { color: 'rgba(255,255,255,0.1)' } 
                    }
                },
                animation: {
                    duration: 3000,
                    easing: 'easeOutQuart'
                },
                elements: {
                    line: {
                        borderCapStyle: 'round',
                        borderJoinStyle: 'round'
                    }
                }
            }
        });
    }

    function createExpansionReadinessChart() {
        const canvas = document.getElementById('expansion-readiness-chart');
        if (!canvas) {
            return;
        }

        console.log('Creating expansion readiness chart');
        const countries = Object.keys(data.expansion_readiness);
        const readiness = Object.values(data.expansion_readiness);
        const colors = ['#1FB8CD', '#FFC185', '#B4413C'];

        // Clear any existing chart
        if (activeCharts.expansion) {
            activeCharts.expansion.destroy();
        }

        activeCharts.expansion = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: countries,
                datasets: [{
                    label: 'EU Beredskab (%)',
                    data: readiness,
                    backgroundColor: colors,
                    borderWidth: 2,
                    borderRadius: 8,
                    borderColor: colors
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                    legend: { 
                        display: true,
                        labels: { color: '#ffffff' }
                    } 
                },
                scales: {
                    x: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                    y: { 
                        ticks: { 
                            color: '#ffffff',
                            callback: value => value + '%'
                        }, 
                        grid: { color: 'rgba(255,255,255,0.1)' },
                        max: 100
                    }
                },
                animation: {
                    duration: 2500,
                    easing: 'easeOutBounce'
                }
            }
        });
    }

    function createComparisonChart() {
        const canvas = document.getElementById('comparison-chart');
        if (!canvas) {
            return;
        }

        console.log('Creating comparison chart');
        const countries = Object.keys(data.eu_comparison_updated);
        const prices = Object.values(data.eu_comparison_updated);
        const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'];
        
        // Clear any existing chart
        if (activeCharts.comparison) {
            activeCharts.comparison.destroy();
        }

        activeCharts.comparison = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: countries,
                datasets: [{
                    data: prices,
                    backgroundColor: colors,
                    borderWidth: 2,
                    borderRadius: 8,
                    borderColor: colors
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                    y: { 
                        ticks: { 
                            color: '#ffffff',
                            callback: value => value + '%'
                        }, 
                        grid: { color: 'rgba(255,255,255,0.1)' } 
                    }
                },
                animation: {
                    duration: 3000,
                    easing: 'easeOutQuart',
                    delay: function(context) {
                        return context.dataIndex * 200;
                    }
                }
            }
        });
    }

    function createFDILineChart() {
        const canvas = document.getElementById('fdi-chart');
        if (!canvas) {
            return;
        }

        console.log('Creating FDI line chart');

        // Clear any existing chart
        if (activeCharts.fdi) {
            activeCharts.fdi.destroy();
        }

        activeCharts.fdi = new Chart(canvas, {
            type: 'line',
            data: {
                labels: Object.keys(data.fdi_line_data),
                datasets: [{
                    label: 'FDI (€M)',
                    data: Object.values(data.fdi_line_data),
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#1FB8CD',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                    legend: { 
                        display: true,
                        labels: { color: '#ffffff' }
                    } 
                },
                scales: {
                    x: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                    y: { 
                        ticks: { 
                            color: '#ffffff',
                            callback: value => '€' + value + 'M'
                        }, 
                        grid: { color: 'rgba(255,255,255,0.1)' } 
                    }
                },
                animation: {
                    duration: 3500,
                    easing: 'easeOutQuart'
                },
                elements: {
                    line: {
                        borderCapStyle: 'round',
                        borderJoinStyle: 'round'
                    }
                }
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' && currentSection < totalSections - 1) {
            e.preventDefault();
            showSection(currentSection + 1);
        } else if (e.key === 'ArrowLeft' && currentSection > 0) {
            e.preventDefault();
            showSection(currentSection - 1);
        }
    });

    console.log('JavaScript loaded and initialized with enhanced animations');
});