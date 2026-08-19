export const ROLES = {
  STUDENT: 'STUDENT',
  STAFF: 'STAFF',
  ADMIN: 'ADMIN',
};

export const LAUNDRY_STATUS = {
  SUBMITTED: 'SUBMITTED',               // Student created entry
  RECEIVED_BY_STAFF: 'RECEIVED',        // Staff confirmed receipt
  READY_FOR_PICKUP: 'READY',            // Processed & returned to counter
  STUDENT_CONFIRMED: 'STUDENT_CONFIRMED',// Student confirmed getting it back
  COMPLETED: 'COMPLETED',               // Staff confirmed final handover
};

export const CLOTH_TYPES = [
  'Shirt', 'T-Shirt', 'Trousers/Pants', 'Jeans', 
  'Bed Sheet', 'Pillow Cover', 'Towel', 'Other'
];