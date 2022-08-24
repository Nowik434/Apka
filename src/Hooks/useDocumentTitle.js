import React, { useEffect, useState } from "react";

const useDocumentTitle = title => {
  const [doctitle, setDocTitle] = useState(title);

  useEffect(() => {
    document.title = `VCC - ${doctitle}`;
  }, [doctitle]);

  return [doctitle, setDocTitle];
};

export {useDocumentTitle};