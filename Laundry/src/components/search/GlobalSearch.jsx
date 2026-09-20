import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, X, Tag, User, Home, Hash } from 'lucide-react';
import { useLaundryStore } from '../../stores/laundryStore';

const GlobalSearch = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  // Use stable selectors
  const searchFilters = useLaundryStore((state) => state.searchFilters);
  const setSearchQuery = useLaundryStore((state) => state.setSearchQuery);
  const entries = useLaundryStore((state) => state.entries);
  const selectedLocation = useLaundryStore((state) => state.selectedLocation);
  const setSelectedLocation = useLaundryStore((state) => state.setSelectedLocation);

  // Memoize search function to prevent recreation on every render
  const searchEntries = useCallback((query) => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    const searchResults = [];

    entries.forEach(entry => {
      const matches = [];

      // Check different fields
      if (entry.studentName.toLowerCase().includes(searchTerm)) {
        matches.push({ type: 'name', text: entry.studentName });
      }
      if (entry.rollNo.toLowerCase().includes(searchTerm)) {
        matches.push({ type: 'rollNo', text: entry.rollNo });
      }
      if (entry.roomNo.toLowerCase().includes(searchTerm)) {
        matches.push({ type: 'room', text: entry.roomNo });
      }
      if (entry.tagCode.toLowerCase().includes(searchTerm)) {
        matches.push({ type: 'tagCode', text: entry.tagCode });
      }
      if (entry.hostel.toLowerCase().includes(searchTerm)) {
        matches.push({ type: 'hostel', text: entry.hostel });
      }
      if (entry.flank.toLowerCase().includes(searchTerm)) {
        matches.push({ type: 'flank', text: entry.flank });
      }

      // Add result for each match type
      matches.forEach(match => {
        searchResults.push({
          entry,
          matchType: match.type,
          matchText: match.text
        });
      });
    });

    // Sort by relevance (exact matches first, then partial matches)
    return searchResults
      .sort((a, b) => {
        const aExact = a.matchText.toLowerCase() === searchTerm;
        const bExact = b.matchText.toLowerCase() === searchTerm;
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        return 0;
      })
      .slice(0, 8); // Limit to 8 results
  }, [entries]); // Add entries as dependency

  // Handle input change
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim()) {
      const searchResults = searchEntries(query);
      setResults(searchResults);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  // Handle result selection
  const handleResultSelect = (result) => {
    const { entry } = result;
    
    // Navigate to the entry's location
    setSelectedLocation({
      hostel: entry.hostel,
      flank: entry.flank,
      pageNo: entry.pageNo.toString()
    });
    
    // Set search to the selected entry's tag code for highlighting
    setSearchQuery(entry.tagCode);
    setShowResults(false);
    inputRef.current?.blur();
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setResults([]);
    setShowResults(false);
    inputRef.current?.focus();
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && results.length > 0) {
      handleResultSelect(results[0]);
    }
    if (e.key === 'Escape') {
      setShowResults(false);
      inputRef.current?.blur();
    }
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target) &&
        !inputRef.current?.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get match icon
  const getMatchIcon = (matchType) => {
    switch (matchType) {
      case 'name':
        return <User className="w-3 h-3" />;
      case 'rollNo':
        return <Hash className="w-3 h-3" />;
      case 'room':
        return <Home className="w-3 h-3" />;
      case 'tagCode':
        return <Tag className="w-3 h-3" />;
      case 'hostel':
      case 'flank':
        return <Home className="w-3 h-3" />;
      default:
        return <Search className="w-3 h-3" />;
    }
  };

  // Get match type label
  const getMatchTypeLabel = (matchType) => {
    switch (matchType) {
      case 'name': return 'Student';
      case 'rollNo': return 'Roll No';
      case 'room': return 'Room';
      case 'tagCode': return 'Tag';
      case 'hostel': return 'Hostel';
      case 'flank': return 'Flank';
      default: return 'Match';
    }
  };

  return (
    <div className="relative flex-1 max-w-2xl">
      {/* Search Input */}
      <div className={`relative transition-all duration-200 ${isFocused ? 'transform scale-[1.02]' : ''}`}>
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search student name, room, page #, or tag code..."
          value={searchFilters.query}
          onChange={handleInputChange}
          onFocus={() => {
            setIsFocused(true);
            if (searchFilters.query && results.length > 0) {
              setShowResults(true);
            }
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
        />
        {searchFilters.query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && results.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto"
        >
          <div className="p-2">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 px-3 py-2">
              Found {results.length} result{results.length !== 1 ? 's' : ''}
            </div>
            <div className="space-y-1">
              {results.map((result, index) => (
                <button
                  key={`${result.entry.id}-${result.matchType}-${index}`}
                  onClick={() => handleResultSelect(result)}
                  className="w-full px-3 py-2 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-slate-100 dark:bg-slate-700 rounded-md text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">
                        {getMatchIcon(result.matchType)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white">
                          {result.entry.studentName}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          <span className="font-medium text-blue-600 dark:text-blue-400">
                            {getMatchTypeLabel(result.matchType)}:
                          </span>{' '}
                          {result.matchText} • {result.entry.hostel} • {result.entry.flank}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                      <span className="font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                        {result.entry.tagCode}
                      </span>
                      <div className={`w-2 h-2 rounded-full ${
                        result.entry.status === 'COMPLETED' ? 'bg-emerald-500' :
                        result.entry.status === 'READY_FOR_PICKUP' ? 'bg-green-500' :
                        result.entry.status === 'STAFF_RECEIVED' ? 'bg-blue-500' :
                        result.entry.status === 'PENDING_INTAKE' ? 'bg-amber-500' :
                        'bg-slate-400'
                      }`} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {showResults && results.length === 0 && searchFilters.query && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg z-50 p-4 text-center"
        >
          <Search className="w-6 h-6 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No results found for "{searchFilters.query}"
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Try searching by student name, room number, or tag code
          </p>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;