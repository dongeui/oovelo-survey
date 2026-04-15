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
  const config = window.FTAI_CONFIG || {};
  const endpoint = config.formEndpoint || "";

  const scopeTemplates = {
    "예약/문의 응대": {
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
    "고객관리/재방문": {
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
    "홍보/메시지 발송": {
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
    "주문/운영 정리": {
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
    "잘 모르겠어요": {
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
  };

  function updateCount() {
    count.textContent = messageField.value.length + " / 2000";
  }

  function updateScopeTemplate() {
    const selected = scopeField.value;
    const template = scopeTemplates[selected];

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
    submitButton.textContent = isSubmitting ? "제출 중..." : "무료 진단 신청하기";
  }

  function getPayload() {
    const referenceLinks = [
      document.getElementById("reference-link-1").value.trim(),
      document.getElementById("reference-link-2").value.trim(),
      document.getElementById("reference-link-3").value.trim(),
    ].filter(Boolean);

    return {
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      industry: document.getElementById("industry").value,
      scope: document.getElementById("scope").value,
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
    const nextUrl = "./thanks.html?email=" + encodeURIComponent(email || "");
    window.location.href = nextUrl;
  }

  messageField.addEventListener("input", updateCount);
  scopeField.addEventListener("change", updateScopeTemplate);

  updateCount();
  updateScopeTemplate();

  if (!endpoint) {
    success.textContent = "현재는 데모 모드입니다. site-config.js에 Formspree endpoint를 넣으면 실제 이메일 수집으로 전환됩니다.";
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    success.textContent = "";
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
      success.textContent = "제출에 실패했습니다. 잠시 후 다시 시도해 주세요.";
    } finally {
      setSubmitting(false);
    }
  });
})();
