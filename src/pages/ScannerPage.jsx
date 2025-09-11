import React, { useState, useRef, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Header from '../components/ui/Header';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';
import RatingStars from '../components/ui/RatingStars';
import Textarea from '../components/ui/Textarea';
import { setHouseholdRating } from '../utils/ratings';

const ScannerPage = () => {
  const [scanResult, setScanResult] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const [complianceStatus, setComplianceStatus] = useState(null);
  const scannerRef = useRef(null);
  const html5QrcodeScannerRef = useRef(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const startScanning = () => {
    setError('');
    setIsScanning(true);
    
    // Create scanner instance
    html5QrcodeScannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      },
      false
    );

    html5QrcodeScannerRef.current.render(
      (decodedText, decodedResult) => {
        handleScanSuccess(decodedText);
      },
      (errorMessage) => {
        // Handle scan error (usually just means no QR code detected)
        console.log('Scan error:', errorMessage);
      }
    );
  };

  const stopScanning = () => {
    if (html5QrcodeScannerRef.current) {
      html5QrcodeScannerRef.current.clear();
      html5QrcodeScannerRef.current = null;
    }
    setIsScanning(false);
  };

  const handleScanSuccess = (decodedText) => {
    setScanResult(decodedText);
    stopScanning();
    
    // Simulate compliance check based on QR code content
    const isCompliant = Math.random() > 0.3; // 70% compliance rate
    setComplianceStatus(isCompliant ? 'compliant' : 'non-compliant');
  };

  const handleMarkCollected = () => {
    if (!scanResult) return;
    if (!rating || rating < 1) {
      setError('Please provide a segregation rating (1-5 stars).');
      return;
    }
    setError('');
    setHouseholdRating(scanResult, rating, review);
    // Provide lightweight success feedback
    alert('Collection marked with rating saved.');
  };

  const resetScan = () => {
    setScanResult('');
    setComplianceStatus(null);
    setError('');
  };

  const handleManualEntry = () => {
    const manualCode = prompt('Enter household ID manually:');
    if (manualCode) {
      setScanResult(manualCode);
      const isCompliant = Math.random() > 0.3;
      setComplianceStatus(isCompliant ? 'compliant' : 'non-compliant');
    }
  };

  useEffect(() => {
    return () => {
      if (html5QrcodeScannerRef.current) {
        html5QrcodeScannerRef.current.clear();
      }
    };
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg mr-4">
              <Icon name="QrCode" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">QR/Barcode Scanner</h1>
              <p className="text-muted-foreground">Scan household dustbin to check segregation compliance</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scanner Section */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Scanner</h2>
            
            {!isScanning && !scanResult && (
              <div className="text-center py-12">
                <div className="flex items-center justify-center w-20 h-20 bg-muted rounded-full mx-auto mb-4">
                  <Icon name="QrCode" size={40} className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-6">Ready to scan household QR codes</p>
                <div className="space-y-3">
                  <Button onClick={startScanning} className="w-full">
                    <Icon name="Camera" size={20} className="mr-2" />
                    Start Scanning
                  </Button>
                  <Button variant="outline" onClick={handleManualEntry} className="w-full">
                    <Icon name="Edit" size={20} className="mr-2" />
                    Manual Entry
                  </Button>
                </div>
              </div>
            )}

            {isScanning && (
              <div className="space-y-4">
                <div id="qr-reader" className="w-full"></div>
                <Button variant="outline" onClick={stopScanning} className="w-full">
                  <Icon name="X" size={20} className="mr-2" />
                  Stop Scanning
                </Button>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Scan Results</h2>
            
            {!scanResult ? (
              <div className="text-center py-12">
                <div className="flex items-center justify-center w-20 h-20 bg-muted rounded-full mx-auto mb-4">
                  <Icon name="Search" size={40} className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No scan results yet</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Household Info */}
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-medium text-foreground mb-2">Household ID</h3>
                  <p className="text-lg font-mono text-foreground">{scanResult}</p>
                </div>

                {/* Compliance Status */}
                {complianceStatus && (
                  <div className={`p-4 rounded-lg border-2 ${
                    complianceStatus === 'compliant' 
                      ? 'bg-success/10 border-success/20' 
                      : 'bg-destructive/10 border-destructive/20'
                  }`}>
                    <div className="flex items-center mb-2">
                      <Icon 
                        name={complianceStatus === 'compliant' ? 'CheckCircle' : 'XCircle'} 
                        size={24} 
                        className={`mr-2 ${
                          complianceStatus === 'compliant' ? 'text-success' : 'text-destructive'
                        }`} 
                      />
                      <h3 className="font-medium text-foreground">
                        {complianceStatus === 'compliant' ? 'Compliant' : 'Non-Compliant'}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {complianceStatus === 'compliant' 
                        ? 'Waste segregation is properly implemented'
                        : 'Waste segregation needs improvement'
                      }
                    </p>
                  </div>
                )}

                {/* Rating & Review */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Segregation Review</h4>
                    <RatingStars value={rating} onChange={setRating} />
                  </div>
                  <Textarea
                    label="Optional description"
                    placeholder="Add any notes (optional)"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button 
                    variant={complianceStatus === 'compliant' ? 'default' : 'destructive'} 
                    className="w-full"
                    onClick={handleMarkCollected}
                  >
                    <Icon name="CheckSquare" size={20} className="mr-2" />
                    Mark as Collected
                  </Button>
                  <Button variant="outline" onClick={resetScan} className="w-full">
                    <Icon name="RotateCcw" size={20} className="mr-2" />
                    Scan Another
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Instructions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full text-white text-sm font-medium">1</div>
              <div>
                <h4 className="font-medium text-foreground">Position QR Code</h4>
                <p className="text-sm text-muted-foreground">Hold the QR code steady within the camera frame</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full text-white text-sm font-medium">2</div>
              <div>
                <h4 className="font-medium text-foreground">Wait for Scan</h4>
                <p className="text-sm text-muted-foreground">The system will automatically detect and read the code</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full text-white text-sm font-medium">3</div>
              <div>
                <h4 className="font-medium text-foreground">Check Compliance</h4>
                <p className="text-sm text-muted-foreground">Review the segregation compliance status</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ScannerPage;
