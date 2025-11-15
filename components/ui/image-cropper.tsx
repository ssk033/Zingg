"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { motion } from "motion/react";
import { IconX, IconCheck, IconZoomIn, IconZoomOut, IconRotate } from "@tabler/icons-react";

interface ImageCropperProps {
  image: File;
  onCropComplete: (croppedImageBlob: Blob) => void;
  onCancel: () => void;
  aspectRatio?: number;
}

export const ImageCropper = ({
  image,
  onCropComplete,
  onCancel,
  aspectRatio = 16 / 9,
}: ImageCropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  React.useEffect(() => {
    const url = URL.createObjectURL(image);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const onCropChange = useCallback((crop: { x: number; y: number }) => {
    setCrop(crop);
  }, []);

  const onZoomChange = useCallback((zoom: number) => {
    setZoom(zoom);
  }, []);

  const onRotationChange = useCallback((rotation: number) => {
    setRotation(rotation);
  }, []);

  const onCropCompleteCallback = useCallback(
    (_croppedArea: { x: number; y: number; width: number; height: number }, croppedAreaPixels: { x: number; y: number; width: number; height: number }) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number },
    rotation = 0
  ): Promise<Blob> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    canvas.width = safeArea;
    canvas.height = safeArea;

    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-safeArea / 2, -safeArea / 2);

    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5
    );

    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(
      data,
      Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
      Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        }
      }, "image/jpeg");
    });
  };

  const handleSave = async () => {
    if (croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(
          imageUrl,
          croppedAreaPixels,
          rotation
        );
        onCropComplete(croppedImage);
      } catch (e) {
        console.error("Error cropping image:", e);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-[60]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-4xl mx-4 bg-[#0B0E10] border border-[#27B4F5]/50 rounded-2xl p-6"
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-[#27B4F5] hover:text-white transition z-10"
        >
          <IconX className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-4">Crop & Resize Image</h2>

        <div className="relative w-full h-[500px] bg-black rounded-lg overflow-hidden mb-4">
          {imageUrl && (
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspectRatio}
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              onRotationChange={onRotationChange}
              onCropComplete={onCropCompleteCallback}
              cropShape="rect"
              showGrid={false}
            />
          )}
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 flex-1">
              <IconZoomOut className="w-5 h-5 text-[#27B4F5]" />
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => onZoomChange(Number(e.target.value))}
                className="flex-1"
              />
              <IconZoomIn className="w-5 h-5 text-[#27B4F5]" />
              <span className="text-white text-sm w-12">{zoom.toFixed(1)}x</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <IconRotate className="w-5 h-5 text-[#27B4F5]" />
            <input
              type="range"
              min={0}
              max={360}
              step={1}
              value={rotation}
              onChange={(e) => onRotationChange(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-white text-sm w-12">{rotation}°</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-lg border border-[#27B4F5]/50 text-[#27B4F5] 
            hover:bg-[#27B4F5]/20 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 rounded-lg bg-[#27B4F5] text-black font-semibold
            hover:shadow-[0_0_20px_rgba(39,180,245,0.6)] transition"
          >
            <IconCheck className="w-5 h-5 inline mr-2" />
            Apply
          </button>
        </div>
      </motion.div>
    </div>
  );
};

