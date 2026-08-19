export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getStatusColor = (status) => {
  switch (status) {
    case LAUNDRY_STATUS.SUBMITTED: return 'bg-yellow-100 text-yellow-800';
    case LAUNDRY_STATUS.RECEIVED_BY_STAFF: return 'bg-blue-100 text-blue-800';
    case LAUNDRY_STATUS.READY_FOR_PICKUP: return 'bg-purple-100 text-purple-800';
    case LAUNDRY_STATUS.COMPLETED: return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};