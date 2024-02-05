import React, { useState } from "react";
import getColors from "get-image-colors";
import Image from "./Image";

const ImageUploader: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [colorsList, setColorsList] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImage(reader.result as string);

        // Get colors from image
        const colors = await getColors(reader.result as string);
        const colorList = colors.map((color) => color.hex());
        setColorsList(colorList);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <Image src={image} alt="User uploaded" />}
      {colorsList.length > 0 && (
        <div>
          <h3>Colors</h3>
          <ul>
            {colorsList.map((color, index) => (
              <li key={index} style={{ color }}>
                {color}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
