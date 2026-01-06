async function loadData(file, containerId, isTrend = false) {
    const container = document.getElementById(containerId);
    try {
        const response = await fetch(`./${file}?v=` + Date.now());
        const data = await response.json();
        if (!data.articles || data.articles.length === 0) {
            if(!isTrend) container.innerHTML = '<p class="text-center col-span-full py-20 text-gray-500 font-black">GLOBAL_FEED_EMPTY</p>';
            return;
        }
        container.innerHTML = '';
        data.articles.slice(0, 15).forEach(article => {
            if(isTrend) {
                container.innerHTML += `<div class="border-b border-white/5 pb-2 hover:bg-orange-500/5 p-2 transition-all">
                    <a href="${article.url}" target="_blank" class="text-gray-400 hover:text-orange-400 block">${article.title}</a>
                </div>`;
            } else {
                container.innerHTML += `<div class="bg-black/40 border border-cyan-500/10 p-6 rounded-xl flex flex-col h-full">
                    <h4 class="font-bold text-sm mb-4 text-right leading-relaxed">${article.title}</h4>
                    <a href="${article.url}" target="_blank" class="mt-auto text-center text-[10px] font-black text-black bg-cyan-400 py-2 rounded uppercase hover:bg-white transition-all">فتح المصدر</a>
                </div>`;
            }
        });
    } catch (e) { console.error("Error loading " + file); }
}

loadData('news.json', 'news-container');
loadData('algeria_news.json', 'algeria-trending', true);
