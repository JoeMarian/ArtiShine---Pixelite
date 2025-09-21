import React, { useState } from 'react';
import sampleData from '../../data/sampleData';
import { MapPin, Search, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PrimaryButton from '../../components/PrimaryButton';
import Navigation from '../../components/Navigation';

const MapPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const artisans = sampleData.artisans;

  return (
    <div className="min-h-screen  pb-20">
      <div className="relative h-screen">
        <div className="absolute top-6 left-6 right-6 z-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for crafts, artisans, or locations..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-card/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 shadow-elegant"
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <MapPin className="h-16 w-16 text-primary mx-auto" />
              <h2 className="text-2xl font-serif font-bold">Interactive Map</h2>
              <p className="text-muted-foreground max-w-md">Discover local artisans in your area. Click on pins to learn more about their crafts.</p>
            </div>
          </div>
          {artisans.map((artisan, index) => (
            <div
              key={artisan.id}
              className={`absolute w-12 h-12 cursor-pointer transition-all duration-300 hover:scale-110`}
              style={{ top: `${30 + index * 15}%`, left: `${20 + index * 20}%` }}
              onClick={() => setSelectedArtisan(artisan)}
            >
              <div className="w-full h-full bg-primary rounded-full shadow-warm flex items-center justify-center animate-pulse">
                <MapPin className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {selectedArtisan && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-charcoal/50 flex items-center justify-center z-20 p-6"
              onClick={() => setSelectedArtisan(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="card-warm p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold">{selectedArtisan.name}</h3>
                    <p className="text-primary font-medium">{selectedArtisan.specialty}</p>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {selectedArtisan.location}
                    </p>
                  </div>
                  <button onClick={() => setSelectedArtisan(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-muted-foreground mb-6">{selectedArtisan.bio}</p>
                <div className="flex space-x-3">
                  <PrimaryButton className="flex-1" onClick={() => alert(`View ${selectedArtisan.name}'s shop`)}>View Shop</PrimaryButton>
                  <PrimaryButton variant="outline" onClick={() => alert(`Contact ${selectedArtisan.name}`)} icon={<MessageCircle className="h-4 w-4" />}>
                    Contact
                  </PrimaryButton>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Navigation userRole="buyer" />
    </div>
  );
};

export default MapPage;


