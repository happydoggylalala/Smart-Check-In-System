const STORAGE_KEY = 'smartCheckin.lang';
export const DEFAULT_LANG = 'zh-TW';
export const SUPPORTED_LANGS = ['zh-TW', 'en', 'zh-CN', 'ja'];
export const LANG_NAMES = { 'zh-TW': '繁體中文', en: 'English', 'zh-CN': '简体中文', ja: '日本語' };

const dict = {
  'app.title': { 'zh-TW': '智慧報到系統', en: 'Smart Check-in System', 'zh-CN': '智慧报到系统', ja: 'スマート受付システム' },

  'nav.checkin': { 'zh-TW': '報到', en: 'Check-in', 'zh-CN': '报到', ja: '受付' },
  'nav.dashboard': { 'zh-TW': '儀表板', en: 'Dashboard', 'zh-CN': '仪表板', ja: 'ダッシュボード' },
  'nav.grouping': { 'zh-TW': '分組座位', en: 'Grouping & Seats', 'zh-CN': '分组座位', ja: 'グループ座席' },
  'nav.lottery': { 'zh-TW': '抽獎', en: 'Lottery', 'zh-CN': '抽奖', ja: '抽選' },
  'nav.import': { 'zh-TW': '名單匯入', en: 'Import Roster', 'zh-CN': '名单导入', ja: '名簿インポート' },
  'nav.settings': { 'zh-TW': '設定', en: 'Settings', 'zh-CN': '设置', ja: '設定' },

  'checkin.heading': { 'zh-TW': '報到', en: 'Check-in', 'zh-CN': '报到', ja: '受付' },
  'checkin.searchPlaceholder': { 'zh-TW': '輸入姓名或工號搜尋...', en: 'Search by name or employee ID...', 'zh-CN': '输入姓名或工号搜索...', ja: '氏名または社員番号で検索...' },
  'checkin.walkinToggle': { 'zh-TW': '找不到？現場報到', en: "Can't find them? Walk-in check-in", 'zh-CN': '找不到？现场报到', ja: '見つからない場合はその場で受付' },

  'walkin.namePlaceholder': { 'zh-TW': '姓名 *', en: 'Name *', 'zh-CN': '姓名 *', ja: '氏名 *' },
  'walkin.employeeIdPlaceholder': { 'zh-TW': '工號（6碼數字，選填）', en: 'Employee ID (6 digits, optional)', 'zh-CN': '工号（6位数字，选填）', ja: '社員番号（6桁の数字、任意）' },
  'walkin.emailPlaceholder': { 'zh-TW': 'Email', en: 'Email', 'zh-CN': 'Email', ja: 'メールアドレス' },
  'walkin.submit': { 'zh-TW': '送出現場報到', en: 'Submit walk-in check-in', 'zh-CN': '提交现场报到', ja: 'その場で受付を送信' },
  'walkin.cancel': { 'zh-TW': '取消', en: 'Cancel', 'zh-CN': '取消', ja: 'キャンセル' },

  'dashboard.heading': { 'zh-TW': '儀表板', en: 'Dashboard', 'zh-CN': '仪表板', ja: 'ダッシュボード' },
  'dashboard.searchPlaceholder': { 'zh-TW': '搜尋姓名/工號/Email...', en: 'Search name / employee ID / Email...', 'zh-CN': '搜索姓名/工号/Email...', ja: '氏名・社員番号・メールで検索...' },
  'dashboard.filterAll': { 'zh-TW': '全部狀態', en: 'All statuses', 'zh-CN': '全部状态', ja: 'すべてのステータス' },
  'dashboard.exportCsv': { 'zh-TW': '匯出 CSV', en: 'Export CSV', 'zh-CN': '导出 CSV', ja: 'CSV を書き出す' },
  'dashboard.exportXlsx': { 'zh-TW': '匯出 Excel', en: 'Export Excel', 'zh-CN': '导出 Excel', ja: 'Excel を書き出す' },
  'dashboard.noRows': { 'zh-TW': '沒有符合條件的資料', en: 'No matching records', 'zh-CN': '没有符合条件的数据', ja: '該当するデータがありません' },
  'dashboard.earlybirdMark': { 'zh-TW': '早鳥', en: 'Early bird', 'zh-CN': '早鸟', ja: '早割' },
  'dashboard.waitlistMark': { 'zh-TW': '候補', en: 'Waitlist', 'zh-CN': '候补', ja: '補欠' },
  'dashboard.lotteryWonMark': { 'zh-TW': '🎉 中獎', en: '🎉 Won', 'zh-CN': '🎉 中奖', ja: '🎉 当選' },
  'dashboard.groupSeatCell': { 'zh-TW': '第{{group}}組 {{seat}}號', en: 'Group {{group}} Seat {{seat}}', 'zh-CN': '第{{group}}组 {{seat}}号', ja: '第{{group}}グループ {{seat}}番' },

  'th.status': { 'zh-TW': '狀態', en: 'Status', 'zh-CN': '状态', ja: 'ステータス' },
  'th.name': { 'zh-TW': '姓名', en: 'Name', 'zh-CN': '姓名', ja: '氏名' },
  'th.employeeId': { 'zh-TW': '工號', en: 'Employee ID', 'zh-CN': '工号', ja: '社員番号' },
  'th.email': { 'zh-TW': 'Email', en: 'Email', 'zh-CN': 'Email', ja: 'メール' },
  'th.earlybird': { 'zh-TW': '早鳥', en: 'Early bird', 'zh-CN': '早鸟', ja: '早割' },
  'th.waitlist': { 'zh-TW': '候補', en: 'Waitlist', 'zh-CN': '候补', ja: '補欠' },
  'th.groupseat': { 'zh-TW': '組別座位', en: 'Group / Seat', 'zh-CN': '组别座位', ja: 'グループ／座席' },
  'th.checkinTime': { 'zh-TW': '報到時間', en: 'Checked in at', 'zh-CN': '报到时间', ja: '受付時刻' },
  'th.checkoutTime': { 'zh-TW': '簽退', en: 'Checked out', 'zh-CN': '签退', ja: '退出' },
  'th.emailStatus': { 'zh-TW': 'Email狀態', en: 'Email status', 'zh-CN': 'Email状态', ja: 'メール状況' },
  'th.lottery': { 'zh-TW': '抽獎', en: 'Lottery', 'zh-CN': '抽奖', ja: '抽選' },

  'status.pending': { 'zh-TW': '尚未報到', en: 'Not checked in', 'zh-CN': '尚未报到', ja: '未受付' },
  'status.on_time': { 'zh-TW': '準時', en: 'On time', 'zh-CN': '准时', ja: '時間通り' },
  'status.late': { 'zh-TW': '遲到', en: 'Late', 'zh-CN': '迟到', ja: '遅刻' },
  'status.absent': { 'zh-TW': '未到', en: 'Absent', 'zh-CN': '未到', ja: '未着' },

  'grouping.heading': { 'zh-TW': '分組座位板', en: 'Grouping & Seat Board', 'zh-CN': '分组座位板', ja: 'グループ座席ボード' },
  'grouping.groupCard': { 'zh-TW': '第 {{idx}} 組（{{count}}/{{size}} 人）', en: 'Group {{idx}} ({{count}}/{{size}})', 'zh-CN': '第 {{idx}} 组（{{count}}/{{size}} 人）', ja: '第{{idx}}グループ（{{count}}/{{size}}人）' },
  'grouping.seatLine': { 'zh-TW': '第 {{seat}} 號 — {{name}}', en: 'Seat {{seat}} — {{name}}', 'zh-CN': '第 {{seat}} 号 — {{name}}', ja: '{{seat}}番 — {{name}}' },
  'grouping.noMembers': { 'zh-TW': '尚無成員', en: 'No members yet', 'zh-CN': '尚无成员', ja: 'メンバーなし' },

  'badge.earlybird': { 'zh-TW': '早鳥', en: 'Early bird', 'zh-CN': '早鸟', ja: '早割' },
  'badge.earlybirdBenefit': { 'zh-TW': '早鳥福利', en: 'Early bird reward', 'zh-CN': '早鸟福利', ja: '早割特典' },
  'badge.waitlist': { 'zh-TW': '現場候補', en: 'Walk-in waitlist', 'zh-CN': '现场候补', ja: '当日補欠' },
  'badge.overflow': { 'zh-TW': '超出原座位規劃', en: 'Exceeds planned seating', 'zh-CN': '超出原座位规划', ja: '予定座席数を超過' },

  'lottery.heading': { 'zh-TW': '現場抽獎', en: 'Live Lottery Draw', 'zh-CN': '现场抽奖', ja: 'その場抽選' },
  'lottery.poolLabel': { 'zh-TW': '目前可抽獎人數：{{count}} 人', en: 'People eligible for the draw: {{count}}', 'zh-CN': '目前可抽奖人数：{{count}} 人', ja: '現在の抽選対象人数：{{count}} 人' },
  'lottery.excludeWinners': { 'zh-TW': '排除已得獎者', en: 'Exclude previous winners', 'zh-CN': '排除已得奖者', ja: '当選者を除外' },
  'lottery.drawBtn': { 'zh-TW': '🎉 抽獎', en: '🎉 Draw', 'zh-CN': '🎉 抽奖', ja: '🎉 抽選する' },
  'lottery.resetBtn': { 'zh-TW': '重置得獎名單', en: 'Reset winners', 'zh-CN': '重置得奖名单', ja: '当選リストをリセット' },
  'lottery.historyHeading': { 'zh-TW': '得獎紀錄', en: 'Winner history', 'zh-CN': '得奖记录', ja: '当選履歴' },
  'lottery.noHistory': { 'zh-TW': '尚無得獎紀錄', en: 'No winners yet', 'zh-CN': '尚无得奖记录', ja: 'まだ当選者はいません' },
  'lottery.noPool': { 'zh-TW': '目前沒有可抽獎的人員', en: 'No one is eligible for the draw right now', 'zh-CN': '目前没有可抽奖的人员', ja: '現在抽選対象者がいません' },
  'lottery.congrats': { 'zh-TW': '🎉 恭喜 {{name}}！', en: '🎉 Congratulations {{name}}!', 'zh-CN': '🎉 恭喜 {{name}}！', ja: '🎉 おめでとうございます、{{name}}さん！' },
  'lottery.winnerSeat': { 'zh-TW': '第 {{group}} 組 第 {{seat}} 號', en: 'Group {{group}}, Seat {{seat}}', 'zh-CN': '第 {{group}} 组 第 {{seat}} 号', ja: '第{{group}}グループ {{seat}}番' },
  'lottery.confirmReset': { 'zh-TW': '確定要重置所有得獎名單嗎？此動作無法復原。', en: 'Reset all winners? This cannot be undone.', 'zh-CN': '确定要重置所有得奖名单吗？此操作无法复原。', ja: 'すべての当選記録をリセットしますか？元に戻せません。' },
  'lottery.resetDone': { 'zh-TW': '已重置得獎名單', en: 'Winners have been reset', 'zh-CN': '已重置得奖名单', ja: '当選記録をリセットしました' },

  'import.heading': { 'zh-TW': '名單匯入', en: 'Import Roster', 'zh-CN': '名单导入', ja: '名簿インポート' },
  'import.hint': { 'zh-TW': '支援 CSV / Excel，欄位建議包含：姓名、工號、Email、報名時間', en: 'Supports CSV / Excel. Recommended columns: Name, Employee ID, Email, Registration time', 'zh-CN': '支持 CSV / Excel，字段建议包含：姓名、工号、Email、报名时间', ja: 'CSV / Excel に対応。推奨列：氏名、社員番号、メール、登録日時' },
  'import.confirmBtn': { 'zh-TW': '確認匯入', en: 'Confirm import', 'zh-CN': '确认导入', ja: 'インポートを確定' },
  'import.fieldName': { 'zh-TW': '姓名', en: 'Name', 'zh-CN': '姓名', ja: '氏名' },
  'import.fieldEmployeeId': { 'zh-TW': '工號', en: 'Employee ID', 'zh-CN': '工号', ja: '社員番号' },
  'import.fieldEmail': { 'zh-TW': 'Email', en: 'Email', 'zh-CN': 'Email', ja: 'メール' },
  'import.fieldRegisteredAt': { 'zh-TW': '報名時間', en: 'Registration time', 'zh-CN': '报名时间', ja: '登録日時' },
  'import.noMap': { 'zh-TW': '(不對應)', en: '(unmapped)', 'zh-CN': '(不对应)', ja: '（マッピングなし）' },
  'import.mappingHeading': { 'zh-TW': '欄位對應', en: 'Column mapping', 'zh-CN': '字段对应', ja: '列のマッピング' },
  'import.previewCount': { 'zh-TW': '共 {{count}} 筆資料，僅預覽前 5 筆', en: '{{count}} rows total, showing first 5', 'zh-CN': '共 {{count}} 条数据，仅预览前 5 条', ja: '全{{count}}件中、先頭5件をプレビュー' },
  'import.noData': { 'zh-TW': '檔案沒有資料', en: 'The file has no data', 'zh-CN': '文件没有数据', ja: 'ファイルにデータがありません' },
  'import.parseFail': { 'zh-TW': '檔案解析失敗：{{msg}}', en: 'Failed to parse file: {{msg}}', 'zh-CN': '文件解析失败：{{msg}}', ja: 'ファイルの解析に失敗しました：{{msg}}' },
  'import.needName': { 'zh-TW': '請至少對應「姓名」欄位', en: 'Please map at least the "Name" column', 'zh-CN': '请至少对应"姓名"字段', ja: '少なくとも「氏名」列をマッピングしてください' },
  'import.successCount': { 'zh-TW': '成功匯入 {{count}} 筆名單', en: 'Successfully imported {{count}} records', 'zh-CN': '成功导入 {{count}} 条名单', ja: '{{count}}件のインポートに成功しました' },

  'settings.heading': { 'zh-TW': '活動設定', en: 'Event Settings', 'zh-CN': '活动设置', ja: 'イベント設定' },
  'settings.langLabel': { 'zh-TW': '語言', en: 'Language', 'zh-CN': '语言', ja: '言語' },
  'settings.eventInfo': { 'zh-TW': '活動資訊', en: 'Event Info', 'zh-CN': '活动信息', ja: 'イベント情報' },
  'settings.eventName': { 'zh-TW': '活動名稱', en: 'Event name', 'zh-CN': '活动名称', ja: 'イベント名' },
  'settings.startTime': { 'zh-TW': '開始時間', en: 'Start time', 'zh-CN': '开始时间', ja: '開始時刻' },
  'settings.endTime': { 'zh-TW': '結束時間', en: 'End time', 'zh-CN': '结束时间', ja: '終了時刻' },
  'settings.capacity': { 'zh-TW': '活動容量（現場候補用）', en: 'Capacity (for walk-in waitlist)', 'zh-CN': '活动容量（现场候补用）', ja: '定員（当日補欠の判定用）' },
  'settings.rules': { 'zh-TW': '報到規則（分鐘）', en: 'Check-in rules (minutes)', 'zh-CN': '报到规则（分钟）', ja: '受付ルール（分）' },
  'settings.lateThreshold': { 'zh-TW': '遲到門檻', en: 'Late threshold', 'zh-CN': '迟到门槛', ja: '遅刻しきい値' },
  'settings.absentThreshold': { 'zh-TW': '報到截止（超過視為未到並阻擋報到）', en: 'Check-in cutoff (beyond this, marked absent and blocked)', 'zh-CN': '报到截止（超过视为未到并阻挡报到）', ja: '受付締切（超過で未着となり受付不可）' },
  'settings.earlyLeaveWindow': { 'zh-TW': '早退判定窗口（結束前幾分鐘內簽退算早退）', en: 'Early-leave window (checkout within N minutes of end counts as early leave)', 'zh-CN': '早退判定窗口（结束前几分钟内签退算早退）', ja: '早退判定ウィンドウ（終了前N分以内の退出は早退）' },
  'settings.earlyBirdSection': { 'zh-TW': '早鳥福利', en: 'Early Bird Reward', 'zh-CN': '早鸟福利', ja: '早割特典' },
  'settings.earlyBirdCount': { 'zh-TW': '早鳥名額（依報名時間排序前 N 名，且須準時報到）', en: 'Early bird quota (earliest N registrants who also check in on time)', 'zh-CN': '早鸟名额（依报名时间排序前 N 名，且须准时报到）', ja: '早割枠（登録が早い上位N名かつ時間通りに受付した人）' },
  'settings.groupingSection': { 'zh-TW': '智慧分組', en: 'Smart Grouping', 'zh-CN': '智慧分组', ja: 'スマートグループ分け' },
  'settings.groupCount': { 'zh-TW': '組數', en: 'Number of groups', 'zh-CN': '组数', ja: 'グループ数' },
  'settings.groupSize': { 'zh-TW': '每組人數（規劃值，供超額提示用）', en: 'Planned people per group (used for overflow warning)', 'zh-CN': '每组人数（规划值，供超额提示用）', ja: '1グループの人数（予定値、超過警告用）' },
  'settings.emailSection': { 'zh-TW': 'EmailJS 講義寄送', en: 'EmailJS Handout Delivery', 'zh-CN': 'EmailJS 讲义寄送', ja: 'EmailJS 資料送付' },
  'settings.emailEnable': { 'zh-TW': '啟用報到後自動寄送講義 Email', en: 'Automatically email the handout after check-in', 'zh-CN': '启用报到后自动寄送讲义 Email', ja: '受付後に資料メールを自動送信する' },
  'settings.handoutLink': { 'zh-TW': '講義連結', en: 'Handout link', 'zh-CN': '讲义链接', ja: '資料リンク' },
  'settings.emailTestBtn': { 'zh-TW': '測試寄送給自己', en: 'Send a test email', 'zh-CN': '测试寄送给自己', ja: 'テストメールを送信' },
  'settings.emailTestPlaceholder': { 'zh-TW': '測試收件 Email', en: 'Test recipient email', 'zh-CN': '测试收件 Email', ja: 'テスト送信先メール' },
  'settings.saveBtn': { 'zh-TW': '儲存設定', en: 'Save settings', 'zh-CN': '保存设置', ja: '設定を保存' },
  'settings.savedHint': { 'zh-TW': '已儲存', en: 'Saved', 'zh-CN': '已保存', ja: '保存しました' },
  'settings.backupSection': { 'zh-TW': '資料備份', en: 'Data Backup', 'zh-CN': '数据备份', ja: 'データバックアップ' },
  'settings.backupExport': { 'zh-TW': '匯出備份 (JSON)', en: 'Export backup (JSON)', 'zh-CN': '导出备份 (JSON)', ja: 'バックアップを書き出す (JSON)' },
  'settings.demoSection': { 'zh-TW': '展示用示範資料', en: 'Demo Data for Presentations', 'zh-CN': '展示用示范数据', ja: 'デモ用サンプルデータ' },
  'settings.demoHint': { 'zh-TW': '一鍵載入涵蓋所有功能的範例資料（早鳥、準時/遲到/尚未報到、正常簽退/早退、現場候補、已分組配位、已有抽獎紀錄），方便展示給主管看。會覆蓋目前資料，且每次載入都會以「現在時間」重新產生，展示前可以重新點一次讓報到功能維持可操作。', en: 'Load sample data covering every feature (early birds, on-time/late/not-checked-in, normal/early checkout, walk-in waitlist, group seating, lottery history) with one click — handy for demos. This overwrites current data, and each load is regenerated relative to "now", so click it again right before presenting to keep live check-in working.', 'zh-CN': '一键载入涵盖所有功能的示例数据（早鸟、准时/迟到/尚未报到、正常签退/早退、现场候补、已分组配位、已有抽奖记录），方便展示给主管看。会覆盖当前数据，且每次载入都会以"现在时间"重新生成，展示前可以重新点一次让报到功能保持可操作。', ja: 'すべての機能を網羅したサンプルデータ（早割、時間通り／遅刻／未受付、通常退出／早退、当日補欠、グループ座席割当済み、抽選履歴あり）をワンクリックで読み込み、上司へのデモに便利です。現在のデータは上書きされ、読み込むたびに「現在時刻」基準で再生成されるので、デモ直前にもう一度クリックするとその場受付機能を有効な状態に保てます。' },
  'settings.demoBtn': { 'zh-TW': '載入示範資料', en: 'Load demo data', 'zh-CN': '载入示范数据', ja: 'デモデータを読み込む' },
  'settings.dangerSection': { 'zh-TW': '危險操作', en: 'Danger Zone', 'zh-CN': '危险操作', ja: '危険な操作' },
  'settings.clearAllBtn': { 'zh-TW': '清除所有資料', en: 'Clear all data', 'zh-CN': '清除所有数据', ja: 'すべてのデータを削除' },

  'settings.savedToast': { 'zh-TW': '設定已儲存', en: 'Settings saved', 'zh-CN': '设置已保存', ja: '設定を保存しました' },
  'settings.restoreDone': { 'zh-TW': '備份已還原', en: 'Backup restored', 'zh-CN': '备份已还原', ja: 'バックアップを復元しました' },
  'settings.restoreFail': { 'zh-TW': '還原失敗：{{msg}}', en: 'Restore failed: {{msg}}', 'zh-CN': '还原失败：{{msg}}', ja: '復元に失敗しました：{{msg}}' },
  'settings.confirmClearAll': { 'zh-TW': '確定要清除所有資料嗎？此動作無法復原！', en: 'Clear all data? This cannot be undone!', 'zh-CN': '确定要清除所有数据吗？此操作无法复原！', ja: 'すべてのデータを削除しますか？元に戻せません！' },
  'settings.clearedToast': { 'zh-TW': '已清除所有資料', en: 'All data cleared', 'zh-CN': '已清除所有数据', ja: 'すべてのデータを削除しました' },
  'settings.confirmLoadDemo': { 'zh-TW': '確定要載入示範資料嗎？這會覆蓋目前的所有資料！', en: 'Load demo data? This will overwrite all current data!', 'zh-CN': '确定要载入示范数据吗？这会覆盖当前的所有数据！', ja: 'デモデータを読み込みますか？現在のすべてのデータが上書きされます！' },
  'settings.demoLoadedToast': { 'zh-TW': '已載入示範資料', en: 'Demo data loaded', 'zh-CN': '已载入示范数据', ja: 'デモデータを読み込みました' },
  'settings.testMailSent': { 'zh-TW': '測試郵件已送出，請檢查信箱', en: 'Test email sent, please check the inbox', 'zh-CN': '测试邮件已送出，请检查邮箱', ja: 'テストメールを送信しました。受信箱をご確認ください' },
  'settings.testMailFail': { 'zh-TW': '寄送失敗：{{msg}}', en: 'Send failed: {{msg}}', 'zh-CN': '发送失败：{{msg}}', ja: '送信に失敗しました：{{msg}}' },

  'checkin.errNoStartTime': { 'zh-TW': '尚未設定活動開始時間，請先至「設定」頁配置活動資訊', en: 'Event start time is not set. Please configure it on the Settings page first', 'zh-CN': '尚未设置活动开始时间，请先至"设置"页配置活动信息', ja: 'イベント開始時刻が未設定です。先に「設定」ページで設定してください' },
  'checkin.errAlreadyCheckedIn': { 'zh-TW': '此人已報到過', en: 'This person has already checked in', 'zh-CN': '此人已报到过', ja: 'この方はすでに受付済みです' },
  'checkin.errTooLate': { 'zh-TW': '已超過報到時間（活動開始 {{min}} 分鐘後），無法報到，狀態將標記為未到', en: 'Past the check-in cutoff ({{min}} minutes after start) — check-in is blocked and this person will be marked absent', 'zh-CN': '已超过报到时间（活动开始 {{min}} 分钟后），无法报到，状态将标记为未到', ja: '受付締切（開始から{{min}}分後）を過ぎているため受付できません。ステータスは未着になります' },
  'checkin.errNotCheckedIn': { 'zh-TW': '尚未報到，無法簽退', en: 'Not checked in yet, cannot check out', 'zh-CN': '尚未报到，无法签退', ja: 'まだ受付していないため退出できません' },
  'checkin.errAlreadyCheckedOut': { 'zh-TW': '已經簽退過', en: 'Already checked out', 'zh-CN': '已经签退过', ja: 'すでに退出済みです' },
  'checkin.actionCheckin': { 'zh-TW': '報到', en: 'Check in', 'zh-CN': '报到', ja: '受付する' },
  'checkin.actionCheckout': { 'zh-TW': '簽退', en: 'Check out', 'zh-CN': '签退', ja: '退出する' },
  'checkin.doneCheckedOut': { 'zh-TW': '已完成簽退', en: 'Checked out', 'zh-CN': '已完成签退', ja: '退出済み' },
  'checkin.earlyLeaveTag': { 'zh-TW': '⚠ 早退', en: '⚠ Early leave', 'zh-CN': '⚠ 早退', ja: '⚠ 早退' },
  'checkin.emptyRosterHint': { 'zh-TW': '目前名單是空的，請先到「名單匯入」頁上傳名單，或使用下方「找不到？現場報到」登記。', en: 'The roster is empty. Please import a roster first, or use "Walk-in check-in" below.', 'zh-CN': '目前名单是空的，请先到"名单导入"页上传名单，或使用下方"找不到？现场报到"登记。', ja: '名簿が空です。先に名簿をインポートするか、下の「見つからない場合はその場で受付」をご利用ください。' },
  'checkin.noMatchHint': { 'zh-TW': '查無符合的人員，請確認姓名/工號是否正確，或使用下方「找不到？現場報到」登記。', en: 'No matching person found. Please check the name/employee ID, or use "Walk-in check-in" below.', 'zh-CN': '查无符合的人员，请确认姓名/工号是否正确，或使用下方"找不到？现场报到"登记。', ja: '該当する方が見つかりません。氏名／社員番号をご確認いただくか、下の「見つからない場合はその場で受付」をご利用ください。' },
  'checkin.confirmStatusLine': { 'zh-TW': '狀態：{{status}}　報到時間：{{time}}', en: 'Status: {{status}}   Checked in at: {{time}}', 'zh-CN': '状态：{{status}}　报到时间：{{time}}', ja: 'ステータス：{{status}}　受付時刻：{{time}}' },
  'checkin.confirmSeat': { 'zh-TW': '座位：第 {{group}} 組 第 {{seat}} 號', en: 'Seat: Group {{group}}, Seat {{seat}}', 'zh-CN': '座位：第 {{group}} 组 第 {{seat}} 号', ja: '座席：第{{group}}グループ {{seat}}番' },
  'checkin.emailLinePrefix': { 'zh-TW': '講義 Email', en: 'Handout email', 'zh-CN': '讲义 Email', ja: '資料メール' },
  'checkin.emailSending': { 'zh-TW': '寄送中...', en: 'Sending...', 'zh-CN': '寄送中...', ja: '送信中...' },
  'checkin.checkoutToast': { 'zh-TW': '{{name}} 已簽退{{earlyTag}}', en: '{{name}} checked out{{earlyTag}}', 'zh-CN': '{{name}} 已签退{{earlyTag}}', ja: '{{name}}さんが退出しました{{earlyTag}}' },
  'checkin.checkoutEarlyTag': { 'zh-TW': '（早退 ⚠）', en: ' (early leave ⚠)', 'zh-CN': '（早退 ⚠）', ja: '（早退 ⚠）' },
  'checkin.errNeedName': { 'zh-TW': '請輸入姓名', en: 'Please enter a name', 'zh-CN': '请输入姓名', ja: '氏名を入力してください' },
  'checkin.errEmployeeIdFormat': { 'zh-TW': '工號請輸入 6 位數字，或留空', en: 'Employee ID must be 6 digits, or leave it blank', 'zh-CN': '工号请输入 6 位数字，或留空', ja: '社員番号は6桁の数字を入力するか、空欄にしてください' },

  'checkin.emailStatus.sent': { 'zh-TW': '已寄出 ✓', en: 'Sent ✓', 'zh-CN': '已寄出 ✓', ja: '送信済み ✓' },
  'checkin.emailStatus.failed': { 'zh-TW': '寄送失敗', en: 'Send failed', 'zh-CN': '寄送失败', ja: '送信失敗' },
  'checkin.emailStatus.skipped_no_email': { 'zh-TW': '無 Email，略過', en: 'No email address, skipped', 'zh-CN': '无 Email，略过', ja: 'メールアドレスなし、スキップ' },
  'checkin.emailStatus.skipped_not_configured': { 'zh-TW': '未設定寄信服務，略過', en: 'Email service not configured, skipped', 'zh-CN': '未设置寄信服务，略过', ja: 'メール送信サービス未設定、スキップ' },

  'dashboard.emailStatus.not_sent': { 'zh-TW': '-', en: '-', 'zh-CN': '-', ja: '-' },
  'dashboard.emailStatus.sent': { 'zh-TW': '已寄出', en: 'Sent', 'zh-CN': '已寄出', ja: '送信済み' },
  'dashboard.emailStatus.failed': { 'zh-TW': '失敗', en: 'Failed', 'zh-CN': '失败', ja: '失敗' },
  'dashboard.emailStatus.skipped_no_email': { 'zh-TW': '無Email', en: 'No email', 'zh-CN': '无Email', ja: 'メールなし' },
  'dashboard.emailStatus.skipped_not_configured': { 'zh-TW': '未設定', en: 'Not configured', 'zh-CN': '未设置', ja: '未設定' },

  'dashboard.stat.total': { 'zh-TW': '總名單', en: 'Total roster', 'zh-CN': '总名单', ja: '名簿総数' },
  'dashboard.stat.checkedIn': { 'zh-TW': '已報到', en: 'Checked in', 'zh-CN': '已报到', ja: '受付済み' },
  'dashboard.stat.onTime': { 'zh-TW': '準時', en: 'On time', 'zh-CN': '准时', ja: '時間通り' },
  'dashboard.stat.late': { 'zh-TW': '遲到', en: 'Late', 'zh-CN': '迟到', ja: '遅刻' },
  'dashboard.stat.absent': { 'zh-TW': '未到', en: 'Absent', 'zh-CN': '未到', ja: '未着' },
  'dashboard.stat.earlyLeave': { 'zh-TW': '早退', en: 'Early leave', 'zh-CN': '早退', ja: '早退' },
  'dashboard.stat.waitlisted': { 'zh-TW': '現場候補', en: 'Walk-in waitlist', 'zh-CN': '现场候补', ja: '当日補欠' },
  'dashboard.stat.capacityUsage': { 'zh-TW': '容量使用率', en: 'Capacity used', 'zh-CN': '容量使用率', ja: '定員使用率' },

  'export.name': { 'zh-TW': '姓名', en: 'Name', 'zh-CN': '姓名', ja: '氏名' },
  'export.employeeId': { 'zh-TW': '工號', en: 'Employee ID', 'zh-CN': '工号', ja: '社員番号' },
  'export.email': { 'zh-TW': 'Email', en: 'Email', 'zh-CN': 'Email', ja: 'メール' },
  'export.status': { 'zh-TW': '狀態', en: 'Status', 'zh-CN': '状态', ja: 'ステータス' },
  'export.earlyLeave': { 'zh-TW': '早退', en: 'Early leave', 'zh-CN': '早退', ja: '早退' },
  'export.earlybird': { 'zh-TW': '早鳥', en: 'Early bird', 'zh-CN': '早鸟', ja: '早割' },
  'export.waitlist': { 'zh-TW': '現場候補', en: 'Walk-in waitlist', 'zh-CN': '现场候补', ja: '当日補欠' },
  'export.group': { 'zh-TW': '組別', en: 'Group', 'zh-CN': '组别', ja: 'グループ' },
  'export.seat': { 'zh-TW': '座位', en: 'Seat', 'zh-CN': '座位', ja: '座席' },
  'export.checkinTime': { 'zh-TW': '報到時間', en: 'Checked in at', 'zh-CN': '报到时间', ja: '受付時刻' },
  'export.checkoutTime': { 'zh-TW': '簽退時間', en: 'Checked out at', 'zh-CN': '签退时间', ja: '退出時刻' },
  'export.emailStatus': { 'zh-TW': 'Email寄送狀態', en: 'Email status', 'zh-CN': 'Email寄送状态', ja: 'メール送信状況' },
  'export.lotteryWon': { 'zh-TW': '抽獎中獎', en: 'Lottery winner', 'zh-CN': '抽奖中奖', ja: '抽選当選' },
  'export.yes': { 'zh-TW': '是', en: 'Yes', 'zh-CN': '是', ja: 'はい' },
  'export.filenamePrefix': { 'zh-TW': '報到結果', en: 'checkin-results', 'zh-CN': '报到结果', ja: '受付結果' },

  'waitlist.errCapacityFull': { 'zh-TW': '已達活動人數上限，無法報到', en: 'Event capacity reached, check-in is blocked', 'zh-CN': '已达活动人数上限，无法报到', ja: '定員に達しているため受付できません' },

  'email.errSdkNotLoaded': { 'zh-TW': 'EmailJS SDK 尚未載入', en: 'EmailJS SDK has not loaded', 'zh-CN': 'EmailJS SDK 尚未载入', ja: 'EmailJS SDK が読み込まれていません' },
  'email.errMissingConfig': { 'zh-TW': '請先填寫 Service ID / Template ID / Public Key', en: 'Please fill in Service ID / Template ID / Public Key first', 'zh-CN': '请先填写 Service ID / Template ID / Public Key', ja: '先に Service ID / Template ID / Public Key を入力してください' },
  'email.errMissingTestAddr': { 'zh-TW': '請輸入測試收件 Email', en: 'Please enter a test recipient email', 'zh-CN': '请输入测试收件 Email', ja: 'テスト送信先メールを入力してください' },
  'email.testRecipientName': { 'zh-TW': '測試收件人', en: 'Test recipient', 'zh-CN': '测试收件人', ja: 'テスト受信者' },
  'email.testEventNameFallback': { 'zh-TW': '(測試活動)', en: '(Test event)', 'zh-CN': '(测试活动)', ja: '（テストイベント）' },
  'email.groupSeatLabel': { 'zh-TW': '第{{group}}組 第{{seat}}號', en: 'Group {{group}}, Seat {{seat}}', 'zh-CN': '第{{group}}组 第{{seat}}号', ja: '第{{group}}グループ {{seat}}番' },

  'state.errBadBackup': { 'zh-TW': '備份檔格式不正確', en: 'Backup file format is invalid', 'zh-CN': '备份档格式不正确', ja: 'バックアップファイルの形式が不正です' },
};

let currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
if (!SUPPORTED_LANGS.includes(currentLang)) currentLang = DEFAULT_LANG;

const listeners = [];

export function getLang() {
  return currentLang;
}

export function onLangChange(fn) {
  listeners.push(fn);
}

export function setLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang) || lang === currentLang) return;
  currentLang = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
  applyStaticTranslations();
  listeners.forEach(fn => fn(currentLang));
}

export function t(key, vars) {
  const entry = dict[key];
  let str = entry ? (entry[currentLang] || entry[DEFAULT_LANG]) : key;
  if (vars) {
    for (const k of Object.keys(vars)) {
      str = str.split(`{{${k}}}`).join(vars[k]);
    }
  }
  return str;
}

export function applyStaticTranslations(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  root.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.title = t('app.title');
}
