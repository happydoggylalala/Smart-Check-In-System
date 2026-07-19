import { t } from './i18n.js';

let initialized = false;
let initializedKey = '';

function ensureInit(publicKey) {
  if (!window.emailjs) throw new Error(t('email.errSdkNotLoaded'));
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
      group_seat: person.group.groupIndex ? t('email.groupSeatLabel', { group: person.group.groupIndex, seat: person.group.seatIndex }) : '',
    });
    return { status: 'sent' };
  } catch (err) {
    return { status: 'failed', error: String(err?.text || err?.message || err) };
  }
}

export async function sendSurveyEmail(person, event) {
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
      handout_link: event.survey.link,
      group_seat: person.group.groupIndex ? t('email.groupSeatLabel', { group: person.group.groupIndex, seat: person.group.seatIndex }) : '',
    });
    return { status: 'sent' };
  } catch (err) {
    return { status: 'failed', error: String(err?.text || err?.message || err) };
  }
}

export async function sendTestEmail(event, toAddress) {
  const cfg = event.emailJs;
  if (!cfg.serviceId || !cfg.templateId || !cfg.publicKey) {
    return { ok: false, error: t('email.errMissingConfig') };
  }
  if (!toAddress) {
    return { ok: false, error: t('email.errMissingTestAddr') };
  }
  try {
    ensureInit(cfg.publicKey);
    await window.emailjs.send(cfg.serviceId, cfg.templateId, {
      to_email: toAddress,
      to_name: t('email.testRecipientName'),
      event_name: event.name || t('email.testEventNameFallback'),
      handout_link: cfg.handoutLink,
      group_seat: '',
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err?.text || err?.message || err) };
  }
}
