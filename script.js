// وظيفة فتح الخبر في نافذة داخلية
function openNews(url) {
    const modal = document.getElementById('news-modal');
    const frame = document.getElementById('news-frame');
    frame.src = url;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // منع التمرير في الخلفية
}

// وظيفة إغلاق النافذة
function closeNews() {
    const modal = document.getElementById('news-modal');
    const frame = document.getElementById('news-frame');
    frame.src = '';
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

async function loadNews() {
    const container = document.getElementById('news-container');
    try {
        const response = await fetch('./news.json?v=' + Date.now());
        const data = await response.json();
        container.innerHTML = ''; 

        if (!data.articles || data.articles.length === 0) {
            container.innerHTML = '<p class="text-cyan-500/50 text-center col-span-full py-20 uppercase tracking-widest animate-pulse">Searching_Global_Nodes...</p>';
            return;
        }

        data.articles.forEach(article => {
            if(article.title && article.title !== "[Removed]") {
                const card = `
                <div class="bg-black/40 border border-cyan-500/20 p-6 rounded-xl hover:bg-cyan-500/10 transition-all group">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-[8px] font-black text-cyan-400 uppercase tracking-widest border border-cyan-400/30 px-2 py-0.5 rounded">Intelligence</span>
                        <span class="text-[9px] text-gray-600">${new Date(article.publishedAt).toLocaleDateString('ar-DZ')}</span>
                    </div>
                    <h4 class="font-bold text-sm mb-4 group-hover:text-cyan-400 leading-snug text-right">${article.title}</h4>
                    
                    <button onclick="openNews('${article.url}')" class="w-full text-[9px] font-black text-black bg-cyan-400 py-2 rounded-lg uppercase hover:bg-white transition shadow-lg shadow-cyan-500/20">
                        View_Inside_Node
                    </button>
                </div>
                `;
                container.innerHTML += card;
            }
        });
    } catch (error) {
        container.innerHTML = '<p class="text-red-500 text-center col-span-full uppercase font-black">Critical_Error: Data_Link_Broken</p>';
    }
}

// إغلاق النافذة عند الضغط خارجها
window.onclick = function(event) {
    const modal = document.getElementById('news-modal');
    if (event.target == modal) closeNews();
}

loadNews();
