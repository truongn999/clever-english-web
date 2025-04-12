
import { useQuery } from '@tanstack/react-query';

export interface VocabularyWord {
  id: string;
  word: string;
  meaning: string;
  example: string;
  pronunciation?: string;
  pronunciationUK?: string;
  category: string;
  imageUrl?: string;
}

// This is mock data that will be replaced with actual Supabase fetching
const vocabularyMockData: VocabularyWord[] = [
  {
    id: "1",
    word: "Ubiquitous",
    meaning: "Present, appearing, or found everywhere.",
    example: "Mobile phones are now ubiquitous in modern society.",
    pronunciation: "yoo-BIK-wi-tuhs",
    pronunciationUK: "yoo-BIK-wi-tuhs",
    category: "Advanced",
    imageUrl: "https://images.unsplash.com/photo-1528116356155-a26f0c2ecb7f?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "2",
    word: "Ephemeral",
    meaning: "Lasting for a very short time.",
    example: "The beauty of cherry blossoms is ephemeral, lasting only a few days.",
    pronunciation: "ih-FEM-er-uhl",
    pronunciationUK: "ih-FEM-uh-ruhl",
    category: "Advanced",
    imageUrl: "https://images.unsplash.com/photo-1552248524-10d9a7e4841c?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "3",
    word: "Resilient",
    meaning: "Able to recover quickly from difficulties; tough.",
    example: "She's a resilient person who bounces back from setbacks.",
    pronunciation: "ri-ZIL-yuhnt",
    pronunciationUK: "ri-ZIL-i-uhnt",
    category: "Intermediate",
    imageUrl: "https://images.unsplash.com/photo-1546500840-ae38253aba9b?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "4",
    word: "Collaborate",
    meaning: "Work jointly on an activity or project.",
    example: "Our teams will collaborate on the new product launch.",
    pronunciation: "kuh-LAB-uh-reyt",
    pronunciationUK: "kuh-LAB-uh-reyt",
    category: "Intermediate",
  },
  {
    id: "5",
    word: "Articulate",
    meaning: "Expressing oneself clearly and effectively.",
    example: "She gave an articulate presentation that impressed everyone.",
    pronunciation: "ahr-TIK-yuh-lit",
    pronunciationUK: "ah-TIK-yuh-lit",
    category: "Intermediate",
  },
  {
    id: "6",
    word: "Procrastinate",
    meaning: "Delay or postpone action; put off doing something.",
    example: "I tend to procrastinate when it comes to difficult tasks.",
    pronunciation: "proh-KRAS-tuh-neyt",
    pronunciationUK: "pruh-KRAS-ti-neyt",
    category: "Intermediate",
  },
  {
    id: "7",
    word: "Substantial",
    meaning: "Of considerable importance, size, or value.",
    example: "He made a substantial contribution to the project.",
    pronunciation: "suhb-STAN-shuhl",
    pronunciationUK: "suhb-STAN-shuhl",
    category: "Intermediate",
  },
  {
    id: "8",
    word: "Ambiguous",
    meaning: "Open to more than one interpretation; not clear or definite.",
    example: "The instructions were ambiguous and left me confused.",
    pronunciation: "am-BIG-yoo-uhs",
    pronunciationUK: "am-BIG-yoo-uhs",
    category: "Advanced",
    imageUrl: "https://images.unsplash.com/photo-1552346117-39b62b1d20c8?q=80&w=300&auto=format&fit=crop",
  },
];

// Replace this with actual Supabase fetching when connected
export const fetchVocabulary = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return vocabularyMockData;
};

export const useVocabulary = () => {
  return useQuery({
    queryKey: ['vocabulary'],
    queryFn: fetchVocabulary,
  });
};

// Categories for filtering
export const getCategories = () => {
  return Array.from(new Set(vocabularyMockData.map(item => item.category)));
};

// This is where you would implement the Supabase integration
// Once Supabase is connected, replace the mock functions above with actual Supabase calls

/*
// Example Supabase implementation (uncomment when ready)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchVocabulary = async () => {
  const { data, error } = await supabase
    .from('vocabulary')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    throw new Error(error.message);
  }
  
  return data;
};
*/
