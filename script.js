// جلب الأخبار العالمية
async function loadGlobalNews() {
    const container = document.getElementById('news-container');
    try {
        const response = await fetch('./news.json?v=' + Date.now());
        const data = await response.json();
        container.innerHTML = ''; 
        if (!data.articles || data.articles.length === 0) return;

        data.articles.forEach(article => {
            if(article.title && article.title !== "[Removed]") {
                container.innerHTML += `
                <div class="bg-black/40 border border-cyan-500/20 p-6 rounded-xl hover:bg-cyan-500/10 transition-all flex flex-col h-full">
                    <span class="text-[8px] font-black text-cyan-400 uppercase mb-2 border border-cyan-400/30 w-fit px-1">Global_Node</span>
                    <h4 class="font-bold text-sm mb-4 text-right leading-snug">${article.title}</h4>
                    <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="mt-auto text-center text-[9px] font-black text-black bg-cyan-400 py-2 rounded-lg uppercase hover:bg-white transition-all shadow-lg shadow-cyan-500/10">Open_Source_Link</a>
                </div>`;
            }
        });
    } catch (e) { container.innerHTML = '<p class="text-red-500 text-center col-span-full">Global Feed Offline</p>'; }
}

// جلب الترند الجزائري
async function loadAlgeriaTrending() {
    const trendContainer = document.getElementById('algeria-trending');
    try {
        const response = await fetch('./algeria_news.json?v=' + Date.now());
        const data = await response.json();
        if (!data.articles || data.articles.length === 0) return;
        trendContainer.innerHTML = ''; 
        data.articles.slice(0, 10).forEach(article => {
            trendContainer.innerHTML += `
            <div class="border-b border-white/5 pb-2 hover:bg-orange-500/5 transition-all p-1">
                <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-orange-400 leading-snug block text-right transition-colors">
                    ${article.title}
                </a>
            </div>`;
        });
    } catch (e) { trendContainer.innerHTML = '<p class="text-xs text-gray-700">Local Feed Pending...</p>'; }
}

loadGlobalNews();
loadAlgeriaTrending();
