
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface LessonCardProps {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // in minutes
  imageUrl?: string;
}

const LessonCard: React.FC<LessonCardProps> = ({ 
  id, 
  title, 
  description, 
  level, 
  duration, 
  imageUrl = '/placeholder.svg'
}) => {
  const levelColor = {
    'Beginner': 'bg-english-green',
    'Intermediate': 'bg-english-yellow',
    'Advanced': 'bg-english-red',
  }[level];

  return (
    <Link to={`/lessons/${id}`}>
      <Card className="h-full overflow-hidden card-hover">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute top-3 right-3 ${levelColor} text-white text-xs font-medium px-2 py-1 rounded-full`}>
            {level}
          </div>
        </div>
        <CardHeader className="pb-2">
          <h3 className="font-serif text-xl font-bold text-english-dark">{title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-gray-500 pt-2 border-t">
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{duration} mins</span>
          </div>
          <div className="flex items-center">
            <Star size={16} className="mr-1 text-english-yellow" />
            <Star size={16} className="mr-1 text-english-yellow" />
            <Star size={16} className="mr-1 text-english-yellow" />
            <Star size={16} className="mr-1 text-english-yellow" />
            <Star size={16} className="text-gray-300" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default LessonCard;
