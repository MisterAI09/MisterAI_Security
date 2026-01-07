// قم بتحديث روابط القنوات لتشير إلى /api/streams/... حتى يتم عمل proxy عبر Vercel
(function(){
    const channels = [
        { title: '🟪 1', url: '/api/streams/beinsport1_.m3u8' },
        { title: '🟪 2', url: '/api/streams/beinsport2_.m3u8' },
        { title: '🟪 3', url: '/api/streams/beinsport3_.m3u8' },
        { title: '🟪 4', url: '/api/streams/beinsport4_.m3u8' },
        { title: '🟪 5', url: '/api/streams/beinsport5_.m3u8' },
        { title: '🟪 6', url: '/api/streams/beinsport6_.m3u8' },
        { title: '🟪 7', url: '/api/streams/beinsport7_.m3u8' },
        { title: '🟪 8', url: '/api/streams/beinsport8_.m3u8' },
        { title: '🟪 9', url: '/api/streams/beinsport9_.m3u8' }
    ];

    const container = document.getElementById('channelList');
    const video = document.getElementById('tvPlayer');
    let hlsInstance = null;

    function playUrl(url) {
        if (!url) return;
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
            video.load();
            video.play().catch(()=>{});
            return;
        }
        if (hlsInstance) {
            try { hlsInstance.destroy(); } catch(e) {}
            hlsInstance = null;
        }
        if (window.Hls && Hls.isSupported()) {
            hlsInstance = new Hls({ maxBufferLength: 30 });
            hlsInstance.loadSource(url);
            hlsInstance.attachMedia(video);
            hlsInstance.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play().catch(()=>{});
            });
            hlsInstance.on(Hls.Events.ERROR, function(event, data) {
                console.error('HLS error', data);
            });
        } else {
            console.warn('HLS not supported and video element cannot play m3u8 directly.');
        }
    }

    channels.forEach((ch, idx) => {
        const btn = document.createElement('button');
        btn.className = 'channel-btn';
        btn.type = 'button';
        btn.setAttribute('data-url', ch.url);
        const left = document.createElement('span');
        left.className = 'flex items-center gap-2';
        left.innerHTML = `<span class="channel-badge" style="background:#6d28d9;color:#fff;">${idx+1}</span><span style="font-weight:800">${ch.title}</span>`;
        const right = document.createElement('span');
        right.style.fontSize = '11px';
        right.style.color = '#94a3b8';
        right.textContent = 'تشغيل ▶';
        btn.appendChild(left);
        btn.appendChild(right);

        btn.addEventListener('click', function(){
            container.querySelectorAll('.channel-btn').forEach(b=>b.classList.remove('active'));
            this.classList.add('active');
            const url = this.getAttribute('data-url');
            playUrl(url);
        });

        container.appendChild(btn);
    });

    // لا نشغّل تلقائياً لتجنّب رفض autoplay من المتصفح
    window.addEventListener('beforeunload', () => {
        if (hlsInstance) {
            try { hlsInstance.destroy(); } catch(e) {}
        }
    });

    window.generateMisterAISatire = function() {
        const area = document.getElementById('ai-response-area');
        area.innerHTML = '<div class="p-8 rounded-2xl bg-white/5 text-center"><p>المستر ينقح البيانات... (نسخة تجريبية)</p></div>';
    };
})();
