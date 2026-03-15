// Archive.org provided ad-free Devotional Music Links (verified)
        const songs = [
            { title: "Hanuman Chalisa", cat: "Chalisa", deity: "🙏", tag: "#Bhakti", src: "https://archive.org/download/HanumanChalisa_201602/Hanuman%20Chalisa.mp3" },
            { title: "Om Jai Jagdish Hare", cat: "Aarti", deity: "🪷", tag: "#Aarti", src: "https://archive.org/download/om_jai_jagdish_hare_aarti_bhakti_songs/om_jai_jagdish_hare_aarti_bhakti_songs.mp3" },
            { title: "Gayatri Mantra", cat: "Mantra", deity: "🔆", tag: "#Mantra", src: "https://archive.org/download/GayatriMantra108TimesBhaanu/Gayatri%20Mantra%20108%20times%20-%20Bhaanu.mp3" },
            { title: "Jai Ganesh Deva", cat: "Aarti", deity: "🐘", tag: "#Aarti", src: "https://archive.org/download/JaiGaneshJaiGaneshJaiGaneshDevaLordGaneshAarti/Jai%20Ganesh%20Jai%20Ganesh%20Jai%20Ganesh%20Deva%20-%20Lord%20Ganesh%20Aarti.mp3" },
            { title: "Om Namah Shivaya", cat: "Bhajan", deity: "🔱", tag: "#Shiva", src: "https://archive.org/download/om-namah-shivay-dhoon/Om%20Namah%20Shivay%20Dhoon.mp3" },
            { title: "Achyutam Keshavam", cat: "Bhajan", deity: "🪈", tag: "#Krishna", src: "https://archive.org/download/achyuta-ashtakam/Achyutashtakam.mp3" },
            { title: "Om Jai Lakshmi Mata", cat: "Aarti", deity: "🪔", tag: "#Lakshmi", src: "https://archive.org/download/OmJaiLakshmiMataAarti/Om%20Jai%20Lakshmi%20Mata%20Aarti.mp3" },
            { title: "Venkateswara Suprabhatam", cat: "Suprabhatam", deity: "⭐", tag: "#Balaji", src: "https://archive.org/download/SriVenkateswaraSuprabhatam/SriVenkateswaraSuprabhatam.mp3" },
        ];

        // ── GREETING IMPLEMENTATION ──
        const h = new Date().getHours();
        document.getElementById('greeting').textContent =
            h < 12 ? "🌅 Good Morning — Hari Om" :
                h < 17 ? "☀️ Good Afternoon — Jai Shri Ram" :
                    "🌙 Good Evening — Om Shanti";

        // ── BUILD PLAYLIST (SIDEBAR) ──
        const list = document.getElementById('song-list');
        songs.forEach((s, i) => {
            const el = document.createElement('div');
            el.className = 'song-item';
            el.id = `si-${i}`;
            el.innerHTML = `
                <div class="song-thumb">${s.deity}</div>
                <div class="song-info">
                  <div class="song-name">${s.title}</div>
                  <div class="song-cat">${s.cat}</div>
                </div>
                <div class="song-dur">▶</div>`;
            el.onclick = () => loadSong(i);
            list.appendChild(el);
        });

        // ── PLAYER LOGIC ──
        const audio = document.getElementById('audio');
        let curr = -1;

        // ── YOUTUBE API SETUP ──
        let ytPlayer;
        let ytReady = false;
        function onYouTubeIframeAPIReady() {
            ytPlayer = new YT.Player('yt-player', {
                height: '100%',
                width: '100%',
                playerVars: {
                    'autoplay': 1,
                    'controls': 1, /* show controls so dad can click playlist menu */
                    'rel': 0,
                    'fs': 0
                },
                events: {
                    'onReady': () => { ytReady = true; ytPlayer.setVolume(document.getElementById('vol').value * 100); },
                    'onStateChange': onYtStateChange
                }
            });
        }

        function onYtStateChange(event) {
            if (curr >= 0) return; // not focused on youtube

            // Fetch video title if available
            try {
                const data = ytPlayer.getVideoData();
                if (data && data.title) {
                    document.getElementById('bar-title').textContent = data.title;
                    document.getElementById('now-title').textContent = data.title;
                }
            } catch(e) {}

            if (event.data == YT.PlayerState.PLAYING) {
                document.getElementById('play-btn').textContent = '⏸'; 
                document.getElementById('idle-msg').textContent = '🎵 Now Playing...';
            } else if (event.data == YT.PlayerState.PAUSED) {
                document.getElementById('play-btn').textContent = '▶'; 
                document.getElementById('idle-msg').textContent = '॥ Paused ॥';
            } else if (event.data == YT.PlayerState.ENDED) {
                // Playlist handles next automatically, but just in case
            }
        }

        // Timer for YT Progress
        setInterval(() => {
            if (curr < 0 && ytReady && ytPlayer && ytPlayer.getPlayerState) {
                if (ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
                    const cTime = ytPlayer.getCurrentTime() || 0;
                    const dur = ytPlayer.getDuration() || 0;
                    if (dur > 0) {
                        document.getElementById('progress-fill').style.width = (cTime / dur * 100) + '%';
                        document.getElementById('t-curr').textContent = fmt(cTime);
                        document.getElementById('t-total').textContent = fmt(dur);
                    }
                }
            }
        }, 500);

        function loadSong(i) {
            curr = i;
            const s = songs[i];
            
            // Hide YouTube player and Search Grid, Show Deity
            document.getElementById('yt-player-container').style.display = 'none';
            document.getElementById('back-to-results').style.display = 'none';
            document.getElementById('search-results-container').style.display = 'none';
            if(ytReady && typeof ytPlayer.pauseVideo === 'function') ytPlayer.pauseVideo();
            document.getElementById('deity-art').style.display = 'flex';
            document.getElementById('now-title').style.display = 'block';
            document.getElementById('now-sub').style.display = 'block';
            document.querySelector('.now-tags').style.display = 'flex';

            document.querySelectorAll('.song-item').forEach(el => el.classList.remove('active'));
            document.getElementById(`si-${i}`).classList.add('active');
            document.getElementById('deity-art').textContent = s.deity;
            document.getElementById('now-title').textContent = s.title;
            document.getElementById('now-sub').textContent = s.cat;
            document.querySelector('.now-tags').innerHTML = `<span class="tag">${s.tag}</span><span class="tag">#Morning</span>`;
            document.getElementById('idle-msg').textContent = '🎵 Now Playing...';
            document.getElementById('bar-thumb').textContent = s.deity;
            document.getElementById('bar-title').textContent = s.title;
            document.getElementById('bar-cat').textContent = s.cat;
            if (s.src) { audio.src = s.src; audio.play(); }
        }

        document.getElementById('play-btn').onclick = () => {
            if (curr < 0) {
                // handle YT Play/Pause
                if (ytReady && typeof ytPlayer.getPlayerState === 'function') {
                    if (ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) ytPlayer.pauseVideo();
                    else ytPlayer.playVideo();
                } else {
                    loadSong(0); 
                }
                return; 
            }
            audio.paused ? audio.play() : audio.pause();
        };

        document.getElementById('next-btn').onclick = () => {
            if (curr < 0 && ytReady && typeof ytPlayer.nextVideo === 'function') { ytPlayer.nextVideo(); return; }
            loadSong((curr + 1) % songs.length);
        }
        document.getElementById('prev-btn').onclick = () => {
            if (curr < 0 && ytReady && typeof ytPlayer.previousVideo === 'function') { ytPlayer.previousVideo(); return; }
            loadSong((curr - 1 + songs.length) % songs.length);
        }

        audio.ontimeupdate = () => {
            if (curr < 0 || !audio.duration) return;
            document.getElementById('progress-fill').style.width = (audio.currentTime / audio.duration * 100) + '%';
            document.getElementById('t-curr').textContent = fmt(audio.currentTime);
            document.getElementById('t-total').textContent = fmt(audio.duration);
        };
        audio.onended = () => { if(curr >= 0) loadSong((curr + 1) % songs.length); };
        audio.onplay = () => { 
            if(curr >= 0) { document.getElementById('play-btn').textContent = '⏸'; document.getElementById('idle-msg').textContent = '🎵 Now Playing...'; }
        };
        audio.onpause = () => { 
            if(curr >= 0) { document.getElementById('play-btn').textContent = '▶'; document.getElementById('idle-msg').textContent = '॥ Paused ॥'; }
        };

        document.getElementById('vol').oninput = e => {
            const vol = e.target.value;
            audio.volume = vol;
            if (ytReady && typeof ytPlayer.setVolume === 'function') ytPlayer.setVolume(vol * 100);
        };
        
        document.getElementById('progress-track').onclick = function (e) {
            const ratio = e.offsetX / this.offsetWidth;
            if (curr < 0) {
                if (ytReady && typeof ytPlayer.getDuration === 'function') {
                    ytPlayer.seekTo(ratio * ytPlayer.getDuration(), true);
                }
                return;
            }
            if (!audio.duration) return;
            audio.currentTime = ratio * audio.duration;
        };

        function fmt(s) {
            return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
        }

        // ── AI PANDIT LOGIC ──
        const SYSTEM_PROMPT = `You are a warm, knowledgeable Hindu Pandit AI assistant on a devotional music website called Bhakti Sangam. Your role is to help devotees — particularly elderly users. 
If the user asks to play a song, listen to music, or types a search phrase like "Lord Shiva songs" or "Venkateswara swamy patalu":
1. Warmly tell them you are playing those songs for them right now.
2. YOU MUST APPEND the exact keyword [PLAY: <their search query>] at the very end of your response. (e.g., [PLAY: Lord Shiva devotional songs]). Our system will intercept this and play the music automatically!

Tone rules: 
- Warm, respectful, and patient — like a kind elder
- Keep answers concise but meaningful (3–5 sentences max per point)
- Always end devotional answers with a short blessing like "OM Shanti" or "Jai Shri Ram"
- Never discuss politics, other religions critically, or modern controversies`;

        const quickPrompts = [
            { label: "🌅 Morning Shloka", prompt: "Give me a morning shloka with its meaning in simple English" },
            { label: "🔆 Gayatri Mantra", prompt: "Tell me about the Gayatri Mantra, its meaning and benefits" },
            { label: "🙏 Hanuman Chalisa", prompt: "What is the significance of Hanuman Chalisa? Explain simply" },
            { label: "✨ Vishnu Bhajan", prompt: "Suggest a beautiful bhajan for Lord Vishnu with its meaning" },
            { label: "🪔 Daily Blessing", prompt: "Give me today's morning blessing in Sanskrit and English" }
        ];

        let chatHistory = [];

        // Setup quick prompts
        const qpContainer = document.getElementById('quick-prompts');
        quickPrompts.forEach(qp => {
            const btn = document.createElement('button');
            btn.className = 'q-btn';
            btn.textContent = qp.label;
            btn.onclick = () => handleSendMsg(qp.prompt);
            qpContainer.appendChild(btn);
        });

        // Event Listeners for Chat
        document.getElementById('send-btn').onclick = () => {
            const val = document.getElementById('chat-input').value;
            handleSendMsg(val);
        };
        document.getElementById('chat-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleSendMsg(this.value);
        });

        function formatMarkdown(text) {
            let t = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            t = t.replace(/\*(.*?)\*/g, '<em>$1</em>');
            return t.replace(/\n/g, '<br>');
        }

        let msgCounter = 0;
        function addMsgToUI(role, text) {
            const list = document.getElementById('chat-history');
            const msgEl = document.createElement('div');
            msgEl.className = `msg ${role}`;
            msgCounter++;
            msgEl.id = `msg-${Date.now()}-${msgCounter}`;
            msgEl.innerHTML = formatMarkdown(text);
            list.appendChild(msgEl);
            list.scrollTop = list.scrollHeight;
            return msgEl.id;
        }

        function updateMsgInUI(id, text) {
            const el = document.getElementById(id);
            if (el) {
                el.innerHTML = formatMarkdown(text);
                const list = document.getElementById('chat-history');
                list.scrollTop = list.scrollHeight;
            }
        }

        const EMBEDDED_API_KEY = ""; // PASTE YOUR KEY HERE for personal use

        async function handleSendMsg(text) {
            if (!text.trim()) return;
            
            let apiKey = EMBEDDED_API_KEY;
            if (!apiKey) {
                alert("Please set EMBEDDED_API_KEY in the code.");
                return;
            }

            addMsgToUI('user', text);
            document.getElementById('chat-input').value = '';
            
            // Show typing indicator
            const typingId = addMsgToUI('ai', 'Panditji is thinking...');
            
            // Construct request payload
            const contents = [];
            chatHistory.forEach(msg => {
                contents.push({ role: msg.role === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] });
            });
            contents.push({ role: 'user', parts: [{ text: text }] });
            
            // Save to memory
            chatHistory.push({ role: 'user', text: text });

            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
                        contents: contents
                    })
                });
                
                const data = await response.json();
                
                if (data.error) {
                    updateMsgInUI(typingId, "Forgive me, I encountered an error. Please verify your API Key. " + data.error.message);
                    return;
                }

                if (data.candidates && data.candidates[0].content.parts.length > 0) {
                    let reply = data.candidates[0].content.parts[0].text;
                    chatHistory.push({ role: 'model', text: reply });

                    // Check if AI included a PLAY command
                    const playMatch = reply.match(/\[PLAY:\s*(.+?)\]/i);
                    if (playMatch) {
                        const songQuery = playMatch[1];
                        reply = reply.replace(playMatch[0], '').trim(); // Remove the tag so it doesn't show in UI
                        handleYtSearch(songQuery); // Trigger the YouTube player automatically!
                    }

                    updateMsgInUI(typingId, reply);
                } else {
                    updateMsgInUI(typingId, "I could not find an answer.");
                }
                
            } catch (e) {
                updateMsgInUI(typingId, "Network connection issue. Please make sure you are online or try again.");
            }
        }
        // ── YOUTUBE SEARCH LOGIC ──
        document.getElementById('yt-search-btn').onclick = () => handleYtSearch();
        document.getElementById('yt-search').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleYtSearch();
        });

        async function handleYtSearch(autoQuery) {
            const val = (typeof autoQuery === 'string') ? autoQuery.trim() : document.getElementById('yt-search').value.trim();
            if(!val) return;
            
            document.getElementById('yt-search').value = val;
            
            // UI State Change: Searching...
            if (!audio.paused) audio.pause();
            if (ytReady && typeof ytPlayer.pauseVideo === 'function') ytPlayer.pauseVideo();
            
            document.querySelectorAll('.song-item').forEach(el => el.classList.remove('active'));
            curr = -1;
            
            document.getElementById('deity-art').style.display = 'none';
            document.getElementById('yt-player-container').style.display = 'none';
            document.getElementById('now-title').style.display = 'none';
            document.getElementById('now-sub').style.display = 'none';
            document.querySelector('.now-tags').style.display = 'none';
            document.getElementById('idle-msg').textContent = '🎵 Searching YouTube for ' + val + '...';
            
            const resultsBox = document.getElementById('search-results-container');
            resultsBox.style.display = 'flex';
            resultsBox.innerHTML = '<div style="text-align:center; color:#FFB300; margin-top:2rem;">Searching...</div>';

            const apiKey = window.EMBEDDED_API_KEY || EMBEDDED_API_KEY;
            
            try {
                // Fetch youtube search results reliably using the injected Gemini API Key with Google Search tool enabled
                const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ role: 'user', parts: [{ text: `Search YouTube for "${val}" and return exactly 5 relevant video results. Output ONLY a valid JSON array of objects with the keys: "id" (the youtube video id string), "title" (the video title), "channel" (the uploader channel name), "thumb" (string formatting: https://i.ytimg.com/vi/<id>/hqdefault.jpg), and "length" (estimated duration like "4:32" or "Live"). Do not include markdown blocks.` }] }],
                        systemInstruction: { parts: [{ text: "You are a youtube search API. Always output RAW JSON only." }] },
                        tools: [ { googleSearch: {} } ]
                    })
                });
                
                const responseData = await res.json();
                
                if (responseData.error) throw new Error(responseData.error.message);
                
                let jsonText = responseData.candidates[0].content.parts[0].text.trim();
                // Strip markdown backticks if Gemini includes them anyway
                if (jsonText.startsWith('```json')) jsonText = jsonText.substring(7);
                if (jsonText.startsWith('```')) jsonText = jsonText.substring(3);
                if (jsonText.endsWith('```')) jsonText = jsonText.substring(0, jsonText.length - 3);
                
                const videos = JSON.parse(jsonText.trim());

                if (!videos || videos.length === 0) throw new Error("No videos found.");

                resultsBox.innerHTML = '';
                
                let resultsTitle = document.createElement('h3');
                resultsTitle.style.color = '#FFB300';
                resultsTitle.style.fontSize = '1.1rem';
                resultsTitle.style.paddingLeft = '0.5rem';
                resultsTitle.style.marginBottom = '0.5rem';
                resultsTitle.style.fontFamily = "'Yatra One', cursive";
                resultsTitle.textContent = "Search Results: " + val;
                resultsBox.appendChild(resultsTitle);

                videos.forEach(v => {
                    const card = document.createElement('div');
                    card.className = 'yt-card';
                    card.innerHTML = `
                        <img src="${v.thumb}" class="yt-thumb" alt="thumbnail" />
                        <div class="yt-info">
                            <div class="yt-title">${v.title}</div>
                            <div class="yt-meta">
                                <span>👤 ${v.channel}</span>
                                <span class="yt-dur-pill">⏱ ${v.length || 'Video'}</span>
                            </div>
                        </div>
                    `;
                    card.onclick = () => loadYtVideo(v.id, v.title, v.channel);
                    resultsBox.appendChild(card);
                });
                
                document.getElementById('idle-msg').textContent = '🎵 Select a song from the results above.';
                document.getElementById('yt-search').blur();

            } catch (err) {
                console.error(err);
                resultsBox.innerHTML = `<div style="text-align:center; color:#FFB300;">Error loading results. Try searching again.</div>`;
                document.getElementById('idle-msg').textContent = '🙏 May your morning be blessed.';
            }
        }

        // When user clicks a card, play that specific video in the top embed
        function loadYtVideo(vId, vTitle, channelName) {
            document.getElementById('search-results-container').style.display = 'none';
            document.getElementById('yt-player-container').style.display = 'block';
            document.getElementById('back-to-results').style.display = 'block';
            
            document.getElementById('now-title').style.display = 'block';
            document.getElementById('now-sub').style.display = 'block';
            document.querySelector('.now-tags').style.display = 'flex';
            
            document.getElementById('now-title').textContent = "YouTube Audio Match";
            document.getElementById('now-sub').textContent = vTitle;
            document.querySelector('.now-tags').innerHTML = `<span class="tag">#YouTube</span><span class="tag">${channelName}</span>`;
            document.getElementById('idle-msg').textContent = '🎵 Playing your selection...';
            
            document.getElementById('bar-thumb').textContent = "▶";
            document.getElementById('bar-title').textContent = vTitle;
            document.getElementById('bar-cat').textContent = channelName;
            document.getElementById('progress-fill').style.width = '0%';
            document.getElementById('t-curr').textContent = '0:00';
            document.getElementById('t-total').textContent = '0:00';

            if(ytReady && typeof ytPlayer.loadVideoById === 'function') {
                ytPlayer.loadVideoById(vId);
            }
        }

// ── GO BACK TO RESULTS LOGIC ──
function goBackToResults() {
    // Hide YT player
    document.getElementById('yt-player-container').style.display = 'none';
    document.getElementById('back-to-results').style.display = 'none';
    
    // Pause video
    if (ytReady && typeof ytPlayer.pauseVideo === 'function') ytPlayer.pauseVideo();
    
    // Show results
    document.getElementById('search-results-container').style.display = 'flex';
    document.getElementById('idle-msg').textContent = '🎵 Select a song from the results above.';
    
    // Hide now playing stuff temporarily
    document.getElementById('now-title').style.display = 'none';
    document.getElementById('now-sub').style.display = 'none';
    document.querySelector('.now-tags').style.display = 'none';
    
    // reset bottom bar temporarily
    document.getElementById('bar-thumb').textContent = '▶';
    document.getElementById('bar-title').textContent = 'Making a selection...';
    document.getElementById('bar-cat').textContent = 'YouTube Search';
}
