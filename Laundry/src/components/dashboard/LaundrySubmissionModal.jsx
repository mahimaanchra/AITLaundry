import React, { useState } from 'react';
import { X, Minus, Plus, Upload, ArrowRight, Package } from 'lucide-react';
import { useLaundryStore } from '../../stores/laundryStore';


export default function LaundrySubmissionModal({ onClose }) {
  const [items, setItems] = useState({
    shirts: 0,
    pants: 0,
    bedsheets: 0,
    towels: 0,
    others: 0
  });
  
  const [photos, setPhotos] = useState([]);
  const [garmentNote, setGarmentNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addEntry, currentUser } = useLaundryStore();
  
  const itemLabels = {
    shirts: '👔 Shirts',
    pants: '👖 Pants', 
    bedsheets: '🛏️ Bedsheets',
    towels: '🏊 Towels',
    others: '👕 Others'
  };

  const updateQuantity = (item, delta) => {
    setItems(prev => ({
      ...prev,
      [item]: Math.max(0, prev[item] + delta)
    }));
  };

  const getTotalItems = () => {
    return Object.values(items).reduce((sum, count) => sum + count, 0);
  };

  const handleSubmit = async () => {
    if (getTotalItems() === 0) return;
    
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const entryData = {
      studentId: currentUser?.id || 'student-mahima-102',
      studentName: currentUser?.name || 'Mahima Sharma',
      rollNo: currentUser?.rollNo || '21102',
      hostel: 'Hostel A',
      flank: 'Flank F-03',
      roomNo: currentUser?.roomNo || '102',
      pageNo: 27,
      items,
      garmentPhotoUrls: photos.map(photo => URL.createObjectURL(photo)), // In real app, would upload to server
      garmentNote: garmentNote.trim() || undefined,
      submittedByStudent: true
    };
    
    addEntry(entryData);
    setIsSubmitting(false);
    onClose();
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setPhotos(prev => [...prev, ...files.slice(0, 3 - prev.length)]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 max-w-md w-full max-h-[90vh] overflow-y-auto transition-colors duration-300">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">New Laundry Submission</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Add your clothes to the digital register</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Item Counters */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Package className="w-4 h-4" />
              Garment Quantities
            </h3>
            
            {Object.entries(items).map(([item, count]) => (
              <div key={item} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 transition-colors duration-300">
                <span className="font-medium text-slate-700 dark:text-slate-300">{itemLabels[item]}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item, -1)}
                    className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-500 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center justify-center transition-colors"
                    disabled={count === 0}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold text-slate-900 dark:text-white">{count}</span>
                  <button
                    onClick={() => updateQuantity(item, 1)}
                    className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-500 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Garment Note */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white">Special Notes (Optional)</h3>
            <textarea
              value={garmentNote}
              onChange={(e) => setGarmentNote(e.target.value)}
              placeholder="Any special instructions or notes about your garments..."
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
              rows={3}
              maxLength={200}
            />
            <p className="text-xs text-slate-400 dark:text-slate-500">{garmentNote.length}/200 characters</p>
          </div>

          {/* Photo Upload */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Optional Garment Photos
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Upload photos of high-value items for identification</p>
            
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-lg p-4 text-center transition-colors duration-300">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="cursor-pointer flex flex-col items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              >
                <Upload className="w-6 h-6" />
                <span className="text-sm font-medium">Click to upload photos</span>
                <span className="text-xs text-slate-400 dark:text-slate-500">Max 3 photos</span>
              </label>
            </div>
            
            {photos.length > 0 && (
              <div className="flex gap-2">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Garment ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-lg border border-slate-200 dark:border-slate-600"
                    />
                    <button
                      onClick={() => setPhotos(prev => prev.filter((_, i) => i !== index))}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          {getTotalItems() > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 transition-colors duration-300">
              <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Submission Summary</h4>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Total items: <span className="font-bold">{getTotalItems()}</span>
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-500 mt-1">
                Tag will be automatically generated upon submission
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={getTotalItems() === 0 || isSubmitting}
            className="flex-1 bg-[#1E3A8A] hover:bg-indigo-900 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit to Register
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}