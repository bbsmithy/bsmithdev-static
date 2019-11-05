import { useEffect } from 'react';


const useScript = (url) => {
    useEffect(()=>{

        const disqus_config = function () {
            this.page.url = window.location.url;  // Replace PAGE_URL with your page's canonical URL variable
            this.page.identifier = window.location.search; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
        };

        window.disqus_config = disqus_config;

        const dsq = document.createElement('script');
        const head = document.getElementsByTagName('head')[0];
        const body = document.getElementsByTagName('body')[0];

        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = url;

        (head || body).appendChild(dsq);

        return () => {
            (head || body).removeChild(dsq);
        }
    })
}

export default useScript