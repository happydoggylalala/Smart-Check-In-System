// 裝飾性假資料，無後端。這個系統是純前端工具，沒有真正的登入/LMS/RFID串接，
// 這裡的內容只是為了讓介面看起來跟企業內部系統一樣完整，不代表任何真實連線。

export const MOCK_USER = {
  name: 'Winnie Chen',
  initials: 'WC',
};

export const MOCK_CONNECTION_STATUS = {
  online: true,
  integrations: ['LMS', 'Email', 'RFID'],
};

export const MOCK_LMS_COURSES = [
  { id: 'lms-001', name: '年度資訊安全訓練', department: '資安處', date: '2026-08-05', startTime: '13:30', endTime: '15:30', location: '台北總部 8F', capacity: 80, type: 'compliance' },
  { id: 'lms-002', name: '跨部門領導力工作坊', department: '學習發展部', date: '2026-08-12', startTime: '09:00', endTime: '17:00', location: '台北總部 12F 學習中心', capacity: 48, type: 'leadership' },
  { id: 'lms-003', name: '生成式 AI 產品策略', department: '產品部', date: '2026-08-18', startTime: '14:00', endTime: '16:00', location: '台北總部 6F 演講廳', capacity: 120, type: 'digital_skill' },
  { id: 'lms-004', name: '資料驅動決策入門', department: '數位轉型辦公室', date: '2026-08-22', startTime: '10:00', endTime: '12:00', location: '線上直播', capacity: 200, type: 'digital_skill' },
  { id: 'lms-005', name: '個資法規遵循更新說明會', department: '法務部', date: '2026-09-02', startTime: '15:00', endTime: '16:30', location: '台北總部 8F', capacity: 60, type: 'compliance' },
];

export function getMockLmsCourse(id) {
  return MOCK_LMS_COURSES.find(c => c.id === id) || null;
}
