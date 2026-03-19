import { useEffect, useRef } from "react";

const GuiaGmn = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Load EmailJS SDK
    const emailjsScript = document.createElement("script");
    emailjsScript.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    document.body.appendChild(emailjsScript);

    // Load QRious
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/qrious@4.0.2/dist/qrious.min.js";
    script.onload = () => {
      executePageScripts();
    };
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      if (document.body.contains(script)) document.body.removeChild(script);
      if (document.body.contains(emailjsScript)) document.body.removeChild(emailjsScript);
    };
  }, []);

  const executePageScripts = () => {
    const PIX_KEY = "35668970000";
    const SELLER_EMAIL = "midiavision.web@gmail.com";
    const PRODUCT_NAME = "Guia Google Meu Negócio para Corretores";
    const PRICE = "R$ 67,00";

    function crc16(str: string) {
      let crc = 0xffff;
      for (let i = 0; i < str.length; i++) {
        crc ^= str.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
          crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
        }
      }
      return (crc & 0xffff).toString(16).toUpperCase().padStart(4, "0");
    }

    function tlv(id: string, value: string) {
      const len = String(value.length).padStart(2, "0");
      return id + len + value;
    }

    function buildPixPayload(key: string, amount: string) {
      const gui = tlv("00", "BR.GOV.BCB.PIX");
      const pixKey = tlv("01", key);
      const mai = tlv("26", gui + pixKey);
      const mcc = tlv("52", "0000");
      const currency = tlv("53", "986");
      const amtStr = tlv("54", parseFloat(amount).toFixed(2));
      const country = tlv("58", "BR");
      const name = tlv("59", "MIDIAVISION");
      const city = tlv("60", "PORTOALEGRE");
      const add = tlv("62", tlv("05", "***"));
      const payload = mai + mcc + currency + amtStr + country + name + city + add;
      const withoutCRC = "000201" + payload + "6304";
      return withoutCRC + crc16(withoutCRC);
    }

    function renderQR() {
      const canvas = document.getElementById("qrCanvas") as HTMLCanvasElement;
      if (!canvas) return;
      const payload = buildPixPayload(PIX_KEY, "67.00");
      if ((window as any).QRious) {
        new (window as any).QRious({
          element: canvas,
          value: payload,
          size: 180,
          foreground: "#0F2744",
          background: "#FFFFFF",
          level: "M",
        });
      }
    }

    function showToast() {
      const t = document.getElementById("toast");
      if (!t) return;
      t.classList.add("show");
      setTimeout(() => t.classList.remove("show"), 2500);
    }

    function copyPix() {
      navigator.clipboard
        .writeText(PIX_KEY)
        .then(showToast)
        .catch(() => {
          const el = document.createElement("textarea");
          el.value = PIX_KEY;
          document.body.appendChild(el);
          el.select();
          document.execCommand("copy");
          document.body.removeChild(el);
          showToast();
        });
    }

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function isValidEmail(email: string): boolean {
      return EMAIL_REGEX.test(email);
    }

    function validateSingleEmail(inputId: string, msgId: string) {
      const input = document.getElementById(inputId) as HTMLInputElement;
      const msg = document.getElementById(msgId);
      if (!input || !msg) return;
      const val = input.value.trim();
      if (!val) { msg.style.display = "none"; input.style.borderColor = "#E5E7EB"; return; }
      if (!isValidEmail(val)) {
        msg.style.display = "block";
        msg.style.color = "#DC2626";
        msg.textContent = "❌ Digite um e-mail válido, ex: seunome@gmail.com";
        input.style.borderColor = "#DC2626";
      } else {
        msg.style.display = "none";
        input.style.borderColor = "#22a052";
      }
    }

    function validateEmailMatch() {
      const e1 = (document.getElementById("buyerEmail") as HTMLInputElement)?.value.trim();
      const e2 = (document.getElementById("buyerEmailConfirm") as HTMLInputElement)?.value.trim();
      const msg = document.getElementById("emailMatchMsg");
      if (!msg || !e2) {
        if (msg) msg.style.display = "none";
        return;
      }
      if (!isValidEmail(e2)) {
        return; // individual validation handles this
      }
      if (e1 === e2) {
        msg.style.display = "block";
        msg.style.color = "#166534";
        msg.textContent = "✅ E-mails conferem!";
        (document.getElementById("buyerEmailConfirm") as HTMLInputElement).style.borderColor = "#22a052";
      } else {
        msg.style.display = "block";
        msg.style.color = "#DC2626";
        msg.textContent = "❌ Os e-mails não conferem. Verifique.";
        (document.getElementById("buyerEmailConfirm") as HTMLInputElement).style.borderColor = "#DC2626";
      }
    }

    function openModal() {
      document.getElementById("modalOverlay")?.classList.add("active");
      document.getElementById("step1")?.classList.add("active");
      document.getElementById("step2")?.classList.remove("active");
      (document.getElementById("buyerEmail") as HTMLInputElement).value = "";
      (document.getElementById("buyerEmailConfirm") as HTMLInputElement).value = "";
      const msg = document.getElementById("emailMatchMsg");
      if (msg) msg.style.display = "none";
      const ev = document.getElementById("emailValidMsg");
      if (ev) ev.style.display = "none";
      const ecv = document.getElementById("emailConfirmValidMsg");
      if (ecv) ecv.style.display = "none";
      setTimeout(renderQR, 150);
    }

    function closeModal() {
      document.getElementById("modalOverlay")?.classList.remove("active");
    }

    function goStep2() {
      const email = (document.getElementById("buyerEmail") as HTMLInputElement)?.value.trim();
      const emailConfirm = (document.getElementById("buyerEmailConfirm") as HTMLInputElement)?.value.trim();
      const input = document.getElementById("buyerEmail") as HTMLInputElement;
      const inputConfirm = document.getElementById("buyerEmailConfirm") as HTMLInputElement;
      const msg = document.getElementById("emailMatchMsg");

      if (!email || !isValidEmail(email)) {
        input.style.borderColor = "#DC2626";
        const emailErrMsg = document.getElementById("emailValidMsg");
        if (emailErrMsg) {
          emailErrMsg.style.display = "block";
          emailErrMsg.style.color = "#DC2626";
          emailErrMsg.textContent = "❌ Digite um e-mail válido, ex: seunome@gmail.com";
        }
        input.focus();
        return;
      }
      if (!isValidEmail(emailConfirm)) {
        inputConfirm.style.borderColor = "#DC2626";
        const confirmErrMsg = document.getElementById("emailConfirmValidMsg");
        if (confirmErrMsg) {
          confirmErrMsg.style.display = "block";
          confirmErrMsg.style.color = "#DC2626";
          confirmErrMsg.textContent = "❌ Digite um e-mail válido, ex: seunome@gmail.com";
        }
        inputConfirm.focus();
        return;
      }
      if (email !== emailConfirm) {
        inputConfirm.style.borderColor = "#DC2626";
        if (msg) {
          msg.style.display = "block";
          msg.style.color = "#DC2626";
          msg.textContent = "❌ Os e-mails não conferem. Verifique.";
        }
        inputConfirm.focus();
        return;
      }
      document.getElementById("step1")?.classList.remove("active");
      document.getElementById("step2")?.classList.add("active");
    }

    async function showSuccessStep() {
      const buyerEmail = (document.getElementById("buyerEmail") as HTMLInputElement)?.value || "";
      const sendBtnEl = document.getElementById("sendBtn");
      if (sendBtnEl) {
        sendBtnEl.textContent = "⏳ Enviando...";
        (sendBtnEl as HTMLButtonElement).disabled = true;
      }

      try {
        const emailjs = (window as any).emailjs;
        if (!emailjs) throw new Error("EmailJS não carregado");

        await emailjs.send(
          "service_tbtjshe",
          "template_jycz3b8",
          {
            buyer_email: buyerEmail,
            product_name: PRODUCT_NAME,
            price: PRICE,
            to_email: SELLER_EMAIL,
          },
          "cAwcsr87WURqSY0av"
        );

        // Show success step
        document.getElementById("step2")?.classList.remove("active");
        document.getElementById("step3")?.classList.add("active");
      } catch (err) {
        console.error("Erro ao enviar email:", err);
        alert("Erro ao enviar e-mail. Tente novamente.");
        if (sendBtnEl) {
          sendBtnEl.textContent = "✉️ Enviar";
          (sendBtnEl as HTMLButtonElement).disabled = false;
        }
      }
    }

    // Attach event listeners
    document.querySelectorAll('[data-action="openModal"]').forEach((el) => el.addEventListener("click", openModal));
    document.querySelectorAll('[data-action="closeModal"]').forEach((el) => el.addEventListener("click", closeModal));
    document.querySelectorAll('[data-action="copyPix"]').forEach((el) => el.addEventListener("click", copyPix));
    document.querySelectorAll('[data-action="goStep2"]').forEach((el) => el.addEventListener("click", goStep2));

    const sendBtn = document.getElementById("sendBtn");
    if (sendBtn) {
      sendBtn.addEventListener("click", showSuccessStep);
    }

    const overlay = document.getElementById("modalOverlay");
    if (overlay)
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
      });

    const emailConfirmInput = document.getElementById("buyerEmailConfirm");
    if (emailConfirmInput) emailConfirmInput.addEventListener("blur", validateEmailMatch);
    const emailInput = document.getElementById("buyerEmail");
    if (emailInput) {
      emailInput.addEventListener("blur", () => validateSingleEmail("buyerEmail", "emailValidMsg"));
      emailInput.addEventListener("focus", function (this: HTMLInputElement) {
        this.style.borderColor = "#1B3A6B";
        this.style.background = "#fff";
      });
    }
    if (emailConfirmInput) {
      emailConfirmInput.addEventListener("blur", () => {
        validateSingleEmail("buyerEmailConfirm", "emailConfirmValidMsg");
        validateEmailMatch();
      });
      emailConfirmInput.addEventListener("focus", function (this: HTMLInputElement) {
        this.style.borderColor = "#1B3A6B";
        this.style.background = "#fff";
      });
    }
  };

  const htmlContent = `
<style>
  .gmn-page { --navy: #0F2744; --navy-mid: #1B3A6B; --gold: #C8943A; --gold-light: #F0B94A; --cream: #FAF7F2; --white: #FFFFFF; --gray: #6B7280; --light: #F3F0EA; --green: #166534; --red: #9B1C1C; }
  .gmn-page * { margin: 0; padding: 0; box-sizing: border-box; }
  .gmn-page { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--navy); overflow-x: hidden; }
  .gmn-page .hero { background: var(--navy); position: relative; overflow: hidden; padding: 0; }
  .gmn-page .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 70% 50%, rgba(200,148,58,0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 80% at 10% 80%, rgba(27,58,107,0.6) 0%, transparent 60%); }
  .gmn-page .hero-grid { display: grid; grid-template-columns: 1fr 420px; min-height: 100vh; max-width: 1200px; margin: 0 auto; padding: 80px 40px; gap: 60px; align-items: center; position: relative; z-index: 1; }
  .gmn-page .badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(200,148,58,0.15); border: 1px solid rgba(200,148,58,0.4); color: var(--gold-light); font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 6px 16px; border-radius: 100px; margin-bottom: 28px; }
  .gmn-page .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(38px, 5vw, 60px); font-weight: 900; color: var(--white); line-height: 1.1; margin-bottom: 24px; }
  .gmn-page .hero h1 span { color: var(--gold-light); display: block; }
  .gmn-page .hero-sub { font-size: 18px; color: rgba(255,255,255,0.72); line-height: 1.7; margin-bottom: 40px; max-width: 540px; font-weight: 300; }
  .gmn-page .hero-bullets { list-style: none; display: flex; flex-direction: column; gap: 14px; margin-bottom: 48px; }
  .gmn-page .hero-bullets li { display: flex; align-items: center; gap: 12px; color: rgba(255,255,255,0.88); font-size: 16px; }
  .gmn-page .hero-bullets li::before { content: ''; width: 20px; height: 20px; min-width: 20px; background: var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' width='12' height='12'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: center; background-size: 12px; }
  .gmn-page .buy-card { background: var(--white); border-radius: 24px; padding: 40px 36px; box-shadow: 0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08); position: relative; }
  .gmn-page .buy-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, var(--gold), var(--gold-light)); border-radius: 24px 24px 0 0; }
  .gmn-page .price-label { font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gray); margin-bottom: 8px; }
  .gmn-page .price-strike { font-size: 16px; color: var(--gray); text-decoration: line-through; margin-bottom: 4px; }
  .gmn-page .price-main { font-family: 'Playfair Display', serif; font-size: 56px; font-weight: 900; color: var(--navy); line-height: 1; margin-bottom: 4px; }
  .gmn-page .price-main sup { font-size: 24px; vertical-align: top; margin-top: 10px; display: inline-block; }
  .gmn-page .price-note { font-size: 13px; color: var(--gray); margin-bottom: 28px; }
  .gmn-page .divider { height: 1px; background: #E5E7EB; margin: 24px 0; }
  .gmn-page .includes-title { font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gray); margin-bottom: 14px; }
  .gmn-page .includes-list { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
  .gmn-page .includes-list li { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: var(--navy); line-height: 1.5; }
  .gmn-page .includes-list li .icon { font-size: 16px; min-width: 20px; }
  .gmn-page .btn-pix { display: block; width: 100%; background: linear-gradient(135deg, #1a7a3c, #22a052); color: white; text-align: center; padding: 18px; border-radius: 14px; font-size: 17px; font-weight: 600; text-decoration: none; letter-spacing: 0.01em; transition: all 0.2s; box-shadow: 0 8px 24px rgba(34,160,82,0.35); cursor: pointer; border: none; font-family: 'DM Sans', sans-serif; margin-bottom: 12px; }
  .gmn-page .btn-pix:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(34,160,82,0.45); }
  .gmn-page .btn-pix span { display: block; font-size: 12px; font-weight: 400; opacity: 0.85; margin-top: 2px; }
  .gmn-page .guarantee { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--gray); justify-content: center; margin-top: 16px; }
  .gmn-page .modal-overlay { display: none; position: fixed; inset: 0; background: rgba(15,39,68,0.85); backdrop-filter: blur(6px); z-index: 1000; align-items: flex-start; justify-content: center; padding: 20px; overflow-y: auto; -webkit-overflow-scrolling: touch; }
  .gmn-page .modal-overlay.active { display: flex; }
  .gmn-page .modal { background: var(--white); border-radius: 24px; padding: 48px 40px; max-width: 480px; width: 100%; text-align: center; position: relative; animation: gmn-modalIn 0.3s ease; margin: auto 0; flex-shrink: 0; }
  @keyframes gmn-modalIn { from { opacity: 0; transform: scale(0.94) translateY(12px); } to { opacity: 1; transform: scale(1) translateY(0); } }
  .gmn-page .modal-close { position: absolute; top: 16px; right: 16px; background: #F3F4F6; border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; color: var(--gray); transition: background 0.2s; }
  .gmn-page .modal-close:hover { background: #E5E7EB; }
  .gmn-page .modal-step { display: none; }
  .gmn-page .modal-step.active { display: block; }
  .gmn-page .step-badge { display: inline-block; background: var(--navy); color: white; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 12px; border-radius: 100px; margin-bottom: 20px; }
  .gmn-page .modal h3 { font-family: 'Playfair Display', serif; font-size: 26px; color: var(--navy); margin-bottom: 8px; }
  .gmn-page .modal p { color: var(--gray); font-size: 14px; line-height: 1.6; margin-bottom: 24px; }
  .gmn-page .pix-key-box { background: #F0F7FF; border: 2px dashed #93C5FD; border-radius: 12px; padding: 20px; margin-bottom: 20px; }
  .gmn-page .pix-key-label { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gray); margin-bottom: 6px; }
  .gmn-page .pix-key-value { font-size: 22px; font-weight: 700; color: var(--navy); letter-spacing: 0.05em; font-family: 'DM Sans', monospace; }
  .gmn-page .pix-price { font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 900; color: #166534; margin-bottom: 6px; }
  .gmn-page .pix-name { font-size: 13px; color: var(--gray); margin-bottom: 24px; }
  .gmn-page .btn-copy { display: block; width: 100%; background: var(--navy); color: white; border: none; padding: 14px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; margin-bottom: 12px; }
  .gmn-page .btn-copy:hover { background: var(--navy-mid); }
  .gmn-page .btn-done { display: block; width: 100%; background: linear-gradient(135deg, #1a7a3c, #22a052); color: white; border: none; padding: 14px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; box-shadow: 0 4px 16px rgba(34,160,82,0.3); }
  .gmn-page .btn-done:hover { transform: translateY(-1px); }
  .gmn-page .btn-wpp { display: flex; align-items: center; justify-content: center; gap: 12px; width: 100%; background: #25D366; color: white; text-decoration: none; padding: 16px; border-radius: 12px; font-size: 16px; font-weight: 600; transition: all 0.2s; box-shadow: 0 6px 20px rgba(37,211,102,0.35); margin-bottom: 16px; }
  .gmn-page .btn-wpp:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(37,211,102,0.45); }
  .gmn-page .wpp-icon { width: 28px; height: 28px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; }
  .gmn-page section { padding: 80px 40px; }
  .gmn-page .container { max-width: 1100px; margin: 0 auto; }
  .gmn-page .section-label { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold); margin-bottom: 12px; }
  .gmn-page .section-title { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 44px); font-weight: 700; color: var(--navy); line-height: 1.2; margin-bottom: 16px; }
  .gmn-page .section-sub { font-size: 17px; color: var(--gray); line-height: 1.7; max-width: 600px; }
  .gmn-page .problem-section { background: var(--navy); color: white; }
  .gmn-page .problem-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px; }
  .gmn-page .problem-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 28px; }
  .gmn-page .problem-card .emoji { font-size: 32px; margin-bottom: 16px; }
  .gmn-page .problem-card h4 { font-size: 17px; font-weight: 600; color: white; margin-bottom: 10px; }
  .gmn-page .problem-card p { font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.6; }
  .gmn-page .solution-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; margin-top: 56px; }
  .gmn-page .module-list { display: flex; flex-direction: column; gap: 16px; }
  .gmn-page .module-item { display: flex; gap: 16px; align-items: flex-start; padding: 20px; background: white; border-radius: 14px; border: 1px solid #E5E7EB; transition: all 0.2s; }
  .gmn-page .module-item:hover { border-color: var(--gold); box-shadow: 0 4px 20px rgba(200,148,58,0.12); transform: translateX(4px); }
  .gmn-page .module-num { width: 36px; height: 36px; min-width: 36px; background: var(--navy); color: white; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; }
  .gmn-page .module-info h5 { font-size: 15px; font-weight: 600; color: var(--navy); margin-bottom: 4px; }
  .gmn-page .module-info p { font-size: 13px; color: var(--gray); line-height: 1.5; }
  .gmn-page .highlight-box { background: var(--navy); border-radius: 20px; padding: 40px; color: white; position: relative; overflow: hidden; }
  .gmn-page .highlight-box::before { content: ''; position: absolute; top: -40px; right: -40px; width: 200px; height: 200px; border-radius: 50%; background: rgba(200,148,58,0.15); }
  .gmn-page .highlight-box h3 { font-family: 'Playfair Display', serif; font-size: 28px; margin-bottom: 20px; position: relative; }
  .gmn-page .highlight-box ul { list-style: none; display: flex; flex-direction: column; gap: 12px; position: relative; }
  .gmn-page .highlight-box ul li { display: flex; gap: 10px; font-size: 14px; color: rgba(255,255,255,0.85); line-height: 1.5; }
  .gmn-page .highlight-box ul li::before { content: '✦'; color: var(--gold-light); font-size: 12px; margin-top: 2px; min-width: 14px; }
  .gmn-page .templates-section { background: var(--light); }
  .gmn-page .months-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 40px; }
  .gmn-page .month-card { background: white; border-radius: 12px; padding: 16px; text-align: center; border: 1px solid #E5E7EB; transition: all 0.2s; }
  .gmn-page .month-card:hover { border-color: var(--gold); transform: translateY(-3px); box-shadow: 0 8px 24px rgba(200,148,58,0.15); }
  .gmn-page .month-card .m-icon { font-size: 24px; margin-bottom: 8px; }
  .gmn-page .month-card .m-name { font-size: 13px; font-weight: 700; color: var(--navy); margin-bottom: 4px; }
  .gmn-page .month-card .m-posts { font-size: 11px; color: var(--gray); }
  .gmn-page .audience-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 40px; }
  .gmn-page .audience-card { display: flex; gap: 16px; align-items: flex-start; padding: 24px; border-radius: 14px; border: 1px solid #E5E7EB; background: white; }
  .gmn-page .audience-card.yes { border-left: 4px solid #22a052; }
  .gmn-page .audience-card.no { border-left: 4px solid #DC2626; opacity: 0.65; }
  .gmn-page .aud-icon { font-size: 28px; }
  .gmn-page .audience-card h5 { font-size: 15px; font-weight: 600; color: var(--navy); margin-bottom: 6px; }
  .gmn-page .audience-card p { font-size: 13px; color: var(--gray); line-height: 1.5; }
  .gmn-page .faq-section { background: var(--cream); }
  .gmn-page .faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 40px; }
  .gmn-page .faq-item { background: white; border-radius: 14px; padding: 24px; border: 1px solid #E5E7EB; }
  .gmn-page .faq-item h5 { font-size: 15px; font-weight: 600; color: var(--navy); margin-bottom: 10px; display: flex; gap: 10px; align-items: flex-start; }
  .gmn-page .faq-item h5::before { content: 'P'; background: var(--gold); color: white; font-size: 11px; font-weight: 700; width: 20px; height: 20px; min-width: 20px; border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-top: 1px; }
  .gmn-page .faq-item p { font-size: 14px; color: var(--gray); line-height: 1.6; padding-left: 30px; }
  .gmn-page .cta-final { background: var(--navy); text-align: center; padding: 100px 40px; }
  .gmn-page .cta-final h2 { font-family: 'Playfair Display', serif; font-size: clamp(32px, 5vw, 52px); color: white; margin-bottom: 16px; }
  .gmn-page .cta-final h2 span { color: var(--gold-light); }
  .gmn-page .cta-final p { color: rgba(255,255,255,0.65); font-size: 17px; margin-bottom: 48px; max-width: 520px; margin-left: auto; margin-right: auto; line-height: 1.7; }
  .gmn-page .btn-cta-big { display: inline-block; background: linear-gradient(135deg, #1a7a3c, #22a052); color: white; padding: 20px 48px; border-radius: 14px; font-size: 18px; font-weight: 600; text-decoration: none; cursor: pointer; border: none; font-family: 'DM Sans', sans-serif; box-shadow: 0 12px 36px rgba(34,160,82,0.4); transition: all 0.2s; }
  .gmn-page .btn-cta-big:hover { transform: translateY(-3px); box-shadow: 0 18px 48px rgba(34,160,82,0.5); }
  .gmn-page .cta-reassure { margin-top: 24px; font-size: 13px; color: rgba(255,255,255,0.45); }
  .gmn-page footer { background: #08182E; color: rgba(255,255,255,0.4); text-align: center; padding: 32px 20px; font-size: 13px; line-height: 1.8; }
  .gmn-page footer a { color: rgba(255,255,255,0.5); }
  @media (max-width: 900px) {
    .gmn-page .hero-grid { grid-template-columns: 1fr; padding: 60px 24px; min-height: auto; gap: 40px; }
    .gmn-page .buy-card { max-width: 480px; }
    .gmn-page .problem-grid { grid-template-columns: 1fr; }
    .gmn-page .solution-grid { grid-template-columns: 1fr; }
    .gmn-page .months-grid { grid-template-columns: repeat(3, 1fr); }
    .gmn-page .audience-grid { grid-template-columns: 1fr; }
    .gmn-page .faq-grid { grid-template-columns: 1fr; }
    .gmn-page section { padding: 60px 24px; }
  }
  @media (max-width: 600px) {
    .gmn-page .months-grid { grid-template-columns: repeat(2, 1fr); }
    .gmn-page .modal { padding: 36px 24px; }
  }
  @keyframes gmn-fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  .gmn-page .hero-content > * { animation: gmn-fadeUp 0.6s ease both; }
  .gmn-page .hero-content > *:nth-child(1) { animation-delay: 0.1s; }
  .gmn-page .hero-content > *:nth-child(2) { animation-delay: 0.2s; }
  .gmn-page .hero-content > *:nth-child(3) { animation-delay: 0.3s; }
  .gmn-page .hero-content > *:nth-child(4) { animation-delay: 0.4s; }
  .gmn-page .buy-card { animation: gmn-fadeUp 0.7s ease 0.3s both; }
  .gmn-page .toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(80px); background: var(--navy); color: white; padding: 12px 24px; border-radius: 100px; font-size: 14px; font-weight: 500; z-index: 9999; transition: transform 0.3s ease; white-space: nowrap; }
  .gmn-page .toast.show { transform: translateX(-50%) translateY(0); }
</style>

<div class="hero">
  <div class="hero-grid">
    <div class="hero-content">
      <div class="badge">🏠 Mercado Imobiliário Digital</div>
      <h1>Apareça no Google<span>e atraia corretores<br>todo mês — de graça</span></h1>
      <p class="hero-sub">O guia completo para configurar, otimizar e dominar o Google Meu Negócio como corretor de imóveis. Sem anúncios pagos. Sem complicação técnica.</p>
      <ul class="hero-bullets">
        <li>Passo a passo do zero até a otimização completa</li>
        <li>12 meses de templates prontos de postagens</li>
        <li>Checklist de 30+ pontos para ranquear no top 3</li>
        <li>Estratégias de avaliações que geram confiança</li>
      </ul>
    </div>
    <div class="buy-card">
      <div class="price-label">Preço especial de lançamento</div>
      <div class="price-strike">De R$ 197,00</div>
      <div class="price-main">R$ 67</div>
      <div class="price-note">Pagamento único via Pix · Acesso imediato</div>
      <div class="divider"></div>
      <div class="includes-title">O que está incluso</div>
      <ul class="includes-list">
        <li><span class="icon">📘</span> Guia completo em PDF</li>
        <li><span class="icon">📅</span> 48 templates de postagens (12 meses)</li>
        <li><span class="icon">✅</span> Checklist de otimização completo</li>
        <li><span class="icon">📊</span> Tabela de metas e métricas</li>
        <li><span class="icon">🔁</span> Atualizações futuras gratuitas</li>
      </ul>
      <button class="btn-pix" data-action="openModal">Quero comprar por R$ 67<span>Pagar via Pix · Receba via e-mail</span></button>
      <div class="guarantee">🔒 Pagamento seguro via Pix  ·  Entrega do guia por e-mail</div>
    </div>
  </div>
</div>

<section class="problem-section">
  <div class="container">
    <div class="section-label">O problema</div>
    <div class="section-title" style="color:white">Corretores invisíveis no Google<br>perdem leads todo dia</div>
    <div class="section-sub" style="color:rgba(255,255,255,0.6)">Enquanto você não aparece, seu concorrente está recebendo ligações de clientes qualificados — de graça.</div>
    <div class="problem-grid">
      <div class="problem-card"><div class="emoji">😤</div><h4>Perfil incompleto ou abandonado</h4><p>Muitos corretores criaram o perfil mas nunca otimizaram. Resultado: aparecem nos últimos lugares ou não aparecem.</p></div>
      <div class="problem-card"><div class="emoji">💸</div><h4>Dependência de anúncios pagos</h4><p>Sem o Google orgânico funcionando, cada lead custa dinheiro. O GMN bem feito gera leads sem custo por clique.</p></div>
      <div class="problem-card"><div class="emoji">📉</div><h4>Sem avaliações, sem confiança</h4><p>Compradores de imóveis pesquisam reputação antes de ligar. Um perfil sem avaliações parece um corretor inativo.</p></div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-label">A solução</div>
    <div class="section-title">Tudo que você precisa<br>em um guia direto ao ponto</div>
    <div class="solution-grid">
      <div class="module-list">
        <div class="module-item"><div class="module-num">1</div><div class="module-info"><h5>O que é o Google Meu Negócio</h5><p>Por que ele é indispensável e a diferença entre perfil básico e otimizado</p></div></div>
        <div class="module-item"><div class="module-num">2</div><div class="module-info"><h5>Configuração do zero</h5><p>Criação da conta, categorias certas e verificação do perfil passo a passo</p></div></div>
        <div class="module-item"><div class="module-num">3</div><div class="module-info"><h5>Otimização completa</h5><p>Descrição com palavras-chave, fotos que convertem e atributos estratégicos</p></div></div>
        <div class="module-item"><div class="module-num">4</div><div class="module-info"><h5>Avaliações que vendem</h5><p>Como pedir, quando pedir e como responder avaliações positivas e negativas</p></div></div>
        <div class="module-item"><div class="module-num">5</div><div class="module-info"><h5>Postagens que geram leads</h5><p>Estrutura, frequência e tipos de postagem para manter o perfil ativo</p></div></div>
        <div class="module-item"><div class="module-num">6</div><div class="module-info"><h5>Métricas e resultados</h5><p>Como interpretar os dados e saber se seu perfil está ranqueando bem</p></div></div>
      </div>
      <div class="highlight-box">
        <h3>🎁 Bônus incluído:<br>48 templates prontos</h3>
        <ul>
          <li>4 postagens por mês, 12 meses completos</li>
          <li>Textos adaptados ao mercado imobiliário</li>
          <li>Temas sazonais (Natal, Black November, Dia das Mães…)</li>
          <li>Estrutura com gancho, conteúdo e CTA</li>
          <li>Basta substituir o nome do bairro e publicar</li>
          <li>Funciona para qualquer cidade do Brasil</li>
        </ul>
        <div style="margin-top:32px; padding-top:24px; border-top:1px solid rgba(255,255,255,0.15)">
          <div style="font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.5); margin-bottom:8px">VALOR PERCEBIDO</div>
          <div style="font-family:'Playfair Display',serif; font-size:36px; font-weight:900; color:var(--gold-light)">Tudo por R$ 67</div>
          <div style="font-size:13px; color:rgba(255,255,255,0.5); margin-top:4px">Menos que um boosted post no Instagram</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="templates-section">
  <div class="container">
    <div class="section-label">Templates prontos</div>
    <div class="section-title">12 meses de conteúdo.<br>Nunca mais fique sem postar.</div>
    <div class="section-sub">Cada mês tem 4 postagens temáticas prontas para o Google Meu Negócio, adaptadas às sazonalidades do mercado imobiliário.</div>
    <div class="months-grid">
      <div class="month-card"><div class="m-icon">🎉</div><div class="m-name">Janeiro</div><div class="m-posts">4 postagens · Novo ano</div></div>
      <div class="month-card"><div class="m-icon">📈</div><div class="m-name">Fevereiro</div><div class="m-posts">4 postagens · Investimento</div></div>
      <div class="month-card"><div class="m-icon">🏡</div><div class="m-name">Março</div><div class="m-posts">4 postagens · Família</div></div>
      <div class="month-card"><div class="m-icon">📋</div><div class="m-name">Abril</div><div class="m-posts">4 postagens · Documentação</div></div>
      <div class="month-card"><div class="m-icon">💐</div><div class="m-name">Maio</div><div class="m-posts">4 postagens · Dia das Mães</div></div>
      <div class="month-card"><div class="m-icon">🎪</div><div class="m-name">Junho</div><div class="m-posts">4 postagens · Festas juninas</div></div>
      <div class="month-card"><div class="m-icon">🏖️</div><div class="m-name">Julho</div><div class="m-posts">4 postagens · Férias</div></div>
      <div class="month-card"><div class="m-icon">💼</div><div class="m-name">Agosto</div><div class="m-posts">4 postagens · Oportunidades</div></div>
      <div class="month-card"><div class="m-icon">🌸</div><div class="m-name">Setembro</div><div class="m-posts">4 postagens · Primavera</div></div>
      <div class="month-card"><div class="m-icon">🔐</div><div class="m-name">Outubro</div><div class="m-posts">4 postagens · Segurança</div></div>
      <div class="month-card"><div class="m-icon">🛒</div><div class="m-name">Novembro</div><div class="m-posts">4 postagens · Black Nov.</div></div>
      <div class="month-card"><div class="m-icon">🎄</div><div class="m-name">Dezembro</div><div class="m-posts">4 postagens · Natal/Virada</div></div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-label">Para quem é</div>
    <div class="section-title">Este guia foi feito<br>para você?</div>
    <div class="audience-grid">
      <div class="audience-card yes"><div class="aud-icon">✅</div><div><h5>Corretor autônomo que quer mais visibilidade local</h5><p>Atua na sua cidade e quer que clientes te encontrem no Google sem pagar por anúncios.</p></div></div>
      <div class="audience-card yes"><div class="aud-icon">✅</div><div><h5>Corretor que já tem perfil mas nunca otimizou</h5><p>Criou o perfil há anos, nunca recebeu contato por ele e quer finalmente colocá-lo para trabalhar.</p></div></div>
      <div class="audience-card yes"><div class="aud-icon">✅</div><div><h5>Imobiliária pequena que quer escalar sem aumentar budget</h5><p>Precisa de mais leads sem aumentar o investimento em tráfego pago.</p></div></div>
      <div class="audience-card no"><div class="aud-icon">❌</div><div><h5>Quem espera resultado sem executar</h5><p>Este guia exige apenas algumas horas de configuração inicial. Sem ação, nenhuma ferramenta funciona.</p></div></div>
    </div>
  </div>
</section>

<section class="faq-section">
  <div class="container">
    <div class="section-label">Dúvidas frequentes</div>
    <div class="section-title">Respondendo antes<br>que você pergunte</div>
    <div class="faq-grid">
      <div class="faq-item"><h5>Precisa ter site para usar o Google Meu Negócio?</h5><p>Não. O GMN funciona independente de site. O guia mostra alternativas para quem não tem site próprio.</p></div>
      <div class="faq-item"><h5>Em quanto tempo começo a aparecer no Google?</h5><p>Perfis verificados e otimizados costumam aparecer nas buscas locais em 2 a 4 semanas. Com postagens frequentes, o resultado é ainda mais rápido.</p></div>
      <div class="faq-item"><h5>O guia funciona para qualquer cidade do Brasil?</h5><p>Sim. Todo o conteúdo é aplicável em qualquer município. Os templates têm campos personalizáveis como [sua cidade] e [bairro].</p></div>
      <div class="faq-item"><h5>Como recebo o material depois do pagamento?</h5><p>Após o Pix, você envia o comprovante por e-mail e recebe o guia por e-mail — mesmo em finais de semana.</p></div>
      <div class="faq-item"><h5>Já tenho perfil criado. Este guia ainda vale?</h5><p>Com certeza. O módulo de otimização foi feito exatamente para quem já tem perfil mas não está aparecendo bem.</p></div>
      <div class="faq-item"><h5>Precisa ter conhecimento técnico?</h5><p>Não. O guia foi escrito para corretores, não para profissionais de tecnologia. Linguagem simples, passo a passo com prints e exemplos práticos.</p></div>
    </div>
  </div>
</section>

<section class="cta-final">
  <h2>Pronto para aparecer<br>no <span>Google</span> todo dia?</h2>
  <p>Configure uma vez. Apareça para sempre. Atraia clientes sem pagar por cada clique.</p>
  <button class="btn-cta-big" data-action="openModal">Quero o guia por R$ 67 →</button>
  <div class="cta-reassure">🔒 Pix seguro · Entrega por e-mail · Sem mensalidade</div>
</section>

<footer>
  © 2025 MidiaVision Digital · Todos os direitos reservados<br>
  Este produto é entregue em formato digital (PDF). Após confirmação do pagamento, o material é enviado por e-mail.
</footer>

<!-- Modal Pix -->
<div class="modal-overlay" id="modalOverlay">
  <div class="modal">
    <button class="modal-close" data-action="closeModal">✕</button>
    <div class="modal-step active" id="step1">
      <div class="step-badge">Passo 1 de 2</div>
      <h3>Efetue o pagamento via Pix</h3>
      <p>Escaneie o QR Code ou copie a chave. Depois informe seu e-mail e clique em confirmar.</p>
      <div class="pix-key-box">
        <canvas id="qrCanvas" width="180" height="180" style="display:block;margin:0 auto 16px"></canvas>
      </div>
      <div class="pix-price">R$ 67,00</div>
      
      <button class="btn-copy" data-action="copyPix">📋 Copiar chave Pix</button>
      <label style="display:block;text-align:left;font-size:13px;font-weight:600;color:#0F2744;margin-bottom:6px;margin-top:20px">Seu e-mail para receber o guia</label>
      <input type="email" id="buyerEmail" placeholder="voce@exemplo.com" autocomplete="off" style="width:100%;padding:12px 16px;border:2px solid #E5E7EB;border-radius:10px;font-size:15px;font-family:'DM Sans',sans-serif;color:#0F2744;outline:none;transition:border 0.2s;margin-bottom:4px;" />
      <div id="emailValidMsg" style="display:none;font-size:13px;margin-bottom:10px"></div>
      <label style="display:block;text-align:left;font-size:13px;font-weight:600;color:#0F2744;margin-bottom:6px">Confirme seu e-mail</label>
      <input type="email" id="buyerEmailConfirm" placeholder="voce@exemplo.com" autocomplete="off" style="width:100%;padding:12px 16px;border:2px solid #E5E7EB;border-radius:10px;font-size:15px;font-family:'DM Sans',sans-serif;color:#0F2744;outline:none;transition:border 0.2s;margin-bottom:4px;" />
      <div id="emailConfirmValidMsg" style="display:none;font-size:13px;margin-bottom:10px"></div>
      <div id="emailMatchMsg" style="display:none;font-size:13px;margin-bottom:12px"></div>
      <button class="btn-done" data-action="goStep2">Já paguei — Confirmar</button>
    </div>
    <div class="modal-step" id="step2">
      <div class="step-badge">Passo 2 de 2</div>
      <div style="font-size:48px;margin-bottom:16px">📧</div>
      <h3>Avise que pagou!</h3>
      <p style="font-size:14px;color:#4B5563;line-height:1.6;margin-bottom:16px">Clique no botão abaixo para nos avisar. Assim que confirmarmos o pagamento, enviaremos o guia para o seu e-mail.</p>
      <button id="sendBtn" class="btn-done" style="background:#16A34A;font-size:16px;padding:14px 32px;cursor:pointer;">✅ Confirmar pagamento</button>
    </div>
    <div class="modal-step" id="step3">
      <div style="font-size:56px;margin-bottom:16px">✅</div>
      <h3 style="color:#16A34A">Aviso enviado!</h3>
      <p style="font-size:15px;color:#4B5563;margin-top:8px;line-height:1.6">Recebemos sua confirmação. Vamos verificar o pagamento e enviar o guia para o e-mail informado em breve.</p>
      <div style="margin-top:24px;padding:14px 20px;background:#F0FDF4;border-radius:12px;border:1px solid #BBF7D0;font-size:13px;color:#166534;line-height:1.6">
        📩 Fique atento à sua caixa de entrada e também à pasta de spam.
      </div>
      <button class="btn-done" data-action="closeModal" style="margin-top:24px;background:#16A34A;">Fechar</button>
    </div>
  </div>
</div>

<div class="toast" id="toast">✅ Chave Pix copiada!</div>
`;

  return <div ref={containerRef} className="gmn-page" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default GuiaGmn;
