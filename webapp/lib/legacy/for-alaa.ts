/* Auto-generated from legacy/for-alaa.original.html */
export const for_alaaScripts: string[] = [
  "// ══ PASSWORD GATE ══\n  localStorage.removeItem('alaa_auth_v1');\n  const AUTH_KEY = 'alaa_auth_v1';\n  const PASS     = 'alaa-core';\n  const gate     = document.getElementById('gate');\n\n  function checkPass() {\n    const input = document.getElementById('gate-input');\n    const field = document.getElementById('gate-field');\n    const err   = document.getElementById('gate-error');\n    if (input.value.trim().toLowerCase() === PASS) {\n      sessionStorage.setItem(AUTH_KEY, 'yes');\n      gate.classList.add('hide');\n    } else {\n      input.value = '';\n      err.textContent = (document.documentElement.lang === 'ar')\n        ? 'هذه ليست الكلمة السحرية ♡'\n        : 'That\\'s not the secret ♡';\n      field.classList.remove('shake');\n      void field.offsetWidth;\n      field.classList.add('shake');\n      setTimeout(() => { err.textContent = ''; }, 2400);\n    }\n  }\n  document.getElementById('gate-input').addEventListener('keydown', e => {\n    if (e.key === 'Enter') checkPass();\n  });\n  if (sessionStorage.getItem(AUTH_KEY) === 'yes') {\n    gate.classList.add('hide');\n  }\n\n  // ══ LANG TOGGLE ══\n  let lang = 'en';\n  function toggleLang() {\n    lang = lang === 'en' ? 'ar' : 'en';\n    const html = document.documentElement;\n    html.lang = lang;\n    html.dir  = lang === 'ar' ? 'rtl' : 'ltr';\n    document.querySelector('.topnav-lang').textContent = lang === 'ar' ? 'English' : 'عربي';\n    document.querySelectorAll('.t[data-en]').forEach(el => {\n      el.innerHTML = el.dataset[lang];\n    });\n  }"
];

export function runForAlaaScripts(root: HTMLElement) {
  for (const code of for_alaaScripts) {
    const el = document.createElement("script");
    el.text = code;
    root.appendChild(el);
  }
}
