import { create } from 'zustand';

export const useStore = create((set) => ({
    // Theme state
    isDarkMode: true,
    toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

    // Loading state for lazy loading
    isLoading: true,
    setLoading: (loading) => set({ isLoading: loading }),

    // Cursor position
    cursorPosition: { x: 0, y: 0 },
    setCursorPosition: (pos) => set({ cursorPosition: pos }),

    // Scroll position
    scrollY: 0,
    setScrollY: (y) => set({ scrollY: y }),

    // Active tab in projects/certificates
    activeTab: 'all',
    setActiveTab: (tab) => set({ activeTab: tab }),

    // Modal state
    isModalOpen: false,
    modalContent: null,
    openModal: (content) => set({ isModalOpen: true, modalContent: content }),
    closeModal: () => set({ isModalOpen: false, modalContent: null }),

    // Form state for contact
    formData: {
        name: '',
        email: '',
        message: ''
    },
    setFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
    })),
    resetForm: () => set({
        formData: { name: '', email: '', message: '' }
    })
}));
