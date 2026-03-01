// ===== IKIGAI Career Guidance App - Core Logic =====

(function () {
    'use strict';

    // ===== STATE =====
    const state = {
        answers: {},
        currentPillar: 0,
        email: '',
        emailModalShown: false,
        results: null
    };

    const pillarOrder = ['love', 'good', 'need', 'paid'];
    const totalQuestions = QUESTIONS.length;

    // ===== HELPERS =====
    const $ = (id) => document.getElementById(id);

    const screens = {
        intro: $('screen-intro'),
        survey: $('screen-survey'),
        results: $('screen-results')
    };

    function showScreen(name) {
        Object.values(screens).forEach(s => s.classList.remove('active'));
        screens[name].classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ===== INTRO =====
    $('btn-start').addEventListener('click', () => {
        showScreen('survey');
        renderPillarQuestions();
    });

    // ===== SURVEY ENGINE =====
    function getPillarQuestions(pillarKey) {
        return QUESTIONS.filter(q => q.pillar === pillarKey);
    }

    function getAnsweredCount() {
        return Object.keys(state.answers).length;
    }

    function getQuestionsBeforePillar(pillarIndex) {
        let count = 0;
        for (let i = 0; i < pillarIndex; i++) {
            count += getPillarQuestions(pillarOrder[i]).length;
        }
        return count;
    }

    function updateProgress() {
        const answered = getAnsweredCount();
        const pct = Math.round((answered / totalQuestions) * 100);
        $('progress-label').textContent = `Câu ${answered}/${totalQuestions}`;
        $('progress-percent').textContent = `${pct}%`;
        $('progress-fill').style.width = `${pct}%`;
    }

    function updatePillarTabs() {
        document.querySelectorAll('.axis-tab').forEach((tab, i) => {
            tab.classList.remove('active', 'completed');
            if (i === state.currentPillar) tab.classList.add('active');
            const pq = getPillarQuestions(pillarOrder[i]);
            if (pq.every(q => state.answers[q.id] !== undefined) && i !== state.currentPillar) {
                tab.classList.add('completed');
            }
        });
    }

    function renderPillarQuestions() {
        const container = $('questions-container');
        const pillarKey = pillarOrder[state.currentPillar];
        const pillar = PILLARS[pillarKey];
        const questions = pillar.questions;
        const offset = getQuestionsBeforePillar(state.currentPillar);

        let html = `<div style="margin-bottom:20px;">
      <h2 style="font-size:1.2rem; font-weight:700; margin-bottom:4px;">${pillar.icon} ${pillar.label}</h2>
      <p style="color:var(--text-muted); font-size:0.85rem;">${pillar.description} — ${questions.length} câu hỏi</p>
    </div>`;

        questions.forEach((q, idx) => {
            const globalNum = offset + idx + 1;
            const selected = state.answers[q.id];
            const weightBadge = q.weight > 1 ? `<span style="background:rgba(249,115,22,0.15);color:var(--accent-orange);font-size:0.7rem;font-weight:700;padding:2px 8px;border-radius:100px;margin-left:8px;">x${q.weight}</span>` : '';

            html += `
        <div class="question-card" id="qcard-${q.id}">
          <div class="question-number">CÂU ${globalNum} / ${totalQuestions} ${weightBadge}</div>
          <div class="question-text">${q.text}</div>
          <div class="rating-scale">
            ${[1, 2, 3, 4, 5].map(v => `
              <button class="rating-btn ${selected === v ? 'selected' : ''}" 
                      data-qid="${q.id}" data-value="${v}">${v}</button>
            `).join('')}
          </div>
          <div class="rating-labels"><span>Rất yếu</span><span>Xuất sắc</span></div>
        </div>`;
        });

        container.innerHTML = html;
        container.querySelectorAll('.rating-btn').forEach(btn => btn.addEventListener('click', handleRating));

        updatePillarTabs();
        updateProgress();
        updateNavButtons();

        container.style.animation = 'none';
        container.offsetHeight;
        container.style.animation = '';
    }

    function handleRating(e) {
        const btn = e.currentTarget;
        const qid = parseInt(btn.dataset.qid);
        const value = parseInt(btn.dataset.value);

        state.answers[qid] = value;

        const card = document.getElementById(`qcard-${qid}`);
        card.querySelectorAll('.rating-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        updateProgress();
        updateNavButtons();

        // 75% email popup trigger
        if (getAnsweredCount() >= 24 && !state.emailModalShown) {
            state.emailModalShown = true;
            setTimeout(() => $('email-modal').classList.add('active'), 600);
        }
    }

    function updateNavButtons() {
        const btnPrev = $('btn-prev');
        const btnNext = $('btn-next');

        btnPrev.style.display = state.currentPillar === 0 ? 'none' : 'flex';

        const pq = getPillarQuestions(pillarOrder[state.currentPillar]);
        const allAnswered = pq.every(q => state.answers[q.id] !== undefined);
        const isLast = state.currentPillar === pillarOrder.length - 1;

        btnNext.textContent = isLast ? 'Xem kết quả 🎯' : 'Tiếp theo →';
        btnNext.disabled = !allAnswered;
    }

    $('btn-next').addEventListener('click', () => {
        if (state.currentPillar < pillarOrder.length - 1) {
            state.currentPillar++;
            renderPillarQuestions();
        } else {
            calculateResults();
            showScreen('results');
            renderResults();
        }
    });

    $('btn-prev').addEventListener('click', () => {
        if (state.currentPillar > 0) {
            state.currentPillar--;
            renderPillarQuestions();
        }
    });

    document.querySelectorAll('.axis-tab').forEach((tab, i) => {
        tab.addEventListener('click', () => {
            state.currentPillar = i;
            renderPillarQuestions();
        });
    });

    // ===== EMAIL MODAL =====
    $('btn-submit-email').addEventListener('click', () => {
        const email = $('email-input').value.trim();
        if (email && email.includes('@')) {
            state.email = email;
            $('email-modal').classList.remove('active');
        } else {
            $('email-input').style.borderColor = 'var(--accent-red)';
            $('email-input').placeholder = 'Vui lòng nhập email hợp lệ';
        }
    });
    $('btn-skip-email').addEventListener('click', () => $('email-modal').classList.remove('active'));
    $('email-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') $('btn-submit-email').click(); });

    // ===== SCORING ENGINE =====
    function calculateResults() {
        const scores = {};

        pillarOrder.forEach(key => {
            const questions = getPillarQuestions(key);
            let wSum = 0, wMax = 0;
            questions.forEach(q => {
                wSum += (state.answers[q.id] || 1) * q.weight;
                wMax += 5 * q.weight;
            });
            scores[key] = Math.round((wSum / wMax) * 100);
        });

        // Ikigai zone analysis
        const zone = analyzeIkigaiZone(scores);

        // Career matching
        const matchedCareers = matchCareers(state.answers, QUESTIONS);
        const matchedMentors = matchMentors(matchedCareers);

        state.results = { scores, zone, matchedCareers, matchedMentors };
    }

    function analyzeIkigaiZone(scores) {
        const avg = (scores.love + scores.good + scores.need + scores.paid) / 4;
        const all = Object.values(scores);
        const min = Math.min(...all);
        const max = Math.max(...all);
        const spread = max - min;

        if (avg >= 70 && spread <= 20) {
            return { name: "IKIGAI Zone 🎯", desc: "Bạn đang ở rất gần vùng IKIGAI! Cả 4 trụ cột đều cân bằng và mạnh. Bạn có nền tảng vững chắc để phát triển sự nghiệp đúng với đam mê, năng lực, sứ mệnh và giá trị thị trường.", color: "var(--accent-green)" };
        }
        if (scores.love >= 70 && scores.good >= 70 && scores.need < 50) {
            return { name: "Passion Zone ❤️⚡", desc: "Bạn có đam mê mãnh liệt và năng lực tốt, nhưng chưa kết nối rõ với nhu cầu thị trường. Hãy tìm cách ứng dụng sở trường của bạn để giải quyết vấn đề thực tế.", color: "var(--color-love)" };
        }
        if (scores.good >= 70 && scores.paid >= 70 && scores.love < 50) {
            return { name: "Profession Zone ⚡💰", desc: "Bạn có kỹ năng thị trường cần và đang kiếm tiền tốt, nhưng có thể thiếu đam mê. Hãy tìm cách kết nối công việc hiện tại với passion để tránh burn-out.", color: "var(--color-good)" };
        }
        if (scores.love >= 70 && scores.need >= 70 && scores.paid < 50) {
            return { name: "Mission Zone ❤️🌍", desc: "Bạn có sứ mệnh và đam mê rõ ràng, nhưng chưa monetize hiệu quả. Hãy tìm mô hình kinh doanh phù hợp để biến passion thành thu nhập bền vững.", color: "var(--color-need)" };
        }
        if (scores.need >= 70 && scores.paid >= 70 && scores.good < 50) {
            return { name: "Vocation Zone 🌍💰", desc: "Thị trường cần điều bạn muốn làm và sẵn sàng trả tiền, nhưng bạn cần nâng cấp kỹ năng. Đầu tư mạnh vào upskill để nắm bắt cơ hội.", color: "var(--color-paid)" };
        }
        return { name: "Exploration Zone 🔍", desc: "Bạn đang trong giai đoạn khám phá. Chưa có trụ cột nào vượt trội. Đây là cơ hội tuyệt vời để thử nghiệm nhiều hướng và tìm ra điều phù hợp nhất.", color: "var(--accent-cyan)" };
    }

    // ===== RENDER RESULTS =====
    function renderResults() {
        const { scores, zone, matchedCareers, matchedMentors } = state.results;

        // Animate scores
        animateCounter('score-love', scores.love);
        animateCounter('score-good', scores.good);
        animateCounter('score-need', scores.need);
        animateCounter('score-paid', scores.paid);

        // Ikigai zone
        $('ikigai-zone-text').innerHTML = `
      <strong style="color:${zone.color}; font-size:1.1rem;">${zone.name}</strong><br><br>
      ${zone.desc}
    `;

        // Radar chart
        renderRadarChart(scores);

        // Career board — top 8
        renderCareerBoard(matchedCareers.slice(0, 8));

        // Top career detail
        renderTopCareer(matchedCareers[0]);

        // Mentors
        renderMentorBoard(matchedMentors.slice(0, 4));

        // JSON
        renderJSON();

        // Save
        saveToStorage();
    }

    function animateCounter(elementId, target) {
        const el = $(elementId);
        let current = 0;
        const step = Math.max(1, Math.floor(target / 40));
        const interval = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(interval); }
            el.textContent = current;
        }, 30);
    }

    // ===== RADAR CHART =====
    function renderRadarChart(scores) {
        const ctx = $('radar-chart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['❤️ Đam mê', '⚡ Năng lực', '🌍 Sứ mệnh', '💰 Thị trường'],
                datasets: [{
                    label: 'Điểm của bạn',
                    data: [scores.love, scores.good, scores.need, scores.paid],
                    backgroundColor: 'rgba(0, 212, 255, 0.15)',
                    borderColor: 'rgba(0, 212, 255, 0.8)',
                    borderWidth: 2,
                    pointBackgroundColor: ['#ff6b6b', '#fbbf24', '#22c55e', '#7c3aed'],
                    pointBorderColor: '#fff',
                    pointBorderWidth: 1,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { stepSize: 20, color: 'rgba(255,255,255,0.3)', backdropColor: 'transparent', font: { size: 10 } },
                        grid: { color: 'rgba(255,255,255,0.06)' },
                        angleLines: { color: 'rgba(255,255,255,0.06)' },
                        pointLabels: { color: 'rgba(255,255,255,0.7)', font: { size: 12, weight: '600' } }
                    }
                },
                plugins: {
                    legend: { labels: { color: 'rgba(255,255,255,0.5)', font: { size: 11 }, padding: 16 } }
                },
                animation: { duration: 1500, easing: 'easeOutQuart' }
            }
        });
    }

    // ===== CAREER BOARD =====
    function renderCareerBoard(careers) {
        const container = $('career-board');
        container.innerHTML = careers.map((career, i) => {
            const matchClass = career.matchScore >= 70 ? 'high' : career.matchScore >= 50 ? 'medium' : 'low';
            const topClass = i === 0 ? 'top-match' : '';

            return `
        <div class="career-card ${topClass}" data-career-id="${career.id}" onclick="this.classList.toggle('expanded')">
          <div class="career-card-header">
            <span class="career-card-icon">${career.icon}</span>
            <div class="career-card-info">
              <div class="career-card-name">${i === 0 ? '🏆 ' : ''}${career.name}</div>
              <div class="career-card-category">${career.category}</div>
            </div>
            <div class="career-card-match ${matchClass}">${career.matchScore}%</div>
          </div>
          <div class="career-card-details">
            <div class="career-card-desc">${career.description}</div>
            <div class="career-card-meta">
              <span class="career-meta-item">💰 ${career.salary_range}</span>
              <span class="career-meta-item">${career.growth}</span>
            </div>
            <div class="career-card-skills">
              ${career.skills.map(s => `<span class="career-skill-tag">${s}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
        }).join('');
    }

    function renderTopCareer(career) {
        $('top-career-detail').innerHTML = `
      <div class="top-career-header">
        <span class="top-career-icon">${career.icon}</span>
        <div>
          <div class="top-career-name">${career.name}</div>
          <div class="top-career-cat">${career.category} · Match ${career.matchScore}%</div>
        </div>
      </div>
      <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:12px;">${career.description}</p>
      <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:12px;">
        <span style="background:rgba(34,197,94,0.1); color:var(--accent-green); padding:6px 14px; border-radius:100px; font-size:0.8rem; font-weight:600;">💰 ${career.salary_range}</span>
        <span style="background:rgba(0,212,255,0.1); color:var(--accent-cyan); padding:6px 14px; border-radius:100px; font-size:0.8rem; font-weight:600;">${career.growth}</span>
      </div>
      <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:8px; font-weight:600;">Kỹ năng cần có:</div>
      <div class="career-card-skills">
        ${career.skills.map(s => `<span class="career-skill-tag">${s}</span>`).join('')}
      </div>
    `;
    }

    // ===== MENTOR BOARD =====
    function renderMentorBoard(mentors) {
        const container = $('mentor-board');
        if (mentors.length === 0) {
            container.innerHTML = '<p style="color:var(--text-muted); text-align:center; padding:20px;">Chưa có mentor phù hợp. Hãy liên hệ để được tư vấn thêm.</p>';
            return;
        }

        container.innerHTML = mentors.map(mentor => `
      <div class="mentor-card">
        <div class="mentor-card-header">
          <div class="mentor-avatar">${mentor.avatar}</div>
          <div class="mentor-info">
            <div class="mentor-name">${mentor.name}</div>
            <div class="mentor-title">${mentor.title}</div>
          </div>
        </div>
        <div class="mentor-bio">${mentor.bio}</div>
        <div class="mentor-stats">
          <span class="mentor-stat">⭐ ${mentor.rating}</span>
          <span class="mentor-stat">💬 ${mentor.sessions} sessions</span>
          <span class="mentor-stat">💰 ${mentor.price}</span>
        </div>
        <div class="mentor-expertise">
          ${mentor.expertise.map(e => `<span class="mentor-tag">${e}</span>`).join('')}
        </div>
        <button class="mentor-cta" onclick="alert('🧭 Đặt lịch coaching với ${mentor.name}...\\n\\nĐây là demo. Trong production, tích hợp booking system tại đây.')">
          🧭 Đặt lịch Coaching 1:1
        </button>
      </div>
    `).join('');
    }

    // ===== JSON OUTPUT =====
    function renderJSON() {
        const { scores, zone, matchedCareers } = state.results;
        const jsonData = {
            timestamp: new Date().toISOString(),
            email: state.email || 'not_provided',
            ikigai_scores: scores,
            ikigai_zone: zone.name,
            top_careers: matchedCareers.slice(0, 5).map(c => ({
                name: c.name,
                category: c.category,
                match_score: c.matchScore
            })),
            answers_raw: state.answers
        };
        $('json-content').textContent = JSON.stringify(jsonData, null, 2);
    }

    $('json-toggle').addEventListener('click', () => {
        $('json-output').classList.toggle('hidden');
    });

    // ===== LOCAL STORAGE =====
    function saveToStorage() {
        const { scores, zone, matchedCareers } = state.results;
        const record = {
            email: state.email || 'not_provided',
            scores,
            zone: zone.name,
            top_career: matchedCareers[0]?.name || 'N/A',
            timestamp: new Date().toISOString()
        };
        const records = JSON.parse(localStorage.getItem('ikigai_records') || '[]');
        records.push(record);
        localStorage.setItem('ikigai_records', JSON.stringify(records));
    }

    // ===== CTA HANDLERS =====
    $('btn-buy-course').addEventListener('click', () => {
        alert('🎓 Chuyển hướng đến trang đăng ký Khoá Học Định Hướng Nghề Nghiệp (1.990k)...\n\nĐây là demo. Tích hợp payment gateway khi production.');
    });

    $('btn-book-mentor').addEventListener('click', () => {
        alert('🧭 Chuyển hướng đến trang đặt lịch Coaching...\n\nĐây là demo.');
    });

    $('btn-share').addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'IKIGAI - Kết quả hướng nghiệp',
                text: `Tôi vừa khám phá Ikigai Zone của mình! Top career: ${state.results.matchedCareers[0]?.name}. Thử ngay!`,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('📋 Link đã được copy vào clipboard!');
            });
        }
    });

    $('btn-save-email').addEventListener('click', () => {
        const email = $('result-email').value.trim();
        if (email && email.includes('@')) {
            state.email = email;
            saveToStorage();
            alert('✅ Email đã được lưu! Bạn sẽ nhận báo cáo Ikigai chi tiết trong 24h.');
        } else {
            alert('Vui lòng nhập email hợp lệ.');
        }
    });

})();
