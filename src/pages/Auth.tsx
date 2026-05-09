import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Mail, Lock, Eye, EyeOff, User2, Scale, Handshake, AlertCircle,
  ChevronDown, Phone, FileText, Building2, CheckCircle2, XCircle, Circle,
  Loader2, ShieldCheck, KeyRound, Clock, ArrowLeft,
} from "lucide-react";
import logoImg from "@/assets/haqdaar-logo.png";

type AuthState = "login" | "signup_role" | "signup_details" | "signup_verify" | "forgot" | "reset";
type Role = "citizen" | "lawyer" | "ngo";

const QuickExitBtn = () => (
  <button
    onClick={() => { window.location.href = "https://www.weather.com"; }}
    className="hd-quick-exit"
    aria-label="Quick Exit"
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
    Quick Exit
  </button>
);


const QUOTES = [
  {
    en: "No struggle can ever succeed without women participating side by side with men.",
    ur: "کوئی بھی جدوجہد اس وقت تک کامیاب نہیں ہو سکتی جب تک خواتین مردوں کے شانہ بشانہ حصہ نہ لیں۔",
    name: "— Quaid-e-Azam Muhammad Ali Jinnah",
    role: "Founder of Pakistan · بانی پاکستان",
  },
  {
    en: "Self-government is the inherent right of a people.",
    ur: "خود مختاری ہر قوم کا پیدائشی حق ہے۔",
    name: "— Allama Muhammad Iqbal",
    role: "Poet, Philosopher & Barrister · شاعرِ مشرق",
  },
  {
    en: "The law is not an instrument of oppression. It is a shield for the powerless.",
    ur: "قانون ظلم کا آلہ نہیں، یہ کمزوروں کی ڈھال ہے۔",
    name: "— Asma Jahangir",
    role: "Supreme Court Advocate & UN Special Rapporteur · انسانی حقوق کی علمبردار",
  },
  {
    en: "In a country run by law, every citizen stands equal before the court.",
    ur: "قانون کی حکمرانی میں ہر شہری عدالت کے سامنے برابر ہے۔",
    name: "— Hina Jilani",
    role: "UN Special Representative on Human Rights · بین الاقوامی حقوق انسانی وکیل",
  },
  {
    en: "With faith, discipline, and selfless devotion — there is nothing you cannot achieve.",
    ur: "ایمان، اتحاد اور نظم و ضبط کے ساتھ کوئی چیز ناممکن نہیں۔",
    name: "— Quaid-e-Azam Muhammad Ali Jinnah",
    role: "Founder of Pakistan · بانی پاکستان",
  },
];

const CITIES = ["Karachi","Lahore","Islamabad","Rawalpindi","Faisalabad","Multan","Peshawar","Quetta","Sialkot","Gujranwala"];
const SPECS = ["Labor Law","Family Law","Property Law","Criminal Law","Human Rights","Constitutional Law","Corporate Law"];

