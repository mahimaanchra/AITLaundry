import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const generateTagCode = (hostel, flank, pageNo) => {
  const hostelCode = hostel.charAt(hostel.length - 1); // A, B, C
  const flankCode = flank.split('-')[1] || '01'; // F-01 -> 01
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${hostelCode}${flankCode}-${random}`;
};

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const useLaundryStore = create()(
  persist(
    (set, get) => ({
      // Initial State
      entries: [],
      notifications: [],
      currentUser: null,
      theme: {
        mode: 'light',
        primaryColor: '#1E3A8A',
        accentColor: '#3B82F6'
      },
      searchFilters: {
        query: '',
      },
      selectedLocation: {
        hostel: 'Hostel A',
        flank: 'Flank F-03',
        pageNo: '27'
      },
      isLoading: false,
      error: null,

      // Entry Management Actions
      addEntry: (entryData) => {
        const now = new Date().toISOString();
        const tagCode = generateTagCode(entryData.hostel, entryData.flank, entryData.pageNo);
        
        const newEntry = {
          ...entryData,
          id: generateId(),
          tagCode,
          createdAt: now,
          updatedAt: now,
          status: 'PENDING_INTAKE',
          studentConfirmedReturn: false,
          staffConfirmedHandover: false,
          submittedByStudent: true
        };

        set(state => ({
          entries: [newEntry, ...state.entries]
        }));

        // Add notification
        get().addNotification({
          type: 'STATUS_CHANGE',
          title: 'New Submission',
          message: `${entryData.studentName} submitted laundry for ${entryData.hostel} - ${entryData.flank}`,
          entryId: newEntry.id,
          metadata: { tagCode }
        });

        return newEntry;
      },

      updateEntry: (id, updates) => {
        set(state => ({
          entries: state.entries.map(entry =>
            entry.id === id
              ? { ...entry, ...updates, updatedAt: new Date().toISOString() }
              : entry
          )
        }));
      },

      updateEntryStatus: (id, status) => {
        const entry = get().entries.find(e => e.id === id);
        if (!entry) return;

        const statusMessages = {
          'STAFF_RECEIVED': 'Laundry received by staff',
          'IN_PROCESSING': 'Laundry is being processed',
          'READY_FOR_PICKUP': 'Laundry ready for pickup',
          'COMPLETED': 'Distribution completed',
          'DISPUTED': 'Issue reported with laundry'
        };

        set(state => ({
          entries: state.entries.map(e =>
            e.id === id
              ? {
                  ...e,
                  status,
                  updatedAt: new Date().toISOString(),
                  processingStartedAt: status === 'STAFF_RECEIVED' ? new Date().toISOString() : e.processingStartedAt,
                  completedAt: status === 'COMPLETED' ? new Date().toISOString() : e.completedAt
                }
              : e
          )
        }));

        // Add status change notification
        if (statusMessages[status]) {
          get().addNotification({
            type: 'STATUS_CHANGE',
            title: 'Status Update',
            message: `${entry.tagCode}: ${statusMessages[status]}`,
            entryId: id,
            metadata: { previousStatus: entry.status, newStatus: status }
          });
        }
      },

      confirmStudentReturn: (id) => {
        const now = new Date().toISOString();
        set(state => ({
          entries: state.entries.map(entry =>
            entry.id === id
              ? {
                  ...entry,
                  studentConfirmedReturn: true,
                  studentConfirmedAt: now,
                  updatedAt: now,
                  status: entry.staffConfirmedHandover ? 'COMPLETED' : entry.status
                }
              : entry
          )
        }));

        const entry = get().entries.find(e => e.id === id);
        if (entry?.staffConfirmedHandover) {
          get().addNotification({
            type: 'COMPLETION',
            title: 'Distribution Completed',
            message: `${entry.tagCode}: Both parties confirmed - distribution officially completed`,
            entryId: id
          });
        }
      },

      confirmStaffHandover: (id) => {
        const now = new Date().toISOString();
        set(state => ({
          entries: state.entries.map(entry =>
            entry.id === id
              ? {
                  ...entry,
                  staffConfirmedHandover: true,
                  staffConfirmedAt: now,
                  updatedAt: now,
                  status: entry.studentConfirmedReturn ? 'COMPLETED' : entry.status
                }
              : entry
          )
        }));

        const entry = get().entries.find(e => e.id === id);
        if (entry?.studentConfirmedReturn) {
          get().addNotification({
            type: 'COMPLETION',
            title: 'Distribution Completed',
            message: `${entry.tagCode}: Both parties confirmed - distribution officially completed`,
            entryId: id
          });
        }
      },

      deleteEntry: (id) => {
        set(state => ({
          entries: state.entries.filter(entry => entry.id !== id)
        }));
      },

      // Notification Actions
      addNotification: (notificationData) => {
        const notification = {
          ...notificationData,
          id: generateId(),
          timestamp: new Date().toISOString(),
          read: false
        };

        set(state => ({
          notifications: [notification, ...state.notifications].slice(0, 50) // Keep only latest 50
        }));
      },

      markNotificationRead: (id) => {
        set(state => ({
          notifications: state.notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
          )
        }));
      },

      clearAllNotifications: () => {
        set({ notifications: [] });
      },

      // User & Auth Actions
      setCurrentUser: (user) => {
        set({ currentUser: user });
      },

      login: (user) => {
        set({ currentUser: user });
        get().addNotification({
          type: 'SYSTEM',
          title: 'Welcome!',
          message: `Logged in as ${user.name} (${user.role})`
        });
      },

      logout: () => {
        set({ currentUser: null });
      },

      // Theme Actions
      toggleTheme: () => {
        set(state => ({
          theme: {
            ...state.theme,
            mode: state.theme.mode === 'light' ? 'dark' : 'light'
          }
        }));
      },

      setTheme: (mode) => {
        set(state => ({
          theme: { ...state.theme, mode }
        }));
      },

      // Search & Filter Actions
      setSearchQuery: (query) => {
        set(state => ({
          searchFilters: { ...state.searchFilters, query }
        }));
      },

      setSearchFilters: (filters) => {
        set(state => ({
          searchFilters: { ...state.searchFilters, ...filters }
        }));
      },

      clearSearchFilters: () => {
        set({
          searchFilters: { query: '' }
        });
      },

      // Location Actions
      setSelectedLocation: (location) => {
        set(state => ({
          selectedLocation: { ...state.selectedLocation, ...location }
        }));
      },

      // Loading & Error Actions
      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error });
      },

      // Helper Methods
      getEntriesForLocation: (hostel, flank, pageNo) => {
        return get().entries.filter(entry =>
          entry.hostel === hostel &&
          entry.flank === flank &&
          entry.pageNo.toString() === pageNo
        );
      }
    }),
    {
      name: 'washlog-data-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        entries: state.entries,
        notifications: state.notifications,
        theme: state.theme,
        selectedLocation: state.selectedLocation
      })
    }
  )
);