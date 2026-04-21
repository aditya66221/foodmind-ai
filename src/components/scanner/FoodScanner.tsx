import React, { useState, useRef } from 'react';
import { Camera, Upload, ScanLine } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { analyzeFoodImage, type ScanResult } from '../../lib/gemini';
import { ScanResults } from './ScanResults';
import { motion, AnimatePresence } from 'framer-motion';

export const FoodScanner: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { geminiApiKey } = useAppStore();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      setResult(null);
      setIsScanning(true);

      const scanResult = await analyzeFoodImage(base64, geminiApiKey);
      setResult(scanResult);
      setIsScanning(false);
    };
    reader.readAsDataURL(file);
  };

  const resetScanner = () => {
    setImagePreview(null);
    setResult(null);
    setIsScanning(false);
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-heading font-bold mb-4 tracking-wide text-primary/90">
          Neural Food Scanner
        </h2>
        <p className="text-muted max-w-lg mx-auto">
          Upload or snap a photo of your food. FoodMind will analyze its impact on your energy, mood, and cravings.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!imagePreview ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-surface-border rounded-3xl bg-surface/30 hover:bg-surface/50 hover:border-neon-cyan/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500 cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-20 h-20 rounded-full bg-background border border-surface-border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-neon-cyan/50 transition-all duration-300">
              <Upload className="w-8 h-8 text-muted group-hover:text-neon-cyan transition-colors" />
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2">Upload Food Image</h3>
            <p className="text-sm text-muted">Drag & drop or click to browse</p>
            
            <div className="mt-8 flex items-center gap-4 w-full max-w-xs">
              <div className="h-px bg-surface-border flex-1"></div>
              <span className="text-xs font-semibold text-muted uppercase tracking-widest">OR</span>
              <div className="h-px bg-surface-border flex-1"></div>
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); /* Implement getUserMedia if needed */ alert("Camera access not fully implemented in demo. Please upload an image instead."); }}
              className="mt-8 glass-button bg-surface border-surface-border hover:border-neon-purple/50 hover:shadow-glow-purple text-primary w-full max-w-xs"
            >
              <Camera className="w-5 h-5" />
              Open Camera
            </button>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Image Preview Area */}
            <div className="relative rounded-3xl overflow-hidden border border-surface-border bg-background flex items-center justify-center h-[500px]">
              <img 
                src={imagePreview} 
                alt="Food preview" 
                className={`w-full h-full object-cover transition-all duration-700 ${isScanning ? 'brightness-50 grayscale-[50%]' : ''}`}
              />
              
              {/* Scanning Overlay */}
              {isScanning && (
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                  <motion.div
                    animate={{ y: ['0%', '100%', '0%'] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                    className="absolute top-0 left-0 right-0 h-1 bg-neon-cyan shadow-[0_0_20px_rgba(6,182,212,1)]"
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
                    <ScanLine className="w-12 h-12 text-neon-cyan animate-pulse" />
                    <span className="font-heading font-bold tracking-widest text-neon-cyan animate-pulse">ANALYZING</span>
                  </div>
                </div>
              )}
            </div>

            {/* Results Area */}
            <div className="flex flex-col justify-center h-full">
              {isScanning ? (
                <div className="glass-panel p-8 h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 border-4 border-surface-border border-t-neon-cyan rounded-full animate-spin mb-6"></div>
                  <h3 className="text-xl font-heading font-bold mb-2">Neural Engine Processing</h3>
                  <p className="text-muted text-sm max-w-[250px]">Extracting macro profile and simulating metabolic impact...</p>
                </div>
              ) : result ? (
                <div className="relative h-full">
                  <ScanResults result={result} />
                  <button 
                    onClick={resetScanner}
                    className="absolute -top-12 right-0 text-sm text-muted hover:text-primary transition-colors underline underline-offset-4"
                  >
                    Scan Another
                  </button>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
