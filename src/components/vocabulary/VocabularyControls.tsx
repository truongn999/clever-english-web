
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Bookmark, List } from 'lucide-react';

interface VocabularyControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  viewMode: 'flashcard' | 'list';
  setViewMode: (mode: 'flashcard' | 'list') => void;
  categories: string[];
}

const VocabularyControls: React.FC<VocabularyControlsProps> = ({
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  viewMode,
  setViewMode,
  categories,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          placeholder="Search vocabulary..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search vocabulary"
        />
      </div>
      
      <div className="flex gap-4">
        <select 
          className="px-4 py-2 border rounded-md bg-white text-gray-800"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          aria-label="Filter by level"
        >
          <option value="">All Levels</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        
        <div className="flex border rounded overflow-hidden">
          <Button 
            variant={viewMode === 'flashcard' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-none"
            onClick={() => setViewMode('flashcard')}
            aria-label="Flashcard view"
          >
            <Bookmark size={18} />
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-none"
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            <List size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VocabularyControls;
