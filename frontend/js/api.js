// API Configuration
const API_BASE_URL = 'http://localhost:8000/api';

// API Client
const api = {
    async get(endpoint) {
        // Retirer le slash final s'il existe
        const cleanEndpoint = endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint;
        const response = await fetch(`${API_BASE_URL}${cleanEndpoint}`);
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`API Error: ${response.status} - ${error}`);
        }
        return response.json();
    },

    async post(endpoint, data) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        return response.json();
    },

    // Circuits
    async getCircuits() {
        return this.get('/circuits');
    },

    async getCircuitInfo(circuit) {
        return this.get(`/circuits/${circuit}`);
    },

    // Vehicles
    async getVehicles(circuit, race = 'R1') {
        return this.get(`/vehicles/${circuit}?race=${race}`);
    },

    async getLaps(circuit, chassis, carNumber, race = 'R1') {
        return this.get(`/vehicles/${circuit}/${chassis}/${carNumber}/laps?race=${race}`);
    },

    // Analysis
    async getGoldenLap(circuit, race = 'R1') {
        return this.get(`/analysis/golden/${circuit}?race=${race}`);
    },

    async compareLap(circuit, chassis, carNumber, lap, race = 'R1') {
        return this.post('/analysis/compare', {
            circuit,
            chassis,
            car_number: carNumber,
            lap,
            race
        });
    }
};