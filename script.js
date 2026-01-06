async function loadNews() {
    const container = document.getElementById('news-container');
    try {
        // إضافة v= لضمان جلب أحدث نسخة وتجاوز الكاش
        const response = await fetch('./news.json?v=' + Date.now());
        const data = await response.json();
        
        container.innerHTML = ''; 

        if (!data.articles || data.articles.length === 0) {
            container.innerHTML = '<div class="col-span-full py-20 text-center animate-pulse text-cyan-500 font-black uppercase tracking-[0.4em]">Searching_Global_Nodes...</div>';
            return;
        }

        data.articles.forEach(article => {
            if(article.title && article.title !== "[Removed]") {
                const card = `
                <div class="bg-black/40 border border-cyan-500/20 p-6 rounded-xl hover:bg-cyan-500/10 transition-all group flex flex-col h-full">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-[8px] font-black text-cyan-400 uppercase tracking-widest border border-cyan-400/30 px-2 py-0.5 rounded">Intelligence_Data</span>
                        <span class="text-[9px] text-gray-600">${new Date(article.publishedAt).toLocaleDateString('ar-DZ')}</span>
                    </div>
                    <h4 class="font-bold text-sm mb-4 group-hover:text-cyan-400 leading-snug text-right text-gray-100">${article.title}</h4>
                    <p class="text-[10px] text-gray-500 text-right line-clamp-2 mb-6 flex-grow leading-relaxed">${article.description || 'لا يوجد وصف متاح لهذا الخبر حالياً.'}</p>
                    
                    <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="w-full text-center text-[9px] font-black text-black bg-cyan-400 py-2.5 rounded-lg uppercase hover:bg-white transition-all shadow-lg shadow-cyan-500/10 block">
                        Open_Source_Link
                    </a>
                </div>
                `;
                container.innerHTML += card;
            }
        });
    } catch (error) {
        container.innerHTML = '<div class="col-span-full py-20 text-center text-red-500 font-black uppercase tracking-widest">Critical_Error: Connection_Lost</div>';
    }
}

loadNews();
