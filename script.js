/**
 * MisterAI NETWORK - Knowledge & Programming System
 * جلب شروحات البرمجة وفلسفة "فهم الآلة"
 */
async function fetchTutorials(tag, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // استخدام API عالمي (مثل DEV.to) لجلب مقالات البرمجة مباشرة
    const apiUrl = `https://dev.to/api/articles?tag=${tag}&per_page=4`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('API limit or error');
        const articles = await response.json();

        container.innerHTML = '';

        articles.forEach(article => {
            // هنا ندمج "فهم الآلة" و "أهمية البرمجة" في التصميم
            container.innerHTML += `
            <div class="bg-[#0a0a0a] border-l-4 border-cyan-500 p-5 rounded-r-xl mb-4 group hover:bg-cyan-900/10 transition-all">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded uppercase font-bold">Machine_Learning_Logic</span>
                    <span class="text-gray-600 text-[10px]">${new Date(article.published_at).toLocaleDateString()}</span>
                </div>
                <h4 class="text-white font-bold text-lg mb-2 group-hover:text-cyan-300 transition-colors">
                    ${article.title}
                </h4>
                <p class="text-gray-400 text-sm mb-4 leading-relaxed">
                    هذا الشرح يعزز قدرتك على بناء أنظمة مستقلة. تذكر: "البرمجة هي لغة الحرية".
                </p>
                <div class="flex items-center justify-between">
                    <a href="${article.url}" target="_blank" class="text-cyan-400 text-xs font-black uppercase tracking-tighter hover:text-white transition-colors">
                        Explore_The_Code_DNA →
                    </a>
                    <div class="flex gap-2">
                        ${article.tag_list.slice(0, 2).map(t => `<span class="text-gray-500 text-[9px]">#${t}</span>`).join('')}
                    </div>
                </div>
            </div>`;
        });
    } catch (e) {
        console.error("Tutorials Error:", e);
        container.innerHTML = '<p class="text-gray-600 text-xs italic">Waiting for knowledge stream...</p>';
    }
}

// --- الاستدعاءات ---

// 1. الأخبار العالمية (كودك الأصلي)
fetchFeed('news.json', 'news-container', false);

// 2. أخبار الترند (كودك الأصلي)
fetchFeed('algeria_news.json', 'algeria-trending', true);

// 3. قسم "فهم الآلة والبرمجة" الجديد (تلقائي بالكامل)
fetchTutorials('programming', 'learning-lab-container');
