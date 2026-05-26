const SUPABASE_URL = "VITE_SUPABASE_URL";
const SUPABASE_KEY = "VITE_SUPABASE_KEY";


// Floating label for select
const topicEl = document.getElementById('topic');
topicEl.addEventListener('change', () => {
    topicEl.classList.toggle('has-value', !!topicEl.value);
});

// Char counter
const msgEl = document.getElementById('msg');
const cc = document.getElementById('charCount');
msgEl.addEventListener('input', () => {
    const n = msgEl.value.length;
    cc.textContent = n + ' / 500';
    cc.classList.toggle('warn', n > 450);
});

// Validate
function validate() {
    let ok = true;
    const fn = document.getElementById('fName');
    const em = document.getElementById('email');
    const mg = document.getElementById('msg');

    [fn, em, mg].forEach(el => {
        el.classList.remove('invalid');
        el.nextElementSibling.classList.remove('invalid-label');
    });
    ['fNameErr', 'emailErr', 'msgErr'].forEach(id => {
        document.getElementById(id).classList.remove('show');
        document.getElementById(id).style.display = '';
    });

    if (!fn.value.trim()) {
        fn.classList.add('invalid');
        show('fNameErr'); ok = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value.trim())) {
        em.classList.add('invalid');
        show('emailErr'); ok = false;
    }
    if (mg.value.trim().length < 10) {
        mg.classList.add('invalid');
        show('msgErr'); ok = false;
    }
    return ok;
}

function show(id) {
    const el = document.getElementById(id);
    el.classList.add('show');
    el.style.display = 'block';
}

// Live clear
['fName', 'email', 'msg'].forEach(id => {
    document.getElementById(id).addEventListener('input', function () {
        this.classList.remove('invalid');
        const errEl = document.getElementById(id === 'msg' ? 'msgErr' : id + 'Err') ||
            document.getElementById(id.replace('N', 'NameErr'));
        if (errEl) { errEl.classList.remove('show'); errEl.style.display = ''; }
    });
});
document.getElementById('fName').addEventListener('input', function () {
    document.getElementById('fNameErr').classList.remove('show');
});

// Submit
document.getElementById('contactForm').addEventListener('submit', async e => {
    e.preventDefault();
    document.getElementById('errBanner').classList.remove('show');
    if (!validate()) return;

    const btn = document.getElementById('submitBtn');
    const txt = document.getElementById('btnText');
    const spin = document.getElementById('spinner');
    btn.disabled = true;
    txt.textContent = 'Sending…';
    spin.style.display = 'block';

    const data = {
        first_name: document.getElementById('fName').value.trim(),
        last_name: document.getElementById('lName').value.trim() || null,
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim() || null,
        topic: document.getElementById('topic').value || null,
        message: document.getElementById('msg').value.trim(),
    };

    try {
        if (!SUPABASE_URL.includes('YOUR_PROJECT')) {
            const res = await fetch(SUPABASE_URL + '/rest/v1/contact_messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_KEY,
                    'Authorization': 'Bearer ' + SUPABASE_KEY,
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error('Server error ' + res.status);
        }
        // Show success overlay
        document.getElementById('successOverlay').classList.add('show');
    } catch (err) {
        const b = document.getElementById('errBanner');
        b.textContent = '⚠ Could not submit: ' + err.message + '. Please try again.';
        b.classList.add('show');
    } finally {
        btn.disabled = false;
        txt.textContent = 'Send Message';
        spin.style.display = 'none';
    }
});

function resetForm() {
    document.getElementById('contactForm').reset();
    topicEl.classList.remove('has-value');
    cc.textContent = '0 / 500';
    document.getElementById('successOverlay').classList.remove('show');
}