import React, { useRef, useState } from "react";
import pixelit from "pixelit";

const Uploader: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);

        // Create new image element
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          // Initialize RGBQuant
          const config = {
            to: canvasRef.current,
            //defaults to document.getElementById("pixelitcanvas")
            from: imgRef.current,
            //defaults to document.getElementById("pixelitimg")
            scale: 8,
            //from 0-50, defaults to 8
            // palette : [[r,g,b]],
            //defaults to a fixed pallete
            maxHeight: img.height,
            //defaults to null
            maxWidth: img.width,
            //defaults to null
          };
          const px = new pixelit(config);

          px.draw();
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {image && <img src={image} ref={imgRef} alt="Selected image" />}
      <canvas id="pixelitcanvas" ref={canvasRef} />
    </div>
  );
};

export default Uploader;
