/**
 * MisterAI Super-Fast Engine 
 * محرك بحث متوازي (محلّي + عالمي)
 */
async function askMisterAI() {
    const input = document.getElementById('ai-search-input');
    const responseArea = document.getElementById('ai-response-area');
    const query = input.value.trim().toLowerCase();

    if (!query) return;

    // واجهة البحث الفوري
    responseArea.innerHTML = `
        <div class="flex items-center justify-center py-8 gap-3">
            <div class="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <p class="text-cyan-400 font-black text-[10px] tracking-[0.3em] uppercase">Engine_Accelerating...</p>
        </div>`;

    try {
        // مصفوفة من الوعود (Promises) للبحث في كل مكان في وقت واحد
        const searchPromises = [
            fetch(`./algeria_news.json?v=${Date.now()}`).then(r => r.json()).catch(() => ({articles: []})),
            fetch(`./news.json?v=${Date.now()}`).then(r => r.json()).catch(() => ({articles: []})),
            fetch(`https://dev.to/api/articles?tag=${query}&per_page=3`).then(r => r.json()).catch(() => [])
        ];

        // تنفيذ كل عمليات البحث في نفس اللحظة (سرعة البرق)
        const [algeriaData, newsData, globalData] = await Promise.all(searchPromises);

        let resultsFound = [];

        // 1. جمع النتائج المحلية
        const localMatches = [...algeriaData.articles, ...newsData.articles].filter(a => 
            a.title.toLowerCase().includes(query)
        );
        resultsFound.push(...localMatches.map(a => ({...a, source: "INTERNAL_DATABASE"})));

        // 2. جمع النتائج العالمية (من المصادر الخارجية)
        if (Array.isArray(globalData)) {
            resultsFound.push(...globalData.map(a => ({
                title: a.title,
                url: a.url,
                source: "GLOBAL_KNOWLEDGE_LAB"
            })));
        }

        // عرض النتائج
        if (resultsFound.length > 0) {
            responseArea.innerHTML = '<div class="grid grid-cols-1 gap-4"></div>';
            const grid = responseArea.querySelector('div');
            
            resultsFound.slice(0, 4).forEach(res => {
                grid.innerHTML += `
                    <div class="bg-black/60 border-r-4 border-cyan-500 p-5 rounded-l-2xl animate-in slide-in-from-right duration-300">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-[8px] bg-cyan-500 text-black px-2 py-0.5 rounded font-black">${res.source}</span>
                        </div>
                        <h4 class="text-white font-bold text-sm mb-3">${res.title}</h4>
                        <div class="flex items-center justify-between">
                            <a href="${res.url}" target="_blank" class="text-cyan-400 text-[10px] font-black hover:text-white transition-all uppercase">
                                Verify_Link_External →
                            </a>
                            <i class="fas fa-shield-alt text-gray-700 text-[10px]"></i>
                        </div>
                    </div>`;
            });
        } else {
            responseArea.innerHTML = '<p class="text-center text-gray-500 text-xs py-4">لم أجد نتائج مطابقة، حاول بكلمة أخرى مثل "الجزائر" أو "برمجة".</p>';
        }

    } catch (e) {
        responseArea.innerHTML = '<p class="text-red-500 text-[10px] text-center">SYSTEM_OVERLOAD: يرجى المحاولة لاحقاً</p>';
    }
}
