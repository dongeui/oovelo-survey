(function () {
  const messageField = document.getElementById("message");
  const count = document.getElementById("count");
  const form = document.getElementById("pilot-form");
  const success = document.getElementById("success");
  const submitButton = document.getElementById("submit-button");
  const scopeField = document.getElementById("scope");
  const scopeTemplate = document.getElementById("scope-template");
  const templateTitle = document.getElementById("template-title");
  const templateCopy = document.getElementById("template-copy");
  const templateList = document.getElementById("template-list");
  const messageGuide = document.getElementById("message-guide");
  const messageError = document.getElementById("message-error");
  const config = window.FTAI_CONFIG || {};
  const endpoint = config.formEndpoint || "";
  const langKoButton = document.getElementById("lang-ko");
  const langEnButton = document.getElementById("lang-en");
  let currentLang = localStorage.getItem("oovelo-lang") || "ko";

  const scopeTemplates = {
    inquiry: {
      ko: {
        title: "이런 문의가 자주 들어옵니다",
        copy: "전화, DM, 카카오 문의가 반복되거나 예약 정리가 자주 꼬이는 경우가 많습니다.",
        items: [
          "전화 예약 문의가 많아서 응대가 계속 끊깁니다.",
          "인스타 DM으로 가격과 가능 시간 문의가 반복됩니다.",
          "카카오 문의와 실제 예약 일정 정리가 따로 놀아요.",
        ],
        guide:
          "자세하게 써주실수록 좋습니다. 예를 들면 `전화 예약 문의가 하루 종일 반복돼요`, `인스타 DM으로 가격과 가능 시간 문의가 계속 와요`, `네이버 예약과 실제 일정 확인이 따로 놀아서 불편해요`처럼 적어주시면 됩니다.",
      },
      en: {
        title: "These are common examples",
        copy: "Choose this when phone, DM, or Kakao inquiries repeat constantly or when bookings get messy.",
        items: [
          "Phone booking inquiries interrupt work all day.",
          "Instagram DMs repeat the same pricing and availability questions.",
          "Kakao inquiries and the actual booking schedule are managed separately.",
        ],
        guide:
          "The more detail you provide, the better. For example: `I answer phone booking requests all day`, `Instagram DMs keep asking the same pricing and schedule questions`, or `Naver bookings and the real calendar do not match.`",
      },
    },
    retention: {
      ko: {
        title: "이런 고민이 대표적입니다",
        copy: "단골 관리, 후기 요청, 재방문 유도가 손으로 흩어져 있는 경우가 많습니다.",
        items: [
          "시술이나 방문 후 재방문 안내를 매번 수동으로 합니다.",
          "후기 요청 메시지를 보내고 싶지만 놓치는 경우가 많습니다.",
          "단골 고객에게만 쿠폰이나 리마인드를 보내고 싶습니다.",
        ],
        guide:
          "자세하게 써주실수록 좋습니다. 예를 들면 `네이버 예약으로 온 고객의 재방문율을 확인하고 싶어요`, `재방문 고객에게만 자동으로 안내를 보내고 싶어요`, `방문 후 후기 요청을 매번 직접 보내고 있어요`처럼 적어주시면 됩니다.",
      },
      en: {
        title: "These are common retention issues",
        copy: "Choose this when repeat customer management, review requests, or return prompts are handled manually.",
        items: [
          "I manually remind customers to come back after each visit.",
          "I want to send review requests, but I miss many of them.",
          "I want to send coupons or reminders only to repeat customers.",
        ],
        guide:
          "The more detail you provide, the better. For example: `I want to track repeat visits from Naver Booking`, `I want to automatically message returning customers only`, or `I manually send review requests after each visit.`",
      },
    },
    marketing: {
      ko: {
        title: "이런 식으로 시작해도 됩니다",
        copy: "이벤트, 휴무, 신메뉴, 공지 발송이 매번 수동일 때 선택하면 됩니다.",
        items: [
          "신메뉴나 이벤트 공지를 손으로 보내느라 번거롭습니다.",
          "휴무나 운영시간 변경을 여러 채널에 매번 올립니다.",
          "고객별로 다른 메시지를 보내고 싶은데 기준이 없습니다.",
        ],
        guide:
          "자세하게 써주실수록 좋습니다. 예를 들면 `휴무 공지를 인스타, 네이버, 카카오에 매번 따로 올려요`, `단골 고객에게만 쿠폰 메시지를 보내고 싶어요`, `신메뉴 알림을 보낼 대상을 정리하기 어려워요`처럼 적어주시면 됩니다.",
      },
      en: {
        title: "You can start with cases like this",
        copy: "Choose this when event announcements, holiday notices, menu updates, or customer messages are handled manually every time.",
        items: [
          "Sending menu or event announcements manually takes too much time.",
          "Holiday notices or hour changes must be posted to multiple channels one by one.",
          "I want to send different messages to different customers, but I do not have a clear system.",
        ],
        guide:
          "The more detail you provide, the better. For example: `I post the same holiday notice separately on Instagram, Naver, and Kakao`, `I want to send coupons only to repeat customers`, or `I do not know who should receive new menu updates.`",
      },
    },
    operations: {
      ko: {
        title: "운영 정리 쪽은 이런 사례가 많습니다",
        copy: "주문 확인, 배송 문의, 일정 정리, 내부 체크리스트 관리가 반복될 때 해당됩니다.",
        items: [
          "배송 문의 답변이 반복됩니다.",
          "주문 상태를 매번 수동으로 확인해 알려드립니다.",
          "운영 체크리스트나 일정 정리가 자주 꼬입니다.",
        ],
        guide:
          "자세하게 써주실수록 좋습니다. 예를 들면 `스마트스토어 주문 상태 문의가 반복돼요`, `네이버와 당근으로 예약 관리를 하는데 일정 확인이 불편해요`, `운영 체크리스트를 엑셀과 메모로 따로 관리하고 있어요`처럼 적어주시면 됩니다.",
      },
      en: {
        title: "These are common operations cases",
        copy: "Choose this when order checks, delivery inquiries, scheduling, or internal checklists are repeatedly managed by hand.",
        items: [
          "I keep answering the same delivery questions.",
          "I manually check order status every time before replying.",
          "My schedules and operating checklists get disorganized often.",
        ],
        guide:
          "The more detail you provide, the better. For example: `Customers repeatedly ask about Smart Store order status`, `Managing reservations from Naver and Danggeun is difficult`, or `I manage checklists across spreadsheets and notes.`",
      },
    },
    unsure: {
      ko: {
        title: "정확히 고르지 못해도 괜찮습니다",
        copy: "어떤 문제가 반복되는지만 편하게 적어주시면 됩니다.",
        items: [
          "하루에 같은 설명을 몇 번씩 반복합니다.",
          "운영이 자꾸 손으로 돌아가서 정리가 안 됩니다.",
          "자동화가 될 것 같긴 한데 어디서부터 시작할지 모르겠습니다.",
        ],
        guide:
          "정확히 어떤 카테고리인지 몰라도 괜찮습니다. 자세하게 써주실수록 좋습니다. 예를 들면 `어떤 일부터 자동화가 가능한지 모르겠어요`, `하루에 같은 문의를 여러 번 받고 있어요`, `예약과 고객관리가 따로 돌아가서 정리가 어렵습니다`처럼 적어주시면 됩니다.",
      },
      en: {
        title: "It is okay if you are not sure",
        copy: "If you are unsure which category fits, just describe the repetitive problem.",
        items: [
          "I repeat the same explanation many times a day.",
          "Operations still rely on manual work and nothing feels organized.",
          "I think automation could help, but I do not know where to start.",
        ],
        guide:
          "It is okay if you are not sure about the exact category. The more detail you provide, the better. For example: `I do not know what can be automated first`, `I answer the same questions every day`, or `Bookings and customer management are split across tools.`",
      },
    },
  };

  const translations = {
    ko: {
      pageTitle: "소상공인 자동화 무료 진단 조사",
      pageDescription: "소상공인 자동화 무료 진단 조사. 100건 한정으로 예약, 문의, 고객관리, 운영업무를 어떻게 자동화할 수 있을지 먼저 정리해드립니다.",
      brandMark: "소상공인 자동화 무료 진단 조사",
      brandCopy: "응답 100건 한정",
      topCta: "무료 진단 신청",
      heroEyebrow: "small business automation survey",
      heroTitle: "우리 가게, AI 도입하고 싶은데 아직 망설이고 계신가요?",
      heroText: "매번 같은 예약 문의를 반복해서 받고 계신가요? 단골 관리가 여기저기 흩어져 있거나, 주문과 운영 정리가 번거로워 불편하지 않으셨나요? 지금은 100건 한정으로 무료 진단을 받고 있습니다. 좋은 아이디어로 채택될 경우 정식 서비스 무료 제공과 우선 도입 대상으로 선정됩니다.",
      heroPrimaryCta: "지금 신청하기",
      heroSecondaryCta: "어떤 케이스를 보는지 보기",
      heroPoint1: "100건 한정",
      heroPoint2: "동일 이메일 1회 신청",
      heroPoint3: "적합 문의 우선 검토",
      heroCardLabel: "이런 고민을 받습니다",
      heroCardItem1: "전화, DM, 카카오 문의 응대가 반복된다",
      heroCardItem2: "단골 관리와 재방문 유도가 손으로 흩어져 있다",
      heroCardItem3: "공지, 쿠폰, 메시지 발송이 매번 수동이다",
      heroCardItem4: "주문, 일정, 운영 정리가 자주 꼬인다",
      signal1Title: "누구를 위한 조사인가요",
      signal1Copy: "음식점, 카페, 미용실, 네일샵, 레슨, 온라인 셀러, 생활서비스 운영자",
      signal2Title: "신청하면 받는 것",
      signal2Copy: "문제 요약, 가능한 자동화 방향, 필요한 준비물, 다음 액션",
      promoEyebrow: "no-cost survey",
      promoTitle: "상담만 받아도 돈 내야 하나요? 아닙니다.",
      promoCopy: "지금은 무료 진단 조사 단계입니다. 부담 없이 남겨주셔도 됩니다. 좋은 아이디어로 채택되면 정식 서비스 무료 제공과 우선 도입 대상으로 선정됩니다.",
      categoriesEyebrow: "category map",
      categoriesTitle: "반복되는 일이 있다면, 보통 이 네 가지 범주 안에 들어옵니다.",
      categoriesCopy: "꼭 정확히 고르지 않아도 괜찮습니다. 가장 가까운 항목을 선택하고 편하게 설명해주시면 됩니다.",
      category1Title: "예약/문의 응대",
      category1Copy: "전화, DM, 카카오 문의가 반복되고 예약 정리가 자주 꼬이는 경우",
      category1Item1: "미용실 예약 문의",
      category1Item2: "카페 단체예약 문의",
      category1Item3: "레슨 시간 문의",
      category2Title: "고객관리/재방문",
      category2Copy: "단골 관리, 후기 요청, 재방문 메시지처럼 관계 유지가 필요한 경우",
      category2Item1: "시술 후 재방문 알림",
      category2Item2: "후기 요청 메시지",
      category2Item3: "쿠폰 발송",
      category3Title: "홍보/메시지 발송",
      category3Copy: "이벤트, 신메뉴, 프로모션 공지를 운영자가 매번 수동으로 보내는 경우",
      category3Item1: "신메뉴 알림",
      category3Item2: "휴무/운영시간 공지",
      category3Item3: "타겟 메시지 발송",
      category4Title: "주문/운영 정리",
      category4Copy: "주문 확인, 배송 문의, 일정 관리, 간단한 운영 정리가 반복되는 경우",
      category4Item1: "스마트스토어 문의 대응",
      category4Item2: "주문 상태 안내",
      category4Item3: "운영 체크리스트 정리",
      howEyebrow: "how it works",
      howTitle: "복잡하게 준비하실 필요 없습니다. 지금 운영에서 제일 번거로운 일을 알려주시면 됩니다.",
      how1Title: "1. 간단히 남기기",
      how1Copy: "업종과 가장 가까운 문제 범위를 고르고, 현재 상황을 편하게 적어주세요.",
      how2Title: "2. 무료 진단 받기",
      how2Copy: "현재 운영에서 어떤 자동화가 가능한지 1차 진단 형태로 정리해드립니다.",
      how3Title: "3. 후속 연결",
      how3Copy: "적합한 케이스는 정식 오픈 전 우선 상담 또는 실제 실행 검토 대상으로 이어집니다.",
      whyEyebrow: "why now",
      whyTitle: "이 조사는 무료로 끝나는 이벤트가 아니라, 실제로 쓸 수 있는 자동화 방식을 찾는 과정입니다.",
      benefitTitle: "신청자에게 주는 것",
      benefitItem1: "내 가게 상황에 맞춘 1차 진단",
      benefitItem2: "가능한 자동화 방법 2~3개",
      benefitItem3: "정식 오픈 전 우선 상담 대상 검토",
      benefitItem4: "좋은 아이디어 채택 시 정식 서비스 무료 제공과 우선 도입 대상으로 선정",
      checkTitle: "우리가 확인하는 것",
      checkItem1: "어떤 업종과 문제군이 가장 자주 나오는지",
      checkItem2: "추가 질문 없이도 진단이 가능한 패턴이 있는지",
      checkItem3: "유료 전환 가능성이 높은 케이스가 무엇인지",
      checkItem4: "어떤 케이스를 표준 플레이북으로 만들 수 있는지",
      applyEyebrow: "apply now",
      applyTitle: "무료 진단 신청",
      applyCopy: "이번 조사는 100건 한정이며, 같은 이메일로 1회만 신청 가능합니다. 범위에 맞는 문의를 우선 진행합니다.",
      labelEmail: "이메일",
      labelPhone: "전화번호",
      labelIndustry: "업종",
      labelScope: "지금 가장 줄이고 싶은 일",
      templateFootnote: "정확히 맞지 않아도 괜찮습니다. 편하게 적어주셔도 됩니다.",
      labelMessage: "현재 상황",
      messagePlaceholder: "예: 전화 예약과 인스타 DM 응대가 너무 반복되고, 예약 일정 정리가 자주 꼬입니다.",
      messageError: "현재 상황은 최소 100자 이상 작성해 주세요.",
      linksTitle: "참고 링크 (선택)",
      linksCopy: "매장 링크, 예약 페이지, 인스타그램, 스마트스토어, 참고 화면 링크가 있다면 최대 3개까지 남겨주세요. 실제 운영 환경을 이해할 수 있는 정보일수록 더 정확한 검토에 도움이 됩니다.",
      link1Placeholder: "링크 1",
      link2Placeholder: "링크 2",
      link3Placeholder: "링크 3",
      labelFollowup: "아이디어 채택 시 후속 연락을 받아도 괜찮습니다",
      labelPaidIntent: "필요하다면 외주 용역이나 비용을 지불할 의사도 있습니다",
      confirmTitle: "제출 전 확인",
      confirmItem1: "좋은 아이디어로 채택될 경우 정식 서비스 무료 제공과 우선 도입 대상으로 선정됩니다.",
      submitButton: "무료 진단 신청하기",
      submitPending: "제출 중...",
      submitFailed: "제출에 실패했습니다. 잠시 후 다시 시도해 주세요.",
      submitTooShort: "현재 상황은 최소 100자 이상 작성해 주세요.",
      industryPlaceholder: "선택해 주세요",
      industryOptions: ["음식점/카페", "미용/뷰티", "레슨/교육", "온라인 판매", "생활서비스", "기타"],
      scopePlaceholder: "선택해 주세요",
      scopeOptions: ["예약/문의 응대", "고객관리/재방문", "홍보/메시지 발송", "주문/운영 정리", "잘 모르겠어요"],
      followupPlaceholder: "선택해 주세요",
      followupYes: "예, 괜찮습니다",
      followupNo: "아니요, 이번 진단만 받겠습니다",
      paidPlaceholder: "선택해 주세요",
      paidYes: "예, 있습니다",
      paidMaybe: "상황을 보고 결정하고 싶습니다",
      paidNo: "아니요, 현재는 없습니다",
    },
    en: {
      pageTitle: "Small Business Automation Survey",
      pageDescription: "A free automation survey for small businesses. We review how bookings, inquiries, retention, and operations could be automated for the first 100 responses.",
      brandMark: "Small Business Automation Survey",
      brandCopy: "First 100 responses",
      topCta: "Apply now",
      heroEyebrow: "small business automation survey",
      heroTitle: "Thinking about AI for your business, but still hesitating?",
      heroText: "Are you repeating the same booking inquiries every day? Is customer follow-up scattered across tools? Are orders and daily operations becoming harder to manage by hand? We are currently reviewing the first 100 responses for free. If your idea is selected, you may be chosen for free access to the full service and priority onboarding.",
      heroPrimaryCta: "Apply now",
      heroSecondaryCta: "See example cases",
      heroPoint1: "First 100 responses",
      heroPoint2: "One submission per email",
      heroPoint3: "Relevant cases reviewed first",
      heroCardLabel: "Common issues we review",
      heroCardItem1: "Phone, DM, or Kakao inquiries repeat constantly",
      heroCardItem2: "Repeat customer management is scattered manually",
      heroCardItem3: "Announcements, coupons, and messages are sent by hand",
      heroCardItem4: "Orders, schedules, and operations keep getting messy",
      signal1Title: "Who is this for?",
      signal1Copy: "Restaurant owners, cafe owners, salons, nail shops, instructors, online sellers, and local service operators",
      signal2Title: "What you receive",
      signal2Copy: "A summary of the problem, possible automation directions, needed inputs, and next actions",
      promoEyebrow: "no-cost survey",
      promoTitle: "Do you have to pay just to get a consultation? No.",
      promoCopy: "This is a free diagnostic survey stage. You can submit without pressure. If your idea is selected, you may be chosen for free access to the full service and priority onboarding.",
      categoriesEyebrow: "category map",
      categoriesTitle: "Most repetitive problems fall into one of these four categories.",
      categoriesCopy: "It does not need to be exact. Choose the closest option and explain your situation comfortably.",
      category1Title: "Bookings / Inquiries",
      category1Copy: "When calls, DMs, or Kakao inquiries repeat and booking management keeps breaking down",
      category1Item1: "Salon booking inquiries",
      category1Item2: "Cafe group reservation inquiries",
      category1Item3: "Lesson schedule inquiries",
      category2Title: "Retention / Repeat Visits",
      category2Copy: "When customer follow-up, review requests, and return prompts are handled manually",
      category2Item1: "Return-visit reminders",
      category2Item2: "Review request messages",
      category2Item3: "Coupon delivery",
      category3Title: "Marketing / Messaging",
      category3Copy: "When event notices, new menu updates, and promo messages are sent manually every time",
      category3Item1: "New menu alerts",
      category3Item2: "Holiday / opening hours notices",
      category3Item3: "Targeted customer messages",
      category4Title: "Orders / Operations",
      category4Copy: "When order checks, delivery inquiries, scheduling, and simple operational tasks repeat",
      category4Item1: "Smart Store inquiry handling",
      category4Item2: "Order status updates",
      category4Item3: "Operations checklist management",
      howEyebrow: "how it works",
      howTitle: "You do not need to prepare anything complicated. Just tell us what feels most repetitive in your business.",
      how1Title: "1. Describe the issue",
      how1Copy: "Choose the closest industry and problem category, then explain your current situation.",
      how2Title: "2. Get a free review",
      how2Copy: "We review what kinds of automation may be realistic for your operation.",
      how3Title: "3. Follow-up if relevant",
      how3Copy: "Relevant cases may move into priority consultation or early implementation review.",
      whyEyebrow: "why now",
      whyTitle: "This is not just a free event. It is a process to identify automation methods that can actually be used in real operations.",
      benefitTitle: "What applicants receive",
      benefitItem1: "A first-pass diagnosis for your business",
      benefitItem2: "Two or three realistic automation ideas",
      benefitItem3: "Priority consideration before the official launch",
      benefitItem4: "If selected, free access to the full service and priority onboarding",
      checkTitle: "What we are validating",
      checkItem1: "Which industries and problem types appear most often",
      checkItem2: "Which patterns can be diagnosed without many follow-up questions",
      checkItem3: "Which cases have stronger paid conversion potential",
      checkItem4: "Which cases can become standard playbooks",
      applyEyebrow: "apply now",
      applyTitle: "Apply for a free review",
      applyCopy: "This survey is limited to the first 100 responses, and each email can only submit once. Relevant cases are reviewed first.",
      labelEmail: "Email",
      labelPhone: "Phone number",
      labelIndustry: "Industry",
      labelScope: "What do you most want to reduce?",
      templateFootnote: "It does not need to match perfectly. Feel free to describe your case in your own words.",
      labelMessage: "Current situation",
      messagePlaceholder: "Example: I keep handling the same booking requests through phone and Instagram DMs, and the calendar often gets out of sync.",
      messageError: "Please write at least 100 characters for your current situation.",
      linksTitle: "Reference links (optional)",
      linksCopy: "You may share up to three links such as your store page, booking page, Instagram, Smart Store, or screenshots that help explain your workflow.",
      link1Placeholder: "Link 1",
      link2Placeholder: "Link 2",
      link3Placeholder: "Link 3",
      labelFollowup: "I am okay with being contacted if my idea is selected",
      labelPaidIntent: "If needed, I may be willing to pay for outsourcing or implementation",
      confirmTitle: "Before you submit",
      confirmItem1: "If your idea is selected, you may be chosen for free access to the full service and priority onboarding.",
      submitButton: "Submit free survey",
      submitPending: "Submitting...",
      submitFailed: "Submission failed. Please try again shortly.",
      submitTooShort: "Please write at least 100 characters for your current situation.",
      industryPlaceholder: "Please select",
      industryOptions: ["Restaurant / Cafe", "Beauty / Salon", "Lessons / Education", "Online Selling", "Local Service", "Other"],
      scopePlaceholder: "Please select",
      scopeOptions: ["Bookings / Inquiries", "Retention / Repeat Visits", "Marketing / Messaging", "Orders / Operations", "Not sure"],
      followupPlaceholder: "Please select",
      followupYes: "Yes",
      followupNo: "No, I only want the review",
      paidPlaceholder: "Please select",
      paidYes: "Yes",
      paidMaybe: "Maybe, depending on the proposal",
      paidNo: "No, not at the moment",
    },
  };

  function updateCount() {
    count.textContent = messageField.value.length + " / 5000";
  }

  function validateMessage() {
    const length = messageField.value.trim().length;
    const isValid = length >= 100;
    messageError.hidden = isValid || length === 0;
    return isValid;
  }

  function updateScopeTemplate() {
    const selected = scopeField.value;
    const templateSet = scopeTemplates[selected];
    const template = templateSet ? templateSet[currentLang] : null;

    if (!template) {
      scopeTemplate.hidden = true;
      return;
    }

    templateTitle.textContent = template.title;
    templateCopy.textContent = template.copy;
    templateList.innerHTML = template.items.map(function (item) {
      return "<li>" + item + "</li>";
    }).join("");
    messageGuide.textContent = template.guide;
    scopeTemplate.hidden = false;
  }

  function setSubmitting(isSubmitting) {
    submitButton.disabled = isSubmitting;
    const t = translations[currentLang] || translations.ko;
    submitButton.textContent = isSubmitting ? t.submitPending : t.submitButton;
  }

  function getSelectLabel(selectElement) {
    const option = selectElement.options[selectElement.selectedIndex];
    return option ? option.textContent.trim() : "";
  }

  function getPayload() {
    const referenceLinks = [
      document.getElementById("reference-link-1").value.trim(),
      document.getElementById("reference-link-2").value.trim(),
      document.getElementById("reference-link-3").value.trim(),
    ].filter(Boolean);

    const industryField = document.getElementById("industry");
    const scopeFieldElement = document.getElementById("scope");

    return {
      language: currentLang,
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      industry: industryField.value,
      industryLabel: getSelectLabel(industryField),
      scope: scopeFieldElement.value,
      scopeLabel: getSelectLabel(scopeFieldElement),
      followupConsent: document.getElementById("followup").value,
      paidIntent: document.getElementById("paid-intent").value,
      message: messageField.value.trim(),
      referenceLinks: referenceLinks,
      submittedAt: new Date().toISOString(),
      status: "new",
    };
  }

  async function submitToFormspree(payload) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }
  }

  function saveDemoSubmission(payload) {
    const entries = JSON.parse(localStorage.getItem("ftai-pilot-submissions") || "[]");
    entries.push(payload);
    localStorage.setItem("ftai-pilot-submissions", JSON.stringify(entries));
  }

  function redirectToThanks(email) {
    const nextUrl = "./thanks.html?email=" + encodeURIComponent(email || "") + "&lang=" + encodeURIComponent(currentLang);
    window.location.href = nextUrl;
  }

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) {
      node.textContent = value;
    }
  }

  function applySelectTexts(selectId, placeholder, values) {
    const select = document.getElementById(selectId);
    if (!select) {
      return;
    }
    if (select.options[0]) {
      select.options[0].textContent = placeholder;
    }
    values.forEach(function (label, index) {
      if (select.options[index + 1]) {
        select.options[index + 1].textContent = label;
      }
    });
  }

  function applyLanguage(lang) {
    currentLang = lang;
    const t = translations[lang] || translations.ko;
    document.documentElement.lang = lang;
    document.title = t.pageTitle;
    document.querySelector('meta[name="description"]').setAttribute("content", t.pageDescription);
    setText("brand-mark", t.brandMark);
    setText("brand-copy", t.brandCopy);
    setText("top-cta", t.topCta);
    setText("hero-eyebrow", t.heroEyebrow);
    setText("hero-title", t.heroTitle);
    setText("hero-text", t.heroText);
    setText("hero-primary-cta", t.heroPrimaryCta);
    setText("hero-secondary-cta", t.heroSecondaryCta);
    setText("hero-point-1", t.heroPoint1);
    setText("hero-point-2", t.heroPoint2);
    setText("hero-point-3", t.heroPoint3);
    setText("hero-card-label", t.heroCardLabel);
    setText("hero-card-item-1", t.heroCardItem1);
    setText("hero-card-item-2", t.heroCardItem2);
    setText("hero-card-item-3", t.heroCardItem3);
    setText("hero-card-item-4", t.heroCardItem4);
    setText("signal-1-title", t.signal1Title);
    setText("signal-1-copy", t.signal1Copy);
    setText("signal-2-title", t.signal2Title);
    setText("signal-2-copy", t.signal2Copy);
    setText("promo-eyebrow", t.promoEyebrow);
    setText("promo-title", t.promoTitle);
    setText("promo-copy", t.promoCopy);
    setText("categories-eyebrow", t.categoriesEyebrow);
    setText("categories-title", t.categoriesTitle);
    setText("categories-copy", t.categoriesCopy);
    setText("category-1-title", t.category1Title);
    setText("category-1-copy", t.category1Copy);
    setText("category-1-item-1", t.category1Item1);
    setText("category-1-item-2", t.category1Item2);
    setText("category-1-item-3", t.category1Item3);
    setText("category-2-title", t.category2Title);
    setText("category-2-copy", t.category2Copy);
    setText("category-2-item-1", t.category2Item1);
    setText("category-2-item-2", t.category2Item2);
    setText("category-2-item-3", t.category2Item3);
    setText("category-3-title", t.category3Title);
    setText("category-3-copy", t.category3Copy);
    setText("category-3-item-1", t.category3Item1);
    setText("category-3-item-2", t.category3Item2);
    setText("category-3-item-3", t.category3Item3);
    setText("category-4-title", t.category4Title);
    setText("category-4-copy", t.category4Copy);
    setText("category-4-item-1", t.category4Item1);
    setText("category-4-item-2", t.category4Item2);
    setText("category-4-item-3", t.category4Item3);
    setText("how-eyebrow", t.howEyebrow);
    setText("how-title", t.howTitle);
    setText("how-1-title", t.how1Title);
    setText("how-1-copy", t.how1Copy);
    setText("how-2-title", t.how2Title);
    setText("how-2-copy", t.how2Copy);
    setText("how-3-title", t.how3Title);
    setText("how-3-copy", t.how3Copy);
    setText("why-eyebrow", t.whyEyebrow);
    setText("why-title", t.whyTitle);
    setText("benefit-title", t.benefitTitle);
    setText("benefit-item-1", t.benefitItem1);
    setText("benefit-item-2", t.benefitItem2);
    setText("benefit-item-3", t.benefitItem3);
    setText("benefit-item-4", t.benefitItem4);
    setText("check-title", t.checkTitle);
    setText("check-item-1", t.checkItem1);
    setText("check-item-2", t.checkItem2);
    setText("check-item-3", t.checkItem3);
    setText("check-item-4", t.checkItem4);
    setText("apply-eyebrow", t.applyEyebrow);
    setText("apply-title", t.applyTitle);
    setText("apply-copy", t.applyCopy);
    setText("label-email", t.labelEmail);
    setText("label-phone", t.labelPhone);
    setText("label-industry", t.labelIndustry);
    setText("label-scope", t.labelScope);
    setText("template-footnote", t.templateFootnote);
    setText("label-message", t.labelMessage);
    setText("message-error", t.messageError);
    setText("links-title", t.linksTitle);
    setText("links-copy", t.linksCopy);
    setText("label-followup", t.labelFollowup);
    setText("label-paid-intent", t.labelPaidIntent);
    setText("confirm-title", t.confirmTitle);
    setText("confirm-item-1", t.confirmItem1);
    document.getElementById("message").placeholder = t.messagePlaceholder;
    document.getElementById("phone").placeholder = lang === "ko" ? "선택 입력" : "Optional";
    document.getElementById("reference-link-1").placeholder = t.link1Placeholder;
    document.getElementById("reference-link-2").placeholder = t.link2Placeholder;
    document.getElementById("reference-link-3").placeholder = t.link3Placeholder;
    applySelectTexts("industry", t.industryPlaceholder, t.industryOptions);
    applySelectTexts("scope", t.scopePlaceholder, t.scopeOptions);
    applySelectTexts("followup", t.followupPlaceholder, [t.followupYes, t.followupNo]);
    applySelectTexts("paid-intent", t.paidPlaceholder, [t.paidYes, t.paidMaybe, t.paidNo]);
    langKoButton.classList.toggle("is-active", lang === "ko");
    langEnButton.classList.toggle("is-active", lang === "en");
    localStorage.setItem("oovelo-lang", lang);
    updateScopeTemplate();
    setSubmitting(false);
  }

  messageField.addEventListener("input", updateCount);
  messageField.addEventListener("input", validateMessage);
  scopeField.addEventListener("change", updateScopeTemplate);

  updateCount();
  validateMessage();
  applyLanguage(currentLang);

  if (!endpoint) {
    success.textContent = "현재는 데모 모드입니다. site-config.js에 Formspree endpoint를 넣으면 실제 이메일 수집으로 전환됩니다.";
  }

  langKoButton.addEventListener("click", function () {
    applyLanguage("ko");
  });

  langEnButton.addEventListener("click", function () {
    applyLanguage("en");
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    success.textContent = "";

    if (!validateMessage()) {
      success.textContent = (translations[currentLang] || translations.ko).submitTooShort;
      messageField.focus();
      return;
    }

    setSubmitting(true);

    const payload = getPayload();

    try {
      if (endpoint) {
        await submitToFormspree(payload);
        redirectToThanks(payload.email);
      } else {
        saveDemoSubmission(payload);
        redirectToThanks(payload.email);
      }

      form.reset();
      updateCount();
      updateScopeTemplate();
    } catch (error) {
      success.textContent = (translations[currentLang] || translations.ko).submitFailed;
    } finally {
      setSubmitting(false);
    }
  });
})();
