"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Loader2, X, Link as LinkIcon, ImagePlus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  className?: string;
  aspectRatio?: "portrait" | "landscape" | "square";
  placeholder?: string;
  /** Show URL input option alongside file upload */
  showUrlInput?: boolean;
  /** Label for the field */
  label?: string;
}

export function ImageUpload({
  value,
  onChange,
  folder = "portfolio/projects",
  className = "",
  aspectRatio = "landscape",
  placeholder = "Upload image",
  showUrlInput = true,
  label,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState(value || "");
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectClasses = {
    portrait: "w-20 h-32",
    landscape: "w-full h-32",
    square: "w-32 h-32",
  };

  const dropzoneClasses = {
    portrait: "min-h-[128px]",
    landscape: "min-h-[80px]",
    square: "min-h-[128px]",
  };

  async function handleUpload(file: File) {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be less than 10MB");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      onChange(data.url);
      setUrlInputValue(data.url);
      toast.success("Image uploaded to Cloudinary");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  }

  function handleUrlSubmit() {
    if (urlInputValue.trim()) {
      onChange(urlInputValue.trim());
      toast.success("Image URL set");
    }
  }

  function handleRemove() {
    onChange("");
    setUrlInputValue("");
  }

  // If we have a value, show the preview with remove option
  if (value) {
    return (
      <div className={cn("space-y-2", className)}>
        {label && <Label>{label}</Label>}
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "relative group rounded-lg border overflow-hidden bg-muted",
              aspectRatio === "portrait" && "w-20 h-32",
              aspectRatio === "landscape" && "w-40 h-24",
              aspectRatio === "square" && "w-24 h-24"
            )}
          >
            <img
              src={value}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleRemove}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground truncate">{value}</p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="mt-1 h-7 text-xs"
              onClick={handleRemove}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // No value - show upload interface
  if (!showUrlInput) {
    // Simple upload-only mode (original behavior)
    return (
      <div className={cn("space-y-2", className)}>
        {label && <Label>{label}</Label>}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
            dropzoneClasses[aspectRatio],
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50",
            isUploading && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center h-full gap-2">
            {isUploading ? (
              <>
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Uploading...
                </span>
              </>
            ) : (
              <>
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {placeholder}
                </span>
                <span className="text-xs text-muted-foreground">
                  Drag & drop or click to upload
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Full mode with tabs for URL and Upload
  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "upload" | "url")}
      >
        <TabsList className="grid w-full grid-cols-2 h-8">
          <TabsTrigger value="upload" className="text-xs">
            <Upload className="h-3 w-3 mr-1" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="url" className="text-xs">
            <LinkIcon className="h-3 w-3 mr-1" />
            URL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
          />
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
              dropzoneClasses[aspectRatio],
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50",
              isUploading && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => !isUploading && fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center h-full gap-1">
              {isUploading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Uploading to Cloudinary...
                  </span>
                </>
              ) : (
                <>
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Drag & drop or click to upload
                  </span>
                  <span className="text-[10px] text-muted-foreground/70">
                    PNG, JPG, GIF up to 10MB
                  </span>
                </>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="url" className="mt-2 space-y-2">
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={urlInputValue}
              onChange={(e) => setUrlInputValue(e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              size="sm"
              onClick={handleUrlSubmit}
              disabled={!urlInputValue.trim()}
            >
              Set
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground">
            Enter a direct URL to an image (Cloudinary, external, etc.)
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface MultiImageUploadProps {
  values: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
  aspectRatio?: "portrait" | "landscape" | "square";
  maxImages?: number;
  /** Show URL input option alongside file upload */
  showUrlInput?: boolean;
  /** Label for the field */
  label?: string;
}

export function MultiImageUpload({
  values,
  onChange,
  folder = "portfolio/projects",
  aspectRatio = "landscape",
  maxImages = 20,
  showUrlInput = true,
  label,
}: MultiImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState("");
  const [showUrlField, setShowUrlField] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectClasses = {
    portrait: "w-16 h-28",
    landscape: "w-24 h-16",
    square: "w-20 h-20",
  };

  async function uploadFiles(files: File[]) {
    if (files.length === 0) return;

    // Check max images
    if (values.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    // Validate all files
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select only image files");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Each image must be less than 10MB");
        return;
      }
    }

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error("Upload failed");
        }

        const data = await res.json();
        uploadedUrls.push(data.url);
      }

      onChange([...values, ...uploadedUrls]);
      toast.success(`${uploadedUrls.length} image(s) uploaded to Cloudinary`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    uploadFiles(files);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    if (files.length > 0) {
      uploadFiles(files);
    }
  }

  function handleAddUrl() {
    if (urlInputValue.trim()) {
      if (values.length >= maxImages) {
        toast.error(`Maximum ${maxImages} images allowed`);
        return;
      }
      onChange([...values, urlInputValue.trim()]);
      setUrlInputValue("");
      setShowUrlField(false);
      toast.success("Image URL added");
    }
  }

  function handleRemove(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  return (
    <div className={cn("space-y-3")}>
      {label && <Label>{label}</Label>}

      {/* Existing images grid */}
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {values.map((url, idx) => (
            <div
              key={idx}
              className={cn(
                "relative group rounded-lg border overflow-hidden bg-muted",
                aspectClasses[aspectRatio]
              )}
            >
              <img
                src={url}
                alt={`Image ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                className="absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemove(idx)}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add more section */}
      {values.length < maxImages && (
        <div className="space-y-2">
          {/* Dropzone */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
          />
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-3 text-center cursor-pointer transition-colors",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50",
              isUploading && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => !isUploading && fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex items-center justify-center gap-2">
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Uploading...
                  </span>
                </>
              ) : (
                <>
                  <ImagePlus className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Drag & drop or click to add images
                  </span>
                </>
              )}
            </div>
          </div>

          {/* URL input option */}
          {showUrlInput && (
            <>
              {showUrlField ? (
                <div className="flex gap-2">
                  <Input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={urlInputValue}
                    onChange={(e) => setUrlInputValue(e.target.value)}
                    className="flex-1 h-8 text-xs"
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), handleAddUrl())
                    }
                  />
                  <Button
                    type="button"
                    size="sm"
                    className="h-8"
                    onClick={handleAddUrl}
                    disabled={!urlInputValue.trim()}
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-8"
                    onClick={() => {
                      setShowUrlField(false);
                      setUrlInputValue("");
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => setShowUrlField(true)}
                >
                  <LinkIcon className="h-3 w-3 mr-1" />
                  Add from URL
                </Button>
              )}
            </>
          )}

          {/* Counter */}
          <p className="text-[10px] text-muted-foreground">
            {values.length} / {maxImages} images
          </p>
        </div>
      )}
    </div>
  );
}
