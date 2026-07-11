let initialized = false;
let initializedKey = '';

function ensureInit(publicKey) {
  if (!window.emailjs) throw new Error('EmailJS SDK 尚未載入');
  if (initialized && initializedKey === publicKey) return;
  window.emailjs.init({ publicKey });
  initialized = true;
  initializedKey = publicKey;
}

export async function sendHandoutEmail(person, event) {
  const cfg = event.emailJs;
  if (!cfg.enabled || !cfg.serviceId || !cfg.templateId || !cfg.publicKey) {
    return { status: 'skipped_not_configured' };
  }
  if (!person.email) {
    return { status: 'skipped_no_email' };
  }
  try {
    ensureInit(cfg.publicKey);
    await window.emailjs.send(cfg.serviceId, cfg.templateId, {
      to_email: person.email,
      to_name: person.name,
      event_name: event.name,
      handout_link: cfg.handoutLink,
      group_seat: person.group.groupIndex ? `第${person.group.groupIndex}組 第${person.group.seatIndex}號` : '',
    });
    return { status: 'sent' };
  } catch (err) {
    return { status: 'failed', error: String(err?.text || err?.message || err) };
  }
}

export async function sendTestEmail(event, toAddress) {
  const cfg = event.emailJs;
  if (!cfg.serviceId || !cfg.templateId || !cfg.publicKey) {
    return { ok: false, error: '請先填寫 Service ID / Template ID / Public Key' };
  }
  if (!toAddress) {
    return { ok: false, error: '請輸入測試收件 Email' };
  }
  try {
    ensureInit(cfg.publicKey);
    await window.emailjs.send(cfg.serviceId, cfg.templateId, {
      to_email: toAddress,
      to_name: '測試收件人',
      event_name: event.name || '(測試活動)',
      handout_link: cfg.handoutLink,
      group_seat: '',
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err?.text || err?.message || err) };
  }
}
