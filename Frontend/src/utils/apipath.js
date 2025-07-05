export const API_BASE_URL = 'http://localhost:4000';
export const API_ENDPOINTS = {
    Auth:{
        login: 'api/auth/login',
        register: 'api/auth/register',
        get_profile: 'api/auth/profile',
    },
    Resume: {
        create: 'api/resume/',
        get_all: 'api/resume/',
        get_by_id: (id) => `api/resume/${id}`,
        update: (id) => `api/resume/${id}`,
        delete: (id) => `api/resume/${id}`,
        upload_images: (id) => `api/resume/${id}/upload-images`,
    },
    image:{
        
    }
};
export const getApiUrl = (endpoint) => {
    return `${API_BASE_URL}${API_ENDPOINTS[endpoint]}`;
};
