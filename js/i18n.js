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
  'checkin.cardSectionTitle': { 'zh-TW': '刷卡報到', en: 'Card Check-in', 'zh-CN': '刷卡报到', ja: 'カード受付' },
  'checkin.cardPlaceholder': { 'zh-TW': '請刷卡（或輸入工號後按 Enter）', en: 'Scan your card (or type employee ID and press Enter)', 'zh-CN': '请刷卡（或输入工号后按 Enter）', ja: 'カードをスキャン（または社員番号を入力しEnter）' },
  'checkin.cardHint': { 'zh-TW': '將讀卡機對準感應區，或直接輸入 6 碼工號後按 Enter 即可報到', en: 'Tap your card on the reader, or type your 6-digit employee ID and press Enter to check in', 'zh-CN': '将读卡机对准感应区，或直接输入 6 位工号后按 Enter 即可报到', ja: 'カードリーダーにかざすか、6桁の社員番号を入力してEnterを押すと受付できます' },
  'checkin.cardNotFound': { 'zh-TW': '找不到工號為 {{id}} 的人員，請確認卡片或改用下方搜尋', en: 'No one found with employee ID {{id}}. Please check the card or use search below', 'zh-CN': '找不到工号为 {{id}} 的人员，请确认卡片或改用下方搜索', ja: '社員番号 {{id}} の方が見つかりません。カードをご確認いただくか、下の検索をご利用ください' },

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
  'checkin.errUnexpected': { 'zh-TW': '連線異常，報到失敗，請稍後再試', en: 'Connection issue — check-in failed. Please try again.', 'zh-CN': '连线异常，报到失败，请稍后再试', ja: '通信異常により受付に失敗しました。しばらくしてから再度お試しください' },

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

  // ---- sidebar / top header ----
  'sidebar.brand': { 'zh-TW': '智慧報到系統', en: 'Event Check-In', 'zh-CN': '智慧报到系统', ja: 'スマート受付システム' },
  'sidebar.brandSubtitle': { 'zh-TW': '維運控制台', en: 'Operations console', 'zh-CN': '运维控制台', ja: 'オペレーションコンソール' },
  'sidebar.sectionRelated': { 'zh-TW': '相關功能', en: 'Related', 'zh-CN': '相关功能', ja: '関連機能' },
  'sidebar.sectionEvents': { 'zh-TW': '活動管理', en: 'Event Management', 'zh-CN': '活动管理', ja: 'イベント管理' },
  'sidebar.navCheckin': { 'zh-TW': '智慧報到', en: 'Smart Check-in', 'zh-CN': '智慧报到', ja: 'スマート受付' },
  'sidebar.navHistory': { 'zh-TW': '歷史紀錄', en: 'History', 'zh-CN': '历史记录', ja: '履歴' },
  'sidebar.navEvents': { 'zh-TW': '活動管理', en: 'Event Management', 'zh-CN': '活动管理', ja: 'イベント管理' },
  'sidebar.navMaterials': { 'zh-TW': '教材管理', en: 'Materials', 'zh-CN': '教材管理', ja: '教材管理' },
  'sidebar.navEarlybird': { 'zh-TW': '早鳥福利', en: 'Early Bird', 'zh-CN': '早鸟福利', ja: '早割特典' },
  'sidebar.navLottery': { 'zh-TW': '活動抽獎', en: 'Lottery', 'zh-CN': '活动抽奖', ja: 'イベント抽選' },
  'sidebar.navSurvey': { 'zh-TW': '問卷發送', en: 'Survey', 'zh-CN': '问卷发送', ja: 'アンケート送信' },
  'sidebar.navReports': { 'zh-TW': '數據報表', en: 'Reports', 'zh-CN': '数据报表', ja: 'データレポート' },
  'sidebar.statusOnline': { 'zh-TW': '系統連線正常', en: 'All systems connected', 'zh-CN': '系统连线正常', ja: 'システム正常接続' },
  'topheader.title': { 'zh-TW': '智慧報到系統', en: 'Event Check-In', 'zh-CN': '智慧报到系统', ja: 'スマート受付システム' },
  'topheader.subtitle': { 'zh-TW': '企業活動智慧報到平台', en: 'Enterprise Event Check-in Platform', 'zh-CN': '企业活动智慧报到平台', ja: '企業イベント受付プラットフォーム' },
  'mock.userRole': { 'zh-TW': '活動管理員', en: 'Event Administrator', 'zh-CN': '活动管理员', ja: 'イベント管理者' },

  // ---- event status / source / type / format ----
  'eventStatus.upcoming': { 'zh-TW': '即將開始', en: 'Starting soon', 'zh-CN': '即将开始', ja: 'まもなく開始' },
  'eventStatus.ongoing': { 'zh-TW': '進行中', en: 'In progress', 'zh-CN': '进行中', ja: '進行中' },
  'eventStatus.ended': { 'zh-TW': '已結束', en: 'Ended', 'zh-CN': '已结束', ja: '終了' },
  'eventStatus.cancelled': { 'zh-TW': '已取消', en: 'Cancelled', 'zh-CN': '已取消', ja: 'キャンセル済み' },
  'eventSource.self': { 'zh-TW': '自建活動', en: 'Self-created', 'zh-CN': '自建活动', ja: '自主開催' },
  'eventSource.lms': { 'zh-TW': 'LMS 活動', en: 'LMS Event', 'zh-CN': 'LMS 活动', ja: 'LMSイベント' },
  'eventType.leadership': { 'zh-TW': '領導管理', en: 'Leadership', 'zh-CN': '领导管理', ja: 'リーダーシップ' },
  'eventType.digital_skill': { 'zh-TW': '數位技能', en: 'Digital Skills', 'zh-CN': '数字技能', ja: 'デジタルスキル' },
  'eventType.compliance': { 'zh-TW': '法規遵循', en: 'Compliance', 'zh-CN': '法规遵循', ja: 'コンプライアンス' },
  'eventType.other': { 'zh-TW': '其他', en: 'Other', 'zh-CN': '其他', ja: 'その他' },
  'eventFormat.in_person': { 'zh-TW': '實體', en: 'In-person', 'zh-CN': '实体', ja: '対面' },
  'eventFormat.online': { 'zh-TW': '線上', en: 'Online', 'zh-CN': '线上', ja: 'オンライン' },
  'eventFormat.hybrid': { 'zh-TW': '混合', en: 'Hybrid', 'zh-CN': '混合', ja: 'ハイブリッド' },
  'feature.materials': { 'zh-TW': '教材', en: 'Materials', 'zh-CN': '教材', ja: '教材' },
  'feature.survey': { 'zh-TW': '問卷', en: 'Survey', 'zh-CN': '问卷', ja: 'アンケート' },
  'feature.earlyBird': { 'zh-TW': '早鳥福利', en: 'Early Bird', 'zh-CN': '早鸟福利', ja: '早割特典' },
  'feature.lottery': { 'zh-TW': '抽獎', en: 'Lottery', 'zh-CN': '抽奖', ja: '抽選' },
  'feature.grouping': { 'zh-TW': '需要分組', en: 'Grouping', 'zh-CN': '需要分组', ja: 'グループ分け' },

  // ---- event picker / filter toolbar (shared by Events list + Check-in picker) ----
  'eventPicker.searchPlaceholder': { 'zh-TW': '搜尋活動名稱', en: 'Search event name', 'zh-CN': '搜索活动名称', ja: 'イベント名で検索' },
  'eventPicker.filterAllSources': { 'zh-TW': '所有來源', en: 'All sources', 'zh-CN': '所有来源', ja: 'すべてのソース' },
  'eventPicker.filterAllTypes': { 'zh-TW': '所有類型', en: 'All types', 'zh-CN': '所有类型', ja: 'すべての種類' },
  'eventPicker.filterAllStatuses': { 'zh-TW': '所有狀態', en: 'All statuses', 'zh-CN': '所有状态', ja: 'すべてのステータス' },
  'eventPicker.capacityLabel': { 'zh-TW': '人數上限 {{n}}', en: 'Capacity {{n}}', 'zh-CN': '人数上限 {{n}}', ja: '定員 {{n}}' },
  'eventPicker.viewBtn': { 'zh-TW': '檢視活動資訊', en: 'View details', 'zh-CN': '检视活动资讯', ja: '詳細を見る' },
  'eventPicker.deleteBtn': { 'zh-TW': '刪除活動', en: 'Delete event', 'zh-CN': '删除活动', ja: 'イベントを削除' },
  'eventPicker.cancelBtn': { 'zh-TW': '取消活動', en: 'Cancel event', 'zh-CN': '取消活动', ja: 'イベントを取消' },
  'eventPicker.confirmDelete': { 'zh-TW': '確定要刪除這個活動嗎？此動作無法復原。', en: 'Delete this event? This cannot be undone.', 'zh-CN': '确定要删除这个活动吗？此操作无法复原。', ja: 'このイベントを削除しますか？元に戻せません。' },
  'eventPicker.confirmCancel': { 'zh-TW': '確定要取消這個活動嗎？活動會保留在歷史紀錄中。', en: 'Cancel this event? It will remain visible in History.', 'zh-CN': '确定要取消这个活动吗？活动会保留在历史记录中。', ja: 'このイベントを取り消しますか？履歴には残ります。' },
  'eventPicker.noResults': { 'zh-TW': '找不到符合條件的活動', en: 'No matching events found', 'zh-CN': '找不到符合条件的活动', ja: '該当するイベントが見つかりません' },
  'eventPicker.selectPlaceholder': { 'zh-TW': '請先選擇活動', en: 'Please select an event', 'zh-CN': '请先选择活动', ja: 'イベントを選択してください' },

  // ---- 活動管理 ----
  'events.eyebrow': { 'zh-TW': 'EVENT MANAGEMENT', en: 'EVENT MANAGEMENT', 'zh-CN': 'EVENT MANAGEMENT', ja: 'EVENT MANAGEMENT' },
  'events.heading': { 'zh-TW': '活動管理', en: 'Event Management', 'zh-CN': '活动管理', ja: 'イベント管理' },
  'events.desc': { 'zh-TW': '新增自建活動、匯入 LMS 學習活動，並彈性設定每場活動所需功能。', en: 'Create self-hosted events or import LMS courses, with flexible per-event feature settings.', 'zh-CN': '新增自建活动、导入 LMS 学习活动，并弹性设置每场活动所需功能。', ja: '自主開催イベントの作成、LMS研修の取り込み、イベントごとの機能設定ができます。' },
  'events.browseTab': { 'zh-TW': '瀏覽現有活動', en: 'Browse existing', 'zh-CN': '浏览现有活动', ja: '既存イベントを見る' },
  'events.createTab': { 'zh-TW': '新增活動', en: 'Add event', 'zh-CN': '新增活动', ja: 'イベントを追加' },
  'events.optionSelf': { 'zh-TW': '自建活動', en: 'Self-created', 'zh-CN': '自建活动', ja: '自主開催' },
  'events.optionSelfDesc': { 'zh-TW': '自行填寫活動資料、匯入名單並設定需要的功能。', en: 'Fill in event details, import a roster, and enable the features you need.', 'zh-CN': '自行填写活动资料、导入名单并设置需要的功能。', ja: 'イベント情報を入力し、名簿をインポートして必要な機能を設定します。' },
  'events.optionLms': { 'zh-TW': '從 LMS 選擇', en: 'Choose from LMS', 'zh-CN': '从 LMS 选择', ja: 'LMSから選択' },
  'events.optionLmsDesc': { 'zh-TW': '搜尋公司既有學習活動並帶入唯讀設定。', en: 'Search existing company courses and import them as read-only.', 'zh-CN': '搜索公司既有学习活动并带入唯读设置。', ja: '既存の研修コースを検索し、読み取り専用で取り込みます。' },
  'events.lmsPickerHeading': { 'zh-TW': '選擇 LMS 課程', en: 'Choose an LMS course', 'zh-CN': '选择 LMS 课程', ja: 'LMSコースを選択' },
  'events.lmsReadonlyHint': { 'zh-TW': '此活動資料由 LMS 系統帶入，僅供檢視。', en: 'This event data comes from the LMS system and is read-only.', 'zh-CN': '此活动资料由 LMS 系统带入，仅供检视。', ja: 'このイベント情報はLMSから取り込まれた読み取り専用データです。' },
  'events.basicInfo': { 'zh-TW': '基本資料', en: 'Basic Info', 'zh-CN': '基本资料', ja: '基本情報' },
  'events.basicInfoDesc': { 'zh-TW': '自行填寫活動資料、匯入名單並設定需要的功能。', en: 'Fill in the event basics below.', 'zh-CN': '自行填写活动资料、导入名单并设置需要的功能。', ja: '以下にイベントの基本情報を入力してください。' },
  'events.fieldName': { 'zh-TW': '活動名稱 *', en: 'Event name *', 'zh-CN': '活动名称 *', ja: 'イベント名 *' },
  'events.fieldOrganizer': { 'zh-TW': '主辦單位 *', en: 'Organizer *', 'zh-CN': '主办单位 *', ja: '主催部門 *' },
  'events.fieldCapacity': { 'zh-TW': '人數上限', en: 'Capacity', 'zh-CN': '人数上限', ja: '定員' },
  'events.fieldDate': { 'zh-TW': '活動日期', en: 'Event date', 'zh-CN': '活动日期', ja: 'イベント日' },
  'events.fieldStartTime': { 'zh-TW': '開始時間', en: 'Start time', 'zh-CN': '开始时间', ja: '開始時刻' },
  'events.fieldEndTime': { 'zh-TW': '結束時間', en: 'End time', 'zh-CN': '结束时间', ja: '終了時刻' },
  'events.fieldLocation': { 'zh-TW': '活動地點 *', en: 'Location *', 'zh-CN': '活动地点 *', ja: '開催場所 *' },
  'events.fieldType': { 'zh-TW': '活動類型', en: 'Event type', 'zh-CN': '活动类型', ja: 'イベント種別' },
  'events.fieldFormat': { 'zh-TW': '授課形式', en: 'Format', 'zh-CN': '授课形式', ja: '開催形式' },
  'events.rosterHeading': { 'zh-TW': '參加者名單', en: 'Participant Roster', 'zh-CN': '参加者名单', ja: '参加者名簿' },
  'events.rosterHint': { 'zh-TW': '瀏覽模擬名單，或上傳 CSV 名單檔案。', en: 'Use a mock roster, or upload a CSV file.', 'zh-CN': '浏览模拟名单，或上传 CSV 名单文件。', ja: 'モック名簿を使うか、CSVファイルをアップロードしてください。' },
  'events.rosterMockFull': { 'zh-TW': '模擬名單（完整）', en: 'Mock roster (full)', 'zh-CN': '模拟名单（完整）', ja: 'モック名簿（フル）' },
  'events.rosterMockFullCount': { 'zh-TW': '12 人', en: '12 people', 'zh-CN': '12 人', ja: '12名' },
  'events.rosterMockLite': { 'zh-TW': '模擬名單（精簡）', en: 'Mock roster (lite)', 'zh-CN': '模拟名单（精简）', ja: 'モック名簿（簡易）' },
  'events.rosterMockLiteCount': { 'zh-TW': '6 人', en: '6 people', 'zh-CN': '6 人', ja: '6名' },
  'events.rosterCsv': { 'zh-TW': '上傳 CSV 名單', en: 'Upload CSV roster', 'zh-CN': '上传 CSV 名单', ja: 'CSV名簿をアップロード' },
  'events.rosterSelected': { 'zh-TW': '已選擇：{{label}}（{{count}} 人）', en: 'Selected: {{label}} ({{count}} people)', 'zh-CN': '已选择：{{label}}（{{count}} 人）', ja: '選択済み：{{label}}（{{count}}名）' },
  'events.groupingHeading': { 'zh-TW': '需要分組', en: 'Grouping', 'zh-CN': '需要分组', ja: 'グループ分け' },
  'events.groupingDesc': { 'zh-TW': '依所選名單自動平均分組，避免各組人數差距過大。', en: 'Automatically split the roster into balanced groups.', 'zh-CN': '依所选名单自动平均分组，避免各组人数差距过大。', ja: '選択した名簿を人数バランスよく自動でグループ分けします。' },
  'events.featuresHeading': { 'zh-TW': '模組化功能', en: 'Modular Features', 'zh-CN': '模块化功能', ja: 'モジュール機能' },
  'events.submitBtn': { 'zh-TW': '新增活動', en: 'Add Event', 'zh-CN': '新增活动', ja: 'イベントを追加' },
  'events.errName': { 'zh-TW': '請輸入活動名稱', en: 'Please enter an event name', 'zh-CN': '请输入活动名称', ja: 'イベント名を入力してください' },
  'events.errOrganizer': { 'zh-TW': '請輸入主辦單位', en: 'Please enter an organizer', 'zh-CN': '请输入主办单位', ja: '主催部門を入力してください' },
  'events.errLocation': { 'zh-TW': '請輸入活動地點', en: 'Please enter a location', 'zh-CN': '请输入活动地点', ja: '開催場所を入力してください' },
  'events.errDate': { 'zh-TW': '請設定活動日期與時間', en: 'Please set the event date and time', 'zh-CN': '请设置活动日期与时间', ja: 'イベントの日時を設定してください' },
  'events.errRoster': { 'zh-TW': '請選擇名單來源', en: 'Please choose a roster source', 'zh-CN': '请选择名单来源', ja: '名簿のソースを選択してください' },
  'events.createdToast': { 'zh-TW': '已新增活動', en: 'Event created', 'zh-CN': '已新增活动', ja: 'イベントを作成しました' },
  'events.deletedToast': { 'zh-TW': '已刪除活動', en: 'Event deleted', 'zh-CN': '已删除活动', ja: 'イベントを削除しました' },
  'events.cancelledToast': { 'zh-TW': '已取消活動', en: 'Event cancelled', 'zh-CN': '已取消活动', ja: 'イベントを取り消しました' },

  // ---- 智慧報到 ----
  'checkinStep.eyebrow': { 'zh-TW': 'SMART CHECK-IN', en: 'SMART CHECK-IN', 'zh-CN': 'SMART CHECK-IN', ja: 'SMART CHECK-IN' },
  'checkinStep.heading': { 'zh-TW': '選擇活動並開始報到', en: 'Choose an Event to Start Check-in', 'zh-CN': '选择活动并开始报到', ja: 'イベントを選んで受付を開始' },
  'checkinStep.desc': { 'zh-TW': '透過搜尋與篩選快速找到活動，再進入現場報到工作台。', en: 'Search and filter to find your event, then enter the on-site check-in workbench.', 'zh-CN': '透过搜索与筛选快速找到活动，再进入现场报到工作台。', ja: '検索・絞り込みでイベントを見つけ、受付ワークベンチへ進みます。' },
  'checkinStep.startBtn': { 'zh-TW': '開始報到', en: 'Start Check-in', 'zh-CN': '开始报到', ja: '受付を開始' },
  'checkinWorkbench.backLink': { 'zh-TW': '返回活動選擇', en: 'Back to event selection', 'zh-CN': '返回活动选择', ja: 'イベント選択に戻る' },
  'checkinWorkbench.modeCheckin': { 'zh-TW': 'Check-in 報到', en: 'Check-in', 'zh-CN': 'Check-in 报到', ja: 'Check-in 受付' },
  'checkinWorkbench.modeCheckout': { 'zh-TW': 'Check-out 簽退', en: 'Check-out', 'zh-CN': 'Check-out 签退', ja: 'Check-out 退出' },
  'checkinWorkbench.modeCard': { 'zh-TW': '刷卡報到／簽退', en: 'Card scan', 'zh-CN': '刷卡报到／签退', ja: 'カード読み取り' },
  'checkinWorkbench.modeManual': { 'zh-TW': '人工報到／簽退', en: 'Manual', 'zh-CN': '人工报到／签退', ja: '手動入力' },
  'checkinWorkbench.readerConnected': { 'zh-TW': '讀卡機已連線', en: 'Reader connected', 'zh-CN': '读卡机已连线', ja: 'リーダー接続済み' },
  'checkinWorkbench.waitingHeading': { 'zh-TW': '等待感應員工識別卡', en: 'Waiting for employee card', 'zh-CN': '等待感应员工识别卡', ja: '社員証カードの読み取り待ち' },
  'checkinWorkbench.waitingDesc': { 'zh-TW': '完成感應後會立即顯示結果與組別資訊。', en: 'The result and group info will appear right after scanning.', 'zh-CN': '完成感应后会立即显示结果与组别资讯。', ja: '読み取り完了後、結果とグループ情報がすぐに表示されます。' },
  'checkinWorkbench.liveFeedEyebrow': { 'zh-TW': 'LIVE FEED', en: 'LIVE FEED', 'zh-CN': 'LIVE FEED', ja: 'LIVE FEED' },
  'checkinWorkbench.liveFeedHeading': { 'zh-TW': '最近記錄', en: 'Recent activity', 'zh-CN': '最近记录', ja: '最近の記録' },
  'checkinWorkbench.liveFeedEmpty': { 'zh-TW': '目前沒有最近記錄', en: 'No recent activity yet', 'zh-CN': '目前没有最近记录', ja: '最近の記録はありません' },
  'checkinWorkbench.feedCheckin': { 'zh-TW': '{{name}} 完成報到（{{status}}）', en: '{{name}} checked in ({{status}})', 'zh-CN': '{{name}} 完成报到（{{status}}）', ja: '{{name}}さんが受付しました（{{status}}）' },
  'checkinWorkbench.feedCheckout': { 'zh-TW': '{{name}} 完成簽退', en: '{{name}} checked out', 'zh-CN': '{{name}} 完成签退', ja: '{{name}}さんが退出しました' },
  'checkinWorkbench.resultCloseBtn': { 'zh-TW': '關閉', en: 'Close', 'zh-CN': '关闭', ja: '閉じる' },
  'checkinWorkbench.resultAlreadyIn': { 'zh-TW': '此人員已完成報到', en: 'This person has already checked in', 'zh-CN': '此人员已完成报到', ja: 'この方はすでに受付済みです' },
  'checkinWorkbench.resultSuccess': { 'zh-TW': '報到成功', en: 'Check-in successful', 'zh-CN': '报到成功', ja: '受付が完了しました' },
  'checkinWorkbench.resultCheckoutSuccess': { 'zh-TW': '簽退成功', en: 'Check-out successful', 'zh-CN': '签退成功', ja: '退出が完了しました' },
  'checkinWorkbench.noActiveEvent': { 'zh-TW': '請先在上方選擇活動', en: 'Please select an event above first', 'zh-CN': '请先在上方选择活动', ja: '上でイベントを選択してください' },

  // ---- 數據報表 ----
  'reports.eyebrow': { 'zh-TW': 'LIVE OPERATIONS', en: 'LIVE OPERATIONS', 'zh-CN': 'LIVE OPERATIONS', ja: 'LIVE OPERATIONS' },
  'reports.heading': { 'zh-TW': '數據報表', en: 'Data Reports', 'zh-CN': '数据报表', ja: 'データレポート' },
  'reports.desc': { 'zh-TW': '即時掌握出勤狀況，並快速聯絡尚未到場的同仁。', en: 'Track attendance in real time and quickly follow up with no-shows.', 'zh-CN': '即时掌握出勤状况，并快速联络尚未到场的同仁。', ja: '出席状況をリアルタイムに把握し、未着の方へ迅速にフォローできます。' },
  'reports.selectLabel': { 'zh-TW': '瀏覽現有活動', en: 'Browse events', 'zh-CN': '浏览现有活动', ja: 'イベントを選択' },
  'reports.statExpected': { 'zh-TW': '應到', en: 'Expected', 'zh-CN': '应到', ja: '予定人数' },
  'reports.statCheckedIn': { 'zh-TW': '已報到', en: 'Checked in', 'zh-CN': '已报到', ja: '受付済み' },
  'reports.statFollowUp': { 'zh-TW': '需追蹤', en: 'Needs follow-up', 'zh-CN': '需追踪', ja: '要フォロー' },
  'reports.statRate': { 'zh-TW': '出席率', en: 'Attendance rate', 'zh-CN': '出席率', ja: '出席率' },
  'reports.rosterEyebrow': { 'zh-TW': 'ATTENDANCE ROSTER', en: 'ATTENDANCE ROSTER', 'zh-CN': 'ATTENDANCE ROSTER', ja: 'ATTENDANCE ROSTER' },
  'reports.rosterHeading': { 'zh-TW': '即時名單', en: 'Live Roster', 'zh-CN': '即时名单', ja: 'リアルタイム名簿' },
  'reports.searchPlaceholder': { 'zh-TW': '輸入工號或姓名', en: 'Search employee ID or name', 'zh-CN': '输入工号或姓名', ja: '社員番号または氏名で検索' },
  'reports.filterAllDept': { 'zh-TW': '部門', en: 'Department', 'zh-CN': '部门', ja: '部門' },
  'reports.filterAllGroup': { 'zh-TW': '組別', en: 'Group', 'zh-CN': '组别', ja: 'グループ' },
  'reports.filterAllStatus': { 'zh-TW': '出勤狀態', en: 'Attendance status', 'zh-CN': '出勤状态', ja: '出席状況' },
  'reports.downloadCsv': { 'zh-TW': '下載 CSV', en: 'Download CSV', 'zh-CN': '下载 CSV', ja: 'CSVをダウンロード' },
  'reports.markLeave': { 'zh-TW': '標記請假', en: 'Mark as leave', 'zh-CN': '标记请假', ja: '休暇として記録' },
  'reports.unmarkLeave': { 'zh-TW': '取消請假', en: 'Unmark leave', 'zh-CN': '取消请假', ja: '休暇を取消' },
  'reports.groupLabel': { 'zh-TW': '第{{group}}組', en: 'Group {{group}}', 'zh-CN': '第{{group}}组', ja: '第{{group}}グループ' },
  'reports.extensionCol': { 'zh-TW': '分機', en: 'Extension', 'zh-CN': '分机', ja: '内線' },
  'status.on_leave': { 'zh-TW': '請假', en: 'On leave', 'zh-CN': '请假', ja: '休暇' },

  // ---- 歷史紀錄 ----
  'history.eyebrow': { 'zh-TW': 'HISTORY', en: 'HISTORY', 'zh-CN': 'HISTORY', ja: 'HISTORY' },
  'history.heading': { 'zh-TW': '歷史紀錄', en: 'History', 'zh-CN': '历史记录', ja: '履歴' },
  'history.desc': { 'zh-TW': '查看已結束與已取消活動的人員報到、簽退及請假紀錄。', en: 'Review check-in, check-out, and leave records for ended or cancelled events.', 'zh-CN': '查看已结束与已取消活动的人员报到、签退及请假记录。', ja: '終了・取消済みイベントの受付・退出・休暇記録を確認できます。' },
  'history.selectLabel': { 'zh-TW': '選擇歷史活動', en: 'Select a past event', 'zh-CN': '选择历史活动', ja: '過去のイベントを選択' },

  // ---- 教材管理 ----
  'materials.eyebrow': { 'zh-TW': 'MATERIALS', en: 'MATERIALS', 'zh-CN': 'MATERIALS', ja: 'MATERIALS' },
  'materials.heading': { 'zh-TW': '教材管理', en: 'Materials Management', 'zh-CN': '教材管理', ja: '教材管理' },
  'materials.addBtn': { 'zh-TW': '新增教材', en: 'Add material', 'zh-CN': '新增教材', ja: '教材を追加' },
  'materials.fieldTitle': { 'zh-TW': '標題 *', en: 'Title *', 'zh-CN': '标题 *', ja: 'タイトル *' },
  'materials.fieldLink': { 'zh-TW': '連結', en: 'Link', 'zh-CN': '连结', ja: 'リンク' },
  'materials.fieldDesc': { 'zh-TW': '說明', en: 'Description', 'zh-CN': '说明', ja: '説明' },
  'materials.saveBtn': { 'zh-TW': '儲存', en: 'Save', 'zh-CN': '保存', ja: '保存' },
  'materials.deleteBtn': { 'zh-TW': '刪除', en: 'Delete', 'zh-CN': '删除', ja: '削除' },
  'materials.empty': { 'zh-TW': '尚未新增任何教材', en: 'No materials yet', 'zh-CN': '尚未新增任何教材', ja: 'まだ教材がありません' },
  'materials.errTitle': { 'zh-TW': '請輸入標題', en: 'Please enter a title', 'zh-CN': '请输入标题', ja: 'タイトルを入力してください' },
  'materials.notEnabled': { 'zh-TW': '此活動尚未啟用教材管理功能', en: 'This event has not enabled Materials', 'zh-CN': '此活动尚未启用教材管理功能', ja: 'このイベントでは教材管理が無効です' },

  // ---- 早鳥福利頁 ----
  'earlybirdPage.eyebrow': { 'zh-TW': 'EARLY BIRD', en: 'EARLY BIRD', 'zh-CN': 'EARLY BIRD', ja: 'EARLY BIRD' },
  'earlybirdPage.heading': { 'zh-TW': '早鳥福利', en: 'Early Bird', 'zh-CN': '早鸟福利', ja: '早割特典' },
  'earlybirdPage.desc': { 'zh-TW': '依報名時間排序前 N 名，且須準時報到才取得早鳥資格。', en: 'The earliest N registrants qualify for early-bird only if they also check in on time.', 'zh-CN': '依报名时间排序前 N 名，且须准时报到才取得早鸟资格。', ja: '登録が早い上位N名のうち、時間通りに受付した方のみ早割対象です。' },
  'earlybirdPage.countLabel': { 'zh-TW': '早鳥名額：前 {{n}} 名', en: 'Early bird quota: top {{n}}', 'zh-CN': '早鸟名额：前 {{n}} 名', ja: '早割枠：上位{{n}}名' },
  'earlybirdPage.notEnabled': { 'zh-TW': '此活動尚未啟用早鳥福利功能', en: 'This event has not enabled Early Bird', 'zh-CN': '此活动尚未启用早鸟福利功能', ja: 'このイベントでは早割特典が無効です' },
  'earlybirdPage.registeredAtCol': { 'zh-TW': '報名時間', en: 'Registered at', 'zh-CN': '报名时间', ja: '登録日時' },

  // ---- 活動抽獎頁 ----
  'lotteryPage.eyebrow': { 'zh-TW': 'LOTTERY', en: 'LOTTERY', 'zh-CN': 'LOTTERY', ja: 'LOTTERY' },
  'lotteryPage.heading': { 'zh-TW': '活動抽獎', en: 'Event Lottery', 'zh-CN': '活动抽奖', ja: 'イベント抽選' },
  'lotteryPage.notEnabled': { 'zh-TW': '此活動尚未啟用抽獎功能', en: 'This event has not enabled Lottery', 'zh-CN': '此活动尚未启用抽奖功能', ja: 'このイベントでは抽選が無効です' },

  // ---- 問卷發送頁 ----
  'surveyPage.eyebrow': { 'zh-TW': 'SURVEY', en: 'SURVEY', 'zh-CN': 'SURVEY', ja: 'SURVEY' },
  'surveyPage.heading': { 'zh-TW': '問卷發送', en: 'Survey Sending', 'zh-CN': '问卷发送', ja: 'アンケート送信' },
  'surveyPage.linkLabel': { 'zh-TW': '問卷連結', en: 'Survey link', 'zh-CN': '问卷连结', ja: 'アンケートリンク' },
  'surveyPage.saveLinkBtn': { 'zh-TW': '儲存連結', en: 'Save link', 'zh-CN': '保存连结', ja: 'リンクを保存' },
  'surveyPage.sendBtn': { 'zh-TW': '發送問卷給已報到人員', en: 'Send to checked-in attendees', 'zh-CN': '发送问卷给已报到人员', ja: '受付済みの方に送信' },
  'surveyPage.sentCount': { 'zh-TW': '已發送 {{sent}} / {{total}} 人', en: 'Sent {{sent}} / {{total}}', 'zh-CN': '已发送 {{sent}} / {{total}} 人', ja: '送信済み {{sent}} / {{total}}名' },
  'surveyPage.needLinkFirst': { 'zh-TW': '請先設定並儲存問卷連結', en: 'Please set and save a survey link first', 'zh-CN': '请先设置并保存问卷连结', ja: '先にアンケートリンクを設定・保存してください' },
  'surveyPage.sentToast': { 'zh-TW': '已發送問卷', en: 'Survey sent', 'zh-CN': '已发送问卷', ja: 'アンケートを送信しました' },
  'surveyPage.emailSectionTitle': { 'zh-TW': 'Email 寄送設定', en: 'Email Delivery Settings', 'zh-CN': 'Email 寄送设置', ja: 'メール送信設定' },
  'surveyPage.emailEnable': { 'zh-TW': '啟用透過 Email 發送問卷（未啟用則僅模擬發送）', en: 'Send the survey via email (otherwise sending is simulated)', 'zh-CN': '启用透过 Email 发送问卷（未启用则仅模拟发送）', ja: 'メールでアンケートを送信する（無効の場合はシミュレーションのみ）' },
  'surveyPage.notEnabled': { 'zh-TW': '此活動尚未啟用問卷發送功能', en: 'This event has not enabled Survey', 'zh-CN': '此活动尚未启用问卷发送功能', ja: 'このイベントではアンケート送信が無効です' },
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
