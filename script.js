        const songs = [
            { title: "Hanuman Chalisa", cat: "Chalisa", deity: "🙏", tag: "#Bhakti", videoId: "kC8VzzPPY2A" },
            { title: "Om Jai Jagdish Hare", cat: "Aarti", deity: "🪷", tag: "#Aarti", videoId: "012oY38Blvg" },
            { title: "Gayatri Mantra", cat: "Mantra", deity: "🔆", tag: "#Mantra", videoId: "ndZ-mBhkPrs" },
            { title: "Jai Ganesh Deva", cat: "Aarti", deity: "🐘", tag: "#Aarti", videoId: "IJKafzL8kLQ" },
            { title: "Om Namah Shivaya", cat: "Bhajan", deity: "🔱", tag: "#Shiva", videoId: "xBr9FxZQPjM" },
            { title: "Achyutam Keshavam", cat: "Bhajan", deity: "🪈", tag: "#Krishna", videoId: "btOdAtmJBbw" },
            { title: "Om Jai Lakshmi Mata", cat: "Aarti", deity: "🪔", tag: "#Lakshmi", videoId: "0D3VbBoJBrM" },
            { title: "Venkateswara Suprabhatam", cat: "Suprabhatam", deity: "⭐", tag: "#Balaji", videoId: "TzJWmf0QCvY" },
        ];

        // ── GREETING & SIDEBAR TITLE IMPLEMENTATION ──
        const h = new Date().getHours();
        const greeting = document.getElementById('greeting');
        const sbTitle = document.getElementById('sidebar-title');
        
        greeting.textContent = h < 12 ? "🌅 Good Morning — Hari Om" :
                               h < 17 ? "☀️ Good Afternoon — Jai Shri Ram" :
                               "🌙 Good Evening — Om Shanti";

        if (h >= 5 && h < 12) sbTitle.textContent = "🌅 MORNING PLAYLIST";
        else if (h >= 12 && h < 17) sbTitle.textContent = "☀️ AFTERNOON PLAYLIST";
        else if (h >= 17 && h < 21) sbTitle.textContent = "🌆 EVENING PLAYLIST";
        else sbTitle.textContent = "🌙 NIGHT PLAYLIST";

        let timeTag = "#Morning";
        let timePeriod = "morning";
        if (h >= 5 && h < 12) { timeTag = "#Morning"; timePeriod = "morning"; }
        else if (h >= 12 && h < 17) { timeTag = "#Afternoon"; timePeriod = "afternoon"; }
        else if (h >= 17 && h < 21) { timeTag = "#Evening"; timePeriod = "evening"; }
        else { timeTag = "#Night"; timePeriod = "night"; }

        // Update DOM initially
        document.getElementById('now-sub').textContent = `Select a song to begin your ${timePeriod} prayer`;
        document.querySelector('.now-tags').innerHTML = `<span class="tag">#Devotional</span><span class="tag" id="time-tag">${timeTag}</span>`;


        let currentDeityFilter = "All";
        let currentLangFilter = "All";
        
        // Wait for DOM
        window.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.deity-btn').forEach(btn => {
                btn.onclick = () => {
                    document.querySelectorAll('.deity-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentDeityFilter = btn.getAttribute('data-deity');
                    renderPlaylist(document.getElementById('yt-search').value);
                };
            });
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.onclick = () => {
                    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentLangFilter = btn.getAttribute('data-lang');
                    renderPlaylist(document.getElementById('yt-search').value);
                };
            });
        });

        // ── BUILD PLAYLIST (SIDEBAR) ──
        function renderPlaylist(filterText = "") {
            const list = document.getElementById('song-list');
            list.innerHTML = "";
            const lowerFilter = filterText.toLowerCase();

            let matchCount = 0;

            songs.forEach((s, i) => {
                if (filterText && !s.title.toLowerCase().includes(lowerFilter) && !s.cat.toLowerCase().includes(lowerFilter)) {
                    return; // skip if doesn't match filter
                }

                let d = "";
                if (s.title === "Hanuman Chalisa") d = "Hanuman";
                else if (s.title === "Om Jai Jagdish Hare") d = "Vishnu";
                else if (s.title === "Gayatri Mantra") d = "None";
                else if (s.title === "Jai Ganesh Deva") d = "Ganesh";
                else if (s.title === "Om Namah Shivaya") d = "Shiva";
                else if (s.title === "Achyutam Keshavam") d = "Vishnu";
                else if (s.title === "Om Jai Lakshmi Mata") d = "Devi";
                else if (s.title === "Venkateswara Suprabhatam") d = "Vishnu";

                if (currentDeityFilter !== "All" && d !== currentDeityFilter) {
                    return;
                }

                let lg = "";
                if (s.title === "Hanuman Chalisa") lg = "Hindi";
                else if (s.title === "Om Jai Jagdish Hare") lg = "Hindi";
                else if (s.title === "Gayatri Mantra") lg = "Sanskrit";
                else if (s.title === "Jai Ganesh Deva") lg = "Hindi";
                else if (s.title === "Om Namah Shivaya") lg = "Sanskrit";
                else if (s.title === "Achyutam Keshavam") lg = "Hindi";
                else if (s.title === "Om Jai Lakshmi Mata") lg = "Hindi";
                else if (s.title === "Venkateswara Suprabhatam") lg = "Telugu";

                if (currentLangFilter !== "All" && lg !== currentLangFilter) {
                    return;
                }

                matchCount++;

                const el = document.createElement('div');
                el.className = 'song-item';
                // Active class if currently playing
                if (i === curr) el.classList.add('active');
                
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
            
            if (matchCount === 0) {
                list.innerHTML = '<div id="no-songs-msg">No songs found</div>';
            }
        }
        
        // ── PLAYER LOGIC ──
        const audio = document.getElementById('audio');
        let curr = -1;
        let activePlaylist = songs; // Default to morning songs
        let isSearchMode = false;

        // Initial render
        renderPlaylist();

        // ── HOME RESET LOGIC ──
        function resetToHome() {
            // Stop playback
            if (!audio.paused) audio.pause();
            stopCurrentVideo();

            document.getElementById('yt-player-container').style.display = 'none';
            document.getElementById('yt-player-overlay').style.display = 'none';
            
            // Show default deity
            document.getElementById('deity-art').style.display = 'flex';
            
            // Reset text
            const npLabel = document.getElementById('now-playing-label');
            if(npLabel) npLabel.style.display = 'none';
            document.getElementById('now-title').textContent = "Bhakti Sangam";
            document.getElementById('now-title').style.display = 'block';
            document.getElementById('now-sub').textContent = `Select a song to begin your ${timePeriod} prayer`;
            document.getElementById('now-sub').style.display = 'block';
            document.querySelector('.now-tags').style.display = 'flex';
            document.querySelector('.now-tags').innerHTML = `<span class="tag">#Devotional</span><span class="tag">${timeTag}</span>`;
            
            // Reset Bottom Bar
            document.getElementById('bar-thumb').textContent = "🪔";
            document.getElementById('bar-title').textContent = "Bhakti Sangam";
            document.getElementById('bar-cat').textContent = "Devotional Player";
            document.getElementById('progress-fill').style.width = '0%';
            document.getElementById('t-curr').textContent = '0:00';
            document.getElementById('t-total').textContent = '0:00';
            document.getElementById('play-btn').textContent = '▶';

            // Clear search
            document.getElementById('yt-search').value = "";
            document.getElementById('search-results-container').style.display = 'none';
            const resTitle = document.getElementById('search-res-title');
            if (resTitle) resTitle.remove();
            document.getElementById('back-to-results').style.display = 'none';
            
            // Clear sidebar highlight
            curr = -1;
            renderPlaylist();
        }

        document.querySelector('.top-left').style.cursor = 'pointer';
        document.querySelector('.top-left').onclick = resetToHome;

        // ── YOUTUBE API SETUP ──
        let ytPlayer = null;

        function stopCurrentVideo() {
          if (ytPlayer) {
            try {
              if (typeof ytPlayer.stopVideo === 'function') ytPlayer.stopVideo();
              if (typeof ytPlayer.destroy === 'function') ytPlayer.destroy();
            } catch(e) {}
            ytPlayer = null;
          }
          const container = document.getElementById('yt-player-div');
          if (container) container.innerHTML = '';
        }

        let recentlyPlayed = []; // Store {title, type: 'song'|'yt', ...}

        function addToRecent(item) {
            // Remove if already exists (bring to top)
            recentlyPlayed = recentlyPlayed.filter(r => r.title !== item.title);
            recentlyPlayed.unshift(item);
            if (recentlyPlayed.length > 5) recentlyPlayed.pop();
            renderRecent();
        }

        function removeFromRecent(title) {
            recentlyPlayed = recentlyPlayed.filter(r => r.title !== title);
            renderRecent();
        }

        function renderRecent() {
            const list = document.getElementById('recent-list');
            const title = document.getElementById('recent-title');
            if (recentlyPlayed.length === 0) {
                title.style.display = 'none';
                list.innerHTML = "";
                return;
            }
            title.style.display = 'block';
            list.innerHTML = "";
            recentlyPlayed.forEach(r => {
                const el = document.createElement('div');
                el.className = 'recent-item';
                
                const titleSpan = document.createElement('span');
                titleSpan.className = 'recent-title-txt';
                titleSpan.textContent = r.title;
                
                const remBtn = document.createElement('span');
                remBtn.className = 'recent-rem-btn';
                remBtn.textContent = '×';
                remBtn.title = 'Remove';
                
                el.onclick = () => {
                    if (r.type === 'song') loadSong(r.index);
                    else loadYtVideo(r.vId, r.title, r.channel);
                };
                
                remBtn.onclick = (e) => {
                    e.stopPropagation();
                    removeFromRecent(r.title);
                };
                
                el.appendChild(titleSpan);
                el.appendChild(remBtn);
                list.appendChild(el);
            });
        }

        // Handle Browser Back Button
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.view === 'results') {
                stopCurrentVideo();
                showSearchResults();
            } else if (e.state && e.state.view === 'player') {
                // Stay in player
            } else {
                // Reset to Home if no state (back to initial)
                resetToHome();
            }
        });
        function onYouTubeIframeAPIReady() {
            console.log("YouTube API Ready");
        }

        window.playNextFallback = () => {
            document.getElementById('next-btn').click();
        };

        function onYtStateChange(event) {
            if (event.data === YT.PlayerState.PLAYING) {
                document.getElementById('play-btn').textContent = '⏸';
            }
            if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                document.getElementById('play-btn').textContent = '▶';
                if (event.data === YT.PlayerState.ENDED) {
                    document.getElementById('next-btn').click();
                }
            }
        }

        // ── PROGRESS BAR TIMER ──
        setInterval(() => {
            if (!ytPlayer || !ytPlayer.getDuration) return;
            const cur = ytPlayer.getCurrentTime();
            const dur = ytPlayer.getDuration();
            const pct = (cur / dur) * 100;
            document.getElementById('progress-fill').style.width = pct + '%';
            document.getElementById('t-curr').textContent = fmt(cur);
            document.getElementById('t-total').textContent = fmt(dur);
        }, 1000);

        function loadSong(i, forceAutoplay = false) {
            stopCurrentVideo();
            curr = i;
            isSearchMode = false;
            activePlaylist = songs;
            const s = songs[i];
            
            // UI setup
            document.getElementById('deity-art').style.display = 'none';
            document.getElementById('search-results-container').style.display = 'none';
            const resTitle = document.getElementById('search-res-title');
            if (resTitle) resTitle.remove();
            
            document.getElementById('yt-player-container').style.display = 'block';
            document.getElementById('back-to-results').style.display = 'none'; 
            
            const npLabel = document.getElementById('now-playing-label');
            if(npLabel) npLabel.style.display = 'none';
            document.getElementById('now-title').style.display = 'block';
            document.getElementById('now-sub').style.display = 'block';
            document.querySelector('.now-tags').style.display = 'flex';

            document.querySelectorAll('.song-item').forEach(el => el.classList.remove('active'));
            const activeItem = document.getElementById(`si-${i}`);
            if (activeItem) activeItem.classList.add('active');
            
            document.getElementById('now-title').textContent = s.title;
            document.getElementById('now-sub').textContent = s.cat;
            document.querySelector('.now-tags').innerHTML = `<span class="tag">${s.tag}</span><span class="tag">${timeTag}</span>`;
            
            document.getElementById('bar-thumb').textContent = s.deity;
            document.getElementById('bar-title').textContent = s.title;
            document.getElementById('bar-cat').textContent = s.cat;
            
            const overlay = document.getElementById('yt-player-overlay');

            const initPlayer = () => {
                overlay.style.display = 'none'; 
                
                const vId = s.videoId;
                const container = document.getElementById('yt-player-container');
                let playerDiv = document.getElementById('yt-player-div');
                if (!playerDiv) {
                    playerDiv = document.createElement('div');
                    playerDiv.id = 'yt-player-div';
                    container.appendChild(playerDiv);
                } else {
                    // Recreate div to ensure a clean slate for new YT.Player
                    const newDiv = document.createElement('div');
                    newDiv.id = 'yt-player-div';
                    playerDiv.replaceWith(newDiv);
                }

                ytPlayer = new YT.Player('yt-player-div', {
                    videoId: vId,
                    playerVars: { 
                        autoplay: 1, 
                        rel: 0, 
                        modestbranding: 1,
                        iv_load_policy: 3,
                        disablekb: 0
                    },
                    events: {
                        onStateChange: onYtStateChange,
                        onError: function(e) {
                            document.getElementById('yt-player-div')
                                .outerHTML = `
                                <div id="yt-player-div" style="display:flex; flex-direction:column; 
                                align-items:center; justify-content:center; 
                                height:100%; background:#1A0D00; 
                                border-radius:12px; gap:16px; position:absolute; inset:0; z-index:10;">
                                  <div style="font-size:4rem">🪔</div>
                                  <div style="color:#FFB300; font-size:1.1rem; 
                                  font-weight:bold; text-align:center">
                                    This song is not available here
                                  </div>
                                  <div style="color:#8B5E3C; font-size:0.85rem; 
                                  text-align:center">
                                    Please select another song from Up Next
                                  </div>
                                </div>`;
                        }
                    }
                });

                document.getElementById('vol').oninput = function() {
                  if (ytPlayer && ytPlayer.setVolume) {
                    ytPlayer.setVolume(this.value * 100);
                  }
                };

                if (!audio.paused) audio.pause();
                addToRecent({ title: s.title, type: 'song', index: i });
            };

            if (forceAutoplay) {
                initPlayer();
            } else {
                // Show overlay instead of loading iframe directly
                overlay.style.display = 'block';
                overlay.style.backgroundImage = `url('https://img.youtube.com/vi/${s.videoId}/hqdefault.jpg')`;
                overlay.onclick = initPlayer;
            }
        }

        document.getElementById('play-btn').onclick = () => {
            if (ytPlayer && typeof ytPlayer.getPlayerState === 'function') {
                const state = ytPlayer.getPlayerState();
                if (state === 1) { // 1 = PLAYING
                    ytPlayer.pauseVideo();
                } else {
                    ytPlayer.playVideo();
                }
            }
        };

        document.getElementById('next-btn').onclick = () => {
            stopCurrentVideo();

            if (isSearchMode) {
                curr = (curr + 1) % activePlaylist.length;
                const nextVid = activePlaylist[curr];
                loadYtVideo(nextVid.id.videoId, nextVid.snippet.title, nextVid.snippet.channelTitle);
            } else {
                curr = (curr + 1) % songs.length;
                loadSong(curr, true);
            }
        }
        document.getElementById('prev-btn').onclick = () => {
            stopCurrentVideo();

            if (isSearchMode) {
                curr = (curr - 1 + activePlaylist.length) % activePlaylist.length;
                const prevVid = activePlaylist[curr];
                loadYtVideo(prevVid.id.videoId, prevVid.snippet.title, prevVid.snippet.channelTitle);
            } else {
                curr = (curr - 1 + songs.length) % songs.length;
                loadSong(curr, true);
            }
        }

        audio.ontimeupdate = () => {
            if (curr < 0 || !audio.duration) return;
            document.getElementById('progress-fill').style.width = (audio.currentTime / audio.duration * 100) + '%';
            document.getElementById('t-curr').textContent = fmt(audio.currentTime);
            document.getElementById('t-total').textContent = fmt(audio.duration);
        };
        audio.onended = () => { if(curr >= 0) loadSong((curr + 1) % songs.length); };
        audio.onplay = () => { 
            if(curr >= 0) { document.getElementById('play-btn').textContent = '⏸'; }
        };
        audio.onpause = () => { 
            if(curr >= 0) { document.getElementById('play-btn').textContent = '▶'; }
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

        const GEMINI_API_KEY = "";
        const YT_API_KEY = "";

        async function handleSendMsg(text) {
            if (!text.trim()) return;

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
                const response = await fetch(`/api/chat`, {
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
        
        // Listen to input changes for sidebar filtering as well as Enter for yt search
        document.getElementById('yt-search').addEventListener('input', function(e) {
            renderPlaylist(this.value);
        });
        
        document.getElementById('yt-search').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleYtSearch();
        });

        async function handleYtSearch(autoQuery) {
            const val = (typeof autoQuery === 'string') ? autoQuery.trim() : document.getElementById('yt-search').value.trim();
            if(!val) return;
            
            document.getElementById('yt-search').value = val;
            
            // UI State Change: Searching...
            if (!audio.paused) audio.pause();
            if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') ytPlayer.pauseVideo();
            
            document.querySelectorAll('.song-item').forEach(el => el.classList.remove('active'));
            curr = -1;
            
            document.getElementById('center').classList.remove('playback-layout');
            document.getElementById('deity-art').style.display = 'none';
            document.getElementById('yt-player-container').style.display = 'none';
            document.getElementById('yt-player-overlay').style.display = 'none'; 
            const npLabel = document.getElementById('now-playing-label');
            if(npLabel) npLabel.style.display = 'none';
            document.getElementById('now-title').style.display = 'none';
            document.getElementById('now-sub').style.display = 'none';
            document.querySelector('.now-tags').style.display = 'none';
            document.getElementById('center').style.justifyContent = 'flex-start';
            const resultsBox = document.getElementById('search-results-container');
            resultsBox.classList.remove('more-results-mode'); // Vertical for initial search
            resultsBox.style.display = 'flex';
            resultsBox.innerHTML = '<div style="text-align:center; color:#FFB300; margin-top:2rem;">Searching YouTube instantly...</div>';

            try {
                // Fetch from Local Proxy
                const url = `/api/search?q=${encodeURIComponent(val)}`;
                const res = await fetch(url);
                const responseData = await res.json();
                
                if (responseData.error) throw new Error(responseData.error.message);
                if (!responseData.items || responseData.items.length === 0) throw new Error("No videos found.");

                activePlaylist = responseData.items; // Store for navigation
                isSearchMode = true;
                resultsBox.innerHTML = '';
                
                // Clear any existing search title if it exists from previous search
                const oldTitle = document.getElementById('search-res-title');
                if(oldTitle) oldTitle.remove();

                let resultsTitle = document.createElement('div');
                resultsTitle.id = 'search-res-title';
                resultsTitle.textContent = "Recommended Devotional Videos";
                resultsBox.before(resultsTitle); 

                responseData.items.forEach((item, index) => {
                    const videoId = item.id.videoId;
                    const title = item.snippet.title;
                    const channel = item.snippet.channelTitle;
                    // Get highest available thumbnail resolution we can easily grab
                    const thumb = item.snippet.thumbnails.high ? item.snippet.thumbnails.high.url : 
                                 (item.snippet.thumbnails.medium ? item.snippet.thumbnails.medium.url : item.snippet.thumbnails.default.url);

                    const card = document.createElement('div');
                    card.className = 'yt-card';
                    card.innerHTML = `
                        <img src="${thumb}" class="yt-thumb" alt="thumbnail" />
                        <div class="yt-info">
                            <div class="yt-title" title="${title}">${title}</div>
                            <div class="yt-meta">
                                <span>👤 ${channel}</span>
                                <span class="yt-dur-pill">▶ Play</span>
                            </div>
                        </div>
                    `;
                    card.onclick = () => {
                        curr = index; // Set index for search navigation
                        loadYtVideo(videoId, title, channel);
                        history.pushState({ view: 'player', videoId: videoId }, "", "");
                    };
                    resultsBox.appendChild(card);
                });
                
                document.getElementById('yt-search').blur();

                // Push history for results view
                history.pushState({ view: 'results', query: val }, "", "");

            } catch (err) {
                console.error(err);
                resultsBox.innerHTML = `<div style="text-align:center; color:#FFB300;">Error: ${err.message || 'Error loading results.'}</div>`;
            }
        }

        // When user clicks a card, play that specific video in the top embed
        function loadYtVideo(vId, vTitle, channelName) {
            stopCurrentVideo();
            // Hide overlay if it's there
            document.getElementById('yt-player-overlay').style.display = 'none';
            
            document.getElementById('center').classList.add('playback-layout');
            document.getElementById('yt-player-container').style.display = 'block';
            document.getElementById('back-to-results').style.display = 'block'; // Show back button
            
            const resultsBox = document.getElementById('search-results-container');
            resultsBox.classList.add('more-results-mode'); // Show results as compact vertical list
            resultsBox.style.display = 'flex';
            const resTitle = document.getElementById('search-res-title');
            if (resTitle) resTitle.textContent = "UP NEXT";

            const npLabel = document.getElementById('now-playing-label');
            if(npLabel) npLabel.style.display = 'block';

            const nowTitle = document.getElementById('now-title');
            nowTitle.style.display = 'block';
            nowTitle.style.fontSize = ''; 
            nowTitle.textContent = vTitle;
            
            document.getElementById('now-sub').style.display = 'block';
            document.getElementById('now-sub').textContent = channelName;
            
            const nowTags = document.querySelector('.now-tags');
            if(nowTags) nowTags.style.display = 'none';
            document.getElementById('bar-thumb').textContent = "▶";
            document.getElementById('bar-title').textContent = vTitle;
            document.getElementById('bar-cat').textContent = channelName;
            document.getElementById('progress-fill').style.width = '0%';
            document.getElementById('t-curr').textContent = '0:00';
            document.getElementById('t-total').textContent = '0:00';

            const container = document.getElementById('yt-player-container');
            let playerDiv = document.getElementById('yt-player-div');
            if (!playerDiv) {
                playerDiv = document.createElement('div');
                playerDiv.id = 'yt-player-div';
                container.appendChild(playerDiv);
            } else {
                const newDiv = document.createElement('div');
                newDiv.id = 'yt-player-div';
                playerDiv.replaceWith(newDiv);
            }

            ytPlayer = new YT.Player('yt-player-div', {
                videoId: vId,
                playerVars: { 
                    autoplay: 1, 
                    rel: 0, 
                    modestbranding: 1,
                    iv_load_policy: 3,
                    disablekb: 0
                },
                events: {
                    onStateChange: onYtStateChange,
                    onError: function(e) {
                            document.getElementById('yt-player-div')
                                .outerHTML = `
                                <div id="yt-player-div" style="display:flex; flex-direction:column; 
                                align-items:center; justify-content:center; 
                                height:100%; background:#1A0D00; 
                                border-radius:12px; gap:16px; position:absolute; inset:0; z-index:10;">
                                  <div style="font-size:4rem">🪔</div>
                                  <div style="color:#FFB300; font-size:1.1rem; 
                                  font-weight:bold; text-align:center">
                                    This song is not available here
                                  </div>
                                  <div style="color:#8B5E3C; font-size:0.85rem; 
                                  text-align:center">
                                    Please select another song from Up Next
                                  </div>
                                </div>`;
                    }
                }
            });

            document.getElementById('vol').oninput = function() {
              if (ytPlayer && ytPlayer.setVolume) {
                ytPlayer.setVolume(this.value * 100);
              }
            };

            addToRecent({ title: vTitle, type: 'yt', vId: vId, channel: channelName });
        }

// ── SHOW SEARCH RESULTS LOGIC ──
function showSearchResults() {
    // Hide YT player / overlay
    document.getElementById('center').classList.remove('playback-layout');
    document.getElementById('yt-player-container').style.display = 'none';
    document.getElementById('yt-player-overlay').style.display = 'none';
    document.getElementById('back-to-results').style.display = 'none';
    
    // Show results vertical again
    const resultsBox = document.getElementById('search-results-container');
    resultsBox.classList.remove('more-results-mode');
    resultsBox.style.display = 'flex';
    
    // Update title back to original
    const resTitle = document.getElementById('search-res-title');
    if (resTitle) resTitle.textContent = "Recommended Devotional Videos";

    // Stop and remove video completely
    const playerDiv = document.getElementById('yt-player-div');
    if (playerDiv) {
        playerDiv.innerHTML = "";
    }
    if (ytPlayer && typeof ytPlayer.stopVideo === 'function') ytPlayer.stopVideo();
    
    // Show results
    document.getElementById('search-results-container').style.display = 'flex';
    
    // Hide now playing stuff temporarily
    const npLabel = document.getElementById('now-playing-label');
    if(npLabel) npLabel.style.display = 'none';
    document.getElementById('now-title').style.display = 'none';
    document.getElementById('now-sub').style.display = 'none';
    const nowTags = document.querySelector('.now-tags');
    if(nowTags) nowTags.style.display = 'none';
    
    // reset bottom bar temporarily
    document.getElementById('bar-thumb').textContent = '▶';
    document.getElementById('bar-title').textContent = 'Making a selection...';
    document.getElementById('bar-cat').textContent = 'YouTube Search';
}

// ── MOBILE TOGGLE LOGIC ──
const mobMenuBtn = document.getElementById('mobile-menu-btn');
const mobAiBtn = document.getElementById('mobile-ai-btn');
const mobileOverlay = document.getElementById('mobile-overlay');
const mobSidebar = document.getElementById('sidebar');
const mobAiSidebar = document.getElementById('ai-sidebar');
const upNextBtn = document.getElementById('mobile-up-next-btn');

if(mobMenuBtn) {
    mobMenuBtn.onclick = () => {
        mobSidebar.classList.add('mobile-open');
        if(mobileOverlay) mobileOverlay.classList.add('active');
    };
}
if(mobAiBtn) {
    mobAiBtn.onclick = () => {
        mobAiSidebar.classList.add('mobile-open');
        if(mobileOverlay) mobileOverlay.classList.add('active');
    };
}
if(mobileOverlay) {
    mobileOverlay.onclick = () => {
        mobSidebar.classList.remove('mobile-open');
        mobAiSidebar.classList.remove('mobile-open');
        mobileOverlay.classList.remove('active');
        
        const resultsBox = document.getElementById('search-results-container');
        if(resultsBox && resultsBox.classList.contains('bottom-sheet')) {
            resultsBox.classList.remove('bottom-sheet');
            if(upNextBtn) upNextBtn.textContent = '⬆ Show Up Next';
        }
    };
}

if(upNextBtn) {
    upNextBtn.onclick = () => {
        const resultsBox = document.getElementById('search-results-container');
        if(resultsBox.classList.contains('bottom-sheet')) {
            resultsBox.classList.remove('bottom-sheet');
            upNextBtn.textContent = '⬆ Show Up Next';
            mobileOverlay.classList.remove('active');
        } else {
            resultsBox.classList.add('bottom-sheet');
            upNextBtn.textContent = '⬇ Hide Up Next';
            mobileOverlay.classList.add('active');
        }
    };
}
