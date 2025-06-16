import { useState, useEffect } from "react";

export function useBlob(url) {
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        if (isMounted) setBlobUrl(URL.createObjectURL(blob));
      });

    return () => {
      isMounted = false;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [url]);

  return blobUrl;
}
