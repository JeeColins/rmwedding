import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HighlightImage {
  id: string;
  url: string;
  status: 'syncing' | 'synced';
  timestamp: Date;
}

interface ConfirmDialog {
  isOpen: boolean;
  type: 'single' | 'batch';
  id?: string;
}

const Highlights: React.FC = () => {
  const [images, setImages] = useState<HighlightImage[]>([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [zoomedImage, setZoomedImage] = useState<HighlightImage | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialog>({ isOpen: false, type: 'single' });
  
  // Zoom/Pan State
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      setIsCameraOpen(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please check permissions.");
      setIsCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL('image/jpeg');
        addPhoto(dataUrl);
        stopCamera();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            addPhoto(event.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      });
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const addPhoto = (url: string) => {
    const newImage: HighlightImage = {
      id: Math.random().toString(36).substr(2, 9),
      url,
      status: 'syncing',
      timestamp: new Date()
    };
    setImages(prev => [newImage, ...prev]);

    setTimeout(() => {
      setImages(prev => prev.map(img => 
        img.id === newImage.id ? { ...img, status: 'synced' } : img
      ));
    }, 2500);
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const requestDeleteSingle = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setConfirmDialog({ isOpen: true, type: 'single', id });
  };

  const requestDeleteBatch = () => {
    if (selectedIds.size === 0) return;
    setConfirmDialog({ isOpen: true, type: 'batch' });
  };

  const executeDelete = () => {
    if (confirmDialog.type === 'single' && confirmDialog.id) {
      const id = confirmDialog.id;
      setImages(prev => prev.filter(img => img.id !== id));
      const newSelected = new Set(selectedIds);
      newSelected.delete(id);
      setSelectedIds(newSelected);
      if (zoomedImage?.id === id) resetZoom();
    } else if (confirmDialog.type === 'batch') {
      setImages(prev => prev.filter(img => !selectedIds.has(img.id)));
      setSelectedIds(new Set());
      setSelectionMode(false);
    }
    setConfirmDialog({ isOpen: false, type: 'single' });
  };

  const selectAll = () => {
    if (selectedIds.size === images.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(images.map(img => img.id)));
    }
  };

  const handleZoom = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prev => Math.min(Math.max(1, prev + delta), 4));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setStartPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const resetZoom = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    setZoomedImage(null);
  };

  return (
    <section id="highlights" className="py-24 bg-[url(/img/planebglandscape.png)] bg-cover overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl serif mb-4">Wedding Highlights</h2>
          <p className="text-[#c19a6b] italic serif text-lg">Every moment is a memory worth keeping</p>
          <motion.div 
            className="mt-6 flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
             <p className="text-xs text-gray-400 uppercase tracking-widest">Connected to shared registry</p>
             <motion.a 
              href="https://drive.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-xs font-bold text-[#c19a6b] hover:text-[#a67d51] transition-all border-b border-[#c19a6b]/30 hover:border-[#a67d51] pb-1 uppercase tracking-widest"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
             >
               View Full Collection
               <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
               </svg>
             </motion.a>
          </motion.div>
        </motion.div>

        <div 
          className="flex flex-col lg:flex-row gap-8 items-start"
        >
          {/* Controls Sidebar */}
          <div className="w-full lg:w-80 sticky top-24 space-y-4">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-5">
              <h3 className="text-xl serif">Contribute</h3>
              
              {!isCameraOpen ? (
                <button 
                  onClick={startCamera}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-[#c19a6b] text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-[#a67d51] transition-all shadow-md active:scale-[0.98]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Snapshot
                </button>
              ) : (
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-[3/4] shadow-2xl">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-6">
                    <button 
                      onClick={capturePhoto}
                      className="w-16 h-16 bg-white rounded-full border-4 border-[#c19a6b] shadow-xl active:scale-90 transition-transform"
                    />
                    <button 
                      onClick={stopCamera}
                      className="absolute right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              <div className="relative">
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-3 w-full py-4 border-2 border-dashed border-gray-200 text-gray-400 rounded-2xl font-bold uppercase tracking-widest hover:border-[#c19a6b] hover:text-[#c19a6b] transition-all bg-gray-50/50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Library
                </button>
              </div>

              {images.length > 0 && (
                <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
                  <button 
                    onClick={() => {
                      setSelectionMode(!selectionMode);
                      if (selectionMode) setSelectedIds(new Set());
                    }}
                    className={`text-xs font-bold uppercase tracking-widest py-2 rounded-lg transition-colors ${
                      selectionMode ? 'bg-gray-100 text-gray-700' : 'text-[#c19a6b]'
                    }`}
                  >
                    {selectionMode ? 'Cancel Selection' : 'Manage Photos'}
                  </button>
                  
                  {selectionMode && (
                    <div className="grid grid-cols-2 gap-2 animate-fade-in">
                      <button 
                        onClick={selectAll}
                        className="text-[10px] font-bold uppercase tracking-widest py-2 bg-white border border-gray-200 rounded-lg"
                      >
                        {selectedIds.size === images.length ? 'Deselect All' : 'Select All'}
                      </button>
                      <button 
                        onClick={requestDeleteBatch}
                        disabled={selectedIds.size === 0}
                        className="text-[10px] font-bold uppercase tracking-widest py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg disabled:opacity-30"
                      >
                        Delete ({selectedIds.size})
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Main Gallery Feed */}
          <div className="flex-1">
            {images.length === 0 ? (
              <div className="w-full py-32 bg-white rounded-3xl border border-gray-100 flex flex-col items-center justify-center text-gray-300">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="serif italic text-lg text-gray-400">Be the first to share a memory</p>
                <p className="text-[10px] uppercase tracking-widest mt-2 text-gray-400">Photos will appear here in real-time</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
                {images.map((img) => (
                  <div 
                    key={img.id} 
                    onClick={() => selectionMode ? toggleSelect(img.id) : setZoomedImage(img)}
                    className={`relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm group cursor-pointer transition-all duration-300 ${
                      selectionMode && selectedIds.has(img.id) ? 'ring-4 ring-[#c19a6b] scale-95' : ''
                    }`}
                  >
                    <img src={img.url} alt="Wedding highlight" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    
                    {/* Selection Overlay */}
                    {selectionMode && (
                      <div className={`absolute inset-0 flex items-center justify-center transition-colors ${
                        selectedIds.has(img.id) ? 'bg-[#c19a6b]/20' : 'bg-black/5'
                      }`}>
                        <div className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center transition-all ${
                          selectedIds.has(img.id) ? 'bg-white scale-110' : 'bg-transparent'
                        }`}>
                          {selectedIds.has(img.id) && (
                            <svg className="w-5 h-5 text-[#c19a6b]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                    )}

                    {!selectionMode && (
                      <>
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                           <button 
                            onClick={(e) => requestDeleteSingle(e, img.id)}
                            className="p-3 bg-red-500/90 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg active:scale-90 pointer-events-auto"
                            title="Delete"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className={`absolute bottom-2 right-2 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-tight flex items-center gap-2 shadow-lg backdrop-blur-sm transition-all duration-500 border border-white/20 ${
                          img.status === 'synced' ? 'bg-white/95 text-green-600 translate-y-0 opacity-100' : 'bg-[#c19a6b]/95 text-white'
                        }`}>
                          {img.status === 'synced' ? (
                            <div className="flex items-center gap-1.5">
                              <div className="relative w-3.5 h-3.5 flex items-center justify-center bg-green-500 rounded-full shadow-sm">
                                <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                  <path className="animate-draw-check" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="animate-fade-in">Saved</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <div className="relative flex items-center justify-center w-3 h-3">
                                <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75" />
                                <div className="relative w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
                              </div>
                              <span className="animate-pulse">Uploading</span>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 overflow-hidden animate-fade-in"
          onWheel={handleZoom}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="absolute top-6 right-6 flex items-center gap-4 z-10">
            <button 
              onClick={(e) => requestDeleteSingle(e, zoomedImage.id)}
              className="p-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full hover:bg-red-500 hover:text-white transition-all"
              title="Delete"
            >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button 
              onClick={resetZoom}
              className="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all border border-white/20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div 
            className="relative w-full h-full flex items-center justify-center cursor-move select-none"
            style={{ 
              transform: `scale(${scale}) translate(${offset.x / scale}px, ${offset.y / scale}px)`,
              transition: isDragging ? 'none' : 'transform 0.2s ease-out'
            }}
          >
            <img 
              src={zoomedImage.url} 
              alt="Zoomed highlight" 
              className="max-w-[90%] max-h-[90%] object-contain rounded-lg shadow-2xl pointer-events-none"
              draggable={false}
            />
          </div>
        </div>
      )}

      {/* Custom Confirmation Modal */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-gray-100 text-center scale-up">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-xl serif mb-2">Are you sure?</h3>
            <p className="text-gray-500 text-sm italic mb-8">
              {confirmDialog.type === 'single' 
                ? "This photo will be permanently removed from the highlight reel." 
                : `These ${selectedIds.size} photos will be permanently removed.`}
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setConfirmDialog({ isOpen: false, type: 'single' })}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={executeDelete}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-red-600 transition-colors shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </section>
  );
};

export default Highlights;