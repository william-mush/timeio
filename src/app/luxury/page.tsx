import { luxuryTimepieces } from '../../data/luxuryTimepieces';
import LuxuryTimepieceCard from '../../components/LuxuryTimepieceCard';

export default function LuxuryTimepiecesPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Luxury Timepieces
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the world's most prestigious watch manufacturers, their iconic models,
            and current market values for both new and pre-owned timepieces.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {luxuryTimepieces.map((timepiece) => (
            <LuxuryTimepieceCard key={timepiece.id} timepiece={timepiece} />
          ))}
        </div>
      </div>
    </div>
  );
} 