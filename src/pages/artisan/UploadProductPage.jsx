import React, { useState } from 'react';
import { Sparkles, Instagram } from 'lucide-react';
import ImageUploader from '../../components/ImageUploader';
import AudioRecorder from '../../components/AudioRecorder';
import PrimaryButton from '../../components/PrimaryButton';
import Navigation from '../../components/Navigation';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UploadProductPage = () => {
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [audioFile, setAudioFile] = useState(null);
  const [generatedContent, setGeneratedContent] = useState({ title: '', tagline: '', story: '' });
  const [postToInstagram, setPostToInstagram] = useState(false);
  const navigate = useNavigate();

  const handleImageSelect = (files) => {
    setImageFiles(files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages(urls);
  };

  // This will be replaced by actual recording logic
  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingDuration(0);
    const timer = setInterval(() => setRecordingDuration((prev) => prev + 1), 1000);
    setTimeout(() => {
      setIsRecording(false);
      clearInterval(timer);
      setStep(3);
      // Simulate audio file for now
      setAudioFile(new Blob([], { type: 'audio/wav' }));
    }, 5000);
  };

  const handleGenerateStory = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setGeneratedContent({
      title: 'Handcrafted Ceramic Masterpiece',
      tagline: 'Where ancient traditions meet modern beauty',
      story:
        'This beautiful ceramic piece represents hours of careful craftsmanship, shaped by hands that have learned techniques passed down through generations. Each curve and line tells a story of dedication, patience, and artistic vision.',
    });
    setIsGenerating(false);
    setStep(4);
  };

  return (
    <div className="min-h-screen  pb-20  pt-20">
      <ToastContainer/>
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2 text-white">Share Your Craft</h1>
            <p className="text-muted-foreground">Let AI help tell your story</p>
          </div>

          <div className="flex items-center justify-center mb-8 space-x-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step >= stepNum ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>{stepNum}</div>
                {stepNum < 4 && <div className={`w-16 h-0.5 mx-2 transition-all duration-300 ${step > stepNum ? 'bg-primary' : 'bg-muted'}`} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-serif font-bold mb-2 text-white">Step 1: Add Photos</h2>
                <p className="text-muted-foreground">Show us your beautiful creation</p>
              </div>
              <ImageUploader onImageSelect={handleImageSelect} previews={selectedImages} />
              {selectedImages.length > 0 && (
                <PrimaryButton
                  className="mt-6 w-full"
                  size="lg"
                  onClick={() => setStep(2)}
                >
                  Next
                </PrimaryButton>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl text-white font-serif font-bold mb-2">Step 2: Record Your Story</h2>
                <p className="text-muted-foreground">Tell us about your craft in your own words</p>
              </div>
              <AudioRecorder
                isRecording={isRecording}
                duration={recordingDuration}
                onStartRecording={handleStartRecording}
                onStopRecording={() => setIsRecording(false)}
                onAudioSave={(file) => setAudioFile(file)}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl text-white font-serif font-bold mb-2">Step 3: Craft Your Story</h2>
                <p className="text-muted-foreground">Let our AI weave the magic of your story</p>
              </div>
              <div className="card-warm p-8 text-center">
                {isGenerating ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                    </div>
                    <h3 className="text-xl font-serif font-bold">Our AI is weaving the magic of your story... ✨</h3>
                    <p className="text-muted-foreground">This will take just a moment</p>
                    <div className="w-48 h-2 bg-muted rounded-full mx-auto overflow-hidden">
                      <div className="h-full bg-primary rounded-full animate-loading-bar"></div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Sparkles className="h-16 w-16 mx-auto text-primary" />
                    <h3 className="text-xl font-serif font-bold">Ready to create magic?</h3>
                    <p className="text-muted-foreground">Our AI will analyze your image and audio to create a compelling story</p>
                    <PrimaryButton onClick={handleGenerateStory} size="lg" icon={<Sparkles className="h-5 w-5" />}>✨ Craft My Story</PrimaryButton>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl text-white font-serif font-bold mb-2">Step 4: Review & Publish</h2>
                <p className="text-muted-foreground">Fine-tune your story and publish</p>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-white font-medium mb-2">Title</label>
                  <input type="text" value={generatedContent.title} onChange={(e) => setGeneratedContent((prev) => ({ ...prev, title: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border  focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300" />
                </div>
                <div>
                  <label className="block text-sm text-white font-medium mb-2">Tagline</label>
                  <input type="text" value={generatedContent.tagline} onChange={(e) => setGeneratedContent((prev) => ({ ...prev, tagline: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border  focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300" />
                </div>
                <div>
                  <label className="block text-sm text-white font-medium mb-2">Story</label>
                  <textarea value={generatedContent.story} onChange={(e) => setGeneratedContent((prev) => ({ ...prev, story: e.target.value }))} rows={6} className="w-full px-4 py-3 rounded-lg border border-border  focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 resize-none" />
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Instagram className="h-6 w-6 text-pink-500" />
                    <div>
                      <p className="font-medium text-white">Auto-post to Instagram</p>
                      <p className="text-sm text-muted-foreground">Share with your followers</p>
                    </div>
                  </div>
                  <button onClick={() => setPostToInstagram(!postToInstagram)} className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${postToInstagram ? 'bg-primary' : 'bg-muted'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${postToInstagram ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
                <PrimaryButton
                  onClick={async () => {
                    // Prepare form data
                    const formData = new FormData();
                    formData.append('title', generatedContent.title);
                    formData.append('tagline', generatedContent.tagline);
                    formData.append('story', generatedContent.story);
                    imageFiles.forEach((file, idx) => {
                      formData.append('images', file);
                    });
                    formData.append('audio', audioFile);
                    formData.append('postToInstagram', postToInstagram);
                    // TODO: Add userId/role if needed
                    // Send POST request
                    await fetch('/api/products', {
                      method: 'POST',
                      body: formData,
                    });
                    toast.success("Product published successfully!");
                    setTimeout(() => {
                      navigate("/manage-products")
                    }, 2000);
                  }}
                  size="lg"
                  className="w-full"
                >
                  Publish Product
                </PrimaryButton>
              </div>
            </div>
          )}
        </div>
      </div>
      <Navigation userRole="artisan" />
    </div>
  );
};

export default UploadProductPage;


