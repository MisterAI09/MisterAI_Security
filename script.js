async function loadNews() {
    const container = document.getElementById('news-container');
    try {
        const response = await fetch('./news.json?v=' + Date.now());
        const data = await response.json();
        
        container.innerHTML = ''; 

        if (!data.articles || data.articles.length === 0) {
            container.innerHTML = '<div class="col-span-full flex flex-col items-center justify-center h-full text-cyan-500/50 font-bold italic"><p class="animate-pulse">SEARCHING_GLOBAL_DATABASE...</p></div>';
            return;
        }

        data.articles.forEach(article => {
            if(article.title && article.title !== "[Removed]") {
                const card = `
                <div class="bg-black/40 border border-cyan-500/20 p-5 rounded-xl hover:bg-cyan-500/5 transition-all duration-300 group">
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-[8px] font-black text-cyan-400 uppercase tracking-widest border border-cyan-400/30 px-2 py-0.5 rounded">Intelligence_Report</span>
                        <span class="text-[9px] text-gray-600">${new Date(article.publishedAt).toLocaleDateString('ar-DZ')}</span>
                    </div>
                    <h4 class="font-bold text-sm mb-3 group-hover:text-cyan-400 leading-snug">${article.title}</h4>
                    <p class="text-gray-500 text-[10px] line-clamp-2 leading-relaxed mb-4 font-medium">${article.description || 'No additional data available for this node.'}</p>
                    <a href="${article.url}" target="_blank" class="inline-block text-[9px] font-black text-black bg-cyan-400 px-4 py-1.5 rounded uppercase hover:bg-white transition">Access_Data</a>
                </div>
                `;
                container.innerHTML += card;
            }
        });
    } catch (error) {
        container.innerHTML = '<p class="text-red-500 font-bold text-center col-span-full">CRITICAL_ERROR: DATA_FETCH_FAILED</p>';
    }
}
loadNews();
