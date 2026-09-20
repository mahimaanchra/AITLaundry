export const generateMockData = () => {
  const students = [
    { name: 'Mahima Sharma', rollNo: '21102', roomNo: '102' },
    { name: 'Arjun Patel', rollNo: '21045', roomNo: '145' },
    { name: 'Priya Singh', rollNo: '21067', roomNo: '234' },
    { name: 'Rahul Kumar', rollNo: '21089', roomNo: '178' },
    { name: 'Sneha Reddy', rollNo: '21123', roomNo: '267' }
  ];

  const hostels = ['Hostel A', 'Hostel B', 'Hostel C'];
  const flanks = ['Flank F-01', 'Flank F-02', 'Flank F-03', 'Flank F-04'];
  
  const statuses = ['PENDING_INTAKE', 'STAFF_RECEIVED', 'READY_FOR_PICKUP', 'COMPLETED'];

  const mockEntries = [];

  // Generate entries for the last 7 days
  for (let day = 0; day < 7; day++) {
    const date = new Date();
    date.setDate(date.getDate() - day);
    
    // Generate 2-5 entries per day
    const entriesCount = Math.floor(Math.random() * 4) + 2;
    
    for (let i = 0; i < entriesCount; i++) {
      const student = students[Math.floor(Math.random() * students.length)];
      const hostel = hostels[Math.floor(Math.random() * hostels.length)];
      const flank = flanks[Math.floor(Math.random() * flanks.length)];
      const pageNo = Math.floor(Math.random() * 50) + 1;
      
      const hostelCode = hostel.charAt(hostel.length - 1);
      const flankCode = flank.split('-')[1] || '01';
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      const tagCode = `${hostelCode}${flankCode}-${random}`;
      
      const status = day === 0 ? 
        statuses[Math.floor(Math.random() * 3)] : // Recent entries are more likely to be in progress
        statuses[Math.floor(Math.random() * statuses.length)];
      
      const now = date.toISOString();
      const isCompleted = status === 'COMPLETED';
      
      const entry = {
        id: `entry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        studentId: `student-${student.rollNo}`,
        studentName: student.name,
        rollNo: student.rollNo,
        hostel,
        flank,
        roomNo: student.roomNo,
        pageNo,
        tagCode,
        createdAt: now,
        updatedAt: now,
        items: {
          shirts: Math.floor(Math.random() * 5),
          pants: Math.floor(Math.random() * 3),
          bedsheets: Math.floor(Math.random() * 2),
          towels: Math.floor(Math.random() * 2),
          others: Math.floor(Math.random() * 2)
        },
        garmentPhotoUrls: [],
        garmentNote: Math.random() > 0.7 ? 'Handle with care - delicate fabric' : undefined,
        status,
        studentConfirmedReturn: isCompleted || (status === 'READY_FOR_PICKUP' && Math.random() > 0.5),
        staffConfirmedHandover: isCompleted || (status === 'READY_FOR_PICKUP' && Math.random() > 0.5),
        submittedByStudent: true,
        processingStartedAt: status !== 'PENDING_INTAKE' ? now : undefined,
        completedAt: isCompleted ? now : undefined,
        studentConfirmedAt: isCompleted ? now : undefined,
        staffConfirmedAt: isCompleted ? now : undefined
      };
      
      // Ensure at least one item
      const totalItems = Object.values(entry.items).reduce((sum, count) => sum + count, 0);
      if (totalItems === 0) {
        entry.items.shirts = 1;
      }
      
      mockEntries.push(entry);
    }
  }

  return mockEntries;
};

export const seedMockData = () => {
  // Check multiple guards to prevent duplicate seeding
  const existingData = localStorage.getItem('washlog-data-v1');
  const alreadySeeded = localStorage.getItem('washlog_seeded');
  
  if (!existingData && !alreadySeeded) {
    console.log('🌱 Seeding mock data for first time...');
    
    const mockData = {
      state: {
        entries: generateMockData(),
        notifications: [],
        theme: { mode: 'light', primaryColor: '#1E3A8A', accentColor: '#3B82F6' },
        selectedLocation: { hostel: 'Hostel A', flank: 'Flank F-03', pageNo: '27' }
      },
      version: 0
    };
    
    localStorage.setItem('washlog-data-v1', JSON.stringify(mockData));
    localStorage.setItem('washlog_seeded', 'true');
    console.log('🌱 Mock data seeded successfully!');
    return true;
  }
  
  console.log('📦 Data already exists, skipping seed');
  return false;
};