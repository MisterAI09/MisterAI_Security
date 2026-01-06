async function fetchFeed(file, containerId, isTrend) {
    const container = document.getElementById(containerId);
    if (!container) return; // تأمين الكود في حال عدم وجود العنصر
    
    try {
        const response = await fetch(`./${file}?v=` + Date.now());
        const data = await response.json();
        
        if (!data.articles || data.articles.length === 0) {
            if(!isTrend) container.innerHTML = '<p class="text-center col-span-full py-20 text-gray-600 font-black tracking-widest uppercase">Global_Feed_Empty</p>';
            return;
        }
        
        container.innerHTML = '';
        data.articles.forEach(article => {
            if(isTrend) {
                // تصميم قسم الترند الجزائري
                container.innerHTML += `<div class="border-b border-white/5 pb-2 hover:bg-orange-500/5 p-2 transition-all">
                    <a href="${article.url}" target="_blank" class="text-gray-400 hover:text-orange-400 block">${article.title}</a>
                </div>`;
            } else {
                // تصميم قسم الأخبار العالمية مع تأثير اللمعان
                container.innerHTML += `<div class="bg-black/40 border border-cyan-500/10 p-6 rounded-xl flex flex-col h-full group shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/20 transition-all">
                    <h4 class="font-bold text-sm mb-4 text-right group-hover:text-cyan-400 transition-colors">${article.title}</h4>
                    <a href="${article.url}" target="_blank" class="mt-auto text-center text-[10px] font-black text-black bg-cyan-400 py-2 rounded uppercase hover:bg-white transition-all shadow-md">Open_Source</a>
                </div>`;
            }
        });
    } catch (e) { 
        console.error("Link Broken: " + file); 
        if(!isTrend) container.innerHTML = '<p class="text-center col-span-full py-20 text-red-500 font-black">FEED_OFFLINE</p>';
    }
}

// استدعاء الأخبار العالمية
fetchFeed('news.json', 'news-container', false);

// استدعاء أخبار الجزائر (هذا الجزء كان ناقصاً في ملفك الأخير)
fetchFeed('algeria_news.json', 'algeria-trending', true);
