import { useState, useEffect } from "react";

export function useBlob(url) {
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        setBlobUrl(URL.createObjectURL(blob));
      });

    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [url]);

  return blobUrl;
}