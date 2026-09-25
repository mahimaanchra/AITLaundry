export const HOSTELS = ['Hostel A', 'Hostel B', 'Hostel C', 'Hostel D'];
export const FLANKS = ['Flank 1', 'Flank 2', 'Flank 3', 'Flank 4'];

export const CLOTH_TYPES = [
  'Shirt',
  'T-Shirt',
  'Pants / Jeans',
  'Shorts',
  'Bedsheet',
  'Towel',
  'Other',
];

// 1. These MUST match the exact words the backend sends/expects
export const LAUNDRY_STATUS = {
  SUBMITTED: 'submitted',
  RECEIVED_BY_STAFF: 'received',
  READY_FOR_PICKUP: 'ready',
  STUDENT_CONFIRMED: 'student_confirmed',
  COMPLETED: 'distributed', // (or 'completed' depending on your backend)
};

// 2. These make the UI look pretty on the screen
export const STATUS_DISPLAY = {
  'submitted': 'Submitted',
  'received': 'Received at Counter',
  'ready': 'Ready for Pickup',
  'student_confirmed': 'Picked Up & Confirmed',
  'distributed': 'Completed',
};

// 3. Updated Colors to map to the backend words
export const STATUS_COLORS = {
  'submitted': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'received': 'bg-emerald-100 text-emerald-800 border-emerald-300',
  'ready': 'bg-green-100 text-green-800 border-green-300',
  'student_confirmed': 'bg-red-100 text-red-800 border-red-300',
  'distributed': 'bg-gray-100 text-gray-800 border-gray-300',
};