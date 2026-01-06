// وظيفة جلب الأخبار العالمية والعامة
async function loadGlobalNews() {
    const container = document.getElementById('news-container');
    try {
        const response = await fetch('./news.json?v=' + Date.now());
        const data = await response.json();
        
        if (!data.articles || data.articles.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center col-span-full py-20 uppercase font-black tracking-widest">Global_Feed_Empty</p>';
            return;
        }

        container.innerHTML = ''; 
        data.articles.forEach(article => {
            if(article.title && article.title !== "[Removed]") {
                container.innerHTML += `
                <div class="bg-black/40 border border-cyan-500/10 p-6 rounded-xl hover:bg-cyan-500/5 transition-all flex flex-col h-full group">
                    <span class="text-[8px] font-black text-cyan-500/50 uppercase mb-2 border border-cyan-500/20 w-fit px-1">مقالات دولية</span>
                    <h4 class="font-bold text-sm mb-4 text-right leading-relaxed group-hover:text-cyan-400 transition-colors">${article.title}</h4>
                    <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="mt-auto text-center text-[9px] font-black text-black bg-cyan-500 py-2 rounded-lg uppercase hover:bg-white transition-all">قراءة المصدر</a>
                </div>`;
            }
        });
    } catch (e) { container.innerHTML = '<p class="text-red-500 text-center col-span-full">Error_Connection_Offline</p>'; }
}

// وظيفة جلب أخبار الترند الجزائري المتداول
async function loadAlgeriaTrending() {
    const trendContainer = document.getElementById('algeria-trending');
    try {
        const response = await fetch('./algeria_news.json?v=' + Date.now());
        const data = await response.json();
        
        if (!data.articles || data.articles.length === 0) return;
        
        trendContainer.innerHTML = ''; 
        data.articles.slice(0, 12).forEach(article => {
            trendContainer.innerHTML += `
            <div class="border-b border-white/5 pb-2 hover:bg-orange-500/5 transition-all p-2 rounded">
                <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-orange-400 leading-snug block text-right text-[10px]">
                    ${article.title}
                </a>
                <p class="text-[8px] text-gray-700 text-right mt-1 italic">${new Date(article.publishedAt).toLocaleDateString('ar-DZ')}</p>
            </div>`;
        });
    } catch (e) { console.log("DZ local feed pending..."); }
}

loadGlobalNews();
loadAlgeriaTrending();