const passwordScore = (p: string) => {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[!@#$%^&*]/.test(p)) s++;
  return s;
};

const STRENGTH_LABEL = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLOR = ["#2a2723", "#D95B5B", "#E0833C", "#E2C97E", "#5AB07A"];

const Auth = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initial = (params.get("mode") as AuthState) || "login";
  const [state, setState] = useState<AuthState>(initial);
  const [animKey, setAnimKey] = useState(0);
  const go = (s: AuthState) => { setState(s); setAnimKey(k => k + 1); };

  const [quoteIndex, setQuoteIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setQuoteIndex(i => (i + 1) % QUOTES.length), 6000);
    return () => clearInterval(t);
  }, []);

  // form data
  const [form, setForm] = useState({
    email: "", password: "", remember: false,
    fullName: "", phone: "", city: "", confirm: "",
    barNo: "", spec: "", years: "",
    orgName: "", orgNo: "", focus: "",
    terms: false,
  });
  const setF = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm(f => ({ ...f, [k]: v }));
  const [role, setRole] = useState<Role | null>(null);
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<string>("");
  const [emailTaken, setEmailTaken] = useState(false);

  // OTP
  const [otp, setOtp] = useState<string[]>(["","","","","",""]);
  const [otpErr, setOtpErr] = useState(false);
  const [otpShake, setOtpShake] = useState(false);
  const [otpOk, setOtpOk] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [countdown, setCountdown] = useState(120);
  useEffect(() => {
    if (state !== "signup_verify") return;
    setCountdown(120);
    const t = setInterval(() => setCountdown(c => (c <= 0 ? 0 : c - 1)), 1000);
    return () => clearInterval(t);
  }, [state]);

  // forgot success + resend cooldown
  const [forgotSent, setForgotSent] = useState(false);
  const [resendCd, setResendCd] = useState(0);
  useEffect(() => {
    if (resendCd <= 0) return;
    const t = setInterval(() => setResendCd(c => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [resendCd]);

  // reset success
  const [resetDone, setResetDone] = useState(false);
  useEffect(() => {
    if (!resetDone) return;
    const t = setTimeout(() => { setResetDone(false); go("login"); setToast("Password updated. Please log in."); }, 3000);
    return () => clearTimeout(t);
  }, [resetDone]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  // ---------- handlers ----------
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!form.email || !form.password) { setErrors({ password: "Please fill both fields." }); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (form.password === "wrong") { setErrors({ password: "Email or password is incorrect." }); return; }
      const storedRole = (localStorage.getItem("haqdaar_role") as Role | null);
      try { localStorage.setItem("haqdaar_user", JSON.stringify({ email: form.email })); } catch {}
      const target = storedRole === "lawyer" ? "/lawyer" : storedRole === "ngo" ? "/ngo" : "/";
      navigate(target);
    }, 1400);
  };

  const handleEmailBlur = () => {
    if (form.email.trim().toLowerCase() === "test@test.com") setEmailTaken(true);
    else setEmailTaken(false);
  };

  const detailsValid = useMemo(() => {
    if (!form.fullName || !form.email || !form.phone || !form.city) return false;
    if (passwordScore(form.password) < 3) return false;
    if (form.password !== form.confirm) return false;
    if (!form.terms) return false;
    if (emailTaken) return false;
    if (role === "lawyer" && (!form.barNo || !form.spec || !form.years)) return false;
    if (role === "ngo" && (!form.orgName || !form.orgNo || !form.focus)) return false;
    return true;
  }, [form, role, emailTaken]);

  const submitDetails = () => { if (detailsValid) go("signup_verify"); };

  const handleOtpChange = (i: number, v: string) => {
    const ch = v.replace(/\D/g, "").slice(-1);
    const next = [...otp]; next[i] = ch; setOtp(next); setOtpErr(false);
    if (ch && i < 5) otpRefs.current[i + 1]?.focus();
  };
  const handleOtpKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const t = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!t) return;
    e.preventDefault();
    const next = ["","","","","",""];
    for (let i = 0; i < t.length; i++) next[i] = t[i];
    setOtp(next);
    otpRefs.current[Math.min(t.length, 5)]?.focus();
  };
  const verifyOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const code = otp.join("");
      if (code === "123456") {
        setOtpOk(true);
        if (role) localStorage.setItem("haqdaar_role", role);
        setTimeout(() => {
          setOtpOk(false);
          setOtp(["","","","","",""]);
          go("login");
          setToast("Account created! Please log in.");
        }, 700);
      } else {
        setOtpErr(true); setOtpShake(true);
        setTimeout(() => { setOtpShake(false); setOtp(["","","","","",""]); otpRefs.current[0]?.focus(); }, 450);
      }
    }, 900);
  };

  const submitForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setForgotSent(true); setResendCd(60); }, 1300);
  };

  const submitReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordScore(form.password) < 3 || form.password !== form.confirm) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setResetDone(true); }, 1500);
  };

  // ---------- styles ----------
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,400;1,700&family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
    .hd-auth { --bg-base:#090909;--bg-left:#0C0A07;--bg-right:#0F0E0C;--bg-card:#141210;--bg-input:#1A1815;--bg-hover:#1F1D1A;--gold:#C9A84C;--gold-light:#E2C97E;--gold-dim:#8A6E32;--gold-glow:rgba(201,168,76,0.12);--gold-border:rgba(201,168,76,0.25);--gold-border-strong:rgba(201,168,76,0.6);--text-primary:#F2EDE4;--text-secondary:#9A9080;--text-muted:#5C5650;--success:#5AB07A;--error:#D95B5B;
      font-family:'DM Sans',sans-serif;color:var(--text-primary);background:var(--bg-base);height:100vh;display:flex;overflow:hidden;}
    .hd-left{width:45%;background:var(--bg-left);position:relative;overflow:hidden;height:100vh;}
    .hd-left::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 70% 50% at 60% 45%, rgba(180,130,40,0.13) 0%, transparent 70%);pointer-events:none;}
    .hd-right{width:55%;background:var(--bg-right);position:relative;overflow:hidden;height:100vh;display:flex;flex-direction:column;}
    .hd-right::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 60%);pointer-events:none;}
    .hd-logo{position:absolute;top:24px;left:28px;z-index:2;display:flex;flex-direction:column;gap:4px;}
    .hd-logo img{height:54px;width:auto;display:block;}
    .hd-logo .ur{font-family:'Noto Nastaliq Urdu',serif;font-size:13px;color:var(--gold);direction:rtl;margin-top:2px;}
    .hd-quote-wrap{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:78%;max-width:360px;}
    .hd-bigq{font-family:'Playfair Display',serif;font-size:96px;color:var(--gold);opacity:.4;line-height:1;position:absolute;top:-40px;left:-30px;pointer-events:none;}
    .hd-quote{position:absolute;inset:0;opacity:0;transition:opacity .7s ease-in-out;}
    .hd-quote.active{opacity:1;position:relative;}
    .hd-quote .en{font-family:'Playfair Display',serif;font-style:italic;font-weight:400;font-size:1.2rem;line-height:1.75;color:var(--text-primary);margin-bottom:18px;}
    .hd-quote .ur{font-family:'Noto Nastaliq Urdu',serif;font-weight:400;font-size:1.05rem;line-height:2.1;color:var(--gold-light);direction:rtl;text-align:right;display:block;margin-bottom:20px;}
    .hd-quote hr{border:none;border-top:1px solid var(--gold-border);width:40px;margin:14px 0;}
    .hd-quote .nm{font-family:'DM Sans',sans-serif;font-weight:500;font-size:.78rem;color:var(--gold);letter-spacing:.08em;}
    .hd-quote .rl{font-weight:300;font-size:.7rem;color:var(--text-secondary);margin-top:2px;}
    .hd-dots{display:flex;gap:18px;justify-content:center;margin-top:28px;align-items:center;}
    .hd-dot{height:5px;width:5px;border-radius:999px;background:var(--gold-border);transition:all .4s;}
    .hd-dot.on{height:8px;width:8px;background:var(--gold);}
    .hd-bottom{position:absolute;bottom:0;left:0;right:0;padding:20px 28px;border-top:1px solid var(--gold-border);font-size:.74rem;color:var(--text-secondary);display:flex;gap:14px;align-items:center;}
    .hd-bottom b{color:var(--gold);font-weight:600;}
    .hd-bottom .sep{color:var(--gold-border);}
    .hd-rpanel{padding:32px 44px;max-width:560px;margin:0 auto;flex:1;display:flex;flex-direction:column;justify-content:center;position:relative;z-index:1;width:100%;overflow:hidden;}
    .hd-foot{padding:14px 44px;display:flex;justify-content:space-between;align-items:center;font-size:.7rem;color:var(--text-muted);border-top:1px solid var(--gold-border);background:var(--bg-right);flex-shrink:0;}
    .hd-foot a{color:var(--text-muted);text-decoration:none;margin-left:18px;transition:color .2s;}
    .hd-foot a:hover{color:var(--gold);}
    .hd-form{max-width:480px;margin:0 auto;width:100%;display:flex;flex-direction:column;min-height:0;}
    .hd-h1{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:1.7rem;line-height:1.2;color:var(--text-primary);}
    .hd-sub{font-family:'DM Sans',sans-serif;font-weight:300;font-size:.8rem;color:var(--text-secondary);margin-top:6px;}
    .hd-divrow{display:flex;align-items:center;gap:12px;margin:8px 0;color:var(--text-muted);font-size:.62rem;letter-spacing:.2em;font-weight:500;}
    .hd-divrow::before,.hd-divrow::after{content:"";flex:1;height:1px;background:var(--gold-border);}
    .hd-label{font-weight:500;font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:4px;display:block;}
    .hd-inputw{position:relative;}
    .hd-input{background:var(--bg-input);border:1px solid var(--gold-border);border-radius:8px;height:40px;padding:0 14px 0 38px;color:var(--text-primary);font:400 .82rem 'DM Sans',sans-serif;width:100%;transition:border-color .2s,box-shadow .25s,background-color .2s;outline:none;}
    .hd-input:hover:not(:focus){border-color:rgba(201,168,76,0.4);background:rgba(30,28,24,1);}
    .hd-input:focus{border-color:var(--gold);box-shadow:0 0 0 3px rgba(201,168,76,0.1),0 1px 8px rgba(201,168,76,0.08);background:#1F1D1A;}
    .hd-input.err{border-color:var(--error);}
    .hd-input.ok{border-color:var(--success);}
    select.hd-input{padding-left:14px;appearance:none;cursor:pointer;}
    select.hd-input option{background:#1A1815;color:var(--text-primary);}
    .hd-ico{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text-muted);pointer-events:none;display:flex;}
    .hd-ico.r{left:auto;right:12px;cursor:pointer;pointer-events:auto;background:none;border:none;}
    .hd-msg{font-size:.7rem;margin-top:3px;}
    .hd-msg.err{color:var(--error);}
    .hd-msg.ok{color:var(--success);}
    .hd-btn{height:40px;width:100%;border-radius:8px;font:600 .8rem 'DM Sans',sans-serif;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;transition:all .2s cubic-bezier(0.4,0,0.2,1);display:inline-flex;align-items:center;justify-content:center;gap:8px;border:none;}
    .hd-btn.primary{background:linear-gradient(135deg,#C9A84C 0%,#A8863A 100%);color:#0A0A0A;}
    .hd-btn.primary:hover:not(:disabled){background:linear-gradient(135deg,#D4B05A 0%,#B8923E 100%);transform:translateY(-1px);box-shadow:0 6px 20px rgba(201,168,76,.3),0 2px 8px rgba(201,168,76,.2);}
    .hd-btn.primary:active:not(:disabled){transform:translateY(0);box-shadow:0 2px 8px rgba(201,168,76,.2);}
    .hd-btn.primary:disabled{opacity:.4;cursor:not-allowed;}
    .hd-btn.secondary{background:transparent;border:1px solid var(--gold-border);color:var(--text-primary);}
    .hd-btn.secondary:hover{background:rgba(201,168,76,0.06);border-color:rgba(201,168,76,0.5);transform:translateY(-1px);}
    .hd-btn.ghost{background:transparent;border:1px solid rgba(255,255,255,.06);color:var(--text-secondary);font-size:.78rem;text-transform:none;letter-spacing:0;}
    .hd-btn.ghost:hover{background:rgba(255,255,255,0.04);color:var(--text-primary);}
    .hd-row{display:flex;align-items:center;justify-content:space-between;margin:10px 0;font-size:.78rem;color:var(--text-secondary);}
    .hd-link{color:var(--gold);text-decoration:none;cursor:pointer;background:none;border:none;font:inherit;padding:0;transition:color .15s,opacity .15s;}
    .hd-link:hover{color:var(--gold-light);text-decoration:underline;}
    .hd-link:active{opacity:.7;}
    .hd-cb{display:inline-flex;align-items:center;gap:8px;cursor:pointer;}
    .hd-cb input{appearance:none;width:15px;height:15px;border:1px solid var(--gold-border);border-radius:3px;background:var(--bg-input);cursor:pointer;position:relative;flex-shrink:0;transition:all .15s;}
    .hd-cb input:checked{background:var(--gold);border-color:var(--gold);}
    .hd-cb input:checked::after{content:"";position:absolute;left:4px;top:1px;width:4px;height:8px;border:solid #0A0A0A;border-width:0 2px 2px 0;transform:rotate(45deg);}
    .hd-or{display:flex;align-items:center;gap:12px;margin:14px 0;color:var(--text-muted);font-size:.72rem;}
    .hd-or::before,.hd-or::after{content:"";flex:1;height:1px;background:var(--gold-border);}
    .hd-stage{animation:hd-in .32s cubic-bezier(0.22,1,0.36,1);min-height:0;display:flex;flex-direction:column;flex:1;justify-content:center;}
    @keyframes hd-in{from{opacity:0;transform:translateX(16px);}to{opacity:1;transform:translateX(0);}}
    @keyframes hd-pulsering{0%{transform:scale(1);opacity:.6;}100%{transform:scale(1.35);opacity:0;}}
    @keyframes hd-shake{0%,100%{transform:translateX(0);}20%{transform:translateX(-6px);}40%{transform:translateX(6px);}60%{transform:translateX(-4px);}80%{transform:translateX(4px);}}
    @keyframes hd-spin{to{transform:rotate(360deg);}}
    @keyframes hd-slidedown{from{transform:translateY(-100%);opacity:0;}to{transform:translateY(0);opacity:1;}}
    @keyframes hd-scalein{from{transform:scale(.5);opacity:0;}to{transform:scale(1);opacity:1;}}
    @keyframes hd-fill{from{width:0%;}to{width:100%;}}
    @keyframes hd-redpulse{0%,100%{box-shadow:0 0 0 0 rgba(217,91,91,.5);}50%{box-shadow:0 0 0 8px rgba(217,91,91,0);}}
    .hd-spin{animation:hd-spin 1s linear infinite;}
    .hd-progress{display:flex;align-items:center;gap:8px;margin-bottom:8px;}
    .hd-step{display:flex;flex-direction:column;align-items:center;gap:6px;}
    .hd-circ{width:28px;height:28px;border-radius:999px;border:1px solid var(--gold-border);display:flex;align-items:center;justify-content:center;font-size:.72rem;color:var(--text-muted);transition:all .4s cubic-bezier(0.4,0,0.2,1);}
    .hd-circ.on{background:var(--gold);border-color:var(--gold);color:#0A0A0A;font-weight:600;}
    .hd-line{flex:1;height:1px;background:var(--gold-border);transition:background .4s;}
    .hd-line.on{background:var(--gold);}
    .hd-stelab{font-size:.62rem;color:var(--text-secondary);}
    .hd-rolecard{background:var(--bg-card);border:1px solid var(--gold-border);border-radius:12px;padding:14px 18px;display:flex;align-items:center;gap:14px;cursor:pointer;transition:all .25s cubic-bezier(0.4,0,0.2,1);}
    .hd-rolecard:hover{border-color:rgba(201,168,76,0.45);background:rgba(201,168,76,0.03);transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,0,0,.3);}
    .hd-rolecard.sel{border-color:var(--gold);background:rgba(201,168,76,0.06);box-shadow:0 0 0 1px var(--gold),0 4px 24px rgba(201,168,76,.12);transform:translateY(-1px);}
    .hd-rolecard:active{transform:scale(.99);}
    .hd-roleicon{width:38px;height:38px;border-radius:999px;background:var(--gold-glow);border:1px solid var(--gold-border);display:flex;align-items:center;justify-content:center;color:var(--gold);flex-shrink:0;}
    .hd-roletitle{font-weight:600;font-size:.88rem;color:var(--text-primary);}
    .hd-roledesc{font-size:.74rem;color:var(--text-secondary);margin-top:2px;}
    .hd-radio{width:20px;height:20px;border-radius:999px;border:1px solid var(--gold-border);display:flex;align-items:center;justify-content:center;flex-shrink:0;position:relative;}
    .hd-radio.sel{background:var(--gold);border-color:var(--gold);}
    .hd-radio.sel::after{content:"";width:6px;height:6px;border-radius:999px;background:#0A0A0A;}
    .hd-strength{display:flex;gap:4px;margin-top:4px;}
    .hd-strength div{flex:1;height:3px;border-radius:2px;background:#2a2723;transition:background .25s;}
    .hd-badges{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;}
    .hd-badge{height:20px;padding:0 7px;border-radius:999px;font:500 .6rem 'DM Sans',sans-serif;display:inline-flex;align-items:center;gap:4px;border:1px solid;transition:all .2s;}
    .hd-badge.met{background:rgba(90,176,122,0.15);border-color:rgba(90,176,122,0.3);color:#5AB07A;}
    .hd-badge.unmet{background:rgba(92,86,80,0.2);border-color:rgba(92,86,80,0.3);color:var(--text-muted);}
    .hd-otp{display:flex;gap:8px;justify-content:center;margin:18px 0;}
    .hd-otp input{width:46px;height:54px;background:var(--bg-input);border:1.5px solid var(--gold-border);border-radius:10px;text-align:center;font:600 1.4rem 'DM Sans',sans-serif;color:var(--gold-light);outline:none;caret-color:var(--gold);transition:border-color .15s,box-shadow .2s,transform .1s;}
    .hd-otp input:hover{border-color:rgba(201,168,76,0.4);transform:scale(1.02);}
    .hd-otp input:focus{border-color:var(--gold);transform:scale(1.04);box-shadow:0 0 0 3px rgba(201,168,76,0.12);}
    .hd-otp.err input{border-color:var(--error);}
    .hd-otp.ok input{border-color:var(--success);}
    .hd-otp.shake{animation:hd-shake .4s;}
    .hd-pulse{position:relative;width:54px;height:54px;border:2px solid var(--gold-border);border-radius:999px;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;color:var(--gold);}
    .hd-pulse::after{content:"";position:absolute;inset:-2px;border:2px solid var(--gold);border-radius:999px;animation:hd-pulsering 2s ease-out infinite;}
    .hd-info{background:rgba(201,168,76,0.06);border:1px solid var(--gold-border);border-radius:10px;padding:10px 14px;display:flex;gap:10px;font-size:.74rem;color:var(--text-secondary);margin-top:12px;}
    .hd-toast{position:absolute;top:16px;left:50%;transform:translateX(-50%);background:rgba(90,176,122,.15);border:1px solid var(--success);color:var(--success);padding:9px 16px;border-radius:10px;font-size:.8rem;display:flex;align-items:center;gap:8px;animation:hd-slidedown .3s ease-out;z-index:4;}
    .hd-grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px 16px;}
    .hd-grid2 .full{grid-column:1 / -1;}
    .hd-back{display:inline-flex;align-items:center;gap:6px;background:none;border:none;color:var(--text-secondary);font:500 .78rem 'DM Sans',sans-serif;cursor:pointer;padding:6px 0;margin-bottom:8px;transition:color .2s;}
    .hd-back:hover{color:var(--gold);}
    .hd-quick-exit{position:fixed;bottom:20px;right:20px;z-index:80;display:flex;align-items:center;gap:8px;border-radius:999px;padding:10px 16px;font:500 .72rem 'DM Sans',sans-serif;color:#fff;background:#D95B5B;border:none;cursor:pointer;animation:hd-redpulse 2.4s ease-in-out infinite;transition:transform .2s;}
    .hd-quick-exit:hover{transform:translateY(-2px);}
    .hd-mob-logo{display:none;}
    @media (max-width:768px){
      .hd-left{display:none;}
      .hd-right{width:100%;}
      .hd-rpanel{padding:20px;}
      .hd-mob-logo{display:flex;flex-direction:column;align-items:center;gap:4px;margin-bottom:16px;}
    }
  `;

  const Q = QUOTES[quoteIndex];
  const score = passwordScore(form.password);

  // ---------- left panel ----------
  const Left = (
    <div className="hd-left">
      <div className="hd-logo">
        <img src={logoImg} alt="HaqDaar" />
        <div className="ur">حق · عدل · انصاف</div>
      </div>
      <div className="hd-quote-wrap">
        <span className="hd-bigq">&ldquo;</span>
        <div style={{ position: "relative", minHeight: 320 }}>
          {QUOTES.map((q, i) => (
            <div key={i} className={`hd-quote ${i === quoteIndex ? "active" : ""}`}>
              <p className="en">{q.en}</p>
              <span className="ur">{q.ur}</span>
              <hr />
              <div className="nm">{q.name}</div>
              <div className="rl">{q.role}</div>
            </div>
          ))}
        </div>
        <div className="hd-dots">
          {QUOTES.map((_, i) => <span key={i} className={`hd-dot ${i === quoteIndex ? "on" : ""}`} />)}
        </div>
      </div>
      <div className="hd-bottom">
        <span><b>12.4k+</b> citizens helped</span>
        <span className="sep">·</span>
        <span><b>340</b> volunteer lawyers</span>
      </div>
    </div>
  );

  // ---------- right content per state ----------
  const ProgressBar = ({ step }: { step: 1 | 2 | 3 }) => (
    <>
      <div className="hd-progress">
        {[1,2,3].map((n, idx) => (
          <>
            <div key={n} className={`hd-circ ${step >= (n as 1|2|3) ? "on" : ""}`}>{n}</div>
            {idx < 2 && <div className={`hd-line ${step > (n as 1|2|3) ? "on" : ""}`} />}
          </>
        ))}
      </div>
      <div style={{ display:"flex",justifyContent:"space-between",fontSize:".68rem",color:"var(--text-secondary)",marginBottom:18,paddingRight:4 }}>
        <span>Role</span><span>Details</span><span>Verify</span>
      </div>
    </>
  );

  const renderLogin = () => (
    <form className="hd-form" onSubmit={handleLogin}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <Scale size={28} color="var(--gold)" style={{ margin: "0 auto" }} />
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: 26, color: "var(--gold)", marginTop: 4 }}>HaqDaar</div>
        <div className="hd-divrow">SIGN IN</div>
        <h1 className="hd-h1">Your rights are waiting <em style={{ color: "var(--gold-light)", fontStyle: "italic" }}>for you.</em></h1>
        <p className="hd-sub">Pakistan's free legal aid network — built for every citizen.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label className="hd-label">Email</label>
          <div className="hd-inputw">
            <Mail size={16} className="hd-ico" />
            <input className="hd-input" type="email" value={form.email} onChange={e => setF("email", e.target.value)} placeholder="you@example.com" />
          </div>
        </div>
        <div>
          <label className="hd-label">Password</label>
          <div className="hd-inputw">
            <Lock size={16} className="hd-ico" />
            <input className={`hd-input ${errors.password ? "err" : ""}`} type={showPw ? "text" : "password"} value={form.password} onChange={e => setF("password", e.target.value)} placeholder="••••••••" />
            <button type="button" className="hd-ico r" onClick={() => setShowPw(s => !s)}>{showPw ? <EyeOff size={16}/> : <Eye size={16}/>}</button>
          </div>
          {errors.password && <div className="hd-msg err">{errors.password}</div>}
        </div>

        <div className="hd-row">
          <label className="hd-cb"><input type="checkbox" checked={form.remember} onChange={e => setF("remember", e.target.checked)} /> Remember me</label>
          <button type="button" className="hd-link" onClick={() => go("forgot")}>Forgot password?</button>
        </div>

        <button className="hd-btn primary" disabled={loading}>
          {loading ? <><Loader2 size={16} className="hd-spin"/> Please wait...</> : "Sign In"}
        </button>

        <div className="hd-or">OR</div>
        <button type="button" className="hd-btn secondary" onClick={() => go("signup_role")}>Create a free account</button>
        <button type="button" className="hd-btn ghost"><ShieldCheck size={16}/> Continue as Guest — for sensitive cases</button>

        <div style={{ textAlign: "center", fontSize: ".8rem", color: "var(--text-secondary)", marginTop: 8 }}>
          Don't have an account? <button type="button" className="hd-link" onClick={() => go("signup_role")}>Sign up here</button>
        </div>
      </div>
    </form>
  );

  const renderRole = () => (
    <div className="hd-form">
      <button className="hd-back" onClick={() => go("login")}><ArrowLeft size={14}/> Back to Login</button>
      <ProgressBar step={1} />
      <div className="hd-divrow">JOIN</div>
      <h1 className="hd-h1" style={{ fontSize: "1.4rem" }}>Who are you?</h1>
      <p className="hd-sub">Select your role to create your account.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
        {[
          { id: "citizen" as Role, icon: <User2 size={18}/>, t: "Citizen / User", d: "I need legal help or information" },
          { id: "lawyer" as Role, icon: <Scale size={18}/>, t: "Volunteer Lawyer", d: "I want to offer free legal help" },
          { id: "ngo" as Role, icon: <Handshake size={18}/>, t: "NGO Representative", d: "I represent a legal aid organization" },
        ].map(r => (
          <div key={r.id} className={`hd-rolecard ${role === r.id ? "sel" : ""}`} onClick={() => setRole(r.id)}>
            <div className="hd-roleicon">{r.icon}</div>
            <div style={{ flex: 1 }}>
              <div className="hd-roletitle">{r.t}</div>
              <div className="hd-roledesc">{r.d}</div>
            </div>
            <div className={`hd-radio ${role === r.id ? "sel" : ""}`} />
          </div>
        ))}
      </div>

      <div style={{ display:"flex",alignItems:"center",gap:6,marginTop:10,fontSize:".7rem",color:"var(--text-muted)" }}>
        <AlertCircle size={12} color="var(--gold)"/> Role cannot be changed after registration
      </div>

      <div style={{ textAlign:"center",margin:"10px 0",fontSize:".78rem",color:"var(--text-secondary)" }}>
        Already have an account? <button className="hd-link" onClick={() => go("login")}>Log in</button>
      </div>

      <button className="hd-btn primary" disabled={!role} onClick={() => go("signup_details")}>Next</button>
    </div>
  );

  const pwReqs = [
    { ok: form.password.length >= 8, t: "8+ chars" },
    { ok: /[A-Z]/.test(form.password), t: "Uppercase" },
    { ok: /\d/.test(form.password), t: "Number" },
    { ok: /[!@#$%^&*]/.test(form.password), t: "Symbol" },
  ];

  const renderDetails = () => (
    <div className="hd-form">
      <button className="hd-back" onClick={() => go("signup_role")}><ArrowLeft size={14}/> Back</button>
      <ProgressBar step={2} />
      <div className="hd-divrow">CREATE ACCOUNT</div>
      <h1 className="hd-h1" style={{ fontSize: "1.4rem", marginBottom: 10 }}>Your details</h1>

      <div className="hd-grid2" style={{ marginTop: 6 }}>
        <Field label="Full Name" icon={<User2 size={14}/>} value={form.fullName} onChange={v => setF("fullName", v)} />
        <div>
          <label className="hd-label">Email Address</label>
          <div className="hd-inputw">
            <Mail size={14} className="hd-ico" />
            <input className={`hd-input ${emailTaken ? "err" : ""}`} type="email" value={form.email} onChange={e => setF("email", e.target.value)} onBlur={handleEmailBlur} />
          </div>
          {emailTaken && <div className="hd-msg err">Email already registered. <button className="hd-link" onClick={() => go("login")}>Log in?</button></div>}
        </div>
        <Field label="Phone Number" icon={<Phone size={14}/>} value={form.phone} onChange={v => setF("phone", v)} placeholder="+92 300 0000000" />
        <div>
          <label className="hd-label">City</label>
          <div className="hd-inputw">
            <select className="hd-input" value={form.city} onChange={e => setF("city", e.target.value)}>
              <option value="">Select city</option>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown size={14} className="hd-ico r" style={{ pointerEvents: "none" }} />
          </div>
        </div>

        <div className={role === "citizen" ? "full" : ""}>
          <label className="hd-label">Password</label>
          <div className="hd-inputw">
            <Lock size={14} className="hd-ico" />
            <input className="hd-input" type={showPw ? "text" : "password"} value={form.password} onChange={e => setF("password", e.target.value)} />
            <button type="button" className="hd-ico r" onClick={() => setShowPw(s => !s)}>{showPw ? <EyeOff size={14}/> : <Eye size={14}/>}</button>
          </div>
          <div className="hd-strength">
            {[0,1,2,3].map(i => <div key={i} style={{ background: i < score ? STRENGTH_COLOR[score] : "#2a2723" }} />)}
          </div>
        </div>

        <div className={role === "citizen" ? "full" : ""}>
          <label className="hd-label">Confirm Password</label>
          <div className="hd-inputw">
            <Lock size={14} className="hd-ico" />
            <input className={`hd-input ${form.confirm && (form.confirm === form.password ? "ok" : "err")}`} type={showCpw ? "text" : "password"} value={form.confirm} onChange={e => setF("confirm", e.target.value)} />
            <button type="button" className="hd-ico r" onClick={() => setShowCpw(s => !s)}>
              {form.confirm && form.confirm === form.password ? <CheckCircle2 size={14} color="var(--success)"/> : (showCpw ? <EyeOff size={14}/> : <Eye size={14}/>)}
            </button>
          </div>
        </div>

        {form.password && (
          <div className="full">
            <div className="hd-badges">
              {pwReqs.map(r => (
                <span key={r.t} className={`hd-badge ${r.ok ? "met" : "unmet"}`}>
                  {r.ok ? <CheckCircle2 size={10}/> : <Circle size={10}/>}{r.t}
                </span>
              ))}
            </div>
          </div>
        )}

        {role === "lawyer" && <>
          <Field label="Bar Council Reg. No." icon={<FileText size={14}/>} value={form.barNo} onChange={v => setF("barNo", v)} />
          <Field label="Years of Experience" icon={<Clock size={14}/>} value={form.years} onChange={v => setF("years", v)} type="number" />
          <div className="full"><SelectF label="Primary Specialization" options={SPECS} value={form.spec} onChange={v => setF("spec", v)} /></div>
        </>}
        {role === "ngo" && <>
          <Field label="Organization Name" icon={<Building2 size={14}/>} value={form.orgName} onChange={v => setF("orgName", v)} />
          <Field label="Org. Reg. No." icon={<FileText size={14}/>} value={form.orgNo} onChange={v => setF("orgNo", v)} />
          <div className="full"><SelectF label="Primary Focus Area" options={SPECS} value={form.focus} onChange={v => setF("focus", v)} /></div>
        </>}

        <label className="hd-cb full" style={{ fontSize: ".74rem", color: "var(--text-secondary)" }}>
          <input type="checkbox" checked={form.terms} onChange={e => setF("terms", e.target.checked)} />
          <span>I agree to the <a className="hd-link">Terms of Service</a> and <a className="hd-link">Privacy Policy</a></span>
        </label>
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 12, flexShrink: 0 }}>
        <button className="hd-btn secondary" style={{ flex: "0 0 100px" }} onClick={() => go("signup_role")}>← Back</button>
        <button className="hd-btn primary" style={{ flex: 1 }} disabled={!detailsValid} onClick={submitDetails}>Next</button>
      </div>
    </div>
  );

  const renderVerify = () => (
    <div className="hd-form">
      <button className="hd-back" onClick={() => go("signup_details")}><ArrowLeft size={14}/> Back</button>
      <div style={{ textAlign: "center" }}>
      <ProgressBar step={3} />
      <div className="hd-pulse"><Mail size={24}/></div>
      <h1 className="hd-h1" style={{ fontSize: "1.4rem" }}>Verify your email</h1>
      <p className="hd-sub">We sent a 6-digit code to <span style={{ color: "var(--gold)" }}>{form.email || "you"}</span>. Enter it below.</p>

      <div className={`hd-otp ${otpErr ? "err" : ""} ${otpOk ? "ok" : ""} ${otpShake ? "shake" : ""}`}>
        {otp.map((v, i) => (
          <input key={i} ref={el => otpRefs.current[i] = el} value={v}
            onChange={e => handleOtpChange(i, e.target.value)}
            onKeyDown={e => handleOtpKey(i, e)}
            onPaste={handleOtpPaste}
            inputMode="numeric" maxLength={1} />
        ))}
      </div>
      {otpErr && <div className="hd-msg err" style={{ display:"flex",alignItems:"center",gap:6,justifyContent:"center" }}><XCircle size={14}/> Incorrect code. Try again.</div>}

      <div style={{ fontSize: ".8rem", color: "var(--text-secondary)", margin: "16px 0" }}>
        {countdown > 0 ? <>Resend code in <b style={{ color: "var(--gold)", fontWeight: 600 }}>{countdown}</b> seconds</>
          : <button className="hd-link" onClick={() => { setCountdown(120); setToast("Code resent."); }}>Resend code</button>}
      </div>

      <button className="hd-btn primary" disabled={otp.some(d => !d) || loading} onClick={verifyOtp}>
        {loading ? <><Loader2 size={16} className="hd-spin"/> Please wait...</> : "Verify"}
      </button>

      {role === "lawyer" && <div className="hd-info" style={{ textAlign: "left" }}>
        <Clock size={16} color="var(--gold)" />
        <span>Your Bar Council number will be verified by our admin team within 24 hours. You can browse the platform in the meantime.</span>
      </div>}

      </div>
    </div>
  );

  const renderForgot = () => (
    <form className="hd-form" onSubmit={submitForgot}>
      <div style={{ textAlign: "center" }}>
        <div style={{ display:"inline-flex",position:"relative",padding:14,borderRadius:999,background:"var(--gold-glow)",marginBottom:8 }}>
          <KeyRound size={32} color="var(--gold)" />
        </div>
        <div className="hd-divrow">RESET</div>
        <h1 className="hd-h1" style={{ fontSize: "1.7rem" }}>{forgotSent ? "Check your inbox!" : "Forgot your password?"}</h1>
        <p className="hd-sub">{forgotSent ? "If an account exists for that email, a reset link has been sent. Valid for 30 minutes." : "Enter your registered email. We'll send a reset link."}</p>
      </div>

      {!forgotSent ? (
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label className="hd-label">Email</label>
            <div className="hd-inputw">
              <Mail size={16} className="hd-ico"/>
              <input className="hd-input" type="email" value={form.email} onChange={e => setF("email", e.target.value)} />
            </div>
          </div>
          <button className="hd-btn primary" disabled={loading || !form.email}>
            {loading ? <><Loader2 size={16} className="hd-spin"/> Please wait...</> : "Send Reset Link"}
          </button>
        </div>
      ) : (
        <div style={{ marginTop: 24, textAlign: "center", fontSize: ".82rem", color: "var(--text-secondary)" }}>
          Didn't receive it? {resendCd > 0
            ? <span>Resend in {resendCd}s...</span>
            : <button type="button" className="hd-link" onClick={() => setResendCd(60)}>Resend</button>}
          <div style={{ marginTop: 18 }}>
            <button type="button" className="hd-link" onClick={() => { setForgotSent(false); go("reset"); }}>Go to Reset Password →</button>
          </div>
        </div>
      )}

    </form>
  );

  const renderReset = () => (
    <form className="hd-form" onSubmit={submitReset}>
      <div style={{ textAlign: "center" }}>
        <ShieldCheck size={32} color="var(--gold)" style={{ margin: "0 auto" }}/>
        <div className="hd-divrow">NEW PASSWORD</div>
        <h1 className="hd-h1" style={{ fontSize: "1.7rem" }}>{resetDone ? "Password updated!" : "Set a new password"}</h1>
        <p className="hd-sub">{resetDone ? "Redirecting you to login..." : "Must be different from your previous password."}</p>
      </div>

      {resetDone ? (
        <div style={{ marginTop: 28, textAlign: "center" }}>
          <CheckCircle2 size={48} color="var(--success)" style={{ animation: "hd-scalein .4s ease-out" }} />
          <div style={{ height: 2, background: "var(--gold-border)", marginTop: 24, overflow: "hidden", borderRadius: 999 }}>
            <div style={{ height: "100%", background: "var(--gold)", animation: "hd-fill 3s linear" }} />
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label className="hd-label">New Password</label>
            <div className="hd-inputw">
              <Lock size={16} className="hd-ico"/>
              <input className="hd-input" type={showPw ? "text" : "password"} value={form.password} onChange={e => setF("password", e.target.value)} />
              <button type="button" className="hd-ico r" onClick={() => setShowPw(s => !s)}>{showPw ? <EyeOff size={16}/> : <Eye size={16}/>}</button>
            </div>
            <div className="hd-strength">
              {[0,1,2,3].map(i => <div key={i} style={{ background: i < score ? STRENGTH_COLOR[score] : "#2a2723" }} />)}
            </div>
          </div>
          <div>
            <label className="hd-label">Confirm Password</label>
            <div className="hd-inputw">
              <Lock size={16} className="hd-ico"/>
              <input className={`hd-input ${form.confirm && (form.confirm === form.password ? "ok" : "err")}`} type="password" value={form.confirm} onChange={e => setF("confirm", e.target.value)} />
            </div>
          </div>
          <button className="hd-btn primary" disabled={loading || passwordScore(form.password) < 3 || form.password !== form.confirm}>
            {loading ? <><Loader2 size={16} className="hd-spin"/> Please wait...</> : "Reset Password"}
          </button>
        </div>
      )}
    </form>
  );

  return (
    <div className="hd-auth">
      <style>{css}</style>
      {Left}
      <div className="hd-right">
        {toast && <div className="hd-toast"><CheckCircle2 size={16}/> {toast}</div>}
        <div className="hd-rpanel">
          <div className="hd-mob-logo">
            <div style={{ fontFamily:"'Noto Nastaliq Urdu',serif",fontSize:14,color:"var(--gold)",direction:"rtl" }}>حق · عدل · انصاف</div>
          </div>
          <div key={animKey} className="hd-stage">
            {state === "login" && renderLogin()}
            {state === "signup_role" && renderRole()}
            {state === "signup_details" && renderDetails()}
            {state === "signup_verify" && renderVerify()}
            {state === "forgot" && renderForgot()}
            {state === "reset" && renderReset()}
          </div>
        </div>
        <div className="hd-foot">
          <span>© 2026 HaqDaar — All rights reserved</span>
          <span><a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Help Center</a><a href="/contact">Contact Us</a></span>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, icon, value, onChange, placeholder, type = "text" }: { label: string; icon: React.ReactNode; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; }) => (
  <div>
    <label className="hd-label">{label}</label>
    <div className="hd-inputw">
      <span className="hd-ico">{icon}</span>
      <input className="hd-input" type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  </div>
);

const SelectF = ({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) => (
  <div>
    <label className="hd-label">{label}</label>
    <div className="hd-inputw">
      <select className="hd-input" style={{ paddingLeft: 16, appearance: "none" }} value={value} onChange={e => onChange(e.target.value)}>
        <option value="">Select...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={16} className="hd-ico r" style={{ pointerEvents: "none" }} />
    </div>
  </div>
);

export default Auth;
