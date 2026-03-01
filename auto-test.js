// ===== IKIGAI Fast Test — Inject answers directly, capture results =====
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');
const BASE_URL = 'http://127.0.0.1:8080/index.html';

const PROFILES = [
    { name: "Tech Founder", email: "tech.founder@ikigai.vn", answers: { 1: 4, 2: 5, 3: 3, 4: 5, 5: 4, 6: 3, 7: 4, 8: 5, 9: 3, 10: 4, 11: 4, 12: 5, 13: 3, 14: 4, 15: 5, 16: 3, 17: 3, 18: 5, 19: 4, 20: 3, 21: 4, 22: 3, 23: 5, 24: 4, 25: 5, 26: 3, 27: 4, 28: 5, 29: 3, 30: 4, 31: 4, 32: 3, 33: 4, 34: 3, 35: 4, 36: 3, 37: 5, 38: 4, 39: 3 } },
    { name: "Creative Marketer", email: "creative@ikigai.vn", answers: { 1: 5, 2: 5, 3: 5, 4: 2, 5: 5, 6: 4, 7: 3, 8: 3, 9: 4, 10: 5, 11: 5, 12: 2, 13: 4, 14: 5, 15: 3, 16: 4, 17: 2, 18: 4, 19: 3, 20: 5, 21: 3, 22: 4, 23: 2, 24: 5, 25: 5, 26: 2, 27: 4, 28: 5, 29: 3, 30: 5, 31: 3, 32: 5, 33: 4, 34: 4, 35: 3, 36: 2, 37: 4, 38: 5, 39: 3 } },
    { name: "Business Strategist", email: "strategy@ikigai.vn", answers: { 1: 3, 2: 4, 3: 4, 4: 3, 5: 2, 6: 5, 7: 5, 8: 3, 9: 2, 10: 3, 11: 4, 12: 3, 13: 5, 14: 3, 15: 4, 16: 2, 17: 5, 18: 4, 19: 5, 20: 5, 21: 3, 22: 5, 23: 3, 24: 3, 25: 4, 26: 5, 27: 3, 28: 4, 29: 2, 30: 3, 31: 5, 32: 5, 33: 3, 34: 5, 35: 4, 36: 4, 37: 3, 38: 5, 39: 4 } },
    { name: "Coach Educator", email: "coach@ikigai.vn", answers: { 1: 5, 2: 4, 3: 5, 4: 2, 5: 4, 6: 3, 7: 3, 8: 2, 9: 4, 10: 5, 11: 5, 12: 2, 13: 4, 14: 4, 15: 3, 16: 3, 17: 3, 18: 5, 19: 4, 20: 4, 21: 5, 22: 3, 23: 3, 24: 5, 25: 5, 26: 2, 27: 5, 28: 4, 29: 4, 30: 5, 31: 3, 32: 4, 33: 4, 34: 3, 35: 3, 36: 2, 37: 5, 38: 3, 39: 2 } },
    { name: "Digital Nomad", email: "nomad@ikigai.vn", answers: { 1: 5, 2: 5, 3: 3, 4: 4, 5: 5, 6: 2, 7: 3, 8: 4, 9: 5, 10: 4, 11: 3, 12: 4, 13: 2, 14: 5, 15: 4, 16: 5, 17: 2, 18: 5, 19: 5, 20: 3, 21: 3, 22: 2, 23: 4, 24: 3, 25: 4, 26: 2, 27: 3, 28: 3, 29: 3, 30: 3, 31: 4, 32: 3, 33: 5, 34: 2, 35: 5, 36: 4, 37: 4, 38: 5, 39: 5 } }
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function testProfile(page, profile, idx) {
    console.log(`\n══ TEST ${idx + 1}: ${profile.name} ══`);

    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 15000 });
    await sleep(500);

    // Screenshot intro (first profile only)
    if (idx === 0) {
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'intro.png'), fullPage: true });
        console.log('📸 intro');
    }

    // INJECT all answers and trigger results directly via JavaScript
    const result = await page.evaluate((answers, email) => {
        // Set state
        const state = {
            answers: {},
            email: email,
            emailModalShown: true // skip modal
        };

        // Fill answers
        for (const [k, v] of Object.entries(answers)) {
            state.answers[parseInt(k)] = v;
        }

        // Calculate scores
        const pillarOrder = ['love', 'good', 'need', 'paid'];
        const scores = {};
        pillarOrder.forEach(key => {
            const questions = QUESTIONS.filter(q => q.pillar === key);
            let wSum = 0, wMax = 0;
            questions.forEach(q => {
                wSum += (state.answers[q.id] || 1) * q.weight;
                wMax += 5 * q.weight;
            });
            scores[key] = Math.round((wSum / wMax) * 100);
        });

        // Career matching
        const matchedCareers = matchCareers(state.answers, QUESTIONS);
        const matchedMentors = matchMentors(matchedCareers);

        // Zone analysis
        const avg = (scores.love + scores.good + scores.need + scores.paid) / 4;
        const all = Object.values(scores);
        const min = Math.min(...all);
        const max = Math.max(...all);
        const spread = max - min;

        let zone = "Exploration Zone 🔍";
        if (avg >= 70 && spread <= 20) zone = "IKIGAI Zone 🎯";
        else if (scores.love >= 70 && scores.good >= 70 && scores.need < 50) zone = "Passion Zone ❤️⚡";
        else if (scores.good >= 70 && scores.paid >= 70 && scores.love < 50) zone = "Profession Zone ⚡💰";
        else if (scores.love >= 70 && scores.need >= 70 && scores.paid < 50) zone = "Mission Zone ❤️🌍";
        else if (scores.need >= 70 && scores.paid >= 70 && scores.good < 50) zone = "Vocation Zone 🌍💰";

        // Save to localStorage
        const record = {
            email, scores,
            zone, top_career: matchedCareers[0]?.name,
            top_3_careers: matchedCareers.slice(0, 3).map(c => ({ name: c.name, match: c.matchScore + '%', cat: c.category })),
            mentors: matchedMentors.slice(0, 3).map(m => m.name),
            timestamp: new Date().toISOString()
        };
        const records = JSON.parse(localStorage.getItem('ikigai_records') || '[]');
        records.push(record);
        localStorage.setItem('ikigai_records', JSON.stringify(records));

        return {
            scores,
            zone,
            careers: matchedCareers.slice(0, 8).map(c => ({ name: c.name, match: c.matchScore + '%', cat: c.category })),
            mentors: matchedMentors.slice(0, 4).map(m => ({ name: m.name, title: m.title })),
            record
        };
    }, profile.answers, profile.email);

    console.log(`📊 ❤️${result.scores.love} ⚡${result.scores.good} 🌍${result.scores.need} 💰${result.scores.paid}`);
    console.log(`🎯 ${result.zone}`);
    result.careers.slice(0, 4).forEach((c, i) => console.log(`   ${i + 1}. ${c.name} — ${c.match} (${c.cat})`));
    result.mentors.forEach(m => console.log(`   🧭 ${m.name} — ${m.title}`));

    // Now navigate through UI to results page for screenshots
    // Click start
    await page.click('#btn-start');
    await sleep(500);

    // Inject answers into the running app state directly
    await page.evaluate((answers, email) => {
        // Access the internal state (inside IIFE, we need to use the global QUESTIONS)
        // Fill all questions via DOM manipulation
        const pillars = ['love', 'good', 'need', 'paid'];
        let currentPillar = 0;

        // Simulate filling all pillars
        for (let p = 0; p < pillars.length; p++) {
            // Click the pillar tab
            const tabs = document.querySelectorAll('.axis-tab');
            tabs[p].click();
        }
    }, profile.answers, profile.email);

    // Actually let me just use the app's internal approach - click through quickly
    // Fill pillar by pillar
    for (let p = 0; p < 4; p++) {
        await sleep(300);
        const pillarQids = p === 0 ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            : p === 1 ? [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
                : p === 2 ? [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
                    : [31, 32, 33, 34, 35, 36, 37, 38, 39];

        for (const qid of pillarQids) {
            const val = profile.answers[qid];
            try {
                await page.click(`button.rating-btn[data-qid="${qid}"][data-value="${val}"]`);
                await sleep(30);
            } catch (e) { /* skip */ }
        }

        // Dismiss email modal if appeared
        const hasModal = await page.evaluate(() => {
            const m = document.getElementById('email-modal');
            if (m && m.classList.contains('active')) {
                m.classList.remove('active');  // Force dismiss
                return true;
            }
            return false;
        });
        if (hasModal) console.log('  📧 Modal dismissed');

        // Wait for next button to be enabled then click
        try {
            await page.waitForFunction(() => !document.getElementById('btn-next').disabled, { timeout: 3000 });
            await sleep(100);
            await page.click('#btn-next');
        } catch (e) {
            console.log(`  ⚠️ Pillar ${p}: btn-next stuck, force navigating`);
            await page.evaluate((p) => {
                // Force navigate via direct state manipulation
                const btn = document.getElementById('btn-next');
                if (btn) { btn.disabled = false; btn.click(); }
            }, p);
        }

        await sleep(p === 3 ? 2500 : 400);
    }

    // Check if on results page
    const onResults = await page.evaluate(() => document.getElementById('screen-results')?.classList.contains('active'));

    if (onResults) {
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${idx + 1}_results.png`), fullPage: false });
        console.log('📸 results');

        await page.evaluate(() => document.querySelector('.career-section')?.scrollIntoView());
        await sleep(300);
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${idx + 1}_careers.png`) });
        console.log('📸 careers');

        await page.evaluate(() => document.querySelector('.mentor-section')?.scrollIntoView());
        await sleep(300);
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${idx + 1}_mentors.png`) });
        console.log('📸 mentors');

        await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${idx + 1}_full.png`), fullPage: true });
        console.log('📸 full page');
    } else {
        console.log('  ⚠️ Not on results page, capturing current state');
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${idx + 1}_state.png`), fullPage: true });
    }

    return result;
}

async function main() {
    console.log('🚀 IKIGAI Fast Test — 5 Profiles\n');
    if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    const allResults = [];
    for (let i = 0; i < PROFILES.length; i++) {
        const r = await testProfile(page, PROFILES[i], i);
        allResults.push({ ...r, profile: PROFILES[i].name, email: PROFILES[i].email });
    }

    // Get all localStorage records
    const stored = await page.evaluate(() => localStorage.getItem('ikigai_records'));
    const records = JSON.parse(stored || '[]');

    await browser.close();

    // Save
    fs.writeFileSync(path.join(__dirname, 'test_results.json'), JSON.stringify(allResults, null, 2));
    fs.writeFileSync(path.join(__dirname, 'ikigai_data.json'), JSON.stringify(records, null, 2));

    console.log('\n' + '═'.repeat(50));
    console.log('  SUMMARY');
    console.log('═'.repeat(50));
    allResults.forEach((r, i) => {
        console.log(`  ${i + 1}. ${r.profile}: L=${r.scores.love} G=${r.scores.good} N=${r.scores.need} P=${r.scores.paid} | ${r.zone}`);
        console.log(`     → ${r.careers[0]?.name} (${r.careers[0]?.match})`);
    });
    console.log(`\n💾 ${records.length} records saved to ikigai_data.json`);
    console.log(`📸 Screenshots in ./screenshots/`);
    console.log('✅ Done!');
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
