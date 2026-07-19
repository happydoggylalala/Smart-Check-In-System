import { getEventById, updateEvent } from './eventsStore.js';
import { getActiveEventId, onSessionChange } from './session.js';
import { sendSurveyEmail, sendTestEmail } from './email.js';
import { t } from './i18n.js';
import { nowIso, showToast } from './utils.js';

function renderContent() {
  const eventId = getActiveEventId();
  const event = getEventById(eventId);
  const content = document.getElementById('survey-content');
  const sentCount = event.roster.filter(p => p.surveyStatus.status === 'sent').length;
  const checkedInCount = event.roster.filter(p => p.checkin.checkedInAt).length;

  content.innerHTML = `
    <div class="panel">
      <label><span>${t('surveyPage.linkLabel')}</span><input id="survey-link" type="text" value="${event.survey.link || ''}"></label>
      <button id="survey-save-link" class="btn-secondary">${t('surveyPage.saveLinkBtn')}</button>
    </div>
    <div class="panel">
      <button id="survey-send" class="btn-primary btn-big">${t('surveyPage.sendBtn')}</button>
      <div class="survey-status-row">
        <span>${t('surveyPage.sentCount', { sent: sentCount, total: checkedInCount })}</span>
      </div>
    </div>
    <div class="panel">
      <h3>${t('surveyPage.emailSectionTitle')}</h3>
      <label><input type="checkbox" id="survey-email-enabled" ${event.emailJs.enabled ? 'checked' : ''}> ${t('surveyPage.emailEnable')}</label>
      <label>Service ID <input id="survey-email-service" type="text" value="${event.emailJs.serviceId || ''}"></label>
      <label>Template ID <input id="survey-email-template" type="text" value="${event.emailJs.templateId || ''}"></label>
      <label>Public Key <input id="survey-email-publickey" type="text" value="${event.emailJs.publicKey || ''}"></label>
      <div class="form-actions">
        <button id="survey-email-test" class="btn-secondary">${t('settings.emailTestBtn')}</button>
        <input id="survey-email-testaddr" type="email" placeholder="${t('settings.emailTestPlaceholder')}">
      </div>
    </div>
  `;

  document.getElementById('survey-save-link').addEventListener('click', () => {
    const link = document.getElementById('survey-link').value.trim();
    updateEvent(eventId, ev => {
      ev.survey.link = link;
      ev.emailJs.enabled = document.getElementById('survey-email-enabled').checked;
      ev.emailJs.serviceId = document.getElementById('survey-email-service').value.trim();
      ev.emailJs.templateId = document.getElementById('survey-email-template').value.trim();
      ev.emailJs.publicKey = document.getElementById('survey-email-publickey').value.trim();
    });
    showToast(t('settings.savedToast'), 'success');
    renderContent();
  });

  document.getElementById('survey-send').addEventListener('click', async () => {
    const currentEvent = getEventById(eventId);
    if (!currentEvent.survey.link) {
      showToast(t('surveyPage.needLinkFirst'), 'error');
      return;
    }
    const targets = currentEvent.roster.filter(p => p.checkin.checkedInAt && p.surveyStatus.status !== 'sent');
    for (const p of targets) {
      const result = currentEvent.emailJs.enabled ? await sendSurveyEmail(p, currentEvent) : { status: 'sent' };
      updateEvent(eventId, ev => {
        const person = ev.roster.find(x => x.id === p.id);
        person.surveyStatus.status = result.status === 'sent' ? 'sent' : 'not_sent';
        person.surveyStatus.sentAt = result.status === 'sent' ? nowIso() : null;
      });
    }
    updateEvent(eventId, ev => { ev.survey.sentAt = nowIso(); });
    showToast(t('surveyPage.sentToast'), 'success');
    renderContent();
  });

  document.getElementById('survey-email-test').addEventListener('click', async () => {
    const addr = document.getElementById('survey-email-testaddr').value.trim();
    const draftEvent = {
      ...event,
      emailJs: {
        serviceId: document.getElementById('survey-email-service').value.trim(),
        templateId: document.getElementById('survey-email-template').value.trim(),
        publicKey: document.getElementById('survey-email-publickey').value.trim(),
        handoutLink: event.survey.link,
      },
    };
    const result = await sendTestEmail(draftEvent, addr);
    if (result.ok) showToast(t('settings.testMailSent'), 'success');
    else showToast(t('settings.testMailFail', { msg: result.error }), 'error');
  });
}

function render() {
  const empty = document.getElementById('survey-empty');
  const content = document.getElementById('survey-content');
  const event = getEventById(getActiveEventId());

  if (!event) {
    empty.classList.remove('hidden');
    empty.querySelector('p').textContent = t('eventPicker.selectPlaceholder');
    content.classList.add('hidden');
    return;
  }
  if (!event.features.survey) {
    empty.classList.remove('hidden');
    empty.querySelector('p').textContent = t('surveyPage.notEnabled');
    content.classList.add('hidden');
    return;
  }

  empty.classList.add('hidden');
  content.classList.remove('hidden');
  renderContent();
}

export function initSurveyScreen() {
  onSessionChange(render);
  render();
}

export { render as refreshSurveyScreen };
