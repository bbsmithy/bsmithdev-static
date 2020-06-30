import { useEffect } from "react";

const useScript = url => {
  useEffect(() => {

    const dsq = document.createElement("script");
    const head = document.getElementsByTagName("head")[0];

    dsq.type = "text/javascript";
    dsq.async = true;
    dsq.src = url;

    head.appendChild(dsq);
    return () => {
      head.removeChild(dsq);
    };
  });
};

export default useScript;
