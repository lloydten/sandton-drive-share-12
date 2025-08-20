import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, FileText, Camera, CheckCircle } from "lucide-react";

const DocumentUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState({
    selfie: null as File | null,
    idDocument: null as File | null
  });
  const navigate = useNavigate();

  const handleFileUpload = (type: 'selfie' | 'idDocument', file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      [type]: file
    }));
  };

  const handleNext = () => {
    if (uploadedFiles.selfie && uploadedFiles.idDocument) {
      navigate("/auth/banking");
    }
  };

  const FileUploadArea = ({ 
    type, 
    title, 
    description, 
    icon: Icon,
    accept 
  }: {
    type: 'selfie' | 'idDocument';
    title: string;
    description: string;
    icon: any;
    accept: string;
  }) => {
    const file = uploadedFiles[type];
    
    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">{title}</Label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-accent/50 transition-colors">
          <input
            type="file"
            accept={accept}
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                handleFileUpload(type, selectedFile);
              }
            }}
            className="hidden"
            id={`upload-${type}`}
          />
          <label htmlFor={`upload-${type}`} className="cursor-pointer flex flex-col items-center space-y-2">
            {file ? (
              <>
                <CheckCircle className="w-12 h-12 text-primary" />
                <div className="text-sm font-medium text-primary">{file.name}</div>
                <div className="text-xs text-muted-foreground">File uploaded successfully</div>
              </>
            ) : (
              <>
                <Icon className="w-12 h-12 text-muted-foreground" />
                <div className="text-sm font-medium">Click to upload {title.toLowerCase()}</div>
                <div className="text-xs text-muted-foreground">{description}</div>
              </>
            )}
          </label>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/auth/complex")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold gradient-text">Step 2 of 3</span>
            </div>
            <div className="w-10" /> {/* Spacer */}
          </div>
          <CardTitle className="text-2xl font-bold">Upload Documents</CardTitle>
          <p className="text-muted-foreground">
            Please upload your identification documents for verification
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <FileUploadArea
            type="selfie"
            title="Selfie Photo"
            description="Take a clear photo of yourself for verification"
            icon={Camera}
            accept="image/*"
          />
          
          <FileUploadArea
            type="idDocument"
            title="ID Document"
            description="Upload your South African ID, passport, or driver's license"
            icon={FileText}
            accept="image/*,.pdf"
          />
          
          <div className="bg-accent/30 border border-accent rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Privacy & Security</p>
                Your documents are encrypted and stored securely. We only use them for identity verification and comply with POPIA regulations.
              </div>
            </div>
          </div>
          
          <div className="flex justify-between pt-4">
            <Button 
              variant="outline"
              onClick={() => navigate("/auth/complex")}
            >
              Back
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!uploadedFiles.selfie || !uploadedFiles.idDocument}
              className="min-w-32"
            >
              Next Step
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentUpload;