import React, { useState } from "react";
import RGBQuant from "rgbquant";

const ImageUploader: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          const quant = new RGBQuant({ colors: 256 });

          // Sample colors
          quant.sample(img);

          // Get palette
          const palette = quant.palette(true);

          // Convert RGB values to hex codes
          const hexCodes = palette.map(
            ([r, g, b]: [number, number, number]) =>
              `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
          );

          setColors(hexCodes);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="User uploaded" />}
      {colors.map((color, index) => (
        <div
          key={index}
          style={{ backgroundColor: color, width: "20px", height: "20px" }}
        />
      ))}
    </div>
  );
};

export default ImageUploader;
